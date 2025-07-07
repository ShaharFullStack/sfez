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
      title: "הודעה נשלחה בהצלחה!",
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
            <h1 className="text-4xl font-bold mb-4 text-gradient-primary">צור קשר</h1>
            <p className="text-xl text-muted-foreground mb-8">
              בואו נדבר על הנכס הבא שלכם - ייעוץ ראשוני ללא התחייבות
            </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-accent text-accent-foreground text-sm px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              תעודת אחריות אישית
            </Badge>
            <Badge className="bg-primary text-primary-foreground text-sm px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              ליווי אישי 1:1
            </Badge>
            <Badge className="bg-secondary text-secondary-foreground text-sm px-4 py-2">
              <Clock className="h-4 w-4 mr-2" />
              מענה תוך 24 שעות
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="text-2xl">שלחו הודעה</CardTitle>
                <CardDescription>
                  מלאו את הפרטים ונחזור אליכם עם הצעה מותאמת אישית
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">שם מלא *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="שם פרטי ומשפחה"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">אימייל *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">טלפון *</Label>
                      <Input
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="050-123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">חברה</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="שם החברה"
                      />
                    </div>
                  </div>

                  {/* Property Requirements */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="propertyType">סוג נכס</Label>
                      <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="בחר סוג נכס" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="office">משרדים</SelectItem>
                          <SelectItem value="commercial">מסחרי</SelectItem>
                          <SelectItem value="building">בניין שלם</SelectItem>
                          <SelectItem value="other">אחר</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dealType">סוג עסקה</Label>
                      <Select value={formData.dealType} onValueChange={(value) => handleInputChange('dealType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="בחר סוג עסקה" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rent">השכרה</SelectItem>
                          <SelectItem value="sale">מכירה</SelectItem>
                          <SelectItem value="both">שניהם</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">תקציב (₪)</Label>
                      <Input
                        id="budget"
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        placeholder="למשל: 50,000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">שטח מבוקש (מ"ר)</Label>
                      <Input
                        id="area"
                        value={formData.area}
                        onChange={(e) => handleInputChange('area', e.target.value)}
                        placeholder="למשל: 500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="urgency">דחיפות</Label>
                      <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="רמת דחיפות" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">לא דחוף</SelectItem>
                          <SelectItem value="medium">בינוני</SelectItem>
                          <SelectItem value="high">דחוף</SelectItem>
                          <SelectItem value="urgent">דחוף מאוד</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">אזור מבוקש</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="למשל: תל אביב, רמת גן, הרצליה"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">הודעה נוספת</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="פרטו את הצרכים הספציפיים שלכם..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="btn-primary w-full h-12">
                    <Send className="h-4 w-4 mr-2" />
                    שלח הודעה
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
                <CardTitle className="text-xl">יצירת קשר ישירה</CardTitle>
                <CardDescription>
                  מחפשים תשובה מהירה? הגיעו אלינו ישירות
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">שי ספז</div>
                    <div className="text-sm text-muted-foreground">מנכ"ל ומייסד</div>
                    <div className="text-sm font-medium">050-123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">אימייל</div>
                    <div className="text-sm text-muted-foreground">shai@spzrealestate.com</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">משרד ראשי</div>
                    <div className="text-sm text-muted-foreground">תל אביב, ישראל</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">שעות עבודה</div>
                    <div className="text-sm text-muted-foreground">
                      א'-ה' 8:00-18:00<br />
                      ו' 8:00-14:00
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="btn-accent w-full">
                    📞 התקשר עכשיו
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="text-xl">למה לבחור בנו?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">תעודת אחריות אישית</div>
                    <div className="text-sm text-muted-foreground">
                      הגנה מלאה על האינטרסים שלכם
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">ליווי אישי 1:1</div>
                    <div className="text-sm text-muted-foreground">
                      מתחילת התהליך ועד לסיומו
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">מאגר נכסים ייחודי</div>
                    <div className="text-sm text-muted-foreground">
                      גישה לנכסים שלא זמינים במקומות אחרים
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">מענה מהיר</div>
                    <div className="text-sm text-muted-foreground">
                      תוך 24 שעות מקבלת הפנייה
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="card-elegant bg-gradient-accent text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-bold mb-2">מצב חירום?</h3>
                <p className="text-sm opacity-90 mb-4">
                  עבור עסקאות דחופות אנחנו זמינים 24/7
                </p>
                <ContactButton 
                  variant="secondary" 
                  size="lg" 
                  className="w-full"
                  type="whatsapp"
                >
                  📱 שליחת הודעת חירום
                </ContactButton>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}