import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

const BlogPost = ({ post }) => {
  if (!post) {
    return (
      <div className="container w-11/12 mx-auto p-6">
        <h1 className="text-2xl font-semibold">Post Not Found</h1>
        <p>We couldn't find the blog post you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="container w-11/12 mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 text-sm mb-6">Tags: {post.tags?.join(', ') || 'No Tags'}</p>
      {post.images?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {post.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${post.title} - image ${index + 1}`}
              className="w-full h-40 object-cover rounded"
            />
          ))}
        </div>
      )}
      <div className="text-gray-800 whitespace-pre-wrap">{post.content}</div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const { id } = context.params;

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        title: true,
        content: true,
        tags: true,
        images: true, // Include the images field
        userId: true,
      },
    });

    if (!post || post.userId !== session.user.id) {
      return { notFound: true };
    }

    return { props: { post } };
  } catch (error) {
    console.error('Error fetching post:', error);
    return { props: { post: null } };
  }
};

export default BlogPost;
