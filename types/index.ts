// Core Breed Types
export interface Breed {
  id: number;
  name: string;
  temperament: string;
  life_span: string;
  alt_names: string;
  wikipedia_url: string;
  origin: string;
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
  bred_for: string;
  breed_group: string;
  image: {
    id: string;
    width: number;
    height: number;
    url: string;
  };
  reference_image_id: string;
  // Custom enriched fields
  traits?: BreedTraits;
  pros?: string[];
  cons?: string[];
  health_risks?: string[];
  grooming_needs?: string;
  exercise_needs?: string;
  training_difficulty?: number;
  shedding_level?: number;
  barking_level?: number;
  friendliness?: number;
  adaptability?: number;
  watch_dog_ability?: number;
  separation_tolerance?: number;
  popularity_rank?: number;
  match_percentage?: number;
}

export interface BreedTraits {
  size: number; // 1-5 scale
  lifespan: number; // 1-5 scale
  energy: number; // 1-5 scale
  intelligence: number; // 1-5 scale
  friendliness: number; // 1-5 scale
  trainability: number; // 1-5 scale
  good_with_children: number; // 1-5 scale
  good_with_pets: number; // 1-5 scale
  barking: number; // 1-5 scale
  shedding: number; // 1-5 scale
  grooming: number; // 1-5 scale
  health: number; // 1-5 scale
  drooling: number; // 1-5 scale
  exercise_needs: number; // 1-5 scale
  climate_adaptability: number; // 1-5 scale
  watchdog_ability: number; // 1-5 scale
  separation_tolerance: number; // 1-5 scale
  popularity_rank: number; // 1-5 scale
}

// User Types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  role: 'admin' | 'contributor' | 'user';
  created_at: string;
  updated_at: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  favorite_breeds: number[];
  saved_filters: SavedFilter[];
  notification_settings: NotificationSettings;
  theme: 'light' | 'dark' | 'system';
}

export interface SavedFilter {
  id: string;
  name: string;
  filters: FilterOptions;
  created_at: string;
}

export interface NotificationSettings {
  email_notifications: boolean;
  push_notifications: boolean;
  forum_mentions: boolean;
  breed_updates: boolean;

}

// Filter Types
export interface FilterOptions {
  size?: string[];
  coat_type?: string[];
  temperament?: string[];
  activity_level?: string[];
  shedding?: string[];
  grooming_needs?: string[];
  lifespan_range?: [number, number];
  trainability?: string[];
  bark_level?: string[];
  breed_group?: string[];
  adaptability?: string[];
  health_considerations?: string[];
  country_of_origin?: string[];
}

// Comparison Types
export interface ComparisonState {
  breeds: Breed[];
  maxBreeds: number;
  isDragging: boolean;
  draggedIndex: number | null;
}

// Quiz Types
export interface QuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'range' | 'text';
  options?: QuizOption[];
  required: boolean;
}

export interface QuizOption {
  value: string;
  label: string;
  weight: number;
}

export interface QuizAnswer {
  questionId: string;
  answer: string | string[] | number;
}

export interface QuizResult {
  breed: Breed;
  matchPercentage: number;
  reasoning: string;
  strengths: string[];
  considerations: string[];
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sale_price?: number;
  currency: string;
  images: string[];
  category: ProductCategory;
  breed_specific?: number[];
  tags: string[];
  rating: number;
  review_count: number;
  in_stock: boolean;
  variants?: ProductVariant[];
  specifications?: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export type ProductCategory = 
  | 'food_nutrition'
  | 'beds_furniture'
  | 'collars_leashes'
  | 'health_grooming'
  | 'toys_enrichment'
  | 'training_behavior'
  | 'apparel_accessories'
  | 'travel_outdoor'
  | 'breed_merchandise'
  | 'starter_kits';

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  sale_price?: number;
  sku: string;
  in_stock: boolean;
}

// Forum Types
export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author: User;
  category: ForumCategory;
  tags: string[];
  likes: number;
  views: number;
  is_pinned: boolean;
  is_locked: boolean;
  created_at: string;
  updated_at: string;
  replies: ForumReply[];
  reply_count: number;
}

export type ForumCategory = 'breeds' | 'training' | 'health' | 'general';

export interface ForumReply {
  id: string;
  content: string;
  author_id: string;
  author: User;
  post_id: string;
  parent_id?: string;
  likes: number;
  created_at: string;
  updated_at: string;
  replies: ForumReply[];
}



// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

// UI Types
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export interface Modal {
  id: string;
  type: string;
  props?: Record<string, any>;
}

// Store Types
export interface AppState {
  user: User | null;
  comparison: ComparisonState;
  filters: FilterOptions;
  theme: 'light' | 'dark' | 'system';
  toasts: Toast[];
  modals: Modal[];
  loading: boolean;
  error: string | null;
}

// Component Props Types
export interface BreedCardProps {
  breed: Breed;
  onAddToCompare?: (breed: Breed) => void;
  onRemoveFromCompare?: (breedId: number) => void;
  isInComparison?: boolean;
  showActions?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

export interface ComparisonTableProps {
  breeds: Breed[];
  traits: (keyof BreedTraits)[];
  onRemoveBreed?: (breedId: number) => void;
}

export interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onSaveFilter?: (name: string) => void;
  savedFilters?: SavedFilter[];
}

export interface QuizFormProps {
  questions: QuizQuestion[];
  onComplete: (answers: QuizAnswer[]) => void;
  isLoading?: boolean;
}

// Utility Types
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type Variant = 'default' | 'primary' | 'secondary' | 'accent' | 'destructive' | 'success' | 'warning';
export type Status = 'idle' | 'loading' | 'success' | 'error'; 
