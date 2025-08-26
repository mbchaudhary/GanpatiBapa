'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flower, Star, Heart } from 'lucide-react'

interface FlowerItem {
  id: number
  x: number
  delay: number
  type: 'flower' | 'star' | 'heart'
  color: string
}

const FlowerAnimation = () => {
  const [flowers, setFlowers] = useState<FlowerItem[]>([])

  useEffect(() => {
    // Generate random flowers
    const newFlowers: FlowerItem[] = Array.from({ length: 20 }, (_, index) => ({
      id: index,
      x: Math.random() * window.innerWidth,
      delay: Math.random() * 2,
      type: ['flower', 'star', 'heart'][Math.floor(Math.random() * 3)] as 'flower' | 'star' | 'heart',
      color: ['text-ganpati-gold', 'text-ganpati-orange', 'text-ganpati-yellow', 'text-ganpati-green', 'text-ganpati-red'][
        Math.floor(Math.random() * 5)
      ]
    }))

    setFlowers(newFlowers)
  }, [])

  const getIcon = (type: string, color: string) => {
    switch (type) {
      case 'flower':
        return <Flower className={`w-6 h-6 ${color} animate-sparkle`} />
      case 'star':
        return <Star className={`w-6 h-6 ${color} animate-sparkle`} />
      case 'heart':
        return <Heart className={`w-6 h-6 ${color} animate-sparkle`} />
      default:
        return <Flower className={`w-6 h-6 ${color} animate-sparkle`} />
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {flowers.map((flower) => (
          <motion.div
            key={flower.id}
            initial={{ 
              opacity: 0, 
              y: -100, 
              x: flower.x,
              rotate: 0 
            }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              y: window.innerHeight + 100, 
              x: flower.x + (Math.random() - 0.5) * 100,
              rotate: 360 
            }}
            transition={{ 
              duration: 3, 
              delay: flower.delay, 
              ease: "easeInOut",
              opacity: { duration: 3, times: [0, 0.1, 0.9, 1] }
            }}
            className="absolute flower"
            style={{ left: flower.x }}
          >
            {getIcon(flower.type, flower.color)}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Additional floating particles */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute w-2 h-2 bg-ganpati-gold rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Blessing text overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/30">
          <h3 className="text-2xl font-bold text-ganpati-gold text-center mb-2">
            🌸 Flower Offering 🌸
          </h3>
          <p className="text-white text-center">
            Ganpati Bapa accepts your prasad
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default FlowerAnimation
