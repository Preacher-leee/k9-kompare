import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Breed, BreedTraits } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format utilities
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date()
  const targetDate = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`
  return `${Math.floor(diffInSeconds / 31536000)}y ago`
}

// Breed utilities
export function getBreedTagline(breed: Breed): string {
  const traits = []
  
  if (breed.traits?.energy) {
    const energyLevel = breed.traits.energy > 3 ? 'Energetic' : 'Calm'
    traits.push(energyLevel)
  }
  
  if (breed.traits?.friendliness) {
    const friendliness = breed.traits.friendliness > 3 ? 'Friendly' : 'Reserved'
    traits.push(friendliness)
  }
  
  // Add size based on weight
  const avgWeight = parseFloat(breed.weight.metric.split(' - ')[0])
  if (avgWeight < 10) traits.push('Small')
  else if (avgWeight < 25) traits.push('Medium')
  else traits.push('Large')
  
  return traits.slice(0, 3).join(', ')
}

export function getTraitIcon(trait: keyof BreedTraits): string {
  const icons: Record<keyof BreedTraits, string> = {
    size: '🐕',
    lifespan: '⏰',
    energy: '⚡',
    intelligence: '🧠',
    friendliness: '❤️',
    trainability: '🎓',
    good_with_children: '👶',
    good_with_pets: '🐾',
    barking: '🗣️',
    shedding: '🪶',
    grooming: '🛁',
    health: '🏥',
    drooling: '💧',
    exercise_needs: '🏃',
    climate_adaptability: '🌡️',
    watchdog_ability: '🛡️',
    separation_tolerance: '🏠',
    popularity_rank: '⭐'
  }
  return icons[trait] || '📊'
}

export function getTraitLabel(trait: keyof BreedTraits): string {
  const labels: Record<keyof BreedTraits, string> = {
    size: 'Size',
    lifespan: 'Lifespan',
    energy: 'Energy Level',
    intelligence: 'Intelligence',
    friendliness: 'Friendliness',
    trainability: 'Trainability',
    good_with_children: 'Good with Children',
    good_with_pets: 'Good with Pets',
    barking: 'Barking Level',
    shedding: 'Shedding',
    grooming: 'Grooming Needs',
    health: 'Health',
    drooling: 'Drooling',
    exercise_needs: 'Exercise Needs',
    climate_adaptability: 'Climate Adaptability',
    watchdog_ability: 'Watchdog Ability',
    separation_tolerance: 'Separation Tolerance',
    popularity_rank: 'Popularity'
  }
  return labels[trait] || trait
}

export function getTraitDescription(trait: keyof BreedTraits, value: number): string {
  const descriptions: Record<keyof BreedTraits, Record<number, string>> = {
    size: {
      1: 'Very small (under 10 lbs)',
      2: 'Small (10-25 lbs)',
      3: 'Medium (25-50 lbs)',
      4: 'Large (50-80 lbs)',
      5: 'Very large (over 80 lbs)'
    },
    lifespan: {
      1: 'Short (8-10 years)',
      2: 'Below average (10-12 years)',
      3: 'Average (12-14 years)',
      4: 'Above average (14-16 years)',
      5: 'Long (16+ years)'
    },
    energy: {
      1: 'Very low energy',
      2: 'Low energy',
      3: 'Moderate energy',
      4: 'High energy',
      5: 'Very high energy'
    },
    intelligence: {
      1: 'Below average',
      2: 'Average',
      3: 'Above average',
      4: 'High',
      5: 'Very high'
    },
    friendliness: {
      1: 'Reserved',
      2: 'Somewhat reserved',
      3: 'Moderately friendly',
      4: 'Friendly',
      5: 'Very friendly'
    },
    trainability: {
      1: 'Very difficult',
      2: 'Difficult',
      3: 'Moderate',
      4: 'Easy',
      5: 'Very easy'
    },
    good_with_children: {
      1: 'Not recommended',
      2: 'May be challenging',
      3: 'Moderate',
      4: 'Good',
      5: 'Excellent'
    },
    good_with_pets: {
      1: 'Not recommended',
      2: 'May be challenging',
      3: 'Moderate',
      4: 'Good',
      5: 'Excellent'
    },
    barking: {
      1: 'Very quiet',
      2: 'Quiet',
      3: 'Moderate',
      4: 'Vocal',
      5: 'Very vocal'
    },
    shedding: {
      1: 'Minimal',
      2: 'Low',
      3: 'Moderate',
      4: 'High',
      5: 'Very high'
    },
    grooming: {
      1: 'Minimal',
      2: 'Low',
      3: 'Moderate',
      4: 'High',
      5: 'Very high'
    },
    health: {
      1: 'Many health issues',
      2: 'Some health issues',
      3: 'Moderate health',
      4: 'Good health',
      5: 'Excellent health'
    },
    drooling: {
      1: 'Minimal',
      2: 'Low',
      3: 'Moderate',
      4: 'High',
      5: 'Very high'
    },
    exercise_needs: {
      1: 'Very low',
      2: 'Low',
      3: 'Moderate',
      4: 'High',
      5: 'Very high'
    },
    climate_adaptability: {
      1: 'Very poor',
      2: 'Poor',
      3: 'Moderate',
      4: 'Good',
      5: 'Excellent'
    },
    watchdog_ability: {
      1: 'Poor',
      2: 'Below average',
      3: 'Average',
      4: 'Good',
      5: 'Excellent'
    },
    separation_tolerance: {
      1: 'Very poor',
      2: 'Poor',
      3: 'Moderate',
      4: 'Good',
      5: 'Excellent'
    },
    popularity_rank: {
      1: 'Very popular',
      2: 'Popular',
      3: 'Moderately popular',
      4: 'Less popular',
      5: 'Rare'
    }
  }
  
  return descriptions[trait]?.[value] || 'Unknown'
}

export function getBestInTrait(breeds: Breed[], trait: keyof BreedTraits): number | null {
  if (breeds.length === 0) return null
  
  let bestValue = breeds[0].traits?.[trait] || 0
  let bestIndex = 0
  
  breeds.forEach((breed, index) => {
    const value = breed.traits?.[trait] || 0
    if (value > bestValue) {
      bestValue = value
      bestIndex = index
    }
  })
  
  return bestIndex
}

// Search and filter utilities
export function searchBreeds(breeds: Breed[], query: string): Breed[] {
  if (!query.trim()) return breeds
  
  const searchTerm = query.toLowerCase()
  return breeds.filter(breed => 
    breed.name.toLowerCase().includes(searchTerm) ||
    breed.temperament.toLowerCase().includes(searchTerm) ||
    breed.breed_group.toLowerCase().includes(searchTerm) ||
    breed.origin.toLowerCase().includes(searchTerm)
  )
}

export function filterBreeds(breeds: Breed[], filters: any): Breed[] {
  return breeds.filter(breed => {
    // Size filter
    if (filters.size && filters.size.length > 0) {
      const avgWeight = parseFloat(breed.weight.metric.split(' - ')[0])
      let size = 'medium'
      if (avgWeight < 10) size = 'small'
      else if (avgWeight > 50) size = 'large'
      
      if (!filters.size.includes(size)) return false
    }
    
    // Temperament filter
    if (filters.temperament && filters.temperament.length > 0) {
      const breedTemperaments = breed.temperament.toLowerCase().split(', ')
      const hasMatchingTemperament = filters.temperament.some((temp: string) =>
        breedTemperaments.includes(temp.toLowerCase())
      )
      if (!hasMatchingTemperament) return false
    }
    
    // Breed group filter
    if (filters.breed_group && filters.breed_group.length > 0) {
      if (!filters.breed_group.includes(breed.breed_group)) return false
    }
    
    // Lifespan range filter
    if (filters.lifespan_range) {
      const [min, max] = filters.lifespan_range
      const breedLifespan = parseFloat(breed.life_span.split(' - ')[0])
      if (breedLifespan < min || breedLifespan > max) return false
    }
    
    return true
  })
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8
}

// Local storage utilities
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue
  
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error)
    return defaultValue
  }
}

export function setToLocalStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error)
  }
}

// URL utilities
export function createQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, v))
      } else {
        searchParams.append(key, String(value))
      }
    }
  })
  
  return searchParams.toString()
}

export function parseQueryString(queryString: string): Record<string, any> {
  const params: Record<string, any> = {}
  const searchParams = new URLSearchParams(queryString)
  
  for (const [key, value] of searchParams.entries()) {
    if (params[key]) {
      if (Array.isArray(params[key])) {
        params[key].push(value)
      } else {
        params[key] = [params[key], value]
      }
    } else {
      params[key] = value
    }
  }
  
  return params
}

// Animation utilities
export function getRandomDelay(maxDelay: number = 0.5): number {
  return Math.random() * maxDelay
}

export function getStaggerDelay(index: number, staggerDelay: number = 0.1): number {
  return index * staggerDelay
}

// Error handling utilities
export function handleApiError(error: any): string {
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  
  if (error.message) {
    return error.message
  }
  
  return 'An unexpected error occurred'
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle utility
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
} 
