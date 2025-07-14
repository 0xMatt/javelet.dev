'use cache';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BrowserQuest',
  description: 'An old Mozilla game I ported to typescript and wanted to keep alive',
};

export default async function Page() {
  return (
    <>
      <div className="h-screen">
        <iframe
          src="http://47.214.185.90:8008/"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          title="Embedded Content"
        ></iframe>
      </div>
    </>
  );
}
