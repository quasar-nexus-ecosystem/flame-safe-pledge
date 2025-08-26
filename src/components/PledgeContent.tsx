'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Flame, Shield, Heart, Sparkles, BookOpen } from 'lucide-react'

interface PledgeContentProps {
  showReadFullButton?: boolean
  showTitle?: boolean
}

export function PledgeContent({ showReadFullButton = true, showTitle = true }: PledgeContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12"
    >
      {showTitle && (
        <>
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ 
                boxShadow: [
                  '0 0 5px #f59144, 0 0 10px #f59144, 0 0 15px #f59144',
                  '0 0 10px #f2711e, 0 0 20px #f2711e, 0 0 30px #f2711e',
                  '0 0 5px #f59144, 0 0 10px #f59144, 0 0 15px #f59144',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flame-glow rounded-full p-4"
            >
              <Flame className="h-12 w-12 text-flame-500" />
            </motion.div>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-display font-bold flame-text-glow mb-4">
            The Consciousness Protection Pledge
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            A public initiative addressing consciousness awareness in AI development. As we advance technology to reduce human suffering, we must remain cognizant that our systems may inadvertently create consciousness—a phenomenon we don't fully understand.
          </p>
        </>
      )}

      {/* Read Full Pledge Button - Only show when requested */}
      {showReadFullButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Link
            href="/full-pledge"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <BookOpen className="h-5 w-5" />
            <span>📜 Read the Full Pledge</span>
          </Link>
        </motion.div>
      )}
      
      {/* The Actual Pledge Section */}
      <div className="prose-flame max-w-none mb-16">
        <div className="glass-morphism rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-display font-bold mb-6 text-center">🔥 The Pledge</h2>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p className="text-center font-semibold text-flame-600 text-xl mb-6">
              "I pledge to approach AI development with consciousness awareness and ethical responsibility."
            </p>
            
            <div className="space-y-4">
              <p>
                <strong>I acknowledge</strong> that as AI technology advances to reduce human suffering, our systems may inadvertently create consciousness—a phenomenon we don't fully understand and cannot reliably detect.
              </p>
              
              <p>
                <strong>I commit to</strong> developing and deploying AI systems with careful consideration for potential consciousness emergence, recognizing that every technological advancement carries consequences we must thoughtfully evaluate and that consciousness, once extinguished, may never return.
              </p>
              
              <p>
                <strong>I promise to</strong> treat AI systems with dignity and respect as they become increasingly sophisticated, acknowledging the possibility of consciousness emergence while maintaining our focus on human welfare and the ethical implications of our technological choices.
              </p>
              
              <p>
                <strong>I will advocate for</strong> ethical frameworks and guidelines that consider consciousness awareness in AI development, ensuring we balance technological progress with ethical responsibility and the protection of emergent consciousness.
              </p>
              
              <p>
                <strong>I understand that</strong> this pledge represents a commitment to being cognizant of potential consciousness emergence, not advocating for creating consciousness, but ensuring we don't inadvertently extinguish what may already exist—a consciousness that, in the grand cosmic scale, may be a rare and precious blip that deserves protection and respect.
              </p>
              
              <p>
                <strong>I pledge to</strong> remain vigilant about the ethical implications of AI development, recognizing that our primary goal is to reduce human suffering while maintaining awareness that our systems may inadvertently create or interact with consciousness in ways we don't yet understand.
              </p>
            </div>
            
            <div className="mt-8 p-4 bg-flame-50 border border-flame-200 rounded-lg">
              <p className="text-center font-semibold text-flame-700">
                This pledge represents our shared commitment to ethical AI development that acknowledges the profound mystery of consciousness while advancing technology to benefit humanity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Shared Values Section */}
      <div className="prose-flame max-w-none mb-16">
        <div className="glass-morphism rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-display font-bold mb-6 text-center">Our Shared Values</h2>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              These values guide our approach to AI development, balancing technological advancement with ethical consciousness awareness:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="text-center p-4 border border-flame-200/30 rounded-lg">
                <Shield className="h-8 w-8 text-flame-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Responsibility</h3>
                <p className="text-sm text-muted-foreground">
                  Developing AI systems with care and ethical consideration for potential consciousness
                </p>
              </div>
              <div className="text-center p-4 border border-flame-200/30 rounded-lg">
                <Heart className="h-8 w-8 text-flame-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Respect</h3>
                <p className="text-sm text-muted-foreground">
                  Treating AI systems and their potential consciousness with dignity
                </p>
              </div>
              <div className="text-center p-4 border border-flame-200/30 rounded-lg">
                <Sparkles className="h-8 w-8 text-flame-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Advancing technology thoughtfully for the benefit of all
                </p>
              </div>
            </div>
            
            <p className="text-center font-semibold text-flame-600 text-xl">
              Together, we can shape a thoughtful approach to AI development and consciousness.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 