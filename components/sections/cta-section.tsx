'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Heart, Users, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="section-padding bg-gradient-midnight text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center" />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-10 right-10 w-32 h-32 bg-mustard/20 rounded-full blur-3xl"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-24 h-24 bg-accent/20 rounded-full blur-3xl"
        animate={{
          y: [0, 20, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container-responsive relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-6">
              Ready to Find Your Perfect
              <span className="block text-mustard">Furry Companion?</span>
            </h2>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of happy dog owners who found their perfect match with our comprehensive breed comparison platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              asChild
              size="lg"
              className="bg-mustard text-midnight hover:bg-mustard/90 font-semibold text-lg px-8 py-4"
            >
              <Link href="/quiz" className="flex items-center gap-2">
                Take the Breed Quiz
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-midnight font-semibold text-lg px-8 py-4"
            >
              <Link href="/breeds" className="flex items-center gap-2">
                Browse All Breeds
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-mustard/20 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-mustard" />
                </div>
              </div>
              <div className="text-2xl font-bold mb-2">10,000+</div>
              <div className="text-gray-300">Happy Matches</div>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-accent" />
                </div>
              </div>
              <div className="text-2xl font-bold mb-2">50,000+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="text-2xl font-bold mb-2">99%</div>
              <div className="text-gray-300">Accuracy Rate</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
          >
            <p className="text-lg text-gray-300 mb-4">
              "K9Kompare helped me find the perfect breed for my lifestyle. The comparison tools are incredible!"
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-mustard rounded-full flex items-center justify-center">
                <span className="text-midnight font-bold text-sm">S</span>
              </div>
              <span className="font-semibold">Sarah M.</span>
              <span className="text-gray-400">• Golden Retriever Owner</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 
