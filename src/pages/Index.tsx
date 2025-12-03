import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const products = [
  { id: 1, name: 'ELFBAR 5000', brand: 'ELFBAR', type: 'Одноразовый', price: 990, nicotine: '20 мг', image: '/placeholder.svg', popular: true },
  { id: 2, name: 'JUUL Starter Kit', brand: 'JUUL', type: 'Под-система', price: 2990, nicotine: '18 мг', image: '/placeholder.svg', popular: true },
  { id: 3, name: 'Vaporesso XROS 3', brand: 'Vaporesso', type: 'Под-система', price: 2490, nicotine: '0 мг', image: '/placeholder.svg', popular: false },
  { id: 4, name: 'Lost Mary BM3500', brand: 'Lost Mary', type: 'Одноразовый', price: 890, nicotine: '20 мг', image: '/placeholder.svg', popular: true },
  { id: 5, name: 'Vaporesso Gen 200', brand: 'Vaporesso', type: 'Мод', price: 5990, nicotine: '0 мг', image: '/placeholder.svg', popular: false },
  { id: 6, name: 'HQD Cuvie Plus', brand: 'HQD', type: 'Одноразовый', price: 690, nicotine: '50 мг', image: '/placeholder.svg', popular: true },
];

const reviews = [
  { id: 1, author: 'Александр К.', rating: 5, text: 'Отличный магазин! Быстрая доставка, всё качественное.', date: '15.11.2024' },
  { id: 2, author: 'Мария С.', rating: 5, text: 'Большой выбор, адекватные цены. Рекомендую!', date: '10.11.2024' },
  { id: 3, author: 'Дмитрий П.', rating: 4, text: 'Хороший сервис, один раз была задержка с доставкой.', date: '05.11.2024' },
];

