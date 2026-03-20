export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: Category;
  author: string;
  date: string;
  views: number;
  featured: boolean;
  breaking?: boolean;
  tags: string[];
}

export type Category = 
  | 'Politics' 
  | 'Human Interest' 
  | 'Pictorial' 
  | 'Tourism' 
  | 'Sports' 
  | 'Family' 
  | 'Health' 
  | 'Environment';

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface TrendingPost {
  id: string;
  title: string;
  views: number;
}

export const CATEGORIES: Category[] = [
  'Politics',
  'Human Interest',
  'Pictorial',
  'Tourism',
  'Sports',
  'Family',
  'Health',
  'Environment'
];
