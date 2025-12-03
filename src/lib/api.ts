const API_URLS = {
  products: 'https://functions.poehali.dev/587b28c2-111d-438d-8567-a8188c6706bc',
  cart: 'https://functions.poehali.dev/5d022232-5fba-4eb7-a587-1e6ea022377e',
};

export interface Product {
  id: number;
  name: string;
  brand: string;
  type: string;
  price: number;
  nicotine: string;
  image: string;
  popular: boolean;
  stock: number;
}

export interface CartItem {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CartResponse {
  items: CartItem[];
  total: number;
  count: number;
}

let userId = localStorage.getItem('user_id');
if (!userId) {
  userId = `user_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  localStorage.setItem('user_id', userId);
}

export const api = {
  async getProducts(filters?: {
    type?: string;
    brand?: string;
    nicotine?: string;
    popular?: boolean;
    min_price?: number;
    max_price?: number;
  }): Promise<{ products: Product[]; total: number }> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }
    
    const url = `${API_URLS.products}${params.toString() ? `?${params}` : ''}`;
    const response = await fetch(url);
    return response.json();
  },

  async getCart(): Promise<CartResponse> {
    const response = await fetch(API_URLS.cart, {
      headers: {
        'X-User-Id': userId!,
      },
    });
    return response.json();
  },

  async addToCart(product: { product_id: number; name: string; price: number; quantity?: number }): Promise<CartResponse> {
    const response = await fetch(API_URLS.cart, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': userId!,
      },
      body: JSON.stringify(product),
    });
    return response.json();
  },

  async removeFromCart(productId: number): Promise<CartResponse> {
    const response = await fetch(`${API_URLS.cart}?product_id=${productId}`, {
      method: 'DELETE',
      headers: {
        'X-User-Id': userId!,
      },
    });
    return response.json();
  },
};
