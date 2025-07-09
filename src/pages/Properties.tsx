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
			name: 'Shai Sfez',
			phone: '+972-50-123-4567',
			email: 'shai@sfez-nadlan.com'
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
			name: 'Shai Sfez',
			phone: '+972-50-123-4567',
			email: 'shai@sfez-nadlan.com'
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

	const mockProperties = useMemo(() => [
		{
			id: '1',
			title: t('properties.sample.office1.title'),
			description: t('properties.sample.office1.description'),
			type: 'office',
			status: 'rent',
			price: 25000,
			area: 500,
			location: 'Tel Aviv',
			address: 'Rothschild Blvd 1, Tel Aviv',
			features: [t('properties.features.parking'), t('properties.features.ac'), t('properties.features.internet'), t('properties.features.meeting_rooms')],
			images: ['/placeholder.svg'],
			contactInfo: {
				name: 'Shai Sfez',
				phone: '+972-50-123-4567',
				email: 'shai@sfez-nadlan.com'
			},
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			id: '2',
			title: t('properties.sample.commercial1.title'),
			description: t('properties.sample.commercial1.description'),
			type: 'commercial',
			status: 'sale',
			price: 5500000,
			area: 800,
			location: 'Ramat Gan',
			address: 'Diamond Exchange District, Ramat Gan',
			features: [t('properties.features.visibility'), t('properties.features.ground_floor'), t('properties.features.flexible'), t('properties.features.storage')],
			images: ['/placeholder.svg'],
			contactInfo: {
				name: 'Shai Sfez',
				phone: '+972-50-123-4567',
				email: 'shai@sfez-nadlan.com'
			},
			createdAt: new Date(),
			updatedAt: new Date()
		}
	], [t]);

	const filteredProperties = useMemo(() => {
		return mockProperties.filter(property => {
			const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				property.location.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesType = typeFilter === 'all' || property.type === typeFilter;
			const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
			const matchesLocation = locationFilter === 'all' || property.location === locationFilter;

			return matchesSearch && matchesType && matchesStatus && matchesLocation;
		});
	}, [searchTerm, typeFilter, statusFilter, locationFilter, mockProperties]);

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
			return `${formatter.format(price)}${t('properties.currency.month')}`;
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
						<h1 className="text-4xl font-bold mb-4 text-gradient-primary">{t('properties.title')}</h1>
						<p className="text-xl text-muted-foreground">{t('properties.subtitle')}</p>
					</div>

					{/* Filters */}
					<div className="card-elegant p-6 mb-8">
						<div className="grid md:grid-cols-4 gap-4 mb-6">
							<div className="relative">
								<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder={t('properties.search.placeholder')}
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10"
								/>
							</div>
							<Select value={typeFilter} onValueChange={setTypeFilter}>
								<SelectTrigger>
									<SelectValue placeholder={t('properties.filters.type')} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">{t('properties.filters.all_types')}</SelectItem>
									<SelectItem value="office">{t('properties.types.office')}</SelectItem>
									<SelectItem value="commercial">{t('properties.types.commercial')}</SelectItem>
									<SelectItem value="building">{t('properties.types.building')}</SelectItem>
								</SelectContent>
							</Select>
							<Select value={statusFilter} onValueChange={setStatusFilter}>
								<SelectTrigger>
									<SelectValue placeholder={t('properties.filters.status')} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">{t('properties.filters.all_statuses')}</SelectItem>
									<SelectItem value="rent">{t('properties.statuses.rent')}</SelectItem>
									<SelectItem value="sale">{t('properties.statuses.sale')}</SelectItem>
									<SelectItem value="rented">{t('properties.statuses.rented')}</SelectItem>
									<SelectItem value="sold">{t('properties.statuses.sold')}</SelectItem>
								</SelectContent>
							</Select>
							<Select value={locationFilter} onValueChange={setLocationFilter}>
								<SelectTrigger>
									<SelectValue placeholder={t('properties.filters.location')} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">{t('properties.filters.all_locations')}</SelectItem>
									<SelectItem value="Tel Aviv">{t('properties.locations.tel_aviv')}</SelectItem>
									<SelectItem value="Ramat Gan">{t('properties.locations.ramat_gan')}</SelectItem>
									<SelectItem value="Herzliya">{t('properties.locations.herzliya')}</SelectItem>
									<SelectItem value="Petach Tikva">{t('properties.locations.petach_tikva')}</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="text-sm text-muted-foreground">
							{t('properties.results_count').replace('{count}', filteredProperties.length.toString())}
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
										{property.status === 'rent' ? t('properties.statuses.rent') :
											property.status === 'sale' ? t('properties.statuses.sale') :
												property.status === 'rented' ? t('properties.statuses.rented') : t('properties.statuses.sold')}
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
										<span className="text-sm">{property.area} {t('properties.area_unit')}</span>
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
												{t('properties.features.more').replace('{count}', (property.features.length - 3).toString())}
											</Badge>
										)}
									</div>

									<div className="flex gap-2 pt-4">
										<ContactButton
											className="btn-primary flex-1"
										>
											<svg
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.467 3.606"
													fill="currentColor"
												/>
											</svg>
											{t('properties.actions.message')}
										</ContactButton>
										<Button
											className="btn-primary flex-1"
											onClick={() => window.open(`tel:${t('contactInfo.phone')}`, '_blank')}
										>

											<Phone className="h-4 w-4 ml-2" />
											{t('properties.actions.call')}
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>

					{filteredProperties.length === 0 && (
						<div className="text-center py-12">
							<p className="text-xl text-muted-foreground mb-4">{t('properties.no_results')}</p>
							<Button
								onClick={() => {
									setSearchTerm('');
									setTypeFilter('all');
									setStatusFilter('all');
									setLocationFilter('all');
								}}
								className="btn-accent"
							>
								{t('properties.clear_filters')}
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}