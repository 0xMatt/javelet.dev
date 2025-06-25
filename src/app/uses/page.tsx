import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Hardware, HardwareItem } from '@/app/uses/_components/hardware';
import { Metadata } from 'next';
import PageHeader from '@/components/elements/page-header';

export const metadata: Metadata = {
  title: 'My Uses',
  description:
    "My uses, basically an alternative to an EDC showcase. Make sure to check out uses.tech for a list of everyone's /uses pages!",
};

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
];

export default function Page() {
  return (
    <>
      <PageHeader header={metadata.title as string} description={metadata.description} />
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="hardware">Hardware</TabsTrigger>
          <TabsTrigger value="software">Software</TabsTrigger>
          <TabsTrigger value="coding">Browser & Coding</TabsTrigger>
          <TabsTrigger value="hobby">Hobby</TabsTrigger>
        </TabsList>
        <div className="mt-2 rounded-md border p-4">
          <TabsContent value="all">
            <Hardware hardwares={hardware} />
          </TabsContent>
          <TabsContent value="hardware">
            <Hardware hardwares={hardware} />
          </TabsContent>
          <TabsContent value="software">
            <Hardware hardwares={hardware} />
          </TabsContent>
          <TabsContent value="coding">
            <Hardware hardwares={hardware} />
          </TabsContent>
          <TabsContent value="hobby">
            <Hardware hardwares={hardware} />
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
}