export default function Index() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [priceRange, setPriceRange] = useState([0, 6000]);
  const [selectedNicotine, setSelectedNicotine] = useState<string>('all');
  const [activeSection, setActiveSection] = useState<string>('home');

  const filteredProducts = products.filter(product => {
    if (selectedType !== 'all' && product.type !== selectedType) return false;
    if (selectedBrand !== 'all' && product.brand !== selectedBrand) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (selectedNicotine !== 'all' && product.nicotine !== selectedNicotine) return false;
    return true;
  });

  const brands = ['all', ...Array.from(new Set(products.map(p => p.brand)))];
  const types = ['all', ...Array.from(new Set(products.map(p => p.type)))];
  const nicotineLevels = ['all', ...Array.from(new Set(products.map(p => p.nicotine)))];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
              <Icon name="Cloudy" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold gradient-text">VapeShop</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => setActiveSection('home')} className="text-sm font-medium hover:text-primary transition-colors">Главная</button>
            <button onClick={() => setActiveSection('catalog')} className="text-sm font-medium hover:text-primary transition-colors">Каталог</button>
            <button onClick={() => setActiveSection('about')} className="text-sm font-medium hover:text-primary transition-colors">О нас</button>
            <button onClick={() => setActiveSection('delivery')} className="text-sm font-medium hover:text-primary transition-colors">Доставка</button>
            <button onClick={() => setActiveSection('reviews')} className="text-sm font-medium hover:text-primary transition-colors">Отзывы</button>
            <button onClick={() => setActiveSection('contacts')} className="text-sm font-medium hover:text-primary transition-colors">Контакты</button>
          </div>

          <Button className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity">
            <Icon name="ShoppingCart" size={18} className="mr-2" />
            Корзина
          </Button>
        </nav>
      </header>

      <main className="container px-4 py-12">
        {activeSection === 'home' && (
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
        )}

        {activeSection === 'catalog' && (
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
                        <Button className="bg-gradient-to-r from-primary to-secondary">
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
        )}

        {activeSection === 'about' && (
          <section className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 gradient-text">О нас</h2>
            <Card className="bg-card/50 backdrop-blur">
              <CardContent className="pt-6 space-y-4 text-lg leading-relaxed">
                <p>
                  <strong>VapeShop</strong> — это современный интернет-магазин электронных сигарет и аксессуаров, 
                  который работает с 2020 года. Мы предлагаем широкий ассортимент продукции от ведущих мировых производителей.
                </p>
                <p>
                  Наша миссия — сделать вейпинг доступным и качественным для каждого. Мы тщательно отбираем поставщиков 
                  и гарантируем оригинальность всей продукции.
                </p>
                <p>
                  У нас работает команда профессионалов, которые всегда готовы помочь с выбором устройства, 
                  подобрать жидкость по вкусу или решить любые вопросы по эксплуатации.
                </p>
                <div className="grid md:grid-cols-3 gap-6 pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold gradient-text mb-2">1000+</div>
                    <div className="text-muted-foreground">Товаров в каталоге</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold gradient-text mb-2">50k+</div>
                    <div className="text-muted-foreground">Довольных клиентов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold gradient-text mb-2">4 года</div>
                    <div className="text-muted-foreground">На рынке</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {activeSection === 'delivery' && (
          <section className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 gradient-text">Доставка и оплата</h2>
            <div className="space-y-6">
              <Card className="bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Truck" size={24} />
                    Способы доставки
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="Home" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Курьером по Москве</h3>
                      <p className="text-muted-foreground">Доставка в течение 1-2 дней. Стоимость — 350 ₽. Бесплатно при заказе от 3000 ₽.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="Package" size={24} className="text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Почта России</h3>
                      <p className="text-muted-foreground">Доставка по всей России 5-10 дней. Стоимость от 300 ₽ в зависимости от региона.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Пункты выдачи СДЭК</h3>
                      <p className="text-muted-foreground">Доставка в пункты выдачи 3-7 дней. Стоимость от 250 ₽.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="CreditCard" size={24} />
                    Способы оплаты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={18} className="text-primary" />
                      Банковская карта (Visa, Mastercard, МИР)
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={18} className="text-primary" />
                      Оплата при получении (для курьерской доставки)
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={18} className="text-primary" />
                      Электронные кошельки (ЮMoney, QIWI)
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={18} className="text-primary" />
                      Безналичный расчёт для юридических лиц
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {activeSection === 'reviews' && (
          <section className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 gradient-text">Отзывы клиентов</h2>
            <div className="space-y-4 mb-8">
              {reviews.map((review) => (
                <Card key={review.id} className="bg-card/50 backdrop-blur">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{review.author}</CardTitle>
                        <CardDescription>{review.date}</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Icon key={i} name="Star" size={18} className="text-accent fill-accent" />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <CardHeader>
                <CardTitle>Оставить отзыв</CardTitle>
                <CardDescription>Расскажите о своём опыте покупки</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="bg-gradient-to-r from-primary to-secondary">
                  <Icon name="MessageSquare" size={18} className="mr-2" />
                  Написать отзыв
                </Button>
              </CardContent>
            </Card>
          </section>
        )}

        {activeSection === 'contacts' && (
          <section className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 gradient-text">Контакты</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Свяжитесь с нами</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon name="Phone" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Телефон</div>
                      <div className="font-semibold">+7 (495) 123-45-67</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Icon name="Mail" size={20} className="text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div className="font-semibold">info@vapeshop.ru</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <Icon name="Clock" size={20} className="text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Режим работы</div>
                      <div className="font-semibold">Ежедневно с 10:00 до 22:00</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon name="MapPin" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Адрес</div>
                      <div className="font-semibold">г. Москва, ул. Примерная, д. 123</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Мы в соцсетях</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="MessageCircle" size={20} className="mr-2" />
                    Telegram: @vapeshop
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Send" size={20} className="mr-2" />
                    WhatsApp: +7 (495) 123-45-67
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Share2" size={20} className="mr-2" />
                    ВКонтакте: vk.com/vapeshop
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
              <CardHeader>
                <CardTitle>Часто задаваемые вопросы</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Как долго идёт доставка?</AccordionTrigger>
                    <AccordionContent>
                      По Москве — 1-2 дня, по России — от 3 до 10 дней в зависимости от региона и выбранного способа доставки.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Можно ли вернуть товар?</AccordionTrigger>
                    <AccordionContent>
                      Да, вы можете вернуть товар в течение 14 дней с момента покупки, если он не был в употреблении и сохранена упаковка.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Как проверить оригинальность товара?</AccordionTrigger>
                    <AccordionContent>
                      Вся наша продукция имеет защитные голограммы и уникальные коды, которые можно проверить на официальных сайтах производителей.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Есть ли у вас программа лояльности?</AccordionTrigger>
                    <AccordionContent>
                      Да! При регистрации на сайте вы получаете бонусную карту. За каждую покупку начисляются баллы, которые можно использовать для оплаты следующих заказов.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </section>
        )}
      </main>

      <footer className="border-t border-border/40 mt-20 py-12 bg-card/30">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
                  <Icon name="Cloudy" className="text-white" size={24} />
                </div>
                <span className="text-xl font-bold gradient-text">VapeShop</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Современный магазин электронных сигарет с доставкой по всей России
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Каталог</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Одноразовые вейпы</li>
                <li>Под-системы</li>
                <li>Моды и баки</li>
                <li>Жидкости</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Информация</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О компании</li>
                <li>Доставка и оплата</li>
                <li>Возврат товара</li>
                <li>Гарантии</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+7 (495) 123-45-67</li>
                <li>info@vapeshop.ru</li>
                <li>10:00 - 22:00 ежедневно</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 VapeShop. Все права защищены.</p>
            <p className="mt-2">Продажа табачной продукции лицам младше 18 лет запрещена.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
