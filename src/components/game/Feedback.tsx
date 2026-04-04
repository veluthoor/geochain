import { motion, AnimatePresence } from 'framer-motion';
import type { Feedback as FeedbackType } from '../../types';
import clsx from 'clsx';

interface FeedbackProps {
  feedback: FeedbackType | null;
}

const styles: Record<string, string> = {
  correct: 'bg-emerald-900/40 border-emerald-700 text-emerald-200',
  wrong: 'bg-red-900/40 border-red-700 text-red-200',
  already_used: 'bg-amber-900/40 border-amber-700 text-amber-200',
  invalid_country: 'bg-purple-900/40 border-purple-700 text-purple-200',
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
