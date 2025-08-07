import { Suspense } from 'react'
import { HeroSection } from '@/components/sections/hero-section'
import { FeaturedBreeds } from '@/components/sections/featured-breeds'
import { FeaturesSection } from '@/components/sections/features-section'
import { CTASection } from '@/components/sections/cta-section'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedBreeds />
      </Suspense>
      
      <FeaturesSection />
      <CTASection />
    </main>
  )
} 
