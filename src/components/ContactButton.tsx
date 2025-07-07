import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/useLanguage';

interface ContactButtonProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'lg' | 'icon';
  className?: string;
  children?: React.ReactNode;
  type?: 'whatsapp' | 'phone' | 'both';
}

const ContactButton = ({ 
  variant = 'default', 
  size = 'lg', 
  className = '', 
  children,
  type = 'whatsapp'
}: ContactButtonProps) => {
  const { t } = useLanguage();
  const phoneNumber = '+972509333901';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`;
  
  const handleClick = () => {
    if (type === 'whatsapp') {
      window.open(whatsappUrl, '_blank');
    } else if (type === 'phone') {
      window.location.href = `tel:${phoneNumber}`;
    } else if (type === 'both') {
      // Show both options - could open a modal or WhatsApp by default
      window.open(whatsappUrl, '_blank');
    }
  };
  
  const getButtonText = () => {
    if (children) return children;
    
    switch (type) {
      case 'whatsapp':
        return `💬 ${t('contact.whatsapp')}`;
      case 'phone':
        return `📞 ${t('contact.call')}`;
      case 'both':
        return `📞 ${t('contact.title')}`;
      default:
        return `📞 ${t('contact.title')}`;
    }
  };
  
  return (
    <Button
      variant={variant}
      size={size}
      className={`${className} transition-all duration-300 hover:scale-105`}
      onClick={handleClick}
    >
      {getButtonText()}
    </Button>
  );
};

export default ContactButton;
