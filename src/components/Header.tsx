import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
            <Icon name="Cloudy" className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold gradient-text">Grip Smoke</span>
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
  );
}