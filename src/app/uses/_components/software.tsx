'use client';

import { AnimatePresence, motion } from 'framer-motion';
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

export interface SoftwareItem {
  image: string | StaticImageData;
  name: string;
  url: string;
}

const softwares: SoftwareItem[] = [
  {
    name: 'Fedora',
    image: 'https://i.imgur.com/3qynblN.png',
    url: 'https://www.fedoraproject.org/',
  },
  {
    name: 'i3',
    image: 'https://i.imgur.com/2tep4On.jpeg',
    url: 'https://i3wm.org/',
  },
  {
    name: 'Polybar',
    image: 'https://i.imgur.com/2vfC2iP.png',
    url: 'https://github.com/polybar/polybar',
  },
];

export const Software = () => (
  <AnimatePresence>
    <motion.div
      className="space-y-4"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={listVariants}
    >
      <div className="text-lg">Software</div>
      <div className="mt-5 grid w-full grid-cols-3 items-center justify-center gap-3 border p-5">
        {softwares.map((software, index: number) => (
          <motion.div
            key={index}
            className="flex flex-col gap-2"
            variants={itemVariants}
            transition={{ type: 'tween' }}
          >
            <Link href={software.url} target="_blank">
              <div className="flex flex-1 flex-col items-center gap-4">
                {/*<Image src={hardware.image} width={100} height={100} alt={hardware.name} />*/}
                <Image src={software.image} width={70} height={70} alt={`${software.name}`} />
                <div>
                  <span className="block text-sm leading-none font-semibold">{software.name}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </AnimatePresence>
);
