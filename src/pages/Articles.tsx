import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/useLanguage';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Calendar, User, Search, TrendingUp, Building, DollarSign, Users, X, Loader2 } from 'lucide-react';
import type { ArticlePost } from '@/types';

function Articles() {
    const { t } = useLanguage();
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!newsletterEmail || !newsletterEmail.includes('@')) {
            toast({
                title: 'שגיאה',
                description: 'אנא הזן כתובת אימייל תקינה',
                variant: 'destructive'
            });
            return;
        }

        setIsSubscribing(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            toast({
                title: 'הרשמה הושלמה!',
                description: 'נרשמת בהצלחה לניוזלטר שלנו',
            });
            
            setNewsletterEmail('');
        } catch (error) {
            toast({
                title: 'שגיאה',
                description: 'אירעה שגיאה בהרשמה. אנא נסה שוב.',
                variant: 'destructive'
            });
        } finally {
            setIsSubscribing(false);
        }
    };

    const mockArticlePosts = useMemo(() => [
        {
            id: '1',
            title: t('articles.posts.1.title'),
            excerpt: t('articles.posts.1.excerpt'),
            content: t('articles.content_placeholder'),
            author: t('articles.author'),
            category: 'market-trends',
            tags: [t('articles.tags.real_estate_market'), t('articles.tags.trends'), t('articles.tags.2024'), t('articles.tags.offices')],
image:'/images/article4.png',
            published: true,
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-01-15'),
        },
        {
            id: '2',
            title: t('articles.posts.2.title'),
            excerpt: t('articles.posts.2.excerpt'),
            content: t('articles.content_placeholder'),
            author: t('articles.author'),
            category: 'guides',
            tags: [t('articles.tags.hitech'), t('articles.tags.offices'), t('articles.tags.guide'), t('articles.tags.startups')],
            image: '/images/article1.png',
            published: true,
            createdAt: new Date('2024-01-10'),
            updatedAt: new Date('2024-01-10'),
        },
        {
            id: '3',
            title: t('articles.posts.3.title'),
            excerpt: t('articles.posts.3.excerpt'),
            content: t('articles.content_placeholder'),
            author: t('articles.author'),
            category: 'investment',
            tags: [t('articles.tags.investments'), t('articles.tags.commercial_real_estate'), t('articles.tags.yield'), t('articles.tags.risk')],
            image: '/images/article2.png',
            published: true,
            createdAt: new Date('2024-01-05'),
            updatedAt: new Date('2024-01-05'),
        },
        {
            id: '4',
            title: t('articles.posts.4.title'),
            excerpt: t('articles.posts.4.excerpt'),
            content: t('articles.content_placeholder'),
            author: t('articles.author'),
            category: 'design',
            tags: [t('articles.tags.office_design'), t('articles.tags.hitech'), t('articles.tags.planning'), t('articles.tags.productivity')],
            image: '/images/image1.png',
            published: true,
            createdAt: new Date('2023-12-28'),
            updatedAt: new Date('2023-12-28'),
        },
        {
            id: '5',
            title: t('articles.posts.5.title'),
            excerpt: t('articles.posts.5.excerpt'),
            content: t('articles.content_placeholder'),
            author: t('articles.author'),
            category: 'legal',
            tags: [t('articles.tags.law'), t('articles.tags.contracts'), t('articles.tags.rental'), t('articles.tags.rights')],
            image: '/images/image3.png',
            published: true,
            createdAt: new Date('2023-12-20'),
            updatedAt: new Date('2023-12-20'),
        },
    ], [t]);

    const categories = useMemo(() => [
        { id: 'all', name: t('articles.categories.all'), icon: Building },
        { id: 'market-trends', name: t('articles.categories.market_trends'), icon: TrendingUp },
        { id: 'guides', name: t('articles.categories.guides'), icon: Building },
        { id: 'investment', name: t('articles.categories.investment'), icon: DollarSign },
        { id: 'design', name: t('articles.categories.design'), icon: Building },
        { id: 'legal', name: t('articles.categories.legal'), icon: Users },
    ], [t]);

    const filteredPosts = useMemo(() => {
        return mockArticlePosts.filter((post) => {
            const matchesSearch =
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
            return matchesSearch && matchesCategory && post.published;
        });
    }, [searchTerm, selectedCategory, mockArticlePosts]);

    const getCategoryName = (categoryId: string) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.name : categoryId;
    };

    const formatDate = (date: Date) => {
        const locale = t('locale');
        return new Intl.DateTimeFormat(locale, {
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
                    <div className="text-center mb-6">
                        <h1 className="text-6xl font-bold mb-1 text-gradient-primary">{t('articles.title')}</h1>
                        <p className="text-xl text-muted-foreground">
                            {t('articles.subtitle')}
                        </p>
                    </div>
                    {/* Search and Filter */}
                    <div className="card-elegant p-6 mb-8">
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder={t('articles.search.placeholder')}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('articles.category.placeholder')} />
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
                            {t('articles.results_count').replace('{count}', filteredPosts.length.toString())}
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
                                        {t('articles.featured')}
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
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="btn-primary w-full">{t('articles.read_more')}</Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl font-bold text-right">{filteredPosts[0].title}</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                                <img src={filteredPosts[0].image} alt={filteredPosts[0].title} className="w-full h-64 object-cover rounded-lg" />
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <User className="h-4 w-4" />
                                                        <span>{filteredPosts[0].author}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>{filteredPosts[0].createdAt.toLocaleDateString('he-IL')}</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {filteredPosts[0].tags.map((tag, index) => (
                                                        <Badge key={index} variant="secondary" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <div className="prose max-w-none text-right" dir="rtl">
                                                    <p className="text-lg leading-relaxed">{filteredPosts[0].content}</p>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
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
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="btn-primary w-full">{t('articles.read_more')}</Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl font-bold text-right">{post.title}</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                                <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-lg" />
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <User className="h-4 w-4" />
                                                        <span>{post.author}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>{post.createdAt.toLocaleDateString('he-IL')}</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {post.tags.map((tag, index) => (
                                                        <Badge key={index} variant="secondary" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <div className="prose max-w-none text-right" dir="rtl">
                                                    <p className="text-lg leading-relaxed">{post.content}</p>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    {filteredPosts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-xl text-muted-foreground mb-4">
                                {t('articles.no_results')}
                            </p>
                            <Button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('all');
                                }}
                                className="btn-accent"
                            >
                                {t('articles.clear_filters')}
                            </Button>
                        </div>
                    )}
                    {/* Newsletter Signup */}
                    <div className="card-elegant p-8 text-center">
                        <h2 className="text-2xl font-bold mb-4 text-gradient-primary">
                            {t('articles.newsletter.title')}
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            {t('articles.newsletter.subtitle')}
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="flex gap-4 max-w-md mx-auto">
                            <Input 
                                type="email"
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                placeholder={t('articles.newsletter.placeholder')} 
                                className="flex-1" 
                                required
                                disabled={isSubscribing}
                            />
                            <Button 
                                type="submit" 
                                className="btn-accent"
                                disabled={isSubscribing}
                            >
                                {isSubscribing ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    t('articles.newsletter.submit')
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Articles;
