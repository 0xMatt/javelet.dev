import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Hardware } from '@/app/uses/_components/hardware';
import { Metadata } from 'next';
import PageHeader from '@/components/elements/page-header';
import { Software } from '@/app/uses/_components/software';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'My Uses',
  description:
    "My uses, basically an alternative to an EDC showcase. Make sure to check out uses.tech for a list of everyone's /uses pages!",
};

export default function Page() {
  return (
    <>
      <PageHeader header={metadata.title as string} description={metadata.description} />
      <Image src="https://i.imgur.com/DtFWNAO.png" alt="My desktop" width={900} height={500} />
      <p>
        I use JetBrains IDE&lsquo;s for development. I am currently experimenting with their new
        oneisland theme and happy with experience.
      </p>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="hardware">Hardware</TabsTrigger>
          <TabsTrigger value="software">Software</TabsTrigger>
        </TabsList>
        <div className="mt-2 flex flex-col p-4">
          <TabsContent value="all">
            <Hardware />
            <Software />
          </TabsContent>
          <TabsContent value="hardware">
            <Hardware />
          </TabsContent>
          <TabsContent value="software">
            <Software />
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
}
