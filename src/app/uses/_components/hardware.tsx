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

export interface HardwareItem {
  image: string | StaticImageData;
  name: string;
  description: string;
  url: string;
}

const hardware: HardwareItem[] = [
  {
    name: 'HP OMEN - 16.1"',
    description: 'Intel Core i7 - 16GB Memory - NVIDIA GeForce RTX 3060 - 1TB SSD',
    image: 'https://i.imgur.com/OlaljAY.png',
    url: 'https://www.bestbuy.com/site/hp-omen-16-2k-144hz-gaming-laptop-amd-ryzen-9-8940hx-32gb-ddr5-memory-nvidia-geforce-rtx-5060-1tb-ssd-shadow-black',
  },
  {
    name: 'LG - UltraGear 32”',
    description: 'Nano IPS QHD 1-ms G-SYNC with HDR',
    image: 'https://i.imgur.com/Xwisfdv.png',
    url: 'https://www.lg.com/us/monitors/lg-32gp83b-b-gaming-monitor',
  },
  {
    name: 'Ducky Mecha SF Pro',
    description: 'Silent Cherry Reds',
    image: 'https://i.imgur.com/XS6dxEh.png',
    url: 'https://mechanicalkeyboards.com/products/ducky-mecha-sf-pro-black',
  },
  {
    name: 'G Pro X Superlight 2',
    description: '4k Lightweight mouse',
    image: 'https://i.imgur.com/weExwTV.png',
    url: 'https://www.logitechg.com/en-us/products/gaming-mice/pro-x2-superlight-wireless-mouse.910-006628.html',
  },
];

export const Hardware = () => (
  <AnimatePresence>
    <motion.div
      className="space-y-4"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={listVariants}
    >
      <div className="text-lg">Hardware</div>
      <div className="grid w-full grid-cols-1 gap-3 pb-10 lg:grid-cols-2">
        {hardware.map((hardware, index: number) => (
          <motion.div
            key={index}
            className="flex items-center justify-between gap-2"
            variants={itemVariants}
            transition={{ type: 'tween' }}
          >
            <Link href={hardware.url} target="_blank">
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
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </AnimatePresence>
);
