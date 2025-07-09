import { useLanguage } from '@/contexts/useLanguage';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Heart, Target, Users, Award, Building, TrendingUp, Handshake } from 'lucide-react';
import ContactButton from '@/components/ContactButton';
import { useState, useEffect } from 'react';

const values = [
  {
    icon: Heart,
    title: 'about.values.donation.title',
    description: 'about.values.donation.description',
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-950/20',
  },
  {
    icon: Users,
    title: 'about.values.veterans.title',
    description: 'about.values.veterans.description',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
  },
  {
    icon: Target,
    title: 'about.values.professionalism.title',
    description: 'about.values.professionalism.description',
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
  },
  {
    icon: Handshake,
    title: 'about.values.cooperation.title',
    description: 'about.values.cooperation.description',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
  },
];

const achievements = [
  {
    number: 'about.achievements.experience.number',
    label: 'about.achievements.experience.label',
    description: 'about.achievements.experience.description',
    icon: Building,
  },
  {
    number: 'about.achievements.deals.number',
    label: 'about.achievements.deals.label',
    description: 'about.achievements.deals.description',
    icon: TrendingUp,
  },
  {
    number: 'about.achievements.warranty.number',
    label: 'about.achievements.warranty.label',
    description: 'about.achievements.warranty.description',
    icon: Shield,
  },
  {
    number: 'about.achievements.charity.number',
    label: 'about.achievements.charity.label',
    description: 'about.achievements.charity.description',
    icon: Heart,
  },
];

