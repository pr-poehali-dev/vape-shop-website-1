import json
import os
from typing import Dict, Any, Optional

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Product catalog API with filtering
    Args: event - dict with httpMethod, queryStringParameters
          context - object with request_id, function_name attributes
    Returns: HTTP response dict with products list
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        
        products = [
            {'id': 1, 'name': 'ELFBAR 5000', 'brand': 'ELFBAR', 'type': 'Одноразовый', 'price': 990, 'nicotine': '20 мг', 'image': '/placeholder.svg', 'popular': True, 'stock': 50},
            {'id': 2, 'name': 'JUUL Starter Kit', 'brand': 'JUUL', 'type': 'Под-система', 'price': 2990, 'nicotine': '18 мг', 'image': '/placeholder.svg', 'popular': True, 'stock': 30},
            {'id': 3, 'name': 'Vaporesso XROS 3', 'brand': 'Vaporesso', 'type': 'Под-система', 'price': 2490, 'nicotine': '0 мг', 'image': '/placeholder.svg', 'popular': False, 'stock': 25},
            {'id': 4, 'name': 'Lost Mary BM3500', 'brand': 'Lost Mary', 'type': 'Одноразовый', 'price': 890, 'nicotine': '20 мг', 'image': '/placeholder.svg', 'popular': True, 'stock': 60},
            {'id': 5, 'name': 'Vaporesso Gen 200', 'brand': 'Vaporesso', 'type': 'Мод', 'price': 5990, 'nicotine': '0 мг', 'image': '/placeholder.svg', 'popular': False, 'stock': 15},
            {'id': 6, 'name': 'HQD Cuvie Plus', 'brand': 'HQD', 'type': 'Одноразовый', 'price': 690, 'nicotine': '50 мг', 'image': '/placeholder.svg', 'popular': True, 'stock': 80},
        ]
        
        filtered = products
        
        if params.get('type') and params.get('type') != 'all':
            filtered = [p for p in filtered if p['type'] == params.get('type')]
        
        if params.get('brand') and params.get('brand') != 'all':
            filtered = [p for p in filtered if p['brand'] == params.get('brand')]
        
        if params.get('nicotine') and params.get('nicotine') != 'all':
            filtered = [p for p in filtered if p['nicotine'] == params.get('nicotine')]
        
        if params.get('popular') == 'true':
            filtered = [p for p in filtered if p['popular']]
        
        min_price = int(params.get('min_price', 0))
        max_price = int(params.get('max_price', 10000))
        filtered = [p for p in filtered if min_price <= p['price'] <= max_price]
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'products': filtered, 'total': len(filtered)}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
