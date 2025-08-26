"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import {
  Flower,
  Bell,
  Volume2,
  Play,
  Pause,
  User,
  Gift,
  Clock,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame,
  Heart,
  Star,
  Zap,
  Sun,
  Moon,
} from "lucide-react";
import img from "@/assets/—Pngtree—dancing ganesha in vibrant traditional_22086609.png";
import img2 from "@/assets/image.png";
import img3 from "@/assets/img3.png";
import img4 from "@/assets/img4.png";
import img5 from "@/assets/img5.png";
import divo from "@/assets/divo.gif";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import logo from "@/assets/ullas-icon-blue.svg"

// Add this interface definition before the AnimatedDivo component
interface AnimatedDivoProps {
  isActive: boolean;
  startPosition: { x: number; y: number };
  targetPosition: { x: number; y: number };
  onComplete: () => void;
}

// Updated AnimatedDivo component with proper internal rotation - fixed nested motion
const AnimatedDivo: React.FC<AnimatedDivoProps> = ({ 
  isActive, 
  startPosition, 
  targetPosition, 
  onComplete 
}) => {
  if (!isActive) return null;

  // Calculate center point for rotation
  const centerX = targetPosition.x;
  const centerY = targetPosition.y;
  const radius = 120; // Distance from center to rotate around

  return (
    <motion.div
      className="fixed w-12 h-12 z-50 pointer-events-none"
      initial={{
        x: startPosition.x,
        y: startPosition.y,
        scale: 0.8,
        opacity: 0.9,
      }}
      animate={{
        x: [
          startPosition.x,
          centerX,
          centerX + radius,
          centerX,
          centerX - radius,
          centerX,
          centerX + radius * 0.7,
          centerX - radius * 0.7,
          centerX
        ],
        y: [
          startPosition.y,
          centerY,
          centerY,
          centerY - radius,
          centerY,
          centerY + radius,
          centerY - radius * 0.7,
          centerY + radius * 0.7,
          centerY
        ],
        scale: [0.8, 1.0, 1.2, 1.2, 1.2, 1.2, 1.1, 1.0, 0.8],
        opacity: [0.9, 1, 1, 1, 1, 1, 1, 1, 0],
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        times: [0, 0.15, 0.25, 0.35, 0.45, 0.55, 0.7, 0.85, 1],
      }}
      onAnimationComplete={() => {
        setTimeout(() => onComplete(), 500);
      }}
    >
      {/* Fixed: Use regular div with inline styles for rotation instead of nested motion.div */}
      <div
        style={{
          width: "100%",
          height: "100%",
          animation: "spin 4s linear",
        }}
      >
        <Image
          src={divo}
          alt="Divo offering"
          fill
          className="object-contain drop-shadow-lg"
        />
      </div>
      
      {/* Enhanced Glow effect */}
      <motion.div
        className="absolute inset-0 bg-yellow-400 rounded-full blur-lg"
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.8, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Additional inner glow */}
      <motion.div
        className="absolute inset-1 bg-orange-300 rounded-full blur-sm"
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [0.8, 1.3, 0.8],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />

      {/* Add CSS keyframe animation for spin */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(1440deg); }
        }
      `}</style>
    </motion.div>
  );
};

// 🌸 Falling flower animation
const FlowerAnimation = () => (
  <motion.div
    className="fixed inset-0 pointer-events-none z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-6 h-6"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 50}%`,
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: [0, 500],
          opacity: [0.9, 1, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6 + Math.random() * 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Flower className="w-7 h-7 text-rose-300 drop-shadow-lg" />
      </motion.div>
    ))}
  </motion.div>
);

