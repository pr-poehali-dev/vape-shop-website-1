import json
from typing import Dict, Any, List

cart_storage: Dict[str, List[Dict[str, Any]]] = {}

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Shopping cart management API
    Args: event - dict with httpMethod, body, headers
          context - object with request_id attribute
    Returns: HTTP response dict with cart data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = event.get('headers', {})
    user_id = headers.get('X-User-Id') or headers.get('x-user-id', 'anonymous')
    
    if method == 'GET':
        cart = cart_storage.get(user_id, [])
        total = sum(item['price'] * item['quantity'] for item in cart)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'items': cart,
                'total': total,
                'count': len(cart)
            }),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body = json.loads(event.get('body', '{}'))
        product_id = body.get('product_id')
        name = body.get('name')
        price = body.get('price')
        quantity = body.get('quantity', 1)
        
        if not all([product_id, name, price]):
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing required fields'}),
                'isBase64Encoded': False
            }
        
        if user_id not in cart_storage:
            cart_storage[user_id] = []
        
        cart = cart_storage[user_id]
        existing = next((item for item in cart if item['product_id'] == product_id), None)
        
        if existing:
            existing['quantity'] += quantity
        else:
            cart.append({
                'product_id': product_id,
                'name': name,
                'price': price,
                'quantity': quantity
            })
        
        total = sum(item['price'] * item['quantity'] for item in cart)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'items': cart,
                'total': total,
                'count': len(cart)
            }),
            'isBase64Encoded': False
        }
    
    if method == 'DELETE':
        params = event.get('queryStringParameters') or {}
        product_id = params.get('product_id')
        
        if user_id in cart_storage and product_id:
            cart_storage[user_id] = [
                item for item in cart_storage[user_id]
                if str(item['product_id']) != str(product_id)
            ]
        
        cart = cart_storage.get(user_id, [])
        total = sum(item['price'] * item['quantity'] for item in cart)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'items': cart,
                'total': total,
                'count': len(cart)
            }),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
