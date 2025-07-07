import { useLanguage } from '@/contexts/useLanguage';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Heart, Target, Users, Award, Building, TrendingUp, Handshake } from 'lucide-react';

const values = [
	{
		icon: Heart,
		title: 'תרומה חברתית',
		description: '5% מהרווחים נתרמים לעמותת "יד אלקנה" לתמיכה בלוחמים ולוחמות',
		color: 'text-red-500',
	},
	{
		icon: Users,
		title: 'צוות לוחמים',
		description: 'העסקה והכשרה של לוחמים ולוחמות משוחררים כחלק מהצוות',
		color: 'text-blue-500',
	},
	{
		icon: Target,
		title: 'מקצועיות מוחלטת',
		description: 'עשור של ניסיון בנדל"ן מסחרי עם תעודת אחריות אישית לכל לקוח',
		color: 'text-green-500',
	},
	{
		icon: Handshake,
		title: 'שיתוף פעולה',
		description: 'עבודה בהרמוניה ושיתוף פעולה כחברה משפחתית מצליחה',
		color: 'text-purple-500',
	},
];

const achievements = [
	{
		number: '10+',
		label: 'שנות ניסיון',
		description: 'בנדל"ן עסקי ומסחרי',
	},
	{
		number: '500+',
		label: 'עסקאות מוצלחות',
		description: 'משרדים ושטחי מסחר',
	},
	{
		number: '100%',
		label: 'תעודת אחריות',
		description: 'לכל לקוח ועסקה',
	},
	{
		number: '5%',
		label: 'תרומה חברתית',
		description: 'מהרווחים לתמיכה בלוחמים',
	},
];

const timeline = [
	{
		year: '2014',
		title: 'הקמת החברה',
		description: 'שי ספז הקים את ספז נדל"ן עם חזון לשנות את תחום הנדל"ן העסקי',
	},
	{
		year: '2017',
		title: 'התמחות בהייטק',
		description: 'פיתוח מומחיות ייחודית בנדל"ן עבור חברות הייטק וסטארטאפים',
	},
	{
		year: '2020',
		title: 'הרחבת הצוות',
		description: 'גיוס והכשרה של לוחמים ולוחמות משוחררים כחלק מהמחויבות החברתית',
	},
	{
		year: '2022',
		title: 'שיתוף עם יד אלקנה',
		description: 'תחילת התרומה החודשית לעמותת יד אלקנה לתמיכה בלוחמים',
	},
	{
		year: '2024',
		title: 'יעד 17 מיליון',
		description: 'קביעת יעד להגיע להכנסה שנתית של 17 מיליון ש"ח',
	},
];

