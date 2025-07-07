import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/useLanguage';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, User, Search, TrendingUp, Building, DollarSign, Users } from 'lucide-react';
import type { BlogPost } from '@/types';

// Mock blog data
const mockBlogPosts: BlogPost[] = [
	{
		id: '1',
		title: 'מגמות בשוק הנדל"ן העסקי 2024',
		excerpt: 'סקירה מקיפה של מגמות השוק, מחירים וצפיות לשנה הקרובה',
		content: 'תוכן מלא של המאמר...',
		author: 'שי ספז',
		category: 'market-trends',
		tags: ['שוק נדל"ן', 'מגמות', '2024', 'משרדים'],
		image: '/placeholder.svg',
		published: true,
		createdAt: new Date('2024-01-15'),
		updatedAt: new Date('2024-01-15'),
	},
	{
		id: '2',
		title: 'איך לבחור משרד לחברת הייטק',
		excerpt: 'מדריך מקיף לבחירת משרד מתאים לחברות הייטק וסטארטאפים',
		content: 'תוכן מלא של המאמר...',
		author: 'שי ספז',
		category: 'guides',
		tags: ['הייטק', 'משרדים', 'מדריך', 'סטארטאפים'],
		image: '/placeholder.svg',
		published: true,
		createdAt: new Date('2024-01-10'),
		updatedAt: new Date('2024-01-10'),
	},
	{
		id: '3',
		title: 'השקעה בנדל"ן מסחרי - מה חשוב לדעת',
		excerpt: 'כל מה שצריך לדעת לפני השקעה בנדל"ן מסחרי',
		content: 'תוכן מלא של המאמר...',
		author: 'שי ספז',
		category: 'investment',
		tags: ['השקעות', 'נדל"ן מסחרי', 'תשואה', 'ריסק'],
		image: '/placeholder.svg',
		published: true,
		createdAt: new Date('2024-01-05'),
		updatedAt: new Date('2024-01-05'),
	},
	{
		id: '4',
		title: 'דרישות התכנון הפיזי למשרדי הייטק מודרניים',
		excerpt: 'איך לתכנן מרחב עבודה שמתאים לצרכים המודרניים של עובדי הייטק',
		content: 'תוכן מלא של המאמר...',
		author: 'שי ספז',
		category: 'design',
		tags: ['עיצוב משרדים', 'הייטק', 'תכנון', 'פרודוקטיביות'],
		image: '/placeholder.svg',
		published: true,
		createdAt: new Date('2023-12-28'),
		updatedAt: new Date('2023-12-28'),
	},
	{
		id: '5',
		title: 'זכויות ובחובות בחוזי השכרה מסחריים',
		excerpt: 'מדריך משפטי לזכויות וחובות בחוזי השכרה במגזר המסחרי',
		content: 'תוכן מלא של המאמר...',
		author: 'שי ספז',
		category: 'legal',
		tags: ['משפט', 'חוזים', 'השכרה', 'זכויות'],
		image: '/placeholder.svg',
		published: true,
		createdAt: new Date('2023-12-20'),
		updatedAt: new Date('2023-12-20'),
	},
];

const categories = [
	{ id: 'all', name: 'כל הקטגוריות', icon: Building },
	{ id: 'market-trends', name: 'מגמות שוק', icon: TrendingUp },
	{ id: 'guides', name: 'מדריכים', icon: Building },
	{ id: 'investment', name: 'השקעות', icon: DollarSign },
	{ id: 'design', name: 'עיצוב משרדים', icon: Building },
	{ id: 'legal', name: 'משפט ורגולציה', icon: Users },
];

