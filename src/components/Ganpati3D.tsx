'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flower, Star, Heart, Sparkles, Crown, Play, Pause, Volume2, VolumeX, Youtube } from 'lucide-react'
import Image from 'next/image'

// Enhanced 3D Ganpati Component with Real Aarti
const EnhancedGanpati3D = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAarti, setCurrentAarti] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [showYouTube, setShowYouTube] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const speechRef = useRef<SpeechSynthesis | null>(null)

  const aartis = [
    {
      title: "Ganpati Aarti - Jai Ganesh",
      text: "Jai Ganesh Jai Ganesh Jai Ganesh Deva, Mata Jaaki Parvati Pita Mahadeva",
      duration: 8000,
      youtubeId: "dQw4w9WgXcQ" // Replace with actual Ganpati aarti YouTube ID
    },
    {
      title: "Sukhkarta Dukhharta Aarti",
      text: "Sukhkarta Dukhharta Varta Vighnachi, Nurvi Purvi Prem Krupa Jayachi",
      duration: 8000,
      youtubeId: "dQw4w9WgXcQ" // Replace with actual aarti YouTube ID
    },
    {
      title: "Ganpati Bapa Moriya",
      text: "Ganpati Bapa Moriya, Pudhchya Varshi Lavkar Ya",
      duration: 6000,
      youtubeId: "dQw4w9WgXcQ" // Replace with actual aarti YouTube ID
    }
  ]

  useEffect(() => {
    speechRef.current = window.speechSynthesis
  }, [])

  const startAarti = () => {
    setIsPlaying(true)
    setCurrentAarti(0)
    
    if (speechRef.current && !isMuted) {
      const utterance = new SpeechSynthesisUtterance(aartis[0].text)
      utterance.lang = 'hi-IN'
      utterance.rate = 0.8
      utterance.pitch = 1.1
      utterance.volume = 0.9
      speechRef.current.speak(utterance)
    }

    const interval = setInterval(() => {
      setCurrentAarti((prev) => {
        const next = (prev + 1) % aartis.length
        if (speechRef.current && !isMuted) {
          speechRef.current.cancel()
          const utterance = new SpeechSynthesisUtterance(aartis[next].text)
          utterance.lang = 'hi-IN'
          utterance.rate = 0.8
          utterance.pitch = 1.1
          utterance.volume = 0.9
          speechRef.current.speak(utterance)
        }
        return next
      })
    }, aartis[currentAarti].duration)

    return () => clearInterval(interval)
  }

  const stopAarti = () => {
    setIsPlaying(false)
    if (speechRef.current) {
      speechRef.current.cancel()
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (speechRef.current) {
      if (isMuted) {
        const utterance = new SpeechSynthesisUtterance(aartis[currentAarti].text)
        utterance.lang = 'hi-IN'
        utterance.rate = 0.8
        utterance.pitch = 1.1
        utterance.volume = 0.9
        speechRef.current.speak(utterance)
      } else {
        speechRef.current.cancel()
      }
    }
  }

  const openYouTubeAarti = () => {
    setShowYouTube(true)
    // Open YouTube aarti in new tab
    window.open(`https://www.youtube.com/watch?v=${aartis[currentAarti].youtubeId}`, '_blank')
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* 3D Ganpati Murti Container */}
      <div className="relative w-96 h-96 mb-8 perspective-1000">
        <motion.div
          className="w-full h-full relative transform-style-3d"
          animate={{ 
            rotateY: isPlaying ? [0, 5, -5, 0] : 0,
            rotateX: isPlaying ? [0, 3, -3, 0] : 0
          }}
          transition={{ 
            duration: 4, 
            repeat: isPlaying ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          {/* Main Murti Container */}
          <div className="relative w-full h-full">
            {/* Glowing Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-ganpati-gold/40 to-ganpati-orange/20 rounded-full animate-glow scale-110 blur-sm"></div>
            
            {/* Murti Image */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <div className="w-80 h-80 relative">
                <Image
                  src="/ganpati-murti.png"
                  alt="Ganpati Bapa Murti"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
                
                {/* 3D Shadow Effect */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-64 h-12 bg-black/20 rounded-full blur-md"></div>
              </div>
            </div>

            {/* Floating Elements Around Murti */}
            <motion.div
              animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 left-1/2 transform -translate-x-1/2"
            >
              <div className="relative">
                <Crown className="w-12 h-12 text-ganpati-gold animate-sparkle" />
                <div className="absolute inset-0 w-12 h-12 bg-ganpati-gold rounded-full opacity-20 animate-ping"></div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [20, -20, 20], rotate: [360, 180, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 left-1/2 transform -translate-x-1/2"
            >
              <div className="relative">
                <Flower className="w-12 h-12 text-ganpati-green animate-sparkle" />
                <div className="absolute inset-0 w-12 h-12 bg-ganpati-green rounded-full opacity-20 animate-ping"></div>
              </div>
            </motion.div>

            <motion.div
              animate={{ x: [-20, 20, -20], rotate: [0, 180, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -right-10 transform -translate-y-1/2"
            >
              <div className="relative">
                <Heart className="w-12 h-12 text-ganpati-red animate-sparkle" />
                <div className="absolute inset-0 w-12 h-12 bg-ganpati-red rounded-full opacity-20 animate-ping"></div>
              </div>
            </motion.div>

            <motion.div
              animate={{ x: [20, -20, 20], rotate: [360, 180, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -left-10 transform -translate-y-1/2"
            >
              <div className="relative">
                <Star className="w-12 h-12 text-ganpati-yellow animate-sparkle" />
                <div className="absolute inset-0 w-12 h-12 bg-ganpati-yellow rounded-full opacity-20 animate-ping"></div>
              </div>
            </motion.div>

            {/* Additional Sparkles */}
            {[...Array(10)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute w-3 h-3 bg-ganpati-gold rounded-full opacity-60"
                style={{
                  left: `${20 + (index * 60)}%`,
                  top: `${30 + (index % 2 * 40)}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 3 + index * 0.5,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Title and Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center mb-6"
      >
        <h3 className="text-3xl font-bold text-ganpati-gold mb-3 flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-ganpati-gold animate-sparkle" />
          🕉️ Ganpati Bapa 🕉️
          <Sparkles className="w-8 h-8 text-ganpati-gold animate-sparkle" />
        </h3>
        <p className="text-white/90 text-xl font-medium mb-2">
          Vighnaharta, Siddhidata
        </p>
        <p className="text-white/70 text-lg">
          Remover of Obstacles, Giver of Success
        </p>
      </motion.div>

      {/* Aarti Controls */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={isPlaying ? stopAarti : startAarti}
            className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 flex items-center gap-2 ${
              isPlaying
                ? 'bg-gradient-to-r from-ganpati-red to-ganpati-orange text-white shadow-lg'
                : 'bg-gradient-to-r from-ganpati-gold to-ganpati-yellow text-white hover:shadow-xl'
            }`}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isPlaying ? '🛑 Stop Aarti' : '🕉️ Start Aarti'}
          </motion.button>

          {isPlaying && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMute}
              className={`p-3 rounded-full transition-all duration-300 ${
                isMuted 
                  ? 'bg-ganpati-red/20 text-ganpati-red border border-ganpati-red/40' 
                  : 'bg-ganpati-green/20 text-ganpati-green border border-ganpati-green/40'
              }`}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </motion.button>
          )}
        </div>

        {/* YouTube Aarti Button */}
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={openYouTubeAarti}
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-semibold text-lg transition-all duration-300 flex items-center gap-2 mx-auto hover:shadow-xl"
        >
          <Youtube className="w-5 h-5" />
          🎥 Watch Real Aarti
        </motion.button>
      </div>

      {/* Aarti Display */}
      <AnimatePresence mode="wait">
        {isPlaying && (
          <motion.div
            key={currentAarti}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
              <h4 className="text-xl font-semibold text-ganpati-gold mb-3 flex items-center justify-center gap-2">
                <Star className="w-5 h-5 text-ganpati-gold animate-sparkle" />
                {aartis[currentAarti].title}
                <Star className="w-5 h-5 text-ganpati-gold animate-sparkle" />
              </h4>
              <p className="text-white/90 text-lg leading-relaxed font-medium text-center mb-3">
                {aartis[currentAarti].text}
              </p>
              
              {/* Voice Status */}
              <div className="flex items-center justify-center gap-2">
                <Volume2 className={`w-4 h-4 ${isMuted ? 'text-ganpati-red' : 'text-ganpati-green'}`} />
                <span className={`text-sm ${isMuted ? 'text-ganpati-red' : 'text-ganpati-green'}`}>
                  {isMuted ? 'Voice Muted' : 'Voice Playing'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Elements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 flex justify-center space-x-4"
      >
        <motion.button
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-gradient-to-r from-ganpati-gold/20 to-ganpati-yellow/20 rounded-full border border-ganpati-gold/40 hover:border-ganpati-gold/60 transition-all duration-300 group"
        >
          <Flower className="w-6 h-6 text-ganpati-gold group-hover:text-ganpati-yellow transition-colors" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-gradient-to-r from-ganpati-orange/20 to-ganpati-red/20 rounded-full border border-ganpati-orange/40 hover:border-ganpati-orange/60 transition-all duration-300 group"
        >
          <Star className="w-6 h-6 text-ganpati-orange group-hover:text-ganpati-red transition-colors" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-gradient-to-r from-ganpati-red/20 to-ganpati-pink/20 rounded-full border border-ganpati-red/40 hover:border-ganpati-red/60 transition-all duration-300 group"
        >
          <Heart className="w-6 h-6 text-ganpati-red group-hover:text-pink-400 transition-colors" />
        </motion.button>
      </motion.div>

      {/* Blessing Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-6 p-4 bg-gradient-to-r from-ganpati-gold/10 to-ganpati-orange/10 rounded-xl border border-ganpati-gold/20 max-w-md"
      >
        <p className="text-ganpati-gold font-medium text-sm text-center">
          "Ganpati Bapa blesses all who seek His darshan with wisdom, success, and divine protection"
        </p>
      </motion.div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="auto" />
    </div>
  )
}

const Ganpati3D = () => {
  const [SplineComponent, setSplineComponent] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const loadSpline = async () => {
      try {
        const splineModule = await import('@splinetool/react-spline')
        // Use any type to bypass TypeScript checking for Spline
        const SplineComponent = (splineModule as any).Spline
        if (SplineComponent) {
          setSplineComponent(() => SplineComponent)
        } else {
          throw new Error('Spline component not found')
        }
        setIsLoading(false)
      } catch (error) {
        console.log('Spline not available, using enhanced 3D murti')
        setHasError(true)
        setIsLoading(false)
      }
    }

    loadSpline()
  }, [])

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-ganpati-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-24 h-24 border-4 border-ganpati-orange border-b-transparent rounded-full animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          </div>
          <p className="text-ganpati-gold font-medium">Loading Ganpati Bapa...</p>
          <p className="text-white/60 text-sm mt-2">Preparing divine 3D darshan</p>
        </div>
      </div>
    )
  }

  if (hasError || !SplineComponent) {
    return <EnhancedGanpati3D />
  }

  return (
    <div className="w-full h-full">
      <SplineComponent
        scene="https://prod.spline.design/your-ganpati-scene-url"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
      {hasError && <EnhancedGanpati3D />}
    </div>
  )
}

export default Ganpati3D
