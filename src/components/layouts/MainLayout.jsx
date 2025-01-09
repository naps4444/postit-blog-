import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import Head from 'next/head';

const MainLayout = ({ children, title = 'PostIt Blog', description = 'A modern blog platform built with Next.js' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
