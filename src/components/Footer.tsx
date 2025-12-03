import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 mt-20 py-12 bg-card/30">
      <div className="container px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
                <Icon name="Cloudy" className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold gradient-text">Grip Smoke</span>
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
              <li>info@gripsmoke.ru</li>
              <li>10:00 - 22:00 ежедневно</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Grip Smoke. Все права защищены.</p>
          <p className="mt-2">Продажа табачной продукции лицам младше 18 лет запрещена.</p>
        </div>
      </div>
    </footer>
  );
}