const TimelineItem = ({ event, index, isLast, t }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={`relative flex items-center ${!isLast ? 'pb-12' : ''}`}>
      {/* Desktop: Alternating layout */}
      <div className="hidden lg:block w-full">
        {isEven ? (
          // Even items (0, 2, 4) - Left side
          <div className="flex items-center w-full">
            <div className="w-5/12 pr-8">
              <div className={`transform transition-all duration-700 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}>
                <Card className="card-elegant hover-scale">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-bold text-primary border-primary">
                        {event.year}
                      </Badge>
                      <CardTitle className="text-lg">{t(event.title)}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{t(event.description)}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="w-2/12 flex justify-center">
              <div className="relative flex flex-col items-center">
                {!isLast && (
                  <div className="absolute top-8 w-0.5 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                )}
                <div className={`relative z-10 w-6 h-6 rounded-full bg-gradient-to-r from-primary to-primary/80 
                  shadow-lg transform transition-all duration-500 ${
                  isVisible ? 'scale-100' : 'scale-0'
                }`}>
                  <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full" />
                  <div className="absolute inset-2 bg-primary rounded-full animate-pulse" />
                </div>
              </div>
            </div>
            
            <div className="w-5/12"></div>
          </div>
        ) : (
          // Odd items (1, 3, 5) - Right side  
          <div className="flex items-center w-full">
            <div className="w-5/12"></div>
            
            <div className="w-2/12 flex justify-center">
              <div className="relative flex flex-col items-center">
                {!isLast && (
                  <div className="absolute top-8 w-0.5 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                )}
                <div className={`relative z-10 w-6 h-6 rounded-full bg-gradient-to-r from-primary to-primary/80 
                  shadow-lg transform transition-all duration-500 ${
                  isVisible ? 'scale-100' : 'scale-0'
                }`}>
                  <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full" />
                  <div className="absolute inset-2 bg-primary rounded-full animate-pulse" />
                </div>
              </div>
            </div>
            
            <div className="w-5/12 pl-8">
              <div className={`transform transition-all duration-700 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}>
                <Card className="card-elegant hover-scale">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-bold text-primary border-primary">
                        {event.year}
                      </Badge>
                      <CardTitle className="text-lg">{t(event.title)}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{t(event.description)}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile: Left-aligned layout */}
      <div className="lg:hidden flex w-full">
        <div className="flex flex-col items-center mr-4">
          {/* Timeline line */}
          {!isLast && (
            <div className="absolute top-8 left-3 w-0.5 h-full bg-gradient-to-b from-primary to-primary/30" />
          )}
          {/* Timeline dot */}
          <div className={`relative z-10 w-6 h-6 rounded-full bg-primary shadow-md
            transform transition-all duration-500 ${
            isVisible ? 'scale-100' : 'scale-0'
          }`}>
            <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full" />
          </div>
        </div>
        
        <div className={`flex-1 transform transition-all duration-700 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
        }`}>
          <Card className="card-elegant">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Badge variant="outline" className="font-bold text-primary border-primary w-fit">
                  {event.year}
                </Badge>
                <CardTitle className="text-lg">{t(event.title)}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{t(event.description)}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const OptimizedImage = ({ src, alt, className, ...props }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse" />
      )}
      
      {!imageError ? (
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          loading="lazy"
          {...props}
        />
      ) : (
        <div className={`flex items-center justify-center text-muted-foreground ${className}`}>
          <span className="text-sm">Image not available</span>
        </div>
      )}
    </div>
  );
};

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-6">
            <h1 className="text-6xl md:text-6xl font-bold mb-2 text-gradient-primary animate-fade-in">
              {t('about.page.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
              {t('about.page.subtitle')}
            </p>
            <div className="w-32 h-32 bg-gradient-primary rounded-full mx-auto flex items-center justify-center shadow-lg hover-scale">
              <OptimizedImage 
                src="/images/logo.jpg" 
                alt="Sfez Logo לוגו" 
                className="w-28 h-28 rounded-full object-cover"
              />
            </div>
          </div>

          {/* Shai Sfez Section */}
          <div className="card-elegant p-4 mb-16 hover-lift">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-gradient-primary">{t('about.shai.title')}</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {t('about.shai.description')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <Building className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{t('about.shai.expertise.commercial')}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <TrendingUp className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{t('about.shai.expertise.hitech')}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{t('about.shai.expertise.warranty')}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <Award className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{t('about.shai.expertise.network')}</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-60 h-60 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center shadow-2xl hover-scale">
                  <OptimizedImage 
                    src="/images/Shai.jpg" 
                    alt="שי ספז" 
                    className="w-56 h-56 rounded-full object-cover"
                  />
                </div>
                <p className="font-extralight text-xs text-muted-foreground font-sans pl-4">
                  "{t('about.shai.quote')}"
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-gradient-primary">
              {t('about.values.title')}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="card-elegant text-center hover-scale group">
                  <CardHeader>
                    <div className={`w-16 h-16 mx-auto rounded-full ${value.bgColor} flex items-center justify-center mb-4 
                      group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className={`h-8 w-8 ${value.color}`} />
                    </div>
                    <CardTitle className="text-xl">{t(value.title)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(value.description)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-6 text-gradient-primary">
              {t('about.achievements.title')}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="card-elegant text-center p-6 hover-lift group">
                  <achievement.icon className="h-8 w-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-4xl font-bold text-gradient-primary mb-2">
                    {t(achievement.number)}
                  </div>
                  <div className="text-lg font-semibold mb-2">{t(achievement.label)}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(achievement.description)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Vision Section */}
          <div className="card-elegant p-8 mb-16 hover-lift">
            <div className="text-center">
              <Target className="h-16 w-16 text-primary mx-auto mb-6 hover-scale" />
              <h2 className="text-3xl font-bold mb-4 text-gradient-primary">{t('about.vision.title')}</h2>
              <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
                {t('about.vision.description')}
              </p>
              <Badge 
              className="bg-gradient-to-r from-primary to-primary/80 text-secondary hover:bg-gradient-to-r hover:from-secondary hover:to-secondary/90 transition-colors duration-300 hover:text-primary text-lg px-6 py-2 hover-scale">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className='inline-block mr-4'
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.467 3.606"
                  fill="currentColor"
                />
              </svg>
                {t('about.cta.button')}
               </Badge>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}