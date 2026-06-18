import { useEffect, useRef, useState } from "react";
import sealSound from "../assets/seal-break.mp3"; 

const birthdayLetter = `
Happy Birthday to my person 💖

To the one who is not just my love,
but my best friend, my peace,
and my home.

You are the person I laugh with,
grow with, and dream with.

No matter where life takes us,
I will always choose you —
today, tomorrow, and forever.

Thank you for being mine
and for letting me be yours.

You are my forever. 💍✨
`;

export default function LoveCards() {
  const [open, setOpen] = useState(false);
  const [typedText, setTypedText] = useState("");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const introText = `
To My Love ❤️

Happy Birthday.

Thank you for every smile,
every laugh,
every hug,
and every moment we share.

You make ordinary days feel special.

You are my safe place,
my calm in chaos,
and my favorite person.

I love you endlessly.
`;

  // typing effect
  useEffect(() => {
    if (!open) return;

    let i = 0;

    const interval = setInterval(() => {
      setTypedText(introText.slice(0, i));
      i++;

      if (i > introText.length) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [open]);

  const handleOpen = () => {
    setOpen(true);

    // 🎵 play sound from assets
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-10">

      {/* AUDIO */}
      <audio ref={audioRef} src={sealSound} />

      {/* CAKE */}
      <div className="relative mb-12">
        <div className="absolute inset-0 w-72 h-72 bg-pink-300/30 blur-3xl rounded-full" />
        <div className="text-[120px] animate-pulse relative z-10">
          🎂
        </div>

        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-2xl animate-bounce">
          🕯️✨🕯️✨🕯️
        </div>

        <p className="text-center text-sm italic text-white/80 mt-3">
          made with endless love 💖
        </p>
      </div>

      {/* ENVELOPE */}
      {!open ? (
        <div
          onClick={handleOpen}
          className="cursor-pointer relative group"
        >
          <div className="absolute inset-0 bg-pink-300/20 blur-2xl rounded-2xl" />

          <div className="relative w-[340px] h-[220px] bg-[#f3e6d8] shadow-2xl rounded-md border border-[#e0c9b2] overflow-hidden transition-all duration-500 group-hover:scale-105">

            {/* flap */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[#ead7c4]" />

            {/* wax seal */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-700 rounded-full shadow-lg flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-red-300 rounded-full" />
              </div>
            </div>

            {/* text */}
            <div className="absolute bottom-4 w-full text-center">
              <h2 className="text-lg font-serif text-[#5d4037]">
                Open My Letter
              </h2>
              <p className="text-xs italic text-[#6d4c41]/70">
                sealed with love 💌
              </p>
            </div>

          </div>
        </div>
      ) : (
        <div className="relative max-w-6xl w-full animate-fadeIn">

          {/* paper layers */}
          <div className="absolute inset-0 bg-[#f8ede3] rotate-[-2deg] rounded-lg shadow-xl" />
          <div className="absolute inset-0 bg-[#fff7f1] rotate-[2deg] rounded-lg shadow-xl" />

          {/* book */}
          <div className="relative grid md:grid-cols-2 bg-[#fffdf9] rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)] border-[6px] border-pink-200">

            {/* ribbon */}
            <div className="absolute left-1/2 top-0 bottom-0 w-4 bg-pink-300 -translate-x-1/2 z-20" />
            <div className="absolute left-1/2 top-4 -translate-x-1/2 text-6xl z-30">
              🎀
            </div>

            {/* LEFT */}
            <div className="p-8 md:p-12 border-r border-pink-100">
              <h2 className="text-4xl text-center mb-8 text-[#6d4c41] font-serif">
                Our Story ❤️
              </h2>

              <p className="whitespace-pre-line leading-8 text-[#5d4037] text-sm md:text-base">
                {typedText}
                <span className="animate-pulse">|</span>
              </p>
            </div>

            {/* RIGHT */}
            <div className="p-8 md:p-12">
              <h2 className="text-4xl text-center mb-8 text-[#6d4c41] font-serif">
                Happy Birthday 💖
              </h2>

              <p className="whitespace-pre-line leading-8 text-[#5d4037] text-sm md:text-base">
                {birthdayLetter}
              </p>

              <div className="flex justify-center mt-8 text-4xl">
                ❤️ 💍
              </div>

              <p className="text-center mt-6 italic text-[#8d6e63]">
                Forever yours,<br />
                Puja ❤️
              </p>
            </div>

          </div>
        </div>
      )}

      {/* animation */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </div>
  );
}