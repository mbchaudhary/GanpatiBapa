'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, Bell, Heart, Star, Volume2, VolumeX, Play, Pause } from 'lucide-react'

interface AartiComponentProps {
  isActive: boolean
  onToggle: () => void
}

const AartiComponent = ({ isActive, onToggle }: AartiComponentProps) => {
  const [currentAarti, setCurrentAarti] = useState(0)
  const [showFlames, setShowFlames] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const speechRef = useRef<SpeechSynthesis | null>(null)

  const aartis = [
    {
      title: "Ganpati Aarti",
      text: "Jai Ganesh Jai Ganesh Jai Ganesh Deva, Mata Jaaki Parvati Pita Mahadeva",
      duration: 8000,
      audioUrl: "/aarti-ganpati.mp3"
    },
    {
      title: "Sukhkarta Dukhharta",
      text: "Sukhkarta Dukhharta Varta Vighnachi, Nurvi Purvi Prem Krupa Jayachi",
      duration: 8000,
      audioUrl: "/aarti-sukhkarta.mp3"
    },
    {
      title: "Ganpati Bapa Moriya",
      text: "Ganpati Bapa Moriya, Pudhchya Varshi Lavkar Ya",
      duration: 6000,
      audioUrl: "/aarti-moriya.mp3"
    }
  ]

  useEffect(() => {
    speechRef.current = window.speechSynthesis
  }, [])

  useEffect(() => {
    if (isActive) {
      setShowFlames(true)
      setIsPlaying(true)
      
      // Start speaking the aarti
      if (speechRef.current && !isMuted) {
        const utterance = new SpeechSynthesisUtterance(aartis[currentAarti].text)
        utterance.lang = 'hi-IN' // Hindi language
        utterance.rate = 0.8
        utterance.pitch = 1.1
        utterance.volume = 0.9
        speechRef.current.speak(utterance)
      }

      const interval = setInterval(() => {
        setCurrentAarti((prev) => (prev + 1) % aartis.length)
      }, aartis[currentAarti].duration)

      return () => clearInterval(interval)
    } else {
      setShowFlames(false)
      setIsPlaying(false)
      // Stop speaking
      if (speechRef.current) {
        speechRef.current.cancel()
      }
    }
  }, [isActive, currentAarti, aartis, isMuted])

  const handleAartiStart = () => {
    onToggle()
    setCurrentAarti(0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (speechRef.current) {
      if (isMuted) {
        // Resume speaking
        const utterance = new SpeechSynthesisUtterance(aartis[currentAarti].text)
        utterance.lang = 'hi-IN'
        utterance.rate = 0.8
        utterance.pitch = 1.1
        utterance.volume = 0.9
        speechRef.current.speak(utterance)
      } else {
        // Stop speaking
        speechRef.current.cancel()
      }
    }
  }

  const stopAarti = () => {
    onToggle()
    if (speechRef.current) {
      speechRef.current.cancel()
    }
  }

  return (
    <div className="text-center">
      <h3 className="text-2xl font-semibold text-ganpati-gold mb-4 flex items-center justify-center gap-2">
        <Bell className="w-6 h-6 text-ganpati-gold animate-sparkle" />
        🕉️ Daily Aarti 🕉️
        <Bell className="w-6 h-6 text-ganpati-gold animate-sparkle" />
      </h3>

      {/* Aarti Controls */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAartiStart}
          className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 flex items-center gap-2 ${
            isActive
              ? 'bg-gradient-to-r from-ganpati-red to-ganpati-orange text-white shadow-lg'
              : 'bg-gradient-to-r from-ganpati-gold to-ganpati-yellow text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {isActive ? '🛑 Stop Aarti' : '🕉️ Start Aarti'}
        </motion.button>

        {isActive && (
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

      {/* Aarti Display */}
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            key={currentAarti}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
              <h4 className="text-xl font-semibold text-ganpati-gold mb-3 flex items-center justify-center gap-2">
                <Star className="w-5 h-5 text-ganpati-gold animate-sparkle" />
                {aartis[currentAarti].title}
                <Star className="w-5 h-5 text-ganpati-gold animate-sparkle" />
              </h4>
              <p className="text-white/90 text-lg leading-relaxed font-medium">
                {aartis[currentAarti].text}
              </p>
              
              {/* Voice Status */}
              <div className="mt-3 flex items-center justify-center gap-2">
                <Volume2 className={`w-4 h-4 ${isMuted ? 'text-ganpati-red' : 'text-ganpati-green'}`} />
                <span className={`text-sm ${isMuted ? 'text-ganpati-red' : 'text-ganpati-green'}`}>
                  {isMuted ? 'Voice Muted' : 'Voice Playing'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Flames */}
      <AnimatePresence>
        {showFlames && (
          <div className="mb-6">
            <div className="flex justify-center space-x-4 mb-4">
              {[...Array(5)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="arti-flame w-10 h-14 rounded-full"></div>
                  <motion.div
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ duration: 1 + index * 0.2, repeat: Infinity }}
                    className="absolute -top-2 left-1/2 transform -translate-x-1/2"
                  >
                    <Flame className="w-5 h-5 text-ganpati-gold" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            {/* Flame Instructions */}
            <p className="text-white/70 text-sm">
              🔥 Divine flames illuminate your path to Ganpati Bapa
            </p>
          </div>
        )}
      </AnimatePresence>

      {/* Aarti Progress */}
      {isActive && (
        <div className="mb-6">
          <div className="w-full bg-white/20 rounded-full h-3 mb-2">
            <motion.div
              className="bg-gradient-to-r from-ganpati-gold to-ganpati-orange h-3 rounded-full shadow-lg"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: aartis[currentAarti].duration / 1000, ease: "linear" }}
            />
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/70">
              {currentAarti + 1} of {aartis.length} aartis
            </span>
            <span className="text-ganpati-gold font-medium">
              {Math.ceil((aartis[currentAarti].duration - (Date.now() % aartis[currentAarti].duration)) / 1000)}s remaining
            </span>
          </div>
        </div>
      )}

      {/* Aarti Instructions */}
      {!isActive && (
        <div className="bg-gradient-to-r from-ganpati-gold/10 to-ganpati-orange/10 backdrop-blur-sm rounded-xl p-6 border border-ganpati-gold/20">
          <h4 className="text-lg font-semibold text-ganpati-gold mb-3">
            🎯 How to Perform Aarti
          </h4>
          <ul className="text-white/80 text-sm space-y-2 text-left">
            <li className="flex items-start gap-2">
              <span className="text-ganpati-gold">1.</span>
              <span>Click "Start Aarti" to begin your daily prayers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-ganpati-gold">2.</span>
              <span>Listen to the divine voice reciting the aarti</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-ganpati-gold">3.</span>
              <span>Watch the sacred flames dance in devotion</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-ganpati-gold">4.</span>
              <span>Ganpati Bapa will bless you with wisdom and success</span>
            </li>
          </ul>
        </div>
      )}

      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="auto" />
    </div>
  )
}

export default AartiComponent
