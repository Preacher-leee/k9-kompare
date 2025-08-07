'use client'

import { motion } from 'framer-motion'
import { Heart, Plus, Minus } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Breed, BreedCardProps } from '@/types'
import { useStore } from '@/context/store'
import { getBreedTagline } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'

export function BreedCard({ 
  breed, 
  variant = 'default', 
  showActions = true,
  isInComparison = false 
}: BreedCardProps) {
  const { addToComparison, removeFromComparison } = useStore()
  const tagline = getBreedTagline(breed)

  const handleAddToComparison = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToComparison(breed)
  }

  const handleRemoveFromComparison = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    removeFromComparison(breed.id)
  }

  const cardVariants = {
    default: 'h-full',
    compact: 'h-32',
    detailed: 'h-full'
  }

  const imageVariants = {
    default: 'h-48',
    compact: 'h-24 w-24',
    detailed: 'h-64'
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className={`${cardVariants[variant]} overflow-hidden hover:shadow-lg transition-shadow`}>
        <Link href={`/breeds/${breed.id}`} className="block h-full">
          <div className="relative">
            <div className={`${imageVariants[variant]} w-full overflow-hidden`}>
              {breed.image?.url ? (
                <Image
                  src={breed.image.url}
                  alt={breed.name}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-4xl">🐕</span>
                </div>
              )}
            </div>
            
            {variant === 'default' && (
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-white/90 text-gray-900">
                  {breed.breed_group}
                </Badge>
              </div>
            )}

            {showActions && (
              <div className="absolute top-2 left-2">
                {isInComparison ? (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleRemoveFromComparison}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleAddToComparison}
                    className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </div>

          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg truncate">{breed.name}</h3>
              
              {variant !== 'compact' && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {tagline}
                </p>
              )}

              {variant === 'detailed' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>📍 {breed.origin}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>⏰ {breed.life_span} years</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>⚖️ {breed.weight.metric} kg</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>

          {variant === 'default' && (
            <CardFooter className="p-4 pt-0">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Heart className="h-4 w-4" />
                  <span>Popular</span>
                </div>
                <Button variant="ghost" size="sm" className="text-primary">
                  Learn More
                </Button>
              </div>
            </CardFooter>
          )}
        </Link>
      </Card>
    </motion.div>
  )
} 