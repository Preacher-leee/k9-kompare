export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          role: 'admin' | 'contributor' | 'user'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'contributor' | 'user'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'contributor' | 'user'
          created_at?: string
          updated_at?: string
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          favorite_breeds: number[]
          saved_filters: Json
          notification_settings: Json
          theme: 'light' | 'dark' | 'system'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          favorite_breeds?: number[]
          saved_filters?: Json
          notification_settings?: Json
          theme?: 'light' | 'dark' | 'system'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          favorite_breeds?: number[]
          saved_filters?: Json
          notification_settings?: Json
          theme?: 'light' | 'dark' | 'system'
          created_at?: string
          updated_at?: string
        }
      }
      breeds: {
        Row: {
          id: number
          name: string
          temperament: string
          life_span: string
          alt_names: string | null
          wikipedia_url: string | null
          origin: string
          weight: Json
          height: Json
          bred_for: string | null
          breed_group: string
          image: Json
          reference_image_id: string
          traits: Json | null
          pros: string[] | null
          cons: string[] | null
          health_risks: string[] | null
          grooming_needs: string | null
          exercise_needs: string | null
          training_difficulty: number | null
          shedding_level: number | null
          barking_level: number | null
          friendliness: number | null
          adaptability: number | null
          watch_dog_ability: number | null
          separation_tolerance: number | null
          popularity_rank: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          temperament: string
          life_span: string
          alt_names?: string | null
          wikipedia_url?: string | null
          origin: string
          weight: Json
          height: Json
          bred_for?: string | null
          breed_group: string
          image: Json
          reference_image_id: string
          traits?: Json | null
          pros?: string[] | null
          cons?: string[] | null
          health_risks?: string[] | null
          grooming_needs?: string | null
          exercise_needs?: string | null
          training_difficulty?: number | null
          shedding_level?: number | null
          barking_level?: number | null
          friendliness?: number | null
          adaptability?: number | null
          watch_dog_ability?: number | null
          separation_tolerance?: number | null
          popularity_rank?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          temperament?: string
          life_span?: string
          alt_names?: string | null
          wikipedia_url?: string | null
          origin?: string
          weight?: Json
          height?: Json
          bred_for?: string | null
          breed_group?: string
          image?: Json
          reference_image_id?: string
          traits?: Json | null
          pros?: string[] | null
          cons?: string[] | null
          health_risks?: string[] | null
          grooming_needs?: string | null
          exercise_needs?: string | null
          training_difficulty?: number | null
          shedding_level?: number | null
          barking_level?: number | null
          friendliness?: number | null
          adaptability?: number | null
          watch_dog_ability?: number | null
          separation_tolerance?: number | null
          popularity_rank?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      forum_posts: {
        Row: {
          id: string
          title: string
          content: string
          author_id: string
          category: 'breeds' | 'training' | 'health' | 'general'
          tags: string[]
          likes: number
          views: number
          is_pinned: boolean
          is_locked: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          author_id: string
          category: 'breeds' | 'training' | 'health' | 'general'
          tags?: string[]
          likes?: number
          views?: number
          is_pinned?: boolean
          is_locked?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          author_id?: string
          category?: 'breeds' | 'training' | 'health' | 'general'
          tags?: string[]
          likes?: number
          views?: number
          is_pinned?: boolean
          is_locked?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      forum_replies: {
        Row: {
          id: string
          content: string
          author_id: string
          post_id: string
          parent_id: string | null
          likes: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          content: string
          author_id: string
          post_id: string
          parent_id?: string | null
          likes?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          content?: string
          author_id?: string
          post_id?: string
          parent_id?: string | null
          likes?: number
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          sale_price: number | null
          currency: string
          images: string[]
          category: 'food_nutrition' | 'beds_furniture' | 'collars_leashes' | 'health_grooming' | 'toys_enrichment' | 'training_behavior' | 'apparel_accessories' | 'travel_outdoor' | 'breed_merchandise' | 'starter_kits'
          breed_specific: number[] | null
          tags: string[]
          rating: number
          review_count: number
          in_stock: boolean
          variants: Json | null
          specifications: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          sale_price?: number | null
          currency?: string
          images: string[]
          category: 'food_nutrition' | 'beds_furniture' | 'collars_leashes' | 'health_grooming' | 'toys_enrichment' | 'training_behavior' | 'apparel_accessories' | 'travel_outdoor' | 'breed_merchandise' | 'starter_kits'
          breed_specific?: number[] | null
          tags?: string[]
          rating?: number
          review_count?: number
          in_stock?: boolean
          variants?: Json | null
          specifications?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          sale_price?: number | null
          currency?: string
          images?: string[]
          category?: 'food_nutrition' | 'beds_furniture' | 'collars_leashes' | 'health_grooming' | 'toys_enrichment' | 'training_behavior' | 'apparel_accessories' | 'travel_outdoor' | 'breed_merchandise' | 'starter_kits'
          breed_specific?: number[] | null
          tags?: string[]
          rating?: number
          review_count?: number
          in_stock?: boolean
          variants?: Json | null
          specifications?: Json | null
          created_at?: string
          updated_at?: string
        }
      }

      orders: {
        Row: {
          id: string
          user_id: string
          items: Json
          total: number
          currency: string
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address: Json
          billing_address: Json
          payment_intent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          items: Json
          total: number
          currency?: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address: Json
          billing_address: Json
          payment_intent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          items?: Json
          total?: number
          currency?: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address?: Json
          billing_address?: Json
          payment_intent_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 
