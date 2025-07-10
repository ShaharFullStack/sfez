import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLanguage } from '@/contexts/useLanguage';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock, Building, Send, Shield, Users, Loader2 } from 'lucide-react';
import ContactButton from '@/components/ContactButton';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'שם חייב להכיל לפחות 2 תווים' }),
  email: z.string().email({ message: 'כתובת אימייל לא תקינה' }),
  phone: z.string().min(10, { message: 'מספר טלפון חייב להכיל לפחות 10 ספרות' }),
  company: z.string().optional(),
  propertyType: z.string().min(1, { message: 'אנא בחר סוג נכס' }),
  dealType: z.string().min(1, { message: 'אנא בחר סוג עסקה' }),
  budget: z.string().optional(),
  area: z.string().optional(),
  location: z.string().optional(),
  message: z.string().min(10, { message: 'הודעה חייבת להכיל לפחות 10 תווים' }),
  urgency: z.string().optional()
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      propertyType: '',
      dealType: '',
      budget: '',
      area: '',
      location: '',
      message: '',
      urgency: ''
    }
  });

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Here you would normally send the data to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: t('contact.success'),
        description: "נחזור אליכם בתוך 24 שעות",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: 'שגיאה',
        description: 'אירעה שגיאה בשליחת הטופס. אנא נסה שוב.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gradient-primary">{t('contact.title')}</h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t('contact.subtitle')}
            </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-accent text-accent-foreground text-sm px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              {t('services.badges.guarantee')}
            </Badge>
            <Badge className="bg-primary text-primary-foreground text-sm px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              {t('services.badges.personal')}
            </Badge>
            <Badge className="bg-secondary text-secondary-foreground text-sm px-4 py-2">
              <Clock className="h-4 w-4 mr-2" />
              {t('contact.info.response')}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="text-2xl">{t('contact.form.title')}</CardTitle>
                <CardDescription>
                  {t('contact.form.subtitle')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  {/* Personal Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.name')} *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t('contact.placeholders.name')}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.email')} *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={t('contact.placeholders.email')}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.phone')} *</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder={t('contact.placeholders.phone')}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.company')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t('contact.placeholders.company')}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Property Requirements */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="propertyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.property_type')} *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('contact.property_type')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="office">{t('contact.property_types.office')}</SelectItem>
                              <SelectItem value="commercial">{t('contact.property_types.commercial')}</SelectItem>
                              <SelectItem value="building">{t('contact.property_types.building')}</SelectItem>
                              <SelectItem value="other">{t('contact.other')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dealType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.deal_type')} *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('contact.deal_type')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="rent">{t('contact.deal_types.rent')}</SelectItem>
                              <SelectItem value="sale">{t('contact.deal_types.sale')}</SelectItem>
                              <SelectItem value="both">{t('contact.both')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.budget')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t('contact.placeholders.budget')}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.area')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t('contact.placeholders.area')}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="urgency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.urgency')}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('contact.urgency')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">{t('contact.urgency.low')}</SelectItem>
                              <SelectItem value="medium">{t('contact.urgency.medium')}</SelectItem>
                              <SelectItem value="high">{t('contact.urgency.high')}</SelectItem>
                              <SelectItem value="urgent">{t('contact.urgency.very_urgent')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.location')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('contact.placeholders.location')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.message')} *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t('contact.placeholders.message')}
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="btn-primary w-full h-12" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    {isSubmitting ? 'שולח...' : t('contact.submit')}
                  </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="text-xl">{t('contact.direct.title')}</CardTitle>
                <CardDescription>
                  {t('contact.direct.subtitle')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">{t('contact.shai')}</div>
                    <div className="text-sm text-muted-foreground">{t('contact.direct.ceo')}</div>
                    <div className="text-sm font-medium">050-123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">{t('contact.direct.email_label')}</div>
                    <div className="text-sm text-muted-foreground">shai@sfez-nadlan.com</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">{t('contact.direct.office')}</div>
                    <div className="text-sm text-muted-foreground">{t('contact.info.address')}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">{t('contact.direct.hours')}</div>
                    <div className="text-sm text-muted-foreground">
                      {t('contact.info.hours')}
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    className="btn-accent w-full"
                    onClick={() => window.location.href = 'tel:+972-54-123-4567'}
                  >
                    {t('contact.direct.call_now')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="text-xl">{t('contact.why.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">{t('contact.why.warranty')}</div>
                    <div className="text-sm text-muted-foreground">
                      {t('contact.why.warranty_desc')}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">{t('contact.why.personal')}</div>
                    <div className="text-sm text-muted-foreground">
                      {t('contact.why.personal_desc')}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">{t('contact.why.database')}</div>
                    <div className="text-sm text-muted-foreground">
                      {t('contact.why.database_desc')}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">{t('contact.why.response')}</div>
                    <div className="text-sm text-muted-foreground">
                      {t('contact.why.response_desc')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}