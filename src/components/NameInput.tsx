'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Heart, Star, Flower } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'

interface NameInputProps {
  onSubmit: (name: string) => void
}

const NameInput = ({ onSubmit }: NameInputProps) => {
  const [name, setName] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      setIsSubmitted(true)
      onSubmit(name.trim())
      setTimeout(() => setIsSubmitted(false), 3000)
      setName('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && name.trim()) {
      handleSubmit(e as any)
    }
  }

  return (
    <div className="text-center">
      <h3 className="text-2xl font-semibold text-ganpati-gold mb-4">
        🙏 Personal Blessings 🙏
      </h3>
      
      <p className="text-white/80 mb-6">
        Enter your name to receive personalized blessings from Ganpati Bapa
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ganpati-gold w-5 h-5" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your name..."
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-ganpati-gold focus:bg-white/20 transition-all duration-300"
            disabled={isSubmitted}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!name.trim() || isSubmitted}
          className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${
            !name.trim() || isSubmitted
              ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-ganpati-gold to-ganpati-orange text-white hover:shadow-lg hover:shadow-ganpati-gold/25'
          }`}
        >
          {isSubmitted ? '🕉️ Blessing Sent!' : '🌟 Get Blessing 🌟'}
        </motion.button>
      </form>

      {/* Success Animation */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mt-6"
          >
            <div className="bg-gradient-to-r from-ganpati-green/20 to-ganpati-gold/20 backdrop-blur-sm rounded-xl p-4 border border-ganpati-green/30">
              <div className="flex items-center justify-center space-x-2 text-ganpati-green">
                <Star className="w-5 h-5 animate-sparkle" />
                <span className="font-semibold">Blessing Sent Successfully!</span>
                <Star className="w-5 h-5 animate-sparkle" />
              </div>
              <p className="text-white/80 text-sm mt-2">
                Ganpati Bapa is preparing your personalized blessing...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="mt-6 flex justify-center space-x-4">
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Flower className="w-6 h-6 text-ganpati-gold animate-sparkle" />
        </motion.div>
        <motion.div
          animate={{ y: [5, -5, 5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-6 h-6 text-ganpati-red animate-sparkle" />
        </motion.div>
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Star className="w-6 h-6 text-ganpati-yellow animate-sparkle" />
        </motion.div>
      </div>

      {/* Instructions */}
      <div className="mt-6 text-white/60 text-sm">
        <p>✨ Your name will be spoken in the blessing</p>
        <p>🎋 Receive personalized divine guidance</p>
        <p>🕉️ Experience Ganpati Bapa's love</p>
      </div>
    </div>
  )
}

export default NameInput
