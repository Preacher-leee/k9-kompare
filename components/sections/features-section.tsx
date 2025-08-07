'use client'

import { motion } from 'framer-motion'
import { 
  Search, 
  BarChart3, 
  Brain, 
  Heart, 
  ShoppingBag, 
  Users,
  MessageCircle,
  Home
} from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Breed Comparison',
    description: 'Compare multiple dog breeds side-by-side across traits, temperament, and care requirements.',
    color: 'text-primary'
  },
  {
    icon: Brain,
    title: 'AI Breed Quiz',
    description: 'Take our intelligent quiz to find the perfect breed match based on your lifestyle and preferences.',
    color: 'text-accent'
  },
  {
    icon: BarChart3,
    title: 'Detailed Analytics',
    description: 'Get comprehensive breed statistics, health information, and care guidelines.',
    color: 'text-secondary'
  },
  {
    icon: Heart,
    title: 'Adoption Resources',
    description: 'Find local shelters, rescue organizations, and adoption opportunities for your chosen breed.',
    color: 'text-success'
  },
  {
    icon: ShoppingBag,
    title: 'Breed-Specific Products',
    description: 'Discover curated products and supplies tailored to your breed\'s specific needs.',
    color: 'text-warning'
  },
  {
    icon: Users,
    title: 'Community Forum',
    description: 'Connect with other dog owners, share experiences, and get advice from the community.',
    color: 'text-midnight'
  },
  {
    icon: MessageCircle,
    title: 'Expert Advice',
    description: 'Access professional guidance from veterinarians, trainers, and breed specialists.',
    color: 'text-mustard'
  },
  {
    icon: Home,
    title: 'Lifestyle Matching',
    description: 'Find breeds that perfectly match your living situation, activity level, and family dynamics.',
    color: 'text-danger'
  }
]

export function FeaturesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
            Everything You Need to Choose the Perfect Dog
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From comprehensive breed comparisons to AI-powered matching, we provide all the tools and resources you need to make an informed decision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Find Your Perfect Match?
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Join thousands of happy dog owners who found their perfect companion with K9Kompare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-mustard text-midnight px-8 py-3 rounded-lg font-semibold hover:bg-mustard/90 transition-colors">
                Start Your Journey
              </button>
              <button className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
