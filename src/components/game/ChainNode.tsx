import { motion } from 'framer-motion';
import type { ChainLink } from '../../types';

interface ChainNodeProps {
  link: ChainLink;
  index: number;
  isLatest: boolean;
}

export function ChainNode({ link, index, isLatest }: ChainNodeProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="flex items-center gap-1"
    >
      {index > 0 && (
        <div className="text-purple-600 mx-1 text-lg select-none">
          &rarr;
        </div>
      )}
      <div
        className={`flex items-center gap-2 rounded-full px-3 py-1.5 border transition-all ${
          isLatest
            ? 'bg-purple-800/60 border-purple-500 shadow-sm shadow-purple-900/50'
            : 'bg-purple-900/40 border-purple-800'
        }`}
      >
        <span className="text-lg">{link.country.flag}</span>
        <span className="text-sm font-medium text-purple-100 whitespace-nowrap">
          {link.country.name}
        </span>
      </div>
    </motion.div>
  );
}
