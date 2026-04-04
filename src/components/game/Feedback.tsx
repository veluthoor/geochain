import { motion, AnimatePresence } from 'framer-motion';
import type { Feedback as FeedbackType } from '../../types';
import clsx from 'clsx';

interface FeedbackProps {
  feedback: FeedbackType | null;
}

const styles: Record<string, string> = {
  correct: 'bg-earth-50 dark:bg-earth-900/40 border-earth-300 dark:border-earth-700 text-earth-800 dark:text-earth-200',
  wrong: 'bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200',
  already_used: 'bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200',
  invalid_country: 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300',
};

export function Feedback({ feedback }: FeedbackProps) {
  return (
    <AnimatePresence>
      {feedback && (
        <motion.div
          key={feedback.message}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={clsx(
            'rounded-lg border px-4 py-3 text-sm',
            styles[feedback.type],
          )}
        >
          <div className="font-medium">{feedback.message}</div>
          {feedback.hint && (
            <div className="mt-1 opacity-75 text-xs">{feedback.hint}</div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
