import { useEffect, useRef, useState } from "react";
import BirthdayCard from "./components/LoveCards";
import PhotoSection from "./components/PhotoSection";
import confetti from "canvas-confetti";
import music from "./assets/music.mp3";
import jp1 from "./assets/img1.jpg";

type Stage =
  | "intro"
  | "ready"
  | "who"
  | "quiz"
  | "reveal"
  | "experience";

type Balloon = {
  id: number;
  left: number;
  size: number;
  duration: number;
  color: string;
  drift: number;
};

export default function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [stage, setStage] = useState<Stage>("intro");
  const [quizStep, setQuizStep] = useState(0);
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  const startMusic = () => {
    if (!audioRef.current) {
      const audio = new Audio(music);
      audio.volume = 0.55;
      audio.loop = true;
      audioRef.current = audio;
    }

    audioRef.current.play().catch(() => {});
  };

  useEffect(() => {
    const colors = ["#d4a373", "#faedcd", "#ccd5ae", "#e9edc9"];

    const fire = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors,
        scalar: 0.9,
      });

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors,
        scalar: 0.9,
      });

      requestAnimationFrame(fire);
    };

    fire();
  }, []);

  useEffect(() => {
    if (stage !== "experience") return;

    const colors = [
      "#cdb4db",
      "#ffc8dd",
      "#ffafcc",
      "#bde0fe",
      "#a2d2ff",
    ];

    let id = 0;

    const interval = setInterval(() => {
      const balloon: Balloon = {
        id: id++,
        left: Math.random() * 100,
        size: 25 + Math.random() * 35,
        duration: 7 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        drift: (Math.random() - 0.5) * 40,
      };

      setBalloons((prev) => [...prev, balloon]);

      setTimeout(() => {
        setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));
      }, balloon.duration * 1000);
    }, 900);

    return () => clearInterval(interval);
  }, [stage]);

  // 🎯 ONLY CHANGE HERE (UPDATED QUESTION)
  const questions = [
    {
      q: "You know what I love the most? 💭",
      options: ["Money 💰", "Peace 🌿", "You 💖", "Sleep 😴"],
    },
    {
      q: "Who is my favorite person? 🤭",
      options: ["Friends", "Family", "You 💖", "Food 🍕"],
    },
    {
      q: "What makes me smile instantly? ✨",
      options: ["Gifts 🎁", "Your voice 🎧", "Travel ✈️", "Sleep 😴"],
    },
    {
      q: "Final question… are you ready for surprise? 💌",
      options: ["Yes 💖", "Of course 💞", "Always 😍", "No 😶"],
    },
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden font-serif">

      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${jp1})` }}
      />
      <div className="absolute inset-0 bg-[#2b1d17]/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1f1510]/60 to-[#3b2f2f]/70" />

      {stage === "intro" && (
        <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center text-[#faedcd] px-6">

          <h1 className="text-3xl md:text-4xl mb-4">
            I made something special for you 💖
          </h1>

          <button
            onClick={() => {
              startMusic();
              setStage("ready");
            }}
            className="px-7 py-3 bg-[#d4a373] text-[#2b1d17] rounded-full"
          >
            Start
          </button>
        </div>
      )}

      {stage === "ready" && (
        <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center text-[#faedcd]">
          <h1 className="text-2xl">Are you ready for a surprise? 🎁</h1>

          <button
            onClick={() => setStage("who")}
            className="mt-6 px-6 py-3 bg-[#cdb4db] text-[#2b1d17] rounded-full"
          >
            Yes 💖
          </button>
        </div>
      )}

      {stage === "who" && (
        <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center text-[#faedcd]">
          <h1 className="text-xl">
            Someone very special is celebrating today 🎉
          </h1>

          <button
            onClick={() => setStage("quiz")}
            className="mt-6 px-6 py-3 bg-[#faedcd] text-[#2b2b2b] rounded-full"
          >
            Continue
          </button>
        </div>
      )}

      {stage === "quiz" && (
        <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center text-[#faedcd] px-6">

          <h1 className="text-xl mb-6">
            {questions[quizStep].q}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {questions[quizStep].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => {
                  if (quizStep < questions.length - 1) {
                    setQuizStep((p) => p + 1);
                  } else {
                    setStage("reveal");
                  }
                }}
                className="px-5 py-3 rounded-full bg-[#3b2f2f]/70 border border-[#d4a373] hover:bg-[#d4a373] hover:text-[#2b1d17]"
              >
                {opt}
              </button>
            ))}
          </div>

        </div>
      )}

      {stage === "reveal" && (
        <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center text-[#faedcd]">

          <h1 className="text-4xl font-bold mb-6">
            It’s YOU 💖
          </h1>

          <img
            src={jp1}
            className="w-40 h-40 rounded-full border-4 border-[#d4a373]"
          />

          <button
            onClick={() => setStage("experience")}
            className="mt-6 px-6 py-3 bg-[#d4a373] text-[#2b1d17] rounded-full"
          >
            Enter 🎂
          </button>
        </div>
      )}

      {stage === "experience" && (
        <>
          <div className="absolute inset-0 pointer-events-none">
            {balloons.map((b) => (
              <div
                key={b.id}
                className="absolute bottom-[-100px] animate-floatBalloon"
                style={{
                  left: `${b.left}%`,
                  animationDuration: `${b.duration}s`,
                  transform: `translateX(${b.drift}px)`,
                }}
              >
                <div
                  style={{
                    width: b.size,
                    height: b.size * 1.2,
                    background: b.color,
                    borderRadius: "50%",
                  }}
                />
              </div>
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center pt-20">
            <BirthdayCard />
            <div className="mt-16 w-full">
              <PhotoSection />
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes floatBalloon {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-120vh); opacity: 0; }
        }

        .animate-floatBalloon {
          animation: floatBalloon linear forwards;
        }
      `}</style>

    </div>
  );
}