import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Auth helpers
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signInWithMagicLink = async (email: string) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
  })
  return { data, error }
}

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
  return { data, error }
}

export const signInWithApple = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`
  })
  return { data, error }
}

export const updatePassword = async (password: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password
  })
  return { data, error }
}

// User profile helpers
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  return { data, error }
}

export const updateUserProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  return { data, error }
}

// Breed data helpers
export const getBreeds = async () => {
  const { data, error } = await supabase
    .from('breeds')
    .select('*')
    .order('name')
  
  return { data, error }
}

export const getBreedById = async (id: number) => {
  const { data, error } = await supabase
    .from('breeds')
    .select('*')
    .eq('id', id)
    .single()
  
  return { data, error }
}

export const searchBreeds = async (query: string) => {
  const { data, error } = await supabase
    .from('breeds')
    .select('*')
    .or(`name.ilike.%${query}%,temperament.ilike.%${query}%,breed_group.ilike.%${query}%`)
    .order('name')
  
  return { data, error }
}

// User preferences helpers
export const getUserPreferences = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  return { data, error }
}

export const updateUserPreferences = async (userId: string, preferences: any) => {
  const { data, error } = await supabase
    .from('user_preferences')
    .upsert({
      user_id: userId,
      ...preferences
    })
    .select()
    .single()
  
  return { data, error }
}

// Forum helpers
export const getForumPosts = async (category?: string, limit = 20, offset = 0) => {
  let query = supabase
    .from('forum_posts')
    .select(`
      *,
      author:profiles(*),
      replies:forum_replies(*)
    `)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)
  
  if (category) {
    query = query.eq('category', category)
  }
  
  const { data, error } = await query
  return { data, error }
}

export const createForumPost = async (post: any) => {
  const { data, error } = await supabase
    .from('forum_posts')
    .insert(post)
    .select()
    .single()
  
  return { data, error }
}

export const createForumReply = async (reply: any) => {
  const { data, error } = await supabase
    .from('forum_replies')
    .insert(reply)
    .select()
    .single()
  
  return { data, error }
}

// Product helpers
export const getProducts = async (category?: string, breedId?: number, limit = 20, offset = 0) => {
  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)
  
  if (category) {
    query = query.eq('category', category)
  }
  
  if (breedId) {
    query = query.contains('breed_specific', [breedId])
  }
  
  const { data, error } = await query
  return { data, error }
}

export const getProductById = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  
  return { data, error }
}



// Real-time subscriptions
export const subscribeToForumPosts = (callback: (payload: any) => void) => {
  return supabase
    .channel('forum_posts')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'forum_posts'
    }, callback)
    .subscribe()
}

export const subscribeToForumReplies = (callback: (payload: any) => void) => {
  return supabase
    .channel('forum_replies')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'forum_replies'
    }, callback)
    .subscribe()
}

// Storage helpers
export const uploadImage = async (file: File, path: string) => {
  const { data, error } = await supabase.storage
    .from('images')
    .upload(path, file)
  
  return { data, error }
}

export const getImageUrl = (path: string) => {
  const { data } = supabase.storage
    .from('images')
    .getPublicUrl(path)
  
  return data.publicUrl
} 
