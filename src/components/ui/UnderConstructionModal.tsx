"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function UnderConstructionModal() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="mx-4 max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl"
          >
            <div className="mb-4 text-5xl">🚧</div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              サイト準備中
            </h2>
            <p className="mb-6 text-gray-600">
              現在、ホームページを準備しております。
              <br />
              オープンまでしばらくお待ちください。
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full px-6 py-2.5 font-medium text-white transition-colors"
              style={{ backgroundColor: "var(--color-orbital-steel)" }}
            >
              サイトを見る
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
