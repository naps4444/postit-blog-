import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useLoading } from '../../context/LoadingContext';
import LoadingIndicator from '../loading/LoadingIndicator';

const MainLayout = ({
  children,
  title = 'PostIt Blog',
  description = 'A modern blog platform built with Next.js',
}) => {
  const { loading, setLoading } = useLoading();
  const router = useRouter();

  // Define routes where the Navbar and Footer should be hidden
  const hideLayoutRoutes = ['/login', '/signup'];
  const shouldHideLayout = hideLayoutRoutes.includes(router.pathname);

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router, setLoading]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen">
        {loading && <LoadingIndicator />}
        {/* Conditionally render Navbar and Footer */}
        {!shouldHideLayout && <Navbar />}
        <main className="flex-1">{children}</main>
        {!shouldHideLayout && <Footer />}
      </div>
    </>
  );
};

export default MainLayout;

