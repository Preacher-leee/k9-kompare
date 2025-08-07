'use client'

import { motion } from 'framer-motion'
import { useBreeds } from '@/hooks/useBreeds'
import { BreedCard } from '@/components/breed-card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Popular breed IDs for featured section
const FEATURED_BREED_IDS = [1, 2, 3, 4, 5, 6, 7, 8] // Golden Retriever, German Shepherd, etc.

export function FeaturedBreeds() {
  const { data: allBreeds, isLoading, error } = useBreeds()

  if (isLoading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-muted-foreground">Loading featured breeds...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container-responsive">
          <div className="error-state">
            <div className="error-state-icon">⚠️</div>
            <h3 className="error-state-title">Failed to load breeds</h3>
            <p className="error-state-message">Please try again later.</p>
          </div>
        </div>
      </section>
    )
  }

  const featuredBreeds = allBreeds?.filter(breed => 
    FEATURED_BREED_IDS.includes(breed.id)
  ).slice(0, 8) || []

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
            Popular Dog Breeds
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover some of the most beloved dog breeds and find your perfect companion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {featuredBreeds.map((breed, index) => (
            <motion.div
              key={breed.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <BreedCard breed={breed} variant="default" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild size="lg" className="bg-mustard text-midnight hover:bg-mustard/90">
            <Link href="/breeds">
              View All Breeds
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 
