import { useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { ChainLink } from '../../types';
import { ChainNode } from './ChainNode';

interface ChainDisplayProps {
  chain: ChainLink[];
}

export function ChainDisplay({ chain }: ChainDisplayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [chain.length]);

  return (
    <div className="w-full">
      <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-2">
        Your Chain
      </div>
      <div
        ref={scrollRef}
        className="flex flex-wrap items-center gap-y-2 pb-2"
      >
        <AnimatePresence>
          {chain.map((link, i) => (
            <ChainNode
              key={link.country.code}
              link={link}
              index={i}
              isLatest={i === chain.length - 1}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
