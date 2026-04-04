import { motion, AnimatePresence } from 'framer-motion';
import type { Feedback as FeedbackType } from '../../types';
import clsx from 'clsx';

interface FeedbackProps {
  feedback: FeedbackType | null;
}

const styles: Record<string, string> = {
  correct: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
  wrong: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  already_used: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200',
  invalid_country: 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300',
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
