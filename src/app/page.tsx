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
  Info,
  Sparkles,
} from "lucide-react";
import img from "@/assets/—Pngtree—dancing ganesha in vibrant traditional_22086609.png";

// ✅ Shadcn/UI
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

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
        <Flower className="w-7 h-7 text-rose-500 drop-shadow-lg" />
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
  const [sidebarQR, setSidebarQR] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speechRef = useRef<SpeechSynthesis | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

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
    }
  }, []);

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

  // Blessing
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) return;

    const blessings = [
      `${trimmed}, Ganpati Bappa aapko sukh aur samriddhi dein 🙏`,
      `${trimmed}, aapki sari manokamna poori ho. 🌺`,
      `${trimmed}, bhakti aur shanti sadha bana rahe. 🕉️`,
      `${trimmed}, dhan, arogya aur khushiyo se jeevan bhara rahe. 🌟`,
    ];

    const randomBlessing =
      blessings[Math.floor(Math.random() * blessings.length)];
    setBlessingText(randomBlessing);
    setShowBlessing(true);
    setShowQR(false);
    setSidebarQR(false);

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

  // Aarti player
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
    <main className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-rose-100 grid grid-cols-1 lg:grid-cols-3 overflow-hidden relative font-sans">
      {/* LEFT */}
      <aside className="bg-white/60 backdrop-blur-xl shadow-2xl border-r border-rose-200 p-6 flex flex-col gap-6 items-center overflow-y-auto">
        {/* Personal Blessing */}
        <div className="w-full max-w-sm">
          <Card className="w-full bg-gradient-to-br from-yellow-50 to-white/90 shadow-md border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-rose-600 text-xl font-bold">
                <User size={22} /> Personal Blessing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleNameSubmit}
                className="flex flex-col gap-4"
              >
                <Input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Enter your name..."
                  className="rounded-xl border-rose-300 focus:border-rose-500"
                  required
                />
                <Button
                  type="submit"
                  className="rounded-xl transition bg-gradient-to-r from-rose-500 to-amber-400 text-white font-semibold"
                >
                  <Gift size={18} /> Get Blessing
                </Button>
              </form>

              {sidebarQR && (
                <div className="mt-6 flex flex-col items-center justify-center text-center">
                  <QRCodeSVG
                    value="https://yourwebsite.com"
                    size={150}
                    fgColor="#b91c1c"
                  />
                  <p className="mt-2 text-xs text-gray-700 font-medium">
                    QR closes in {qrCountdown}s
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Festival Info */}
        <Card className="w-full bg-gradient-to-br from-pink-50 to-white/90 shadow-md border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-rose-700 font-semibold">
              <Info size={18} /> Festival Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-sm leading-relaxed">
              Ganesh Chaturthi is a festival celebrating Lord Ganesha, the
              remover of obstacles and harbinger of wisdom, prosperity, and new
              beginnings.
            </p>
          </CardContent>
        </Card>

        {/* Daily Thought */}
        <Card className="w-full bg-gradient-to-br from-amber-50 to-white shadow-md border-none">
          <CardHeader>
            <CardTitle className="text-amber-700 font-semibold">
              🌸 Daily Thought
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 italic text-sm">
              “True devotion is when you surrender not for blessings, but for
              oneness with the Divine.”
            </p>
          </CardContent>
        </Card>
      </aside>

      {/* CENTER */}
      <section className="flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-72 h-72 sm:w-96 sm:h-96"
        >
          <Image
            src={img}
            alt="Ganpati Bappa Murti"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>

        <h1 className="mt-8 text-3xl sm:text-4xl md:text-5xl font-extrabold text-rose-700 text-center">
          🕉️ Ganpati Bappa Darshan 🕉️
        </h1>
        <p className="mt-3 max-w-xl text-gray-700 text-lg text-center">
          Vighnaharta - The Remover of Obstacles, Giver of Success
        </p>

        <div className="mt-5 flex items-center gap-3 bg-white/90 rounded-full px-6 py-2 shadow-md">
          <Clock className="w-6 h-6 text-rose-600" />
          <time
            className="font-semibold text-gray-900"
            suppressHydrationWarning
          >
            {formatTime(currentTime)}
          </time>
        </div>
      </section>

      {/* RIGHT */}
      <aside className="bg-white/60 backdrop-blur-xl shadow-2xl border-l border-amber-200 p-6 flex flex-col gap-6 items-center overflow-y-auto">
        {/* Aarti Controls */}
        <Card className="bg-gradient-to-br from-amber-50 to-white/90 shadow-md border-none w-full max-w-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-rose-600 font-bold text-xl">
              <Bell size={22} /> Aarti Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={toggleAarti}
              className="w-full py-3 text-lg rounded-xl font-bold flex gap-3 bg-gradient-to-r from-amber-400 to-rose-500 text-white"
            >
              {isAartiPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
              {isAartiPlaying ? "Stop Aarti" : "Start Aarti"}
            </Button>
          </CardContent>
        </Card>

        {/* About Ganpati */}
        <Card className="bg-gradient-to-br from-rose-50 to-white/90 shadow-md border-none w-full max-w-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-rose-700 font-semibold">
              <Sparkles size={18} /> About Ganpati
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-sm leading-relaxed">
              Lord Ganesha is revered as the God of wisdom, prosperity, and
              remover of obstacles. He is worshipped first in every ritual,
              signifying auspicious beginnings.
            </p>
          </CardContent>
        </Card>

        {/* Offer Flowers */}
        <Button
          onClick={() => {
            setShowFlowers(true);
            setTimeout(() => setShowFlowers(false), 2500);
          }}
          className="w-full bg-gradient-to-r from-rose-500 to-amber-400 text-white font-semibold rounded-xl py-3 flex items-center gap-2"
        >
          <Flower className="w-5 h-5" /> Offer Flowers
        </Button>
      </aside>

      {/* Audio Player */}
      <audio
        ref={audioRef}
        src="/aarti.mp3"
        onEnded={() => setIsAartiPlaying(false)}
        preload="auto"
        className="hidden"
      />

      {/* Blessing Popup */}
      <AnimatePresence>
        {showBlessing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-md"
          >
            <div className="bg-gradient-to-br from-amber-100 to-rose-50 rounded-2xl shadow-2xl p-6 w-11/12 sm:w-2/3 md:w-1/3">
              {!showQR ? (
                <>
                  <p className="text-center font-semibold text-xl text-gray-900">
                    🙏 {blessingText} 🙏
                  </p>
                  {isSpeaking && (
                    <div className="flex justify-center items-center mt-4 gap-2 text-green-600">
                      <Volume2 className="w-5 h-5 animate-pulse" /> Speaking ...
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <QRCodeSVG
                    value="https://yourwebsite.com"
                    size={180}
                    fgColor="#b91c1c"
                  />
                  <p className="mt-3 text-sm text-gray-700 font-medium">
                    QR closes in {qrCountdown}s
                  </p>
                </div>
              )}

              <Button
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-rose-500 to-amber-400 text-white"
                onClick={() => {
                  setShowBlessing(false);
                  setSidebarQR(true);
                }}
              >
                Close
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flower Animation */}
      <AnimatePresence>{showFlowers && <FlowerAnimation />}</AnimatePresence>

      {/* Mantra Banner */}
      <AnimatePresence>
        {showMantra && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-16 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 via-rose-500 to-orange-600 px-10 py-4 rounded-full shadow-lg text-xl font-bold text-white z-50"
          >
            🎉 Ganpati Bappa Morya! 🎉
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}