// 🌟 Evening Aarti Continuous Flower Animation
const ContinuousFlowerAnimation = () => (
  <motion.div
    className="fixed inset-0 pointer-events-none z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {[...Array(25)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-5 h-5"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        initial={{ y: -50, opacity: 0, scale: 0 }}
        animate={{
          y: [0, 300, 600],
          opacity: [0, 1, 0],
          rotate: [0, 360, 720],
          scale: [0, 1, 0.5],
        }}
        transition={{
          duration: 8 + Math.random() * 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.3,
        }}
      >
        <Flower className="w-5 h-5 text-purple-300 drop-shadow-lg" />
      </motion.div>
    ))}
  </motion.div>
);

// 🌟 Incense smoke animation
const IncenseAnimation = () => (
  <motion.div
    className="fixed inset-0 pointer-events-none z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-8 bg-gradient-to-t from-gray-400 to-transparent rounded-full"
        style={{
          left: `${45 + Math.random() * 10}%`,
          bottom: "20%",
        }}
        initial={{ y: 0, opacity: 0.8, scale: 1 }}
        animate={{
          y: [-50, -200, -300],
          opacity: [0.8, 0.4, 0],
          scale: [1, 1.2, 0.8],
          x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
        }}
        transition={{
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    ))}
  </motion.div>
);

// ⭐ Stars animation
const StarAnimation = () => (
  <motion.div
    className="fixed inset-0 pointer-events-none z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        initial={{ scale: 0, opacity: 0, rotate: 0 }}
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2 + Math.random() * 2,
          repeat: Infinity,
          delay: i * 0.2,
          ease: "easeInOut",
        }}
      >
        <Star className="w-6 h-6 text-yellow-400 drop-shadow-lg" />
      </motion.div>
    ))}
  </motion.div>
);

