import { useState } from 'react';
import { useLanguage } from '@/contexts/useLanguage';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock, Building, Send, Shield, Users } from 'lucide-react';
import ContactButton from '@/components/ContactButton';

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
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
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the data to your backend
    toast({
      title: t('contact.success'),
      description: "נחזור אליכם בתוך 24 שעות",
    });
    
    // Reset form
    setFormData({
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
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('contact.name')} *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder={t('contact.placeholders.name')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('contact.email')} *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder={t('contact.placeholders.email')}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('contact.phone')} *</Label>
                      <Input
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder={t('contact.placeholders.phone')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">{t('contact.company')}</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder={t('contact.placeholders.company')}
                      />
                    </div>
                  </div>

                  {/* Property Requirements */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="propertyType">{t('contact.property_type')}</Label>
                      <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('contact.property_type')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="office">{t('contact.property_types.office')}</SelectItem>
                          <SelectItem value="commercial">{t('contact.property_types.commercial')}</SelectItem>
                          <SelectItem value="building">{t('contact.property_types.building')}</SelectItem>
                          <SelectItem value="other">{t('contact.other')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dealType">{t('contact.deal_type')}</Label>
                      <Select value={formData.dealType} onValueChange={(value) => handleInputChange('dealType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('contact.deal_type')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rent">{t('contact.deal_types.rent')}</SelectItem>
                          <SelectItem value="sale">{t('contact.deal_types.sale')}</SelectItem>
                          <SelectItem value="both">{t('contact.both')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">{t('contact.budget')}</Label>
                      <Input
                        id="budget"
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        placeholder={t('contact.placeholders.budget')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">{t('contact.area')}</Label>
                      <Input
                        id="area"
                        value={formData.area}
                        onChange={(e) => handleInputChange('area', e.target.value)}
                        placeholder={t('contact.placeholders.area')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="urgency">{t('contact.urgency')}</Label>
                      <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('contact.urgency')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">{t('contact.urgency.low')}</SelectItem>
                          <SelectItem value="medium">{t('contact.urgency.medium')}</SelectItem>
                          <SelectItem value="high">{t('contact.urgency.high')}</SelectItem>
                          <SelectItem value="urgent">{t('contact.urgency.very_urgent')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">{t('contact.location')}</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder={t('contact.placeholders.location')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t('contact.message')}</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder={t('contact.placeholders.message')}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="btn-primary w-full h-12">
                    <Send className="h-4 w-4 mr-2" />
                    {t('contact.submit')}
                  </Button>
                </form>
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
                    <div className="text-sm text-muted-foreground">shai@spzrealestate.com</div>
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
                  <Button className="btn-accent w-full">
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