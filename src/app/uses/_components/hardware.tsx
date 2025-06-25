'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ExternalLink, ThumbsUp } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export interface HardwareItem {
  image: string | StaticImageData;
  name: string;
  description: string;
  url: string;
}
export const Hardware = ({ hardwares }: { hardwares: HardwareItem[] }) => (
  <AnimatePresence>
    <motion.div
      className="space-y-4"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={listVariants}
    >
      <div className="grid w-full grid-cols-2 gap-3">
        {hardwares.map((hardware, index: number) => (
          <motion.div
            key={index}
            className="flex items-center justify-between gap-2"
            variants={itemVariants}
            transition={{ type: 'tween' }}
          >
            <div className="flex items-center gap-4">
              {/*<Image src={hardware.image} width={100} height={100} alt={hardware.name} />*/}
              <Image
                src={hardware.image}
                width={80}
                height={80}
                alt={`${hardware.name} - ${hardware.description}`}
              />
              <div>
                <span className="block text-sm leading-none font-semibold">{hardware.name}</span>
                <span className="text-xs leading-none">{hardware.description}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href={hardware.url} target="_blank">
                <Button size="icon" variant="outline" className="cursor-pointer">
                  <ExternalLink className="h-5 w-5" />
                </Button>
              </Link>

              <Button size="icon" variant="outline" className="text-orange-300">
                <ThumbsUp className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </AnimatePresence>
);
