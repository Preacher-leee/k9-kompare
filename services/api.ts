import { Breed, QuizAnswer, QuizResult, AdoptionListing } from '@/types'

// The Dog API
const DOG_API_BASE_URL = 'https://api.thedogapi.com/v1'
const DOG_API_KEY = process.env.NEXT_PUBLIC_DOG_API_KEY

export class DogApiService {
  static async getAllBreeds(): Promise<Breed[]> {
    try {
      const response = await fetch(`${DOG_API_BASE_URL}/breeds`, {
        headers: {
          'x-api-key': DOG_API_KEY || '',
        },
      })

      if (!response.ok) {
        throw new Error(`Dog API error: ${response.status}`)
      }

      const breeds = await response.json()
      return breeds.map((breed: any) => this.transformBreedData(breed))
    } catch (error) {
      console.error('Error fetching breeds:', error)
      throw error
    }
  }

  static async getBreedById(id: number): Promise<Breed> {
    try {
      const response = await fetch(`${DOG_API_BASE_URL}/breeds/${id}`, {
        headers: {
          'x-api-key': DOG_API_KEY || '',
        },
      })

      if (!response.ok) {
        throw new Error(`Dog API error: ${response.status}`)
      }

      const breed = await response.json()
      return this.transformBreedData(breed)
    } catch (error) {
      console.error('Error fetching breed:', error)
      throw error
    }
  }

  static async searchBreeds(query: string): Promise<Breed[]> {
    try {
      const response = await fetch(`${DOG_API_BASE_URL}/breeds/search?q=${encodeURIComponent(query)}`, {
        headers: {
          'x-api-key': DOG_API_KEY || '',
        },
      })

      if (!response.ok) {
        throw new Error(`Dog API error: ${response.status}`)
      }

      const breeds = await response.json()
      return breeds.map((breed: any) => this.transformBreedData(breed))
    } catch (error) {
      console.error('Error searching breeds:', error)
      throw error
    }
  }

  static async getBreedImages(breedId: number, limit: number = 10): Promise<string[]> {
    try {
      const response = await fetch(
        `${DOG_API_BASE_URL}/images/search?breed_id=${breedId}&limit=${limit}`,
        {
          headers: {
            'x-api-key': DOG_API_KEY || '',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Dog API error: ${response.status}`)
      }

      const images = await response.json()
      return images.map((image: any) => image.url)
    } catch (error) {
      console.error('Error fetching breed images:', error)
      throw error
    }
  }

  private static transformBreedData(breed: any): Breed {
    return {
      id: breed.id,
      name: breed.name,
      temperament: breed.temperament || '',
      life_span: breed.life_span || '',
      alt_names: breed.alt_names || '',
      wikipedia_url: breed.wikipedia_url || '',
      origin: breed.origin || '',
      weight: breed.weight || { imperial: '', metric: '' },
      height: breed.height || { imperial: '', metric: '' },
      bred_for: breed.bred_for || '',
      breed_group: breed.breed_group || '',
      image: breed.image || { id: '', width: 0, height: 0, url: '' },
      reference_image_id: breed.reference_image_id || '',
      // Enrich with custom traits (these would be populated from Supabase)
      traits: undefined,
      pros: undefined,
      cons: undefined,
      health_risks: undefined,
      grooming_needs: undefined,
      exercise_needs: undefined,
      training_difficulty: undefined,
      shedding_level: undefined,
      barking_level: undefined,
      friendliness: undefined,
      adaptability: undefined,
      watch_dog_ability: undefined,
      separation_tolerance: undefined,
      popularity_rank: undefined,
    }
  }
}



// OpenAI Service
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export class OpenAIService {
  static async generateBreedSummary(breed: Breed): Promise<{
    summary: string
    pros: string[]
    cons: string[]
    healthRisks: string[]
  }> {
    try {
      const response = await fetch('/api/openai/breed-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ breed }),
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error generating breed summary:', error)
      throw error
    }
  }

  static async generateQuizResults(answers: QuizAnswer[], breeds: Breed[]): Promise<QuizResult[]> {
    try {
      const response = await fetch('/api/openai/quiz-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers, breeds }),
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error generating quiz results:', error)
      throw error
    }
  }
}

// Stripe Service
const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

export class StripeService {
  static async createPaymentIntent(amount: number, currency: string = 'usd'): Promise<{
    clientSecret: string
  }> {
    try {
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, currency }),
      })

      if (!response.ok) {
        throw new Error(`Stripe API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating payment intent:', error)
      throw error
    }
  }

  static async createCheckoutSession(items: Array<{
    price: string
    quantity: number
  }>): Promise<{ sessionId: string }> {
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      })

      if (!response.ok) {
        throw new Error(`Stripe API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw error
    }
  }
}

// Analytics Service
export class AnalyticsService {
  static trackEvent(event: string, properties?: Record<string, any>) {
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible(event, { props: properties })
    }
  }

  static trackPageView(url: string) {
    this.trackEvent('pageview', { url })
  }

  static trackBreedView(breedId: number, breedName: string) {
    this.trackEvent('breed_view', { breedId, breedName })
  }

  static trackComparison(breedIds: number[]) {
    this.trackEvent('breed_comparison', { breedIds })
  }

  static trackQuizCompletion(answers: QuizAnswer[]) {
    this.trackEvent('quiz_completion', { answerCount: answers.length })
  }

  static trackProductView(productId: string, category: string) {
    this.trackEvent('product_view', { productId, category })
  }

  static trackPurchase(orderId: string, amount: number, currency: string) {
    this.trackEvent('purchase', { orderId, amount, currency })
  }
} 
