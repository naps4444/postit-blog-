import { getSession } from 'next-auth/react';
import CreateEditBlog from '@/components/blog/CreateEditBlog';
import prisma from '@/lib/prisma';

const EditBlog = ({ blog }) => {
  return <CreateEditBlog blog={blog} isEdit={true} />;
};

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    const { id } = context.params;
  
    if (!session) {
      return {
        redirect: { destination: '/auth/login', permanent: false },
      };
    }
  
    try {
      const blog = await prisma.post.findUnique({
        where: { id: Number(id) },
        select: {
          id: true,
          title: true,
          content: true,
          tags: true,
          images: true, // Fetch images
        },
      });
  
      if (!blog) {
        return { notFound: true };
      }
  
      return {
        props: { blog },
      };
    } catch (error) {
      console.error(error);
      return { props: { blog: null } };
    }
  };
  

export default EditBlog;
