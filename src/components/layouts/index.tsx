export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            <div className="mx-auto max-w-6xl">
                <div className='flex flex-col lg:flex-row lg:gap-2 lg:py-4 xl:pb-8'>
                    <main className='max-w-[915px] transition-all duration-300 lg:w-4/5'>
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
};

