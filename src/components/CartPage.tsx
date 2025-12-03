import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { api, CartItem } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface CartPageProps {
  onCartUpdate?: () => void;
}

export default function CartPage({ onCartUpdate }: CartPageProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadCart = async () => {
    try {
      const data = await api.getCart();
      setCartItems(data.items);
      setTotal(data.total);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить корзину',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemoveItem = async (productId: number) => {
    try {
      const data = await api.removeFromCart(productId);
      setCartItems(data.items);
      setTotal(data.total);
      
      toast({
        title: 'Товар удалён',
        description: 'Товар успешно удалён из корзины',
      });
      
      if (onCartUpdate) {
        onCartUpdate();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить товар',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 gradient-text">Корзина</h2>
        <div className="text-center text-muted-foreground">Загрузка...</div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 gradient-text">Корзина</h2>
        <Card className="bg-card/50 backdrop-blur text-center py-16">
          <CardContent>
            <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl text-muted-foreground mb-4">Ваша корзина пуста</p>
            <p className="text-muted-foreground">Добавьте товары из каталога</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 gradient-text">Корзина</h2>
      
      <div className="space-y-4 mb-8">
        {cartItems.map((item) => (
          <Card key={item.product_id} className="bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                  <p className="text-muted-foreground">Количество: {item.quantity}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold gradient-text">
                    {item.price * item.quantity} ₽
                  </span>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemoveItem(item.product_id)}
                  >
                    <Icon name="Trash2" size={18} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
        <CardHeader>
          <CardTitle>Итого</CardTitle>
          <CardDescription>Сумма заказа</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl font-bold">Всего:</span>
            <span className="text-3xl font-bold gradient-text">{total} ₽</span>
          </div>
          <Button className="w-full bg-gradient-to-r from-primary to-secondary text-lg py-6">
            <Icon name="CreditCard" size={20} className="mr-2" />
            Оформить заказ
          </Button>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          При оформлении заказа вы сможете выбрать способ доставки и оплаты
        </CardFooter>
      </Card>
    </section>
  );
}
