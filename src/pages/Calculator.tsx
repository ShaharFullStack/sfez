import { useState } from 'react';
import { useLanguage } from '@/contexts/useLanguage';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator as CalculatorIcon, Building, Store, Home, Info } from 'lucide-react';

export default function Calculator() {
  const { t } = useLanguage();
  const [dealType, setDealType] = useState<'rent' | 'sale'>('rent');
  const [propertyType, setPropertyType] = useState<string>('office');
  const [price, setPrice] = useState<string>('');
  const [area, setArea] = useState<string>('');

  const getCommissionRate = (type: string, deal: string) => {
    if (deal === 'rent') {
      return 1; // 1 month rent + VAT
    } else {
      return type === 'building' ? 2 : 1.5; // 1.5-2% + VAT
    }
  };

  const calculateCommission = () => {
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) return 0;

    const rate = getCommissionRate(propertyType, dealType);
    
    if (dealType === 'rent') {
      // For rent: 1 month + VAT (17%)
      return priceNum * 1.17;
    } else {
      // For sale: 1.5-2% + VAT (17%)
      return (priceNum * rate / 100) * 1.17;
    }
  };

  const commission = calculateCommission();
  const pricePerSqm = parseFloat(price) && parseFloat(area) ? parseFloat(price) / parseFloat(area) : 0;

  const propertyTypes = [
    { value: 'office', label: 'משרדים', icon: Building },
    { value: 'commercial', label: 'מסחרי', icon: Store },
    { value: 'building', label: 'בניין שלם', icon: Home }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-primary rounded-lg mx-auto mb-6 flex items-center justify-center">
            <CalculatorIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gradient-primary">מחשבון עמלות</h1>
          <p className="text-xl text-muted-foreground">
            חשבו את עלות השירות בקלות ובשקיפות מלאה
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="text-2xl">פרטי העסקה</CardTitle>
              <CardDescription>
                מלאו את הפרטים לחישוב מדויק של העמלה
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Deal Type */}
              <div className="space-y-3">
                <Label className="text-base font-medium">סוג עסקה</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={dealType === 'rent' ? 'default' : 'outline'}
                    onClick={() => setDealType('rent')}
                    className="h-12"
                  >
                    השכרה
                  </Button>
                  <Button
                    variant={dealType === 'sale' ? 'default' : 'outline'}
                    onClick={() => setDealType('sale')}
                    className="h-12"
                  >
                    מכירה
                  </Button>
                </div>
              </div>

              {/* Property Type */}
              <div className="space-y-3">
                <Label className="text-base font-medium">סוג נכס</Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className="h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  {dealType === 'rent' ? 'שכירות חודשית (₪)' : 'מחיר מכירה (₪)'}
                </Label>
                <Input
                  type="number"
                  placeholder={dealType === 'rent' ? '25,000' : '5,500,000'}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>

              {/* Area */}
              <div className="space-y-3">
                <Label className="text-base font-medium">שטח (מ"ר)</Label>
                <Input
                  type="number"
                  placeholder="500"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="text-2xl">תוצאות החישוב</CardTitle>
              <CardDescription>
                חישוב מדויק של העמלה וכל העלויות
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Commission Rate */}
              <div className="card-elegant p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">שיעור עמלה</span>
                  <Badge variant="outline">
                    {dealType === 'rent' 
                      ? 'חודש שכירות + מע"מ'
                      : `${getCommissionRate(propertyType, dealType)}% + מע"מ`
                    }
                  </Badge>
                </div>
              </div>

              {/* Total Commission */}
              <div className="card-elegant p-6 text-center bg-gradient-primary text-white">
                <div className="text-sm opacity-90 mb-1">סך עמלה כולל מע"מ</div>
                <div className="text-3xl font-bold">
                  {commission > 0 ? formatCurrency(commission) : '---'}
                </div>
              </div>

              {/* Price per sqm */}
              {pricePerSqm > 0 && (
                <div className="card-elegant p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {dealType === 'rent' ? 'מחיר למ"ר (חודשי)' : 'מחיר למ"ר'}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(pricePerSqm)}
                    </span>
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
                  <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium mb-1">תעודת אחריות אישית</div>
                    <div className="text-muted-foreground">
                      כל עסקה מגובה בתעודת אחריות אישית ללא עלות נוספת
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
                  <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium mb-1">ליווי מקצועי</div>
                    <div className="text-muted-foreground">
                      ליווי אישי 1:1 מתחילת התהליך ועד לחתימה על החוזה
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-3">
                <Button className="btn-primary w-full h-12">
                  📞 קבל הצעה מותאמת אישית
                </Button>
                <Button variant="outline" className="btn-glass w-full h-12">
                  📧 שלח תוצאות במייל
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Commission Structure */}
        <Card className="card-elegant mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">מבנה עמלות שקוף</CardTitle>
            <CardDescription>
              כל המחירים ברורים ושקופים מראש - ללא הפתעות
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Rental Rates */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">השכרה</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                    <span>משרדים</span>
                    <Badge variant="outline">חודש שכירות + מע"מ</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                    <span>שטחי מסחר</span>
                    <Badge variant="outline">חודש שכירות + מע"מ</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                    <span>בניינים שלמים</span>
                    <Badge variant="outline">חודש שכירות + מע"מ</Badge>
                  </div>
                </div>
              </div>

              {/* Sale Rates */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">מכירה</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                    <span>משרדים</span>
                    <Badge variant="outline">1.5% + מע"מ</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                    <span>שטחי מסחר</span>
                    <Badge variant="outline">1.5% + מע"מ</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                    <span>בניינים שלמים</span>
                    <Badge variant="outline">2% + מע"מ</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
}