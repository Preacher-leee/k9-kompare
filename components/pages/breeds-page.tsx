'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, Grid, List, Search } from 'lucide-react'
import { useBreeds, useBreedFilters } from '@/hooks/useBreeds'
import { BreedCard } from '@/components/breed-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { BreedSearch } from '@/components/breed-search'

export function BreedsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  const { data: allBreeds, isLoading, error } = useBreeds()
  const { filters, applyFilters, hasActiveFilters, clearFilters } = useBreedFilters()

  // Apply search and filters
  const filteredBreeds = allBreeds ? 
    applyFilters(
      allBreeds.filter(breed => 
        searchQuery === '' || 
        breed.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        breed.temperament.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ) : []

  if (isLoading) {
    return (
      <div className="container-responsive py-12">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-muted-foreground">Loading breeds...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-responsive py-12">
        <div className="error-state">
          <div className="error-state-icon">⚠️</div>
          <h3 className="error-state-title">Failed to load breeds</h3>
          <p className="error-state-message">Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-responsive py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
          Browse Dog Breeds
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover and compare hundreds of dog breeds to find your perfect companion.
        </p>
      </motion.div>

      {/* Search and Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8 space-y-4"
      >
        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search breeds by name or temperament..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 w-2 h-2 bg-primary rounded-full" />
              )}
            </Button>
            
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
              >
                Clear All
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {filteredBreeds.length} breeds found
            </span>
            
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-muted/50 rounded-lg p-4 border"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Size</label>
                <div className="space-y-2">
                  {['Small', 'Medium', 'Large'].map((size) => (
                    <label key={size} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={filters.size?.includes(size.toLowerCase()) || false}
                        onChange={(e) => {
                          const currentSizes = filters.size || []
                          if (e.target.checked) {
                            // Add size
                          } else {
                            // Remove size
                          }
                        }}
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Breed Group</label>
                <div className="space-y-2">
                  {['Working', 'Sporting', 'Hound', 'Terrier', 'Toy', 'Non-Sporting', 'Herding'].map((group) => (
                    <label key={group} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={filters.breed_group?.includes(group) || false}
                        onChange={(e) => {
                          const currentGroups = filters.breed_group || []
                          if (e.target.checked) {
                            // Add group
                          } else {
                            // Remove group
                          }
                        }}
                      />
                      {group}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Temperament</label>
                <div className="space-y-2">
                  {['Friendly', 'Energetic', 'Calm', 'Intelligent', 'Loyal', 'Playful'].map((temp) => (
                    <label key={temp} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={filters.temperament?.includes(temp) || false}
                        onChange={(e) => {
                          const currentTemps = filters.temperament || []
                          if (e.target.checked) {
                            // Add temperament
                          } else {
                            // Remove temperament
                          }
                        }}
                      />
                      {temp}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Breeds Grid */}
      {filteredBreeds.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}
        >
          {filteredBreeds.map((breed, index) => (
            <motion.div
              key={breed.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <BreedCard 
                breed={breed} 
                variant={viewMode === 'list' ? 'detailed' : 'default'}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="empty-state"
        >
          <div className="empty-state-icon">🐕</div>
          <h3 className="empty-state-title">No breeds found</h3>
          <p className="empty-state-message">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
        </motion.div>
      )}
    </div>
  )
} 
