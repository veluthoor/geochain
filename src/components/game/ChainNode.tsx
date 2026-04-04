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
        <div className="text-gray-300 dark:text-gray-600 mx-1 text-lg select-none">
          &rarr;
        </div>
      )}
      <div
        className={`flex items-center gap-2 rounded-full px-3 py-1.5 border transition-all ${
          isLatest
            ? 'bg-ocean-50 dark:bg-ocean-900/30 border-ocean-300 dark:border-ocean-700 shadow-sm'
            : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700'
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
