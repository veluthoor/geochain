import { motion, AnimatePresence } from 'framer-motion';
import type { Rule } from '../../types';

interface RuleCardProps {
  rule: Rule;
}

export function RuleCard({ rule }: RuleCardProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={rule.displayText}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="bg-ocean-50 dark:bg-ocean-900/20 border border-ocean-200 dark:border-ocean-800 rounded-xl px-6 py-4 text-center"
      >
        <div className="text-xs uppercase tracking-wider text-ocean-500 font-semibold mb-1">
          Challenge
        </div>
        <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {rule.displayText}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
