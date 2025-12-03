import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import HomePage from '@/components/HomePage';
import CatalogPage from '@/components/CatalogPage';
import Footer from '@/components/Footer';

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
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="container px-4 py-12">
        {activeSection === 'home' && (
          <HomePage products={products} setActiveSection={setActiveSection} />
        )}

        {activeSection === 'catalog' && (
          <CatalogPage
            products={products}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedNicotine={selectedNicotine}
            setSelectedNicotine={setSelectedNicotine}
            filteredProducts={filteredProducts}
            brands={brands}
            types={types}
            nicotineLevels={nicotineLevels}
          />
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

      <Footer />
    </div>
  );
}
