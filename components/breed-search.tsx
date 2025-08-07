'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useBreedSearch } from '@/hooks/useBreeds'
import { useStore } from '@/context/store'
import Link from 'next/link'
import Image from 'next/image'

export function BreedSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const { searchQuery, setSearchQuery, breeds, isLoading } = useBreedSearch()
  const { addToComparison } = useStore()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setActiveIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setIsOpen(searchQuery.length > 0 && breeds.length > 0)
  }, [searchQuery, breeds])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex(prev => Math.min(prev + 1, breeds.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex(prev => Math.max(prev - 1, -1))
        break
      case 'Enter':
        e.preventDefault()
        if (activeIndex >= 0 && breeds[activeIndex]) {
          handleBreedSelect(breeds[activeIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setActiveIndex(-1)
        break
    }
  }

  const handleBreedSelect = (breed: any) => {
    setIsOpen(false)
    setActiveIndex(-1)
    setSearchQuery('')
    // Navigate to breed page
    window.location.href = `/breeds/${breed.id}`
  }

  const handleAddToComparison = (e: React.MouseEvent, breed: any) => {
    e.stopPropagation()
    addToComparison(breed)
    setIsOpen(false)
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for dog breeds..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(searchQuery.length > 0 && breeds.length > 0)}
          className="pl-10 pr-10 h-12 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-300 focus:bg-white/20 focus:border-white/40"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery('')
              setIsOpen(false)
              inputRef.current?.focus()
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Search Suggestions */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2">Searching breeds...</p>
            </div>
          ) : breeds.length > 0 ? (
            <div className="py-2">
              {breeds.slice(0, 8).map((breed, index) => (
                <div
                  key={breed.id}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                    index === activeIndex ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleBreedSelect(breed)}
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    {breed.image?.url ? (
                      <Image
                        src={breed.image.url}
                        alt={breed.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">🐕</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {breed.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {breed.breed_group} • {breed.temperament?.split(', ').slice(0, 2).join(', ')}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleAddToComparison(e, breed)}
                    className="text-primary hover:text-primary/80"
                  >
                    + Compare
                  </Button>
                </div>
              ))}
              {breeds.length > 8 && (
                <div className="px-4 py-2 text-center text-sm text-gray-500 border-t">
                  Showing 8 of {breeds.length} results
                </div>
              )}
            </div>
          ) : searchQuery.length > 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p>No breeds found for "{searchQuery}"</p>
              <p className="text-sm mt-1">Try a different search term</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
} 