export default function Home() {
  const [showFlowers, setShowFlowers] = useState(false);
  const [showBlessing, setShowBlessing] = useState(false);
  const [blessingText, setBlessingText] = useState("");
  const [showMantra, setShowMantra] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isAartiPlaying, setIsAartiPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [qrCountdown, setQrCountdown] = useState(0);
  
  // 🖼️ Image slider states
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // ✨ Animation states for features
  const [showIncense, setShowIncense] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [isEveningMode, setIsEveningMode] = useState(false);
  
  // 🪔 Divo animation states
  const [divoAnimation, setDivoAnimation] = useState({
    isActive: false,
    startPosition: { x: 0, y: 0 },
    targetPosition: { x: 0, y: 0 },
    id: 0
  });
  
  const images = [img, img2, img3, img4, img5];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speechRef = useRef<SpeechSynthesis | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const ganpatiImageRef = useRef<HTMLDivElement>(null);

  // Helper function to trigger divo animation
  const triggerDivoAnimation = (startElement: HTMLButtonElement) => {
    if (!ganpatiImageRef.current) return;

    const startRect = startElement.getBoundingClientRect();
    const targetRect = ganpatiImageRef.current.getBoundingClientRect();

    const startPosition = {
      x: startRect.left + startRect.width / 2 - 24, // Center the divo on button
      y: startRect.top + startRect.height / 2 - 24,
    };

    const targetPosition = {
      x: targetRect.left + targetRect.width / 2 - 24, // Center on Ganpati image
      y: targetRect.top + targetRect.height / 2 - 24,
    };

    setDivoAnimation({
      isActive: true,
      startPosition,
      targetPosition,
      id: Date.now() // Unique ID for each animation
    });
  };

  // Complete divo animation
  const completeDivoAnimation = () => {
    setDivoAnimation(prev => ({ ...prev, isActive: false }));
    // Trigger flower animation after divo completes aarti
    setShowFlowers(true);
    setTimeout(() => setShowFlowers(false), 2500);
  };

  // Load speech voices
  useEffect(() => {
    if (typeof window === "undefined") return;
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length) voicesRef.current = voices;
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const getBestHindiFemaleVoice = (voices: SpeechSynthesisVoice[]) => {
    if (!voices.length) return null;
    const femaleIndicative = ["female", "arya", "kanya", "paulina"];
    const hindiFemaleVoices = voices.filter(
      (v) =>
        v.lang.toLowerCase().startsWith("hi") &&
        femaleIndicative.some((s) => v.name.toLowerCase().includes(s))
    );
    if (hindiFemaleVoices.length > 0) return hindiFemaleVoices[0];
    return voices.find((v) => v.lang.toLowerCase().startsWith("hi")) ?? voices[0];
  };

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      speechRef.current = window.speechSynthesis;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
    
    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";
      }
    };
  }, []);

  // 🔄 Auto slider effect
  useEffect(() => {
    if (!isClient) return;
    
    const sliderInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => {
      clearInterval(sliderInterval);
    };
  }, [isClient, images.length]);

  // Clock update
  useEffect(() => {
    if (!isClient) return;
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [isClient]);

  // Show mantra banner every 3min
  useEffect(() => {
    const interval = setInterval(() => {
      setShowMantra(true);
      setTimeout(() => setShowMantra(false), 4000);
    }, 180000);
    return () => clearInterval(interval);
  }, []);

  // Spacebar Flower trigger
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.code === "Space") {
      e.preventDefault();
      setShowFlowers(true);
      setTimeout(() => setShowFlowers(false), 2500);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  // Enhanced puja feature functions with divo animation
  const lightDiya = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerDivoAnimation(e.currentTarget);
    
    if (speechRef.current) {
      const utterance = new SpeechSynthesisUtterance("Diya jalaya gaya hai, Ganpati Bappa ki jai!");
      utterance.lang = "hi-IN";
      speechRef.current.speak(utterance);
    }
  };

  const offerPrayers = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerDivoAnimation(e.currentTarget);
    
    if (speechRef.current) {
      const utterance = new SpeechSynthesisUtterance("Prarthana arpan ki gayi hai");
      utterance.lang = "hi-IN";
      speechRef.current.speak(utterance);
    }
  };

  const ringBell = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerDivoAnimation(e.currentTarget);
    
    if (speechRef.current) {
      const utterance = new SpeechSynthesisUtterance("Mandir ki ghanti baji");
      utterance.lang = "hi-IN";
      speechRef.current.speak(utterance);
    }
  };

  const chantMantra = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerDivoAnimation(e.currentTarget);
    
    const mantra = "Om Gam Ganapataye Namaha";
    if (speechRef.current) {
      const utterance = new SpeechSynthesisUtterance(mantra);
      utterance.lang = "hi-IN";
      speechRef.current.speak(utterance);
    }
  };

  // Enhanced right sidebar feature functions
  const lightIncense = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerDivoAnimation(e.currentTarget);
    setShowIncense(true);
    setTimeout(() => setShowIncense(false), 5000);
    
    if (speechRef.current) {
      const utterance = new SpeechSynthesisUtterance("Dhoop jalai gayi hai");
      utterance.lang = "hi-IN";
      speechRef.current.speak(utterance);
    }
  };

  const eveningPrayer = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerDivoAnimation(e.currentTarget);
    setIsEveningMode(!isEveningMode);
    
    if (!isEveningMode) {
      setShowFlowers(true);
      setTimeout(() => setShowFlowers(false), 3000);
    }
    
    if (speechRef.current) {
      const utterance = new SpeechSynthesisUtterance(
        isEveningMode ? "Sandhya aarti samapti" : "Sandhya aarti aarambh"
      );
      utterance.lang = "hi-IN";
      speechRef.current.speak(utterance);
    }
  };

  const divineBlessing = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerDivoAnimation(e.currentTarget);
    
    setShowBlessing(true);
    setBlessingText("Ganpati Bappa ka aashirwad aap par sadaiv bana rahe! ⚡");
    
    if (speechRef.current) {
      const utterance = new SpeechSynthesisUtterance("Ganpati Bappa ka divya aashirwad");
      utterance.lang = "hi-IN";
      speechRef.current.speak(utterance);
    }
  };

  const makeWish = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerDivoAnimation(e.currentTarget);
    setShowStars(true);
    setTimeout(() => setShowStars(false), 4000);
    
    if (speechRef.current) {
      const utterance = new SpeechSynthesisUtterance("Aapki manokamna poori ho, Ganpati Bappa Morya!");
      utterance.lang = "hi-IN";
      speechRef.current.speak(utterance);
    }
  };

  // Rest of the component functions remain the same...
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) return;

 const blessings = [
  `${trimmed}, Ganpati Bappa aapko sukh aur samriddhi dein.`,
  `${trimmed}, aapki sari manokamna poori ho. 🌺`,
  `${trimmed}, bhakti aur shanti sadha bana rahe. 🕉️`,
  `${trimmed}, dhan, arogya aur khushiyo se jeevan bhara rahe.`,
  `${trimmed}, Ganesha ji aapko har mushkil se door rakhein.`,
  `${trimmed}, aapki zindagi mein nayi umeed aur utsah aaye.`,
  `${trimmed}, aapke ghar mein sukh-shanti ka vaas ho.`,
  `${trimmed}, Ganesha ji ke ashirwad se har kaam safal ho.`,
  `${trimmed}, aapki zindagi roshni se jagmagati rahe.`,
  `${trimmed}, aap hamesha swasth aur prasann rahe.`,
  `${trimmed}, dosti aur prem ke rishton mein madhurta bani rahe.`,
  `${trimmed}, Ganpati ji aapko nayi soch aur pragati ka vardaan dein.`,
  `${trimmed}, aapke din anand aur utsah se bhare rahe.`,
  `${trimmed}, Ganesh ji aapke ghar ko unnati aur samriddhi se bharein.`,
  `${trimmed}, aapke sapne sach ho aur jeevan khushiyo se mehke.`,
  `${trimmed}, har nayi shuruaat mein Ganpati ji ka ashirwad rahe.`,
  `${trimmed}, aapke parivaar mein sada prem aur ekta bani rahe.`,
  `${trimmed}, aapke jeevan ka har din utsav jaisa rahe.`,
  `${trimmed}, Ganesh ji aapko vijay aur pratishtha se nawazein.`,
  `${trimmed}, aapke mann mein hamesha vishwas aur shakti bani rahe.`,
];


    const randomBlessing =
      blessings[Math.floor(Math.random() * blessings.length)];
    setBlessingText(randomBlessing);
    setShowBlessing(true);
    setShowQR(false);

    if (speechRef.current) {
      const utterance = new SpeechSynthesisUtterance(randomBlessing);
      utterance.lang = "hi-IN";
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.9;
      const voices = voicesRef.current;
      const voiceToUse = getBestHindiFemaleVoice(voices);
      if (voiceToUse) utterance.voice = voiceToUse;
      speechRef.current.speak(utterance);
      setIsSpeaking(true);

      utterance.onend = () => {
        setIsSpeaking(false);
        setShowQR(true);
        setQrCountdown(60);
        const interval = setInterval(() => {
          setQrCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setShowQR(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      };
    }

    setNameInput("");
  };

  useEffect(() => {
    if (!audioRef.current) return;
    if (isAartiPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isAartiPlaying]);

  const toggleAarti = () => setIsAartiPlaying((prev) => !prev);

  const formatTime = (date: Date | null) =>
    date
      ? date.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      : "---";

  return (
    <main className={`min-h-screen bg-gradient-to-br ${
      isEveningMode 
        ? 'from-purple-100 via-indigo-50 to-blue-100' 
        : 'from-orange-50 via-yellow-25 to-rose-50'
    } flex flex-col md:flex-row overflow-x-hidden relative font-sans transition-all duration-1000`}>
      
      {/* LOGO - Fixed position in top left corner */}
      <div className="fixed top-4 left-7 z-40 p-2 shadow-sm">
        <Image
          src={logo}
          alt="Logo"
          width={80}
          height={40}
          className="w-16 h-10 md:w-20 md:h-20 object-contain"
        />
      </div>

      
      {/* LEFT SIDE PUJA FEATURES - Responsive width */}
      <aside className="w-full md:w-[10%] bg-white/40 backdrop-blur-xl border-b md:border-b-0 md:border-r border-rose-100 p-2 flex flex-row md:flex-col gap-2 md:gap-3 items-center justify-center md:justify-center order-2 md:order-1">
        <Button
          onClick={lightDiya}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg hover:scale-105 transition-transform p-0"
          title="Light Diya"
        >
          <Flame className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
        
        <Button
          onClick={offerPrayers}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow-lg hover:scale-105 transition-transform p-0"
          title="Offer Prayers"
        >
          <Heart className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
        
        <Button
          onClick={ringBell}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-lg hover:scale-105 transition-transform p-0"
          title="Ring Bell"
        >
          <Bell className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
        
        <Button
          onClick={chantMantra}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 text-white shadow-lg hover:scale-105 transition-transform p-0"
          title="Chant Mantra"
        >
          <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
      </aside>

      {/* MAIN CONTENT AREA - Responsive layout */}
      <section className="flex-1 flex flex-col order-1 md:order-2">
        
        {/* IMAGE AREA - Responsive height */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-4 md:py-2 min-h-[60vh] md:min-h-[80vh]">
          {/* Image Slider with ref for divo targeting */}
          <div className="relative" ref={ganpatiImageRef}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-[400px] xl:h-[400px]"
            >
              <Image
                src={images[currentImageIndex]}
                alt={`Ganpati Image ${currentImageIndex + 1}`}
                fill
                className="object-contain drop-shadow-2xl rounded-3xl"
                priority
              />
            </motion.div>

          </div>

          {/* Title and Description - Responsive text */}
          <h1 className="mt-3 md:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-rose-600 text-center">
            Ganpati Bappa
          </h1>
          <p className="mt-2 max-w-2xl text-gray-600 text-sm sm:text-base md:text-lg text-center leading-relaxed px-4">
            Vighnaharta - The Remover of Obstacles, Giver of Success
          </p>
        </div>

        {/* BOTTOM NAVIGATION BAR - Responsive layout */}
        <nav className="bg-white/90 backdrop-blur-xl border-t border-rose-100 p-2 md:p-3 m-2 md:m-3 rounded-2xl shadow-2xl">
          <div className="flex flex-col gap-2 md:gap-3">
            {/* Blessing Form - Full width on mobile */}
            <form onSubmit={handleNameSubmit} className="flex gap-2">
              <Input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter your name for blessing..."
                className="rounded-xl border-rose-200 focus:border-rose-400 bg-white/80 text-xs md:text-sm"
                required
              />
              <Button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-rose-400 to-amber-400 text-white font-semibold px-3 md:px-4 whitespace-nowrap text-xs md:text-sm"
              >
                <Gift size={14} className="mr-1 md:mr-1" />
                <span className="hidden sm:inline">Get Blessing</span>
                <span className="sm:hidden">Bless</span>
              </Button>
            </form>

            {/* Action Buttons - Responsive layout */}
            <div className="flex gap-2 justify-center">
              <Button
                onClick={toggleAarti}
                className={`rounded-xl font-semibold px-3 md:px-4 transition-all text-xs md:text-sm flex-1 md:flex-initial ${
                  isAartiPlaying 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                    : 'bg-gradient-to-r from-amber-400 to-orange-500 text-white'
                }`}
              >
                {isAartiPlaying ? (
                  <><Pause className="w-3 h-3 md:w-4 md:h-4 mr-1" /><span className="hidden sm:inline">Stop Aarti</span><span className="sm:hidden">Stop</span></>
                ) : (
                  <><Play className="w-3 h-3 md:w-4 md:h-4 mr-1" /><span className="hidden sm:inline">Start Aarti</span><span className="sm:hidden">Play</span></>
                )}
              </Button>

              <Button
                onClick={() => {
                  setShowFlowers(true);
                  setTimeout(() => setShowFlowers(false), 2500);
                }}
                className="rounded-xl bg-gradient-to-r from-pink-400 to-rose-500 text-white font-semibold px-3 md:px-4 text-xs md:text-sm flex-1 md:flex-initial"
              >
                <Flower className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                <span className="hidden sm:inline">Offer Flowers</span>
                <span className="sm:hidden">Flowers</span>
              </Button>
            </div>
          </div>
        </nav>
      </section>

      {/* RIGHT SIDE PUJA FEATURES - Same as left side responsive */}
      <aside className="w-full md:w-[10%] bg-white/40 backdrop-blur-xl border-t md:border-t-0 md:border-l border-rose-100 p-2 flex flex-row md:flex-col gap-2 md:gap-3 items-center justify-center order-3">
        <Button
          onClick={lightIncense}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg hover:scale-105 transition-transform p-0"
          title="Light Incense"
        >
          <Sun className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
        
        <Button
          onClick={eveningPrayer}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full text-white shadow-lg hover:scale-105 transition-transform p-0 ${
            isEveningMode 
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600' 
              : 'bg-gradient-to-r from-indigo-400 to-purple-500'
          }`}
          title="Evening Prayer"
        >
          <Moon className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
        
        <Button
          onClick={divineBlessing}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-lg hover:scale-105 transition-transform p-0"
          title="Divine Blessing"
        >
          <Zap className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
        
        <Button
          onClick={makeWish}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg hover:scale-105 transition-transform p-0"
          title="Make a Wish"
        >
          <Star className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
      </aside>

      {/* Audio Player */}
      <audio
        ref={audioRef}
        src="/aarti2.mp3"
        onEnded={() => setIsAartiPlaying(false)}
        preload="auto"
        className="hidden"
      />

      {/* Animated Divo */}
      <AnimatePresence>
        <AnimatedDivo
          key={divoAnimation.id}
          isActive={divoAnimation.isActive}
          startPosition={divoAnimation.startPosition}
          targetPosition={divoAnimation.targetPosition}
          onComplete={completeDivoAnimation}
        />
      </AnimatePresence>

      {/* Blessing Popup - Responsive */}
      <AnimatePresence>
        {showBlessing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-md p-4"
          >
            <div className="bg-gradient-to-br from-amber-50 to-rose-25 rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-sm md:max-w-md">
              {!showQR ? (
                <>
                  <p className="text-center font-semibold text-lg md:text-xl text-gray-800 mb-4">
                    🙏 {blessingText} 🙏
                  </p>
                  {isSpeaking && (
                    <div className="flex justify-center items-center gap-2 text-green-500">
                      <Volume2 className="w-4 h-4 md:w-5 md:h-5 animate-pulse" /> 
                      <span className="font-medium text-sm md:text-base">Speaking blessing...</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <QRCodeSVG
                    value="https://ganpati-bapa.vercel.app/"
                    size={window.innerWidth < 768 ? 150 : 200}
                    fgColor="#f87171"
                    className="rounded-lg"
                  />
                  <p className="mt-4 text-xs md:text-sm text-gray-600 font-medium">
                    QR closes in {qrCountdown}s
                  </p>
                </div>
              )}

              <Button
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-rose-400 to-amber-400 text-white font-semibold py-2 md:py-3 text-sm md:text-base"
                onClick={() => {
                  setShowBlessing(false);
                  setShowQR(false);
                }}
              >
                Close
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animations */}
      <AnimatePresence>{showFlowers && <FlowerAnimation />}</AnimatePresence>
      <AnimatePresence>{showIncense && <IncenseAnimation />}</AnimatePresence>
      <AnimatePresence>{showStars && <StarAnimation />}</AnimatePresence>

      {/* Continuous Evening Aarti Flowers */}
      <AnimatePresence>
        {isEveningMode && <ContinuousFlowerAnimation />}
      </AnimatePresence>

    </main>
  );
}
