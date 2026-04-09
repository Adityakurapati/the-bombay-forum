export interface Article {
  id?: string;
  title: string;
  subtitle: string;
  content: string;
  category: string;
  author: string;
  authorBio?: string;
  authorImage?: string;
  featuredImage: string;
  slug: string;
  excerpt: string;
  readTime: number;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id?: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  color?: string;
  createdAt?: string;
}

export interface Founder {
  id?: string;
  name: string;
  slug: string;
  title: string;
  company: string;
  bio: string;
  image: string;
  quote?: string;
  achievements?: string[];
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  createdAt?: string;
}

export interface Creator {
  id?: string;
  name: string;
  slug: string;
  title: string;
  bio: string;
  image: string;
  specialization: string;
  quote?: string;
  works?: string[];
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  createdAt?: string;
}

export interface Admin {
  id?: string;
  email: string;
  name: string;
  accessKey: string;
  role: 'editor' | 'admin';
  createdAt?: string;
}
