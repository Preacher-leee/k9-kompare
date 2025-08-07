import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { DogApiService } from '@/services/api'
import { Breed } from '@/types'
import { useStore } from '@/context/store'
import React from 'react'

export const useBreeds = () => {
  return useQuery({
    queryKey: ['breeds'],
    queryFn: DogApiService.getAllBreeds,
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  })
}

export const useBreed = (id: number) => {
  return useQuery({
    queryKey: ['breed', id],
    queryFn: () => DogApiService.getBreedById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 30, // 30 minutes
  })
}

export const useSearchBreeds = (query: string) => {
  return useQuery({
    queryKey: ['breeds', 'search', query],
    queryFn: () => DogApiService.searchBreeds(query),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export const useBreedImages = (breedId: number, limit: number = 10) => {
  return useQuery({
    queryKey: ['breed', breedId, 'images', limit],
    queryFn: () => DogApiService.getBreedImages(breedId, limit),
    enabled: !!breedId,
    staleTime: 1000 * 60 * 60, // 1 hour
  })
}

export const useComparison = () => {
  const { breeds, addToComparison, removeFromComparison, clearComparison } = useStore()

  return {
    breeds,
    addToComparison,
    removeFromComparison,
    clearComparison,
    count: breeds.length,
    isEmpty: breeds.length === 0,
    isFull: breeds.length >= 4,
  }
}

export const useIsInComparison = (breedId: number) => {
  const { breeds } = useStore()
  return breeds.some(breed => breed.id === breedId)
}

export const useBreedTraits = (breed: Breed) => {
  const traits = breed.traits || {}
  
  return {
    size: traits.size || 3,
    lifespan: traits.lifespan || 3,
    energy: traits.energy || 3,
    intelligence: traits.intelligence || 3,
    friendliness: traits.friendliness || 3,
    trainability: traits.trainability || 3,
    goodWithChildren: traits.good_with_children || 3,
    goodWithPets: traits.good_with_pets || 3,
    barking: traits.barking || 3,
    shedding: traits.shedding || 3,
    grooming: traits.grooming || 3,
    health: traits.health || 3,
    drooling: traits.drooling || 3,
    exerciseNeeds: traits.exercise_needs || 3,
    climateAdaptability: traits.climate_adaptability || 3,
    watchdogAbility: traits.watchdog_ability || 3,
    separationTolerance: traits.separation_tolerance || 3,
    popularityRank: traits.popularity_rank || 3,
  }
}

export const useBreedComparison = (breeds: Breed[]) => {
  const getBestInTrait = (trait: keyof Breed['traits']) => {
    if (breeds.length === 0) return null
    
    let bestBreed = breeds[0]
    let bestValue = breeds[0].traits?.[trait] || 0
    
    breeds.forEach(breed => {
      const value = breed.traits?.[trait] || 0
      if (value > bestValue) {
        bestValue = value
        bestBreed = breed
      }
    })
    
    return bestBreed
  }

  const getTraitComparison = (trait: keyof Breed['traits']) => {
    return breeds.map(breed => ({
      breed,
      value: breed.traits?.[trait] || 0,
      isBest: breed.id === getBestInTrait(trait)?.id,
    }))
  }

  return {
    getBestInTrait,
    getTraitComparison,
    hasTraits: breeds.some(breed => breed.traits),
  }
}

export const useBreedFilters = () => {
  const { filters, setFilters, updateFilters, clearFilters } = useStore()
  
  const applyFilters = (breeds: Breed[]) => {
    let filteredBreeds = [...breeds]
    
    // Size filter
    if (filters.size && filters.size.length > 0) {
      filteredBreeds = filteredBreeds.filter(breed => {
        const avgWeight = parseFloat(breed.weight.metric.split(' - ')[0])
        let size = 'medium'
        if (avgWeight < 10) size = 'small'
        else if (avgWeight > 50) size = 'large'
        
        return filters.size!.includes(size)
      })
    }
    
    // Temperament filter
    if (filters.temperament && filters.temperament.length > 0) {
      filteredBreeds = filteredBreeds.filter(breed => {
        const breedTemperaments = breed.temperament.toLowerCase().split(', ')
        return filters.temperament!.some(temp =>
          breedTemperaments.includes(temp.toLowerCase())
        )
      })
    }
    
    // Breed group filter
    if (filters.breed_group && filters.breed_group.length > 0) {
      filteredBreeds = filteredBreeds.filter(breed =>
        filters.breed_group!.includes(breed.breed_group)
      )
    }
    
    // Lifespan range filter
    if (filters.lifespan_range) {
      const [min, max] = filters.lifespan_range
      filteredBreeds = filteredBreeds.filter(breed => {
        const breedLifespan = parseFloat(breed.life_span.split(' - ')[0])
        return breedLifespan >= min && breedLifespan <= max
      })
    }
    
    return filteredBreeds
  }
  
  return {
    filters,
    setFilters,
    updateFilters,
    clearFilters,
    applyFilters,
    hasActiveFilters: Object.keys(filters).some(key => {
      const value = filters[key as keyof typeof filters]
      return value !== undefined && value !== null && 
             (Array.isArray(value) ? value.length > 0 : value !== '')
    }),
  }
}

export const useBreedSearch = () => {
  const [searchQuery, setSearchQuery] = React.useState('')
  const { data: breeds, isLoading, error } = useSearchBreeds(searchQuery)
  
  const debouncedSetSearchQuery = React.useMemo(
    () => debounce(setSearchQuery, 300),
    []
  )
  
  return {
    searchQuery,
    setSearchQuery: debouncedSetSearchQuery,
    breeds: breeds || [],
    isLoading,
    error,
  }
}

// Utility function for debouncing
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
} 
