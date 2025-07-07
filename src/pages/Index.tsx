import { Header } from '@/components/Header';
import { useLanguage } from '@/contexts/useLanguage';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section id="home" className="relative pt-20 pb-16 bg-gradient-hero text-white overflow-hidden min-h-screen hero-section-fullwidth">
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


        <div className="relative z-10 container mx-auto px-4 text-center">

          <div className="max-w-4xl mx-auto animate-fade-in-up">

            <div className="mb-20 mt-20 glass-effect-dark rounded-3xl">
              <div className=' bg-blue-950/10 rounded-3xl p-6'>
                <h1 className="text-4xl md:text-7xl font-black text-yellow-100 mb-2 leading-tight">
                  {t('hero.title')}
                </h1>
              </div>
            </div>
            <div className="mb-20 mt-20 glass-effect rounded-3xl">
              <div className=' bg-yellow-100/10 rounded-3xl p-6'>
                <p className="text-xl md:text-2xl mb-4 text-background">
                  {t('hero.subtitle')}
                </p>
                <p className="text-lg mb-8 text-background max-w-2xl mx-auto">
                  {t('hero.description')}
                </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-accent text-lg px-8 py-4">
                {t('hero.cta.consultation')}
              </Button>
              <Button size="lg" variant="outline" className="btn-glass text-lg px-8 py-4">
                {t('hero.cta.properties')}
              </Button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gradient-primary">{t('about.title')}</h2>
            <p className="text-xl text-muted-foreground mb-8">{t('about.subtitle')}</p>
            <p className="text-lg max-w-3xl mx-auto">{t('about.description')}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
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
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gradient-primary">{t('contact.title')}</h2>
          <p className="text-xl text-muted-foreground mb-12">{t('contact.subtitle')}</p>

          <div className="max-w-md mx-auto">
            <Button size="lg" className="btn-primary w-full text-lg py-4">
              📞 צור קשר עכשיו
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
