import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { api, Product } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface CatalogPageProps {
  products: Product[];
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  selectedNicotine: string;
  setSelectedNicotine: (nicotine: string) => void;
  filteredProducts: Product[];
  brands: string[];
  types: string[];
  nicotineLevels: string[];
  onCartUpdate?: () => void;
}

export default function CatalogPage({
  products,
  selectedType,
  setSelectedType,
  selectedBrand,
  setSelectedBrand,
  priceRange,
  setPriceRange,
  selectedNicotine,
  setSelectedNicotine,
  filteredProducts,
  brands,
  types,
  nicotineLevels,
  onCartUpdate,
}: CatalogPageProps) {
  const { toast } = useToast();

  const handleAddToCart = async (product: Product) => {
    try {
      await api.addToCart({
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
      
      toast({
        title: 'Товар добавлен в корзину',
        description: `${product.name} успешно добавлен`,
      });
      
      if (onCartUpdate) {
        onCartUpdate();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось добавить товар в корзину',
        variant: 'destructive',
      });
    }
  };
  return (
    <section>
      <h2 className="text-4xl font-bold mb-8 gradient-text">Каталог товаров</h2>
      
      <div className="grid lg:grid-cols-4 gap-8 mb-8">
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Filter" size={20} />
              Фильтры
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Тип устройства</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  {types.filter(t => t !== 'all').map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Бренд</label>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все бренды</SelectItem>
                  {brands.filter(b => b !== 'all').map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Никотин</label>
              <Select value={selectedNicotine} onValueChange={setSelectedNicotine}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любой</SelectItem>
                  {nicotineLevels.filter(n => n !== 'all').map(nic => (
                    <SelectItem key={nic} value={nic}>{nic}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Цена: {priceRange[0]} - {priceRange[1]} ₽
              </label>
              <Slider
                min={0}
                max={6000}
                step={100}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mt-4"
              />
            </div>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setSelectedType('all');
                setSelectedBrand('all');
                setSelectedNicotine('all');
                setPriceRange([0, 6000]);
              }}
            >
              <Icon name="X" size={16} className="mr-2" />
              Сбросить фильтры
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          <div className="mb-4 text-muted-foreground">
            Найдено товаров: {filteredProducts.length}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover-scale overflow-hidden border-border/50 bg-card/50 backdrop-blur">
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
                  <Button 
                    className="bg-gradient-to-r from-primary to-secondary"
                    onClick={() => handleAddToCart(product)}
                  >
                    <Icon name="Plus" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}