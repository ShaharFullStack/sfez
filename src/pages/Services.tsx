import { useLanguage } from '@/contexts/useLanguage';
import { Header } from '../components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '../components/ui/dialog';
import { Building, Store, Home, Shield, Users, Calculator, CheckCircle, AlertTriangle, Target } from 'lucide-react';
import ContactButton from '@/components/ContactButton';
import { useState } from 'react';

export default function Services() {
  const { t } = useLanguage();
  const [openDialog, setOpenDialog] = useState(false);
  const [warrantyModalOpen, setWarrantyModalOpen] = useState(false);

  const services = [
    {
      id: 'office-rental',
      title: t('services.office.rent.title'),
      description: t('services.office.rent.description'),
      icon: Building,
      price: t('services.office.rent.price'),
      features: [
        t('services.office.rent.features.1'),
        t('services.office.rent.features.2'),
        t('services.office.rent.features.3'),
        t('services.office.rent.features.4')
      ],
      problems: [
        t('services.office.rent.problems.1'),
        t('services.office.rent.problems.2'),
        t('services.office.rent.problems.3'),
        t('services.office.rent.problems.4')
      ],
      targetAudience: [
        t('services.office.rent.audience.1'),
        t('services.office.rent.audience.2'),
        t('services.office.rent.audience.3'),
        t('services.office.rent.audience.4')
      ]
    },
    {
      id: 'office-sale',
      title: t('services.office.sale.title'),
      description: t('services.office.sale.description'),
      icon: Home,
      price: t('services.office.sale.price'),
      features: [
        t('services.office.sale.features.1'),
        t('services.office.sale.features.2'),
        t('services.office.sale.features.3'),
        t('services.office.sale.features.4')
      ],
      problems: [
        t('services.office.sale.problems.1'),
        t('services.office.sale.problems.2'),
        t('services.office.sale.problems.3'),
        t('services.office.sale.problems.4')
      ],
      targetAudience: [
        t('services.office.sale.audience.1'),
        t('services.office.sale.audience.2'),
        t('services.office.sale.audience.3')
      ]
    },
    {
      id: 'commercial-rental',
      title: t('services.retail.rent.title'),
      description: t('services.retail.rent.description'),
      icon: Store,
      price: t('services.retail.rent.price'),
      features: [
        t('services.retail.rent.features.1'),
        t('services.retail.rent.features.2'),
        t('services.retail.rent.features.3'),
        t('services.retail.rent.features.4')
      ],
      problems: [
        t('services.retail.rent.problems.1'),
        t('services.retail.rent.problems.2'),
        t('services.retail.rent.problems.3'),
        t('services.retail.rent.problems.4')
      ],
      targetAudience: [
        t('services.retail.rent.audience.1'),
        t('services.retail.rent.audience.2'),
        t('services.retail.rent.audience.3')
      ]
    },
    {
      id: 'commercial-sale',
      title: t('services.retail.sale.title'),
      description: t('services.retail.sale.description'),
      icon: Store,
      price: t('services.retail.sale.price'),
      features: [
        t('services.retail.sale.features.1'),
        t('services.retail.sale.features.2'),
        t('services.retail.sale.features.3'),
        t('services.retail.sale.features.4')
      ],
      problems: [
        t('services.retail.sale.problems.1'),
        t('services.retail.sale.problems.2'),
        t('services.retail.sale.problems.3'),
        t('services.retail.sale.problems.4')
      ],
      targetAudience: [
        t('services.retail.sale.audience.1'),
        t('services.retail.sale.audience.2'),
        t('services.retail.sale.audience.3')
      ]
    },
    {
      id: 'building-deals',
      title: t('services.building.title'),
      description: t('services.building.description'),
      icon: Building,
      price: t('services.building.price'),
      features: [
        t('services.building.features.1'),
        t('services.building.features.2'),
        t('services.building.features.3'),
        t('services.building.features.4')
      ],
      problems: [
        t('services.building.problems.1'),
        t('services.building.problems.2'),
        t('services.building.problems.3'),
        t('services.building.problems.4')
      ],
      targetAudience: [
        t('services.building.audience.1'),
        t('services.building.audience.2'),
        t('services.building.audience.3')
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-gradient-primary">{t('services.title')}</h1>
            <p className="text-2xl text-muted-foreground mb-6">
              {t('services.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Dialog open={warrantyModalOpen} onOpenChange={setWarrantyModalOpen}>
                <DialogTrigger asChild>
                  <Badge className="bg-accent text-accent-foreground text-lg px-4 py-2 cursor-pointer hover:bg-accent/80 transition-colors">
                    <Shield className="h-4 w-4 mr-2" />
                    {t('services.badges.guarantee')}
                  </Badge>
                </DialogTrigger>
                <DialogContent className="max-w-3xl w-full">
                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-xl font-semibold">{t('services.badges.guarantee')}</h3>
                    <img 
                      src={t('services.warranty.image')} 
                      alt="Warranty Certificate" 
                      className="max-w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                </DialogContent>
              </Dialog>
              <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                {t('services.badges.personal')}
              </Badge>
            </div>
          </div>

          {/* Services Grid */}
          <div className="space-y-6">
            {services.map((service, index) => (
              <Card key={service.id} className="card-elegant">
                {/* Service Header */}
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2 font-bold">{service.title}</CardTitle>
                      <CardDescription className="text-lg mb-3">
                        {service.description}
                      </CardDescription>
                      <Badge variant="outline" className="text-base font-medium">
                        <Calculator className="h-4 w-4 mr-1" />
                        {service.price}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Features Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="h-5 w-5 text-accent" />
                        <h4 className="font-bold text-xl text-primary">{t('services.sections.features')}</h4>
                      </div>
                      <div className="space-y-2">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-base">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Problems Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        <h4 className="font-bold text-xl text-primary">{t('services.sections.problems')}</h4>
                      </div>
                      <div className="space-y-2">
                        {service.problems.map((problem, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-base">{problem}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Target Audience & CTA */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Target className="h-5 w-5 text-primary" />
                        <h4 className="font-bold text-xl text-primary">{t('services.sections.audience')}</h4>
                      </div>
                      
                      <div className="space-y-2 mb-6">
                        {service.targetAudience.map((audience, i) => (
                          <Badge 
                            key={i} 
                            variant="secondary" 
                            className="text-base block w-fit"
                          >
                            {audience}
                          </Badge>
                        ))}
                      </div>
                      
                      <ContactButton 
                        variant="default" 
                        size="lg" 
                        className="btn-primary w-full text-lg"
                        type="whatsapp"
                      >
                        {t('services.cta.consultation')}
                      </ContactButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <div className="card-elegant p-8">
              <h2 className="text-4xl font-bold mb-4 text-gradient-primary">
                {t('services.cta.title')}
              </h2>
              <p className="text-2xl text-muted-foreground mb-6">
                {t('services.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ContactButton 
                  size="lg" 
                  className="btn-accent text-xl"
                  type="whatsapp"
                >
                  {t('services.cta.contact')}
                </ContactButton>
                <Button size="lg" variant="outline" className="btn-glass text-xl">
                  {t('services.cta.calculator')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}