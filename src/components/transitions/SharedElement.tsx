// Pack: Transitions (original) / Source: Original / License: MIT

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Photo {
  id: string;
  title: string;
  subtitle: string;
  gradient: string;
}

const PHOTOS: Photo[] = [
  { id: "a", title: "Mountain Dawn", subtitle: "Patagonia, Chile", gradient: "from-emerald-700 to-teal-900" },
  { id: "b", title: "Neon Streets", subtitle: "Shibuya, Tokyo", gradient: "from-rose-700 to-pink-900" },
  { id: "c", title: "Desert Sand", subtitle: "Wadi Rum, Jordan", gradient: "from-amber-700 to-orange-900" },
  { id: "d", title: "Arctic Light", subtitle: "Tromsø, Norway", gradient: "from-sky-700 to-cyan-900" },
  { id: "e", title: "Jungle Mist", subtitle: "Bali, Indonesia", gradient: "from-lime-700 to-green-900" },
  { id: "f", title: "Coral Reef", subtitle: "Great Barrier Reef", gradient: "from-violet-700 to-purple-900" },
];

export function SharedElement() {
  const [selected, setSelected] = useState<Photo | null>(null);

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-400 font-mono">
        Click a thumbnail — shared-element expand via layoutId
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {PHOTOS.map((photo) => (
          <motion.div
            key={photo.id}
            layoutId={`shared-photo-${photo.id}`}
            onClick={() => setSelected(photo)}
            className={`relative rounded-xl bg-gradient-to-br ${photo.gradient} cursor-pointer overflow-hidden aspect-[4/3]`}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <motion.div
              layoutId={`shared-text-${photo.id}`}
              className="absolute bottom-0 inset-x-0 p-3"
            >
              <p className="text-sm font-bold text-white/90">{photo.title}</p>
              <p className="text-xs text-white/60">{photo.subtitle}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              onClick={() => setSelected(null)}
            >
              <motion.div
                layoutId={`shared-photo-${selected.id}`}
                className={`relative w-full max-w-lg aspect-video rounded-2xl bg-gradient-to-br ${selected.gradient} overflow-hidden`}
                onClick={(e) => e.stopPropagation()}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <motion.div
                  layoutId={`shared-text-${selected.id}`}
                  className="absolute bottom-0 inset-x-0 p-6"
                >
                  <p className="text-2xl font-bold text-white">{selected.title}</p>
                  <p className="text-sm text-white/70 mt-1">{selected.subtitle}</p>
                </motion.div>
                <button
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 text-white/80 flex items-center justify-center text-sm hover:bg-black/50 transition-colors"
                  onClick={() => setSelected(null)}
                >
                  ✕
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
