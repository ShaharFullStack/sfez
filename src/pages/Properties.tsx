import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/useLanguage';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Square, Phone, Mail } from 'lucide-react';
import type { Property } from '@/types';
import ContactButton from '@/components/ContactButton';

// Mock data - in a real app this would come from an API
const mockProperties: Property[] = [
	{
		id: '1',
		title: 'Modern Office Space in Tel Aviv',
		description: 'Prime location office space with modern amenities and excellent transportation access.',
		type: 'office',
		status: 'rent',
		price: 25000,
		area: 500,
		location: 'Tel Aviv',
		address: 'Rothschild Blvd 1, Tel Aviv',
		features: ['Parking', 'Air Conditioning', 'High Speed Internet', 'Meeting Rooms'],
		images: ['/placeholder.svg'],
		contactInfo: {
			name: 'Shai Spaz',
			phone: '+972-50-123-4567',
			email: 'shai@spzrealestate.com'
		},
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: '2',
		title: 'Commercial Space for Sale',
		description: 'Excellent commercial property in a bustling business district.',
		type: 'commercial',
		status: 'sale',
		price: 5500000,
		area: 800,
		location: 'Ramat Gan',
		address: 'Diamond Exchange District, Ramat Gan',
		features: ['High Visibility', 'Ground Floor', 'Flexible Layout', 'Storage'],
		images: ['/placeholder.svg'],
		contactInfo: {
			name: 'Shai Spaz',
			phone: '+972-50-123-4567',
			email: 'shai@spzrealestate.com'
		},
		createdAt: new Date(),
		updatedAt: new Date()
	}
];

export default function Properties() {
	const { t } = useLanguage();
	const [searchTerm, setSearchTerm] = useState('');
	const [typeFilter, setTypeFilter] = useState<string>('all');
	const [statusFilter, setStatusFilter] = useState<string>('all');
	const [locationFilter, setLocationFilter] = useState<string>('all');

	const filteredProperties = useMemo(() => {
		return mockProperties.filter(property => {
			const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				property.location.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesType = typeFilter === 'all' || property.type === typeFilter;
			const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
			const matchesLocation = locationFilter === 'all' || property.location === locationFilter;

			return matchesSearch && matchesType && matchesStatus && matchesLocation;
		});
	}, [searchTerm, typeFilter, statusFilter, locationFilter]);

	const getStatusBadgeVariant = (status: string) => {
		switch (status) {
			case 'rent':
				return 'default';
			case 'sale':
				return 'secondary';
			case 'rented':
				return 'outline';
			case 'sold':
				return 'destructive';
			default:
				return 'default';
		}
	};

	const formatPrice = (price: number, status: string) => {
		const formatter = new Intl.NumberFormat('he-IL', {
			style: 'currency',
			currency: 'ILS',
			minimumFractionDigits: 0,
		});

		if (status === 'rent') {
			return `${formatter.format(price)}/חודש`;
		}
		return formatter.format(price);
	};

	return (
		<div className="min-h-screen">
			<Header />
			
			<div className="pt-20 pb-16">
				<div className="container mx-auto px-4">
					{/* Header */}
					<div className="text-center mb-12">
					<h1 className="text-4xl font-bold mb-4 text-gradient-primary">נכסים זמינים</h1>
					<p className="text-xl text-muted-foreground">מצאו את הנכס המושלם עבורכם</p>
				</div>

				{/* Filters */}
				<div className="card-elegant p-6 mb-8">
					<div className="grid md:grid-cols-4 gap-4 mb-6">
						<div className="relative">
							<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="חיפוש נכסים..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
						<Select value={typeFilter} onValueChange={setTypeFilter}>
							<SelectTrigger>
								<SelectValue placeholder="סוג נכס" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">כל הסוגים</SelectItem>
								<SelectItem value="office">משרדים</SelectItem>
								<SelectItem value="commercial">מסחרי</SelectItem>
								<SelectItem value="building">בניין שלם</SelectItem>
							</SelectContent>
						</Select>
						<Select value={statusFilter} onValueChange={setStatusFilter}>
							<SelectTrigger>
								<SelectValue placeholder="סטטוס" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">כל הסטטוסים</SelectItem>
								<SelectItem value="rent">להשכרה</SelectItem>
								<SelectItem value="sale">למכירה</SelectItem>
								<SelectItem value="rented">מושכר</SelectItem>
								<SelectItem value="sold">נמכר</SelectItem>
							</SelectContent>
						</Select>
						<Select value={locationFilter} onValueChange={setLocationFilter}>
							<SelectTrigger>
								<SelectValue placeholder="מיקום" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">כל המיקומים</SelectItem>
								<SelectItem value="Tel Aviv">תל אביב</SelectItem>
								<SelectItem value="Ramat Gan">רמת גן</SelectItem>
								<SelectItem value="Herzliya">הרצליה</SelectItem>
								<SelectItem value="Petach Tikva">פתח תקוה</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="text-sm text-muted-foreground">
						נמצאו {filteredProperties.length} נכסים
					</div>
				</div>

				{/* Properties Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredProperties.map((property) => (
						<Card key={property.id} className="card-elegant hover-scale group">
							<div className="relative overflow-hidden rounded-t-lg">
								<img
									src={property.images[0]}
									alt={property.title}
									className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
								/>
								<Badge
									className="absolute top-4 right-4"
									variant={getStatusBadgeVariant(property.status)}
								>
									{property.status === 'rent' ? 'להשכרה' :
										property.status === 'sale' ? 'למכירה' :
											property.status === 'rented' ? 'מושכר' : 'נמכר'}
								</Badge>
							</div>

							<CardHeader>
								<CardTitle className="text-xl">{property.title}</CardTitle>
								<CardDescription>{property.description}</CardDescription>
							</CardHeader>

							<CardContent className="space-y-4">
								<div className="flex items-center gap-2 text-muted-foreground">
									<MapPin className="h-4 w-4" />
									<span className="text-sm">{property.address}</span>
								</div>

								<div className="flex items-center gap-2 text-muted-foreground">
									<Square className="h-4 w-4" />
									<span className="text-sm">{property.area} מ"ר</span>
								</div>

								<div className="text-2xl font-bold text-gradient-primary">
									{formatPrice(property.price, property.status)}
								</div>

								<div className="flex flex-wrap gap-2">
									{property.features.slice(0, 3).map((feature, index) => (
										<Badge key={index} variant="outline" className="text-xs">
											{feature}
										</Badge>
									))}
									{property.features.length > 3 && (
										<Badge variant="outline" className="text-xs">
											+{property.features.length - 3} נוספים
										</Badge>
									)}
								</div>

								<div className="flex gap-2 pt-4">
									<Button className="btn-primary flex-1">
										<Phone className="h-4 w-4 ml-2" />
										התקשר
									</Button>
									<Button variant="outline" className="btn-glass flex-1">
										<Mail className="h-4 w-4 ml-2" />
										מייל
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{filteredProperties.length === 0 && (
					<div className="text-center py-12">
						<p className="text-xl text-muted-foreground mb-4">לא נמצאו נכסים התואמים לחיפוש</p>
						<Button
							onClick={() => {
								setSearchTerm('');
								setTypeFilter('all');
								setStatusFilter('all');
								setLocationFilter('all');
							}}
							className="btn-accent"
						>
							נקה סינון
						</Button>
					</div>
				)}
			</div>
			</div>
		</div>
	);
}