import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import mem1 from "../assets/img4.jpg";
import mem2 from "../assets/img2.jpg";
import mem3 from "../assets/img3.jpg";
import mem4 from "../assets/img.jpg";

const photos = [
  {
    image: mem1,
    title: "Our Beginning ❤️",
    message:
      "The day our story started. Every beautiful memory began from this beautiful moment.",
  },
  {
    image: mem2,
    title: "Your Beautiful Smile 😊",
    message:
      "Your smile is my favorite view. It has always been my safe place.",
  },
  {
    image: mem3,
    title: "Adventure Together ✈️",
    message:
      "No destination matters as long as I'm holding your hand.",
  },
  {
    image: mem4,
    title: "Forever Us 💍",
    message:
      "No matter what life brings, I promise I'll always choose you.",
  },
];

export default function PhotoSection() {
  const [selected, setSelected] = useState<number | null>(null);

  const next = () => {
    if (selected === null) return;
    setSelected((selected + 1) % photos.length);
  };

  const prev = () => {
    if (selected === null) return;
    setSelected((selected - 1 + photos.length) % photos.length);
  };

  return (
    <section className="relative overflow-hidden py-24 px-6">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full bg-pink-400/20 blur-[120px]" />

        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-rose-300/20 blur-[120px]" />

        <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[120px]" />

      </div>

      {/* Heading */}

      <div className="relative text-center z-10 mb-20">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          className="text-6xl md:text-7xl text-white font-serif"
        >
          Our Love Album
        </motion.h2>

        <p className="text-white/70 italic mt-5 text-xl">
          Every picture tells a story we created together.
        </p>

        <div className="mt-5 text-4xl">
          📖 ❤️ 📸 ❤️ 🌹
        </div>

      </div>

      {/* Gallery */}

      <div className="relative z-10 max-w-7xl mx-auto">

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">

          {photos.map((photo, index) => (

            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              transition={{ duration: .3 }}
              onClick={() => setSelected(index)}
              className="group relative cursor-pointer break-inside-avoid"
            >

              {/* Glow */}

              <div className="absolute inset-0 rounded-[30px] bg-pink-400/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* Card */}

              <div className="relative overflow-hidden rounded-[28px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,.45)]">

                <div className="overflow-hidden">

                  <img
                    src={photo.image}
                    alt=""
                    className="w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                </div>

                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-6">

                  <h3 className="text-white text-2xl font-serif">
                    {photo.title}
                  </h3>

                  <p className="text-white/80 text-sm mt-2">
                    Click to open memory ❤️
                  </p>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

      {/* Quote */}

      <div className="relative z-10 text-center mt-20">

        <p className="text-white italic text-2xl max-w-3xl mx-auto">
          "A photograph is a memory frozen forever, and every memory with you is priceless."
        </p>

        <div className="text-4xl mt-5">
          ❤️ ✨ 🌹 ✨ ❤️
        </div>

      </div>

      {/* Lightbox */}

      <AnimatePresence>

        {selected !== null && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-lg flex items-center justify-center px-6"
          >

            {/* Close */}

            <button
              onClick={() => setSelected(null)}
              className="absolute top-8 right-8 text-white text-5xl hover:rotate-90 transition"
            >
              ×
            </button>

            {/* Previous */}

            <button
              onClick={prev}
              className="absolute left-6 md:left-10 text-white text-6xl hover:scale-125 transition"
            >
              ❮
            </button>

            {/* Next */}

            <button
              onClick={next}
              className="absolute right-6 md:right-10 text-white text-6xl hover:scale-125 transition"
            >
              ❯
            </button>

            <motion.div
              key={selected}
              initial={{ scale: .8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: .8, opacity: 0 }}
              transition={{ duration: .4 }}
              className="max-w-6xl w-full overflow-hidden rounded-[35px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,.55)] grid lg:grid-cols-2"
            >

              {/* Left */}

              <div className="bg-black/20 p-8 flex items-center justify-center">

                <img
                  src={photos[selected].image}
                  alt=""
                  className="rounded-3xl max-h-[80vh] object-cover shadow-[0_20px_60px_rgba(0,0,0,.5)]"
                />

              </div>

              {/* Right */}

              <div className="bg-[#fff8f1] p-12 flex flex-col justify-center">

                <div className="text-6xl mb-6">
                  💌
                </div>

                <h2 className="text-5xl font-serif text-[#5d4037]">
                  {photos[selected].title}
                </h2>

                <div className="w-28 h-[3px] bg-rose-400 rounded-full my-8" />

                <p className="text-[#6d4c41] leading-9 text-xl italic">
                  {photos[selected].message}
                </p>

                <div className="mt-10 flex items-center justify-between">

                  <div className="text-4xl">
                    ❤️ 🌹 ✨
                  </div>

                  <span className="text-[#8d6e63] text-lg">
                    {selected + 1} / {photos.length}
                  </span>

                </div>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </section>
  );
}