import { getSession } from 'next-auth/react';

const BlogPage = () => {
  return (
    <div>
      <h1>Blog Posts</h1>
      <p>List of blog posts goes here...</p>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

export default BlogPage;
