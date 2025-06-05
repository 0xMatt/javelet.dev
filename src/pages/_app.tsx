import { ThemeProvider } from 'next-themes';
import Layout from 'src/components/layout';
import '@/styles/global.css';
import { DefaultSeo } from 'next-seo';
import {AppProps} from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <DefaultSeo
                defaultTitle="Matthew Javelet"
                description="Personal blog divulging my ramblings, projects & information"
                openGraph={{
                    type: 'website',
                    locale: 'en_US',
                    url: 'https://www.javelet.work',
                    siteName: 'Matthew Javelet',
                }}
                twitter={{
                    handle: '@allofhertree',
                    site: '@site',
                    cardType: 'summary_large_image',
                }}
            />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>

        </>
    );
};