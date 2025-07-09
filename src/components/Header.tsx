import { useState, useCallback, useEffect, memo } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/contexts/useLanguage';
import { Moon, Sun, Menu, X } from 'lucide-react';

// Type definitions
interface LogoProps {
  theme: string | undefined;
}

interface NavigationProps {
  t: (key: string) => string;
  isMobile?: boolean;
  onLinkClick?: () => void;
}

interface ControlsProps {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Memoized Logo component for better performance
const Logo = memo(({ theme }: LogoProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const logoSrc = theme === 'dark' ? "/images/lightLogo.png" : "/images/darkLogo.png";
  
  // Handle theme hydration in Next.js
  const effectiveTheme = theme || 'light';

  useEffect(() => {
    // Preload both logo variants for instant theme switching
    const preloadImage = (src) => {
      const img = new Image();
      img.src = src;
    };
    
    preloadImage("/images/darkLogo.png");
    preloadImage("/images/lightLogo.png");
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(false);
  }, []);

  return (
    <div className="w-16 h-16 bg-gradient-primary border-primary p-1 flex items-center justify-center relative overflow-hidden">
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-primary/20 animate-pulse" />
      )}
      
      {!imageError ? (
        <img 
          src={logoSrc}
          alt="Sfez Real Estate Logo" 
          className={`transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="eager"
          decoding="async"
        />
      ) : (
        <span className="text-white font-bold text-xl" aria-label="Sfez">
          SFEZ
        </span>
      )}
    </div>
  );
});

Logo.displayName = 'Logo';

// Memoized Navigation component
const Navigation = memo(({ t, isMobile = false, onLinkClick }: NavigationProps) => {
  // Add icons for each nav item (lucide-react icons)
  const navItems = [
    { href: '/', key: 'nav.home', icon: <svg className="inline mr-1 mb-1 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l9-9 9 9"/><path d="M9 21V9h6v12"/></svg> },
    { href: '/properties', key: 'nav.properties', icon: <svg className="inline mr-1 mb-1 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4"/></svg> },
    { href: '/services', key: 'nav.services', icon: <svg className="inline mr-1 mb-1 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> },
    { href: '/about', key: 'nav.about', icon: <svg className="inline mr-1 mb-1 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> },
    { href: '/articles', key: 'nav.articles', icon: <svg className="inline mr-1 mb-1 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 3v2"/><path d="M16 3v2"/></svg> },
    { href: '/calculator', key: 'nav.calculator', icon: <svg className="inline mr-1 mb-1 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/><path d="M3 9h18"/><path d="M3 15h18"/></svg> },
    { href: '/contact', key: 'nav.contact', icon: <svg className="inline mr-1 mb-1 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4.5"/><path d="M21 10.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2"/><path d="M21 10.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7.5"/></svg> },
  ];

  const handleLinkClick = useCallback((e) => {
    if (onLinkClick) {
      onLinkClick();
    }
    // Add smooth scrolling for same-page navigation
    const href = e.currentTarget.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [onLinkClick]);

  // Detect current path for active link styling
  const [currentPath, setCurrentPath] = useState('');
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <nav
      className={
        isMobile
          ? "flex flex-col space-y-2"
          : "hidden md:flex items-center space-x-4 justify-around flex-1"
      }
    >
      {navItems.map(({ href, key, icon }) => {
        const isActive = currentPath === href;
        return (
          <a
            key={key}
            href={href}
            className={`relative px-4 py-2 rounded-full flex items-center gap-2 font-semibold transition-all duration-200
              ${isMobile ? 'block w-full text-lg justify-start' : 'inline-flex'}
              ${isActive ? 'bg-primary/10 text-primary shadow-md' : 'text-muted-foreground hover:text-primary hover:bg-primary/5'}
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            `}
            onClick={handleLinkClick}
            aria-label={t(key)}
          >
            {icon}
            <span>{t(key)}</span>
            {/* Active indicator removed as requested */}
          </a>
        );
      })}
    </nav>
  );
});

Navigation.displayName = 'Navigation';

// Memoized Controls component
const Controls = memo(({ theme, setTheme, language, setLanguage, t, isMenuOpen, setIsMenuOpen }: ControlsProps) => {
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'he' ? 'en' : 'he');
  }, [language, setLanguage]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, [setIsMenuOpen]);

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleLanguage}
        aria-label={`Switch to ${language === 'he' ? 'English' : 'Hebrew'}`}
        className="transition-transform duration-200 hover:scale-105"
      >
        {t('nav.language')}
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        className="transition-transform duration-200 hover:scale-105"
      >
        {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden transition-transform duration-200 hover:scale-105"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
      >
        {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
    </div>
  );
});

Controls.displayName = 'Controls';

export const Header = memo(() => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('header')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClickOutside);
      // Prevent scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header className="fixed top-0 w-full bg-secondary/70 backdrop-blur-sm border-b border-border z-50 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4 gap-5">
            <Logo theme={theme} />
          </div>

          {/* Desktop Navigation */}
          <Navigation t={t} />

          {/* Controls */}
          <Controls 
            theme={theme}
            setTheme={setTheme}
            language={language}
            setLanguage={setLanguage}
            t={t}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>

        {/* Mobile Menu with improved animations */}
        <div 
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 py-4 border-t border-border' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
          aria-hidden={!isMenuOpen}
        >
          <Navigation t={t} isMobile={true} onLinkClick={closeMobileMenu} />
        </div>
      </div>
      
      {/* Mobile menu backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
});

Header.displayName = 'Header';