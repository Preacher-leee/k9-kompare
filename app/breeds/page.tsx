import { Suspense } from 'react'
import { BreedsPage } from '@/components/pages/breeds-page'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export const metadata = {
  title: 'Dog Breeds - Browse All Breeds | K9Kompare',
  description: 'Browse and search through hundreds of dog breeds. Compare traits, find your perfect match, and learn about different breeds.',
}

export default function BreedsPageRoute() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BreedsPage />
    </Suspense>
  )
} 
