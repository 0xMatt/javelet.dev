import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Layout from 'src/components/layout';
import '@/styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
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