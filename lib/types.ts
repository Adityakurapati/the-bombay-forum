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
  associatedProfileId?: string;
  associatedProfileType?: 'founder' | 'creator';
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
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

export interface FounderStat {
  label: string;
  value: string;
}

export interface ArchiveItem {
  title: string;
  sub: string;
  img: string;
}

export interface EditorialSection {
  heading: string;
  paragraphs: string[];
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  highlightStat?: string;
  highlightLabel?: string;
  pullQuote?: string;
}

export interface NetworkCreator {
  name: string;
  role: string;
  image: string;
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
    instagram?: string;
  };
  createdAt?: string;
  // Extended fields for rich profile page
  tagline?: string;
  bioParagraphs?: string[];
  heroImage?: string;
  inlineImage?: string;
  inlineImageAlt?: string;
  stats?: FounderStat[];
  editorialSections?: EditorialSection[];
  tags?: string[];
  authorName?: string;
  authorBio?: string;
  authorImage?: string;
  archiveItems?: ArchiveItem[];
  metaTitle?: string;
  metaDescription?: string;
  status?: 'active' | 'review' | 'draft';
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
    youtube?: string;
    newsletter?: string;
  };
  createdAt?: string;
  // Extended fields for rich profile page
  location?: string;
  tagline?: string;
  heroDescription?: string;
  bioParagraphs?: string[];
  heroImage?: string;
  socialLabels?: string[];
  pullQuote?: string;
  pullQuoteCite?: string;
  workDescription?: string;
  workImages?: { src: string; alt: string; span?: string }[];
  highlightStat?: string;
  highlightLabel?: string;
  editorialSections?: EditorialSection[];
  tags?: string[];
  authorName?: string;
  authorImage?: string;
  networkCreators?: NetworkCreator[];
  metaTitle?: string;
  metaDescription?: string;
  status?: 'active' | 'review' | 'draft';
}

export interface Admin {
  id?: string;
  email: string;
  name: string;
  accessKey: string;
  role: 'editor' | 'admin';
  createdAt?: string;
}
