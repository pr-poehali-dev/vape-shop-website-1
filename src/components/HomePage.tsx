import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  brand: string;
  type: string;
  price: number;
  nicotine: string;
  image: string;
  popular: boolean;
}

interface HomePageProps {
  products: Product[];
  setActiveSection: (section: string) => void;
}

export default function HomePage({ products, setActiveSection }: HomePageProps) {
  return (
    <>
      <section className="mb-20 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-black mb-6 gradient-text leading-tight">
            Твой Vape —<br />Твой Стиль
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Широкий ассортимент вейпов, жидкостей и аксессуаров от ведущих мировых брендов
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => setActiveSection('catalog')} size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8">
              Перейти в каталог
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            <Button onClick={() => setActiveSection('about')} size="lg" variant="outline" className="text-lg px-8">
              Узнать больше
            </Button>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">🔥 Популярные товары</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.filter(p => p.popular).map((product, idx) => (
            <Card key={product.id} className="hover-scale overflow-hidden border-border/50 bg-card/50 backdrop-blur animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <CardHeader>
                <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {product.brand}
                  </Badge>
                  {product.popular && (
                    <Badge className="bg-accent/20 text-accent border-accent/30">
                      <Icon name="Flame" size={14} className="mr-1" />
                      Хит
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <CardDescription>{product.type} • Никотин: {product.nicotine}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center">
                <span className="text-2xl font-bold gradient-text">{product.price} ₽</span>
                <Button className="bg-gradient-to-r from-primary to-secondary">
                  <Icon name="Plus" size={18} className="mr-2" />
                  В корзину
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16 py-16 px-8 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Truck" size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Быстрая доставка</h3>
            <p className="text-muted-foreground">Доставим за 1-3 дня по всей России</p>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
              <Icon name="Shield" size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Оригинальная продукция</h3>
            <p className="text-muted-foreground">Работаем только с проверенными поставщиками</p>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <Icon name="Headphones" size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Поддержка 24/7</h3>
            <p className="text-muted-foreground">Всегда готовы помочь с выбором</p>
          </div>
        </div>
      </section>
    </>
  );
}
