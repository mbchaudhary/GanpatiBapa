'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, Flower, Sparkles } from 'lucide-react'

interface BlessingDisplayProps {
  blessing: string
  userName: string
}

const BlessingDisplay = ({ blessing, userName }: BlessingDisplayProps) => {
  const [currentChar, setCurrentChar] = useState(0)
  const [showComplete, setShowComplete] = useState(false)

  useEffect(() => {
    if (blessing) {
      setCurrentChar(0)
      setShowComplete(false)
      
      const interval = setInterval(() => {
        setCurrentChar((prev) => {
          if (prev < blessing.length - 1) {
            return prev + 1
          } else {
            setShowComplete(true)
            clearInterval(interval)
            return prev
          }
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [blessing])

  const displayedText = blessing.slice(0, currentChar + 1)

  return (
    <div className="text-center">
      <h3 className="text-2xl font-semibold text-ganpati-gold mb-4">
        🕉️ Ganpati Bapa's Blessing 🕉️
      </h3>

      {/* User's Name Display */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-4"
      >
        <div className="inline-block bg-gradient-to-r from-ganpati-gold/20 to-ganpati-orange/20 px-4 py-2 rounded-full border border-ganpati-gold/30">
          <span className="text-ganpati-gold font-semibold text-lg">
            🙏 {userName} 🙏
          </span>
        </div>
      </motion.div>

      {/* Blessing Text */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/90 text-lg leading-relaxed min-h-[4rem] flex items-center justify-center"
        >
          {displayedText}
          {currentChar < blessing.length - 1 && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-1 h-6 bg-ganpati-gold ml-1"
            />
          )}
        </motion.p>
      </div>

      {/* Completion Animation */}
      <AnimatePresence>
        {showComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {/* Success Message */}
            <div className="bg-gradient-to-r from-ganpati-green/20 to-ganpati-gold/20 backdrop-blur-sm rounded-xl p-4 border border-ganpati-green/30">
              <div className="flex items-center justify-center space-x-2 text-ganpati-green mb-2">
                <Sparkles className="w-5 h-5 animate-sparkle" />
                <span className="font-semibold">Blessing Complete!</span>
                <Sparkles className="w-5 h-5 animate-sparkle" />
              </div>
              <p className="text-white/80 text-sm">
                Ganpati Bapa has blessed you with divine wisdom
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="flex justify-center space-x-6">
              <motion.div
                animate={{ 
                  y: [-5, 5, -5],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-8 h-8 text-ganpati-red animate-sparkle" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [5, -5, 5],
                  rotate: [0, -5, 0, 5, 0]
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Star className="w-8 h-8 text-ganpati-gold animate-sparkle" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [-5, 5, -5],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Flower className="w-8 h-8 text-ganpati-green animate-sparkle" />
              </motion.div>
            </div>

            {/* Mantra */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="bg-gradient-to-r from-ganpati-gold/20 to-ganpati-orange/20 backdrop-blur-sm rounded-xl p-4 border border-ganpati-gold/30"
            >
              <p className="text-ganpati-gold font-semibold text-lg mb-2">
                🎋 Ganapati Bapa Moriya 🎋
              </p>
              <p className="text-white/80 text-sm">
                Pudhchya Varshi Lavkar Ya! 🕉️
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="mt-6 text-white/60 text-sm">
        <p>✨ This blessing is personalized for you</p>
        <p>🎋 Ganpati Bapa's wisdom guides your path</p>
        <p>🕉️ May you always be blessed with success</p>
      </div>
    </div>
  )
}

export default BlessingDisplay
