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
        <div className="text-gray-400 dark:text-gray-500 mx-1 text-lg select-none">
          &rarr;
        </div>
      )}
      <div
        className={`flex items-center gap-2 rounded-full px-3 py-1.5 border transition-all ${
          isLatest
            ? 'bg-ocean-100 dark:bg-ocean-900/50 border-ocean-300 dark:border-ocean-600 shadow-md'
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
        }`}
      >
        <span className="text-lg">{link.country.flag}</span>
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
          {link.country.name}
        </span>
      </div>
    </motion.div>
  );
}
