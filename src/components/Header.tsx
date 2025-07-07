import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeProvider, useTheme } from 'next-themes';
import { useLanguage } from '@/contexts/useLanguage';
import { Moon, Sun, Menu, X } from 'lucide-react';

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-secondary/70 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4 gap-5">
            <div className="w-16 h-16 bg-gradient-primary border-primary border-2 flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                <img 
                  src={theme === 'dark' ? "/images/darkLogo.png" : "/images/lightLogo.png"} 
                  alt="Sfez Logo" 
                />
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 justify-around flex-1">
            <a href="/" className="link-elegant">{t('nav.home')}</a>
            <a href="/properties" className="link-elegant ">{t('nav.properties')}</a>
            <a href="/services" className="link-elegant ">{t('nav.services')}</a>
            <a href="/about" className="link-elegant ">{t('nav.about')}</a>
            <a href="/blog" className="link-elegant ">{t('nav.blog')}</a>
            <a href="/calculator" className="link-elegant ">{t('nav.calculator')}</a>
            <a href="/contact" className="link-elegant ">{t('nav.contact')}</a>
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'he' ? 'en' : 'he')}
            >
              {t('nav.language')}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-2">
              <a href="/" className="block py-2 link-elegant">{t('nav.home')}</a>
              <a href="/properties" className="block py-2 link-elegant">{t('nav.properties')}</a>
              <a href="/services" className="block py-2 link-elegant">{t('nav.services')}</a>
              <a href="/about" className="block py-2 link-elegant">{t('nav.about')}</a>
              <a href="/blog" className="block py-2 link-elegant">{t('nav.blog')}</a>
              <a href="/calculator" className="block py-2 link-elegant">{t('nav.calculator')}</a>
              <a href="/contact" className="block py-2 link-elegant">{t('nav.contact')}</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};