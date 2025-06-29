import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Metadata } from 'next';
import PageHeader from '@/components/elements/page-header';
import Profile from '@/app/user/profile';
import Sessions from '@/app/user/sessions';

export const metadata: Metadata = {
  title: 'Account Management',
  description:
    'Edit your profile, change your settings, manage your sessions or delete your account',
};

export default function Page() {
  return (
    <>
      <PageHeader header={metadata.title as string} description={metadata.description} />
      <Tabs
        orientation="vertical"
        defaultValue="profile"
        className="flex w-full max-w-lg flex-row items-start justify-center gap-4"
      >
        <TabsList className="grid h-auto w-fit shrink-0 grid-cols-1 flex-col gap-1">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="danger">Danger Zone</TabsTrigger>
        </TabsList>
        <div className="flex h-screen w-full max-w-md">
          <TabsContent value="profile">
            <Profile />
          </TabsContent>
          <TabsContent value="security"></TabsContent>
          <TabsContent value="sessions">
            <Sessions />
          </TabsContent>
          <TabsContent value="danger"></TabsContent>
        </div>
      </Tabs>
    </>
  );
}