export default function About() {
	const { t } = useLanguage();

	return (
		<div className="min-h-screen">
			<Header />
			
			<div className="pt-20 pb-16">
				<div className="container mx-auto px-4">
					{/* Hero Section */}
				<div className="text-center mb-16">
					<h1 className="text-4xl font-bold mb-4 text-gradient-primary">אודות ספז נדל"ן</h1>
					<p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
						מומחים בנדל"ן עסקי, מחויבות לערכים חברתיים ומקצועיות ללא פשרות
					</p>
					<div className="w-32 h-32 bg-gradient-primary rounded-full mx-auto mb-8 flex items-center justify-center">
						<span className="text-white font-bold text-4xl">ש</span>
					</div>
				</div>

				{/* Shai Spaz Section */}
				<div className="card-elegant p-8 mb-16">
					<div className="grid md:grid-cols-2 gap-8 items-center">
						<div>
							<h2 className="text-3xl font-bold mb-4">שי ספז - מנכ"ל ומייסד</h2>
							<p className="text-lg text-muted-foreground mb-6">
								מתווך ויועץ נדל"ן עסקי עם ניסיון של עשור, מומחה בהשכרה ומכירה של משרדים ושטחי מסחר. שי מסייע לחברות
								ומשקיעים למצוא את הנכס הנכון תוך ליווי אישי 1:1, איפיון צרכים מדויק ואיתור נכסים ייחודיים.
							</p>
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<Building className="h-5 w-5 text-primary" />
									<span>מומחה בנדל"ן עסקי ומסחרי</span>
								</div>
								<div className="flex items-center gap-3">
									<TrendingUp className="h-5 w-5 text-primary" />
									<span>התמחות בחברות הייטק וסטארטאפים</span>
								</div>
								<div className="flex items-center gap-3">
									<Shield className="h-5 w-5 text-primary" />
									<span>תעודת אחריות אישית לכל לקוח</span>
								</div>
								<div className="flex items-center gap-3">
									<Award className="h-5 w-5 text-primary" />
									<span>רשת קשרים ענפה ומאגר נכסים ייחודי</span>
								</div>
							</div>
						</div>
						<div className="text-center">
							<div className="w-64 h-64 bg-gradient-hero rounded-lg mx-auto mb-4 flex items-center justify-center">
								<span className="text-white font-bold text-6xl">ש</span>
							</div>
							<p className="text-sm text-muted-foreground">"הנכס הנכון, ברגע הנכון, עם הליווי הנכון"</p>
						</div>
					</div>
				</div>

				{/* Values Section */}
				<div className="mb-16">
					<h2 className="text-3xl font-bold text-center mb-8 text-gradient-primary">הערכים שלנו</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{values.map((value, index) => (
							<Card key={index} className="card-elegant text-center hover-scale">
								<CardHeader>
									<div
										className={`w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4`}
									>
										<value.icon className={`h-8 w-8 ${value.color}`} />
									</div>
									<CardTitle className="text-xl">{value.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground">{value.description}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Achievements Section */}
				<div className="mb-16">
					<h2 className="text-3xl font-bold text-center mb-8 text-gradient-primary">ההישגים שלנו</h2>
					<div className="grid md:grid-cols-4 gap-6">
						{achievements.map((achievement, index) => (
							<div key={index} className="card-elegant text-center p-6">
								<div className="text-4xl font-bold text-gradient-primary mb-2">
									{achievement.number}
								</div>
								<div className="text-lg font-semibold mb-1">{achievement.label}</div>
								<p className="text-sm text-muted-foreground">{achievement.description}</p>
							</div>
						))}
					</div>
				</div>

				{/* Vision Section */}
				<div className="card-elegant p-8 mb-16">
					<div className="text-center">
						<Target className="h-16 w-16 text-primary mx-auto mb-6" />
						<h2 className="text-3xl font-bold mb-4 text-gradient-primary">החזון שלנו</h2>
						<p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
						להפוך לחברה משפחתית מצליחה הפועלת בהרמוניה ושיתוף פעולה,
							<br />
							תוך מתן שירות מקצועי ללא פשרות ותרומה משמעותית לחברה הישראלית
						</p>
						<Badge className="bg-accent text-accent-foreground text-lg px-6 py-2">
							יעד 2024: 17 מיליון ש"ח הכנסה שנתית
						</Badge>
					</div>
				</div>

				{/* Timeline Section */}
				<div className="mb-16">
					<h2 className="text-3xl font-bold text-center mb-8 text-gradient-primary">המסע שלנו</h2>
					<div className="relative">
						<div className="absolute right-4 top-0 bottom-0 w-0.5 bg-gradient-primary"></div>
						<div className="space-y-8">
							{timeline.map((event, index) => (
								<div key={index} className="relative flex items-start gap-6">
									<div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
										<div className="w-3 h-3 bg-white rounded-full"></div>
									</div>
									<div className="card-elegant p-6 flex-1">
										<div className="flex items-center gap-4 mb-2">
											<Badge variant="outline" className="font-bold">
												{event.year}
											</Badge>
											<h3 className="text-xl font-semibold">{event.title}</h3>
										</div>
										<p className="text-muted-foreground">{event.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* CTA Section */}
				<div className="text-center">
					<div className="card-elegant p-8">
						<h2 className="text-3xl font-bold mb-4 text-gradient-primary">בואו נכיר!</h2>
						<p className="text-xl text-muted-foreground mb-6">
							מוכנים להיות חלק מהסיפור שלנו? בואו נדבר על איך נוכל לעזור לכם
						</p>
						<Button size="lg" className="btn-accent">
							📞 קבעו פגישת היכרות
						</Button>
					</div>
				</div>
			</div>
			</div>
		</div>
	);
}