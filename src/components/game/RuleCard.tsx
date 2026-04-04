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
        className="bg-ocean-50 dark:bg-ocean-900/40 border border-ocean-200 dark:border-ocean-700 rounded-xl px-6 py-4 text-center"
      >
        <div className="text-xs uppercase tracking-wider text-ocean-600 dark:text-ocean-400 font-semibold mb-1">
          Challenge
        </div>
        <div className="text-lg font-medium text-ocean-800 dark:text-ocean-200">
          {rule.displayText}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
