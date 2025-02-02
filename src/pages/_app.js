import { SessionProvider } from "next-auth/react"; // NextAuth Session Provider
import { LoadingProvider } from "../context/LoadingContext"; // Loading Context
import Layout from "../components/layouts/MainLayout"; // Layout component to manage loading
import "../styles/globals.css"; // Global styles

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <LoadingProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LoadingProvider>
    </SessionProvider>
  );
}

export default MyApp;
