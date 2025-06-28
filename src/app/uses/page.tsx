import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Hardware } from '@/app/uses/_components/hardware';
import { Metadata } from 'next';
import PageHeader from '@/components/elements/page-header';
import { Software } from '@/app/uses/_components/software';

export const metadata: Metadata = {
  title: 'My Uses',
  description:
    "My uses, basically an alternative to an EDC showcase. Make sure to check out uses.tech for a list of everyone's /uses pages!",
};

export default function Page() {
  return (
    <>
      <PageHeader header={metadata.title as string} description={metadata.description} />
      <img src="https://i.imgur.com/DtFWNAO.png" alt="My desktop" width={900} height={500}/>
      <p>I use JetBrains IDE's for development. I am currently experimenting with their new oneisland theme and happy with experience.</p>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-15 lg:mb-0">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="hardware">Hardware</TabsTrigger>
          <TabsTrigger value="software">Software</TabsTrigger>
        </TabsList>
        <div className="flex flex-col mt-2 p-4">
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
