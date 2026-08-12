import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 max-w-[90vw] sm:max-w-md w-full px-4"
        >
          <div className="bg-[#1A1A1A] border-2 border-[#F2B705] text-[#F5F0E8] px-4 py-3 rounded-xl shadow-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="bg-[#C41E2A] p-1.5 rounded-lg text-[#F2B705] shrink-0">
                <Flame className="w-5 h-5 animate-pulse" />
              </div>
              <p className="text-sm font-semibold text-[#F5F0E8] truncate">{message}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
