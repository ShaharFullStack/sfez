export interface Property {
  id: string;
  title: string;
  description: string;
  type: 'office' | 'commercial' | 'building';
  status: 'rent' | 'sale' | 'rented' | 'sold';
  price: number;
  area: number;
  location: string;
  address: string;
  features: string[];
  images: string[];
  contactInfo: {
    name: string;
    phone: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  type: 'buyer' | 'seller' | 'tenant' | 'landlord';
  requirements?: {
    propertyType: string;
    minArea: number;
    maxArea: number;
    budget: number;
    location: string[];
  };
  properties: string[];
  createdAt: Date;
}

export interface ArticlePost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  type: 'rent' | 'sale';
  propertyType: 'office' | 'commercial' | 'building';
  commission: number;
  features: string[];
}