export default function Blog() {
	const { t } = useLanguage();
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');

	const filteredPosts = useMemo(() => {
		return mockBlogPosts.filter((post) => {
			const matchesSearch =
				post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
				post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
			const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;

			return matchesSearch && matchesCategory && post.published;
		});
	}, [searchTerm, selectedCategory]);

	const getCategoryName = (categoryId: string) => {
		const category = categories.find((cat) => cat.id === categoryId);
		return category ? category.name : categoryId;
	};

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat('he-IL', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}).format(date);
	};

	return (
		<div className="min-h-screen">
			<Header />
			
			<div className="pt-20 pb-16">
				<div className="container mx-auto px-4">
					{/* Header */}
				<div className="text-center mb-16">
					<h1 className="text-4xl font-bold mb-4 text-gradient-primary">בלוג נדל"ן</h1>
					<p className="text-xl text-muted-foreground">
						מאמרים, מדריכים וכל הידע שצריך בעולם הנדל"ן העסקי
					</p>
				</div>

				{/* Search and Filter */}
				<div className="card-elegant p-6 mb-8">
					<div className="grid md:grid-cols-2 gap-4 mb-6">
						<div className="relative">
							<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="חיפוש במאמרים..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
						<Select value={selectedCategory} onValueChange={setSelectedCategory}>
							<SelectTrigger>
								<SelectValue placeholder="בחר קטגוריה" />
							</SelectTrigger>
							<SelectContent>
								{categories.map((category) => (
									<SelectItem key={category.id} value={category.id}>
										{category.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="text-sm text-muted-foreground">
						נמצאו {filteredPosts.length} מאמרים
					</div>
				</div>

				{/* Featured Post */}
				{filteredPosts.length > 0 && (
					<Card className="card-elegant mb-8 hover-scale">
						<div className="grid md:grid-cols-2 gap-6">
							<div className="relative overflow-hidden rounded-lg">
								<img
									src={filteredPosts[0].image}
									alt={filteredPosts[0].title}
									className="w-full h-64 md:h-full object-cover"
								/>
								<Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
									מאמר מומלץ
								</Badge>
							</div>
							<div className="p-6 flex flex-col justify-between">
								<div>
									<div className="flex items-center gap-2 mb-3">
										<Badge variant="outline">
											{getCategoryName(filteredPosts[0].category)}
										</Badge>
										<div className="flex items-center gap-1 text-sm text-muted-foreground">
											<Calendar className="h-4 w-4" />
											{formatDate(filteredPosts[0].createdAt)}
										</div>
									</div>
									<h2 className="text-2xl font-bold mb-3">{filteredPosts[0].title}</h2>
									<p className="text-muted-foreground mb-4">{filteredPosts[0].excerpt}</p>
									<div className="flex items-center gap-2 mb-4">
										<User className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm text-muted-foreground">
											{filteredPosts[0].author}
										</span>
									</div>
									<div className="flex flex-wrap gap-2 mb-4">
										{filteredPosts[0].tags.slice(0, 3).map((tag, index) => (
											<Badge key={index} variant="secondary" className="text-xs">
												{tag}
											</Badge>
										))}
									</div>
								</div>
								<Button className="btn-primary w-full">קרא עוד</Button>
							</div>
						</div>
					</Card>
				)}

				{/* Posts Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					{filteredPosts.slice(1).map((post) => (
						<Card key={post.id} className="card-elegant hover-scale group">
							<div className="relative overflow-hidden rounded-t-lg">
								<img
									src={post.image}
									alt={post.title}
									className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							</div>

							<CardHeader>
								<div className="flex items-center gap-2 mb-2">
									<Badge variant="outline" className="text-xs">
										{getCategoryName(post.category)}
									</Badge>
									<div className="flex items-center gap-1 text-xs text-muted-foreground">
										<Calendar className="h-3 w-3" />
										{formatDate(post.createdAt)}
									</div>
								</div>
								<CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
								<CardDescription className="text-sm">{post.excerpt}</CardDescription>
							</CardHeader>

							<CardContent className="space-y-4">
								<div className="flex items-center gap-2">
									<User className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm text-muted-foreground">{post.author}</span>
								</div>

								<div className="flex flex-wrap gap-1">
									{post.tags.slice(0, 2).map((tag, index) => (
										<Badge key={index} variant="secondary" className="text-xs">
											{tag}
										</Badge>
									))}
									{post.tags.length > 2 && (
										<Badge variant="secondary" className="text-xs">
											+{post.tags.length - 2}
										</Badge>
									)}
								</div>

								<Button className="btn-primary w-full">קרא עוד</Button>
							</CardContent>
						</Card>
					))}
				</div>

				{filteredPosts.length === 0 && (
					<div className="text-center py-12">
						<p className="text-xl text-muted-foreground mb-4">
							לא נמצאו מאמרים התואמים לחיפוש
						</p>
						<Button
							onClick={() => {
								setSearchTerm('');
								setSelectedCategory('all');
							}}
							className="btn-accent"
						>
							נקה סינון
						</Button>
					</div>
				)}

				{/* Newsletter Signup */}
				<div className="card-elegant p-8 text-center">
					<h2 className="text-2xl font-bold mb-4 text-gradient-primary">
						הישארו מעודכנים
					</h2>
					<p className="text-muted-foreground mb-6">
						הירשמו לניוזלטר שלנו וקבלו עדכונים שבועיים על השוק
					</p>
					<div className="flex gap-4 max-w-md mx-auto">
						<Input placeholder="כתובת מייל" className="flex-1" />
						<Button className="btn-accent">הרשמה</Button>
					</div>
				</div>
			</div>
			</div>
		</div>
	);
}