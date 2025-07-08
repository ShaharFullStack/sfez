import { Header } from '@/components/Header';
import { useLanguage } from '@/contexts/useLanguage';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const { t } = useLanguage();

  const phoneNumber = '+972509333901';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`;

  const handleConsultationClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  const handlePropertiesClick = () => {
    // Navigate to properties section or page
    const propertiesSection = document.getElementById('properties');
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section id="home" className="relative pt-10 pb-16 bg-gradient-hero text-secondary overflow-hidden min-h-screen hero-section-fullwidth">
        {/* Background Video */}
        <div className="hero-video-fullscreen">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/SfezHero.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}


        <div className="relative z-10 container mx-auto px-2 sm:px-4 text-center">

          <div className="max-w-4xl mx-auto animate-fade-in-up">

            <div className="mb-12 mt-12 sm:mb-20 bg-secondary/30 sm:mt-20 glass-effect rounded-3xl">
              <div className=' bg-background/70  rounded-3xl p-4 text-primary sm:p-6'>

                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-primary mb-2 leading-tight">
                  {t('hero.title')}
                </h1>
              </div>
            </div>
            <div className="mb-12 mt-12 sm:mb-20 bg-secondary/30 sm:mt-20 glass-effect rounded-3xl">
              <div className=' bg-background/70  rounded-3xl p-4 text-primary sm:p-6'>
                <p className="text-xl sm:text-lg md:text-2xl lg:text-2xl font-black text-primary mb-2 leading-tight">
                  {t('hero.subtitle')}
                </p>
                <p className="text-base sm:text-lg font-semibold mb-6 sm:mb-8  max-w-2xl mx-auto">
                  {t('hero.description')}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="outline"
                    className="btn-accent text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4"
                    onClick={handleConsultationClick}
                  >
                    {t('hero.cta.consultation')}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="btn-accent text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4"
                    onClick={handlePropertiesClick}
                  >
                    {t('hero.cta.properties')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-secondary">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient-primary">{t('about.title')}</h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">{t('about.subtitle')}</p>
            <p className="text-base sm:text-lg max-w-3xl mx-auto">{t('about.description')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto">
            <div className="card-elegant text-center">
              <div className="text-3xl font-bold text-gradient-primary mb-2">10+</div>
              <p className="text-sm font-medium">{t('about.experience')}</p>
            </div>
            <div className="card-elegant text-center">
              <div className="text-3xl font-bold text-gradient-primary mb-2">500+</div>
              <p className="text-sm font-medium">{t('about.deals')}</p>
            </div>
            <div className="card-elegant text-center">
              <div className="text-3xl font-bold text-gradient-accent mb-2">100%</div>
              <p className="text-sm font-medium">{t('about.guarantee')}</p>
            </div>
            <div className="card-elegant text-center">
              <div className="text-3xl font-bold text-gradient-accent mb-2">5%</div>
              <p className="text-sm font-medium">{t('about.donation')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 bg-secondary">
        <div className="container mx-auto px-2 sm:px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient-primary">{t('contact.title')}</h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12">{t('contact.subtitle')}</p>

          <div className="max-w-sm mx-auto">
            <Button
              size="lg"
              className="btn-primary w-full text-base sm:text-lg py-3 sm:py-4"
              onClick={handleContactClick}
            >
              {t('services.cta.contact')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const Index = () => {
  return <HomePage />;
};

export default Index;
