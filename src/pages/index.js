import { useSession } from 'next-auth/react';
import MainLayout from '@/components/layouts/MainLayout';
// import BlogList from '@/components/blog/BlogList';
import Hero from '@/components/landing/Hero';
import Welcome from '@/components/landing/Welcome';

const HomePage = () => {
  const { data: session } = useSession(); // Get session data from next-auth

  

  return (
    <MainLayout title="Welcome to PostIt" description="Discover amazing content on PostIt Blog">
      <div className="mx-auto">
        {/* Conditionally render Hero or Welcome based on session */}
        {!session ? <Hero /> : <Welcome username={session.user.username} />}


        {/* Uncomment the BlogList if needed */}
        {/* <BlogList blogs={blogs} /> */}
      </div>
    </MainLayout>
  );
};

export default HomePage;
