import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';
import MainLayout from '@/components/layouts/MainLayout';
import Image from 'next/image';

const BlogPost = ({ post }) => {
  const getTagColor = (tag) => {
    const tagColors = {
      technology: 'bg-[#6397E5]',
      nature: 'bg-[#41D750]',
      lifestyle: 'bg-[#E5BF5E]',
      sports: 'bg-[#F42A2A]',
      health: 'bg-[#FF6D00]',
      education: 'bg-[#FFB300]',
      travel: 'bg-[#3E8B93]',
      business: 'bg-[#0066CC]',
      food: 'bg-[#FF5722]',
      finance: 'bg-[#1E88E5]',
      entertainment: 'bg-[#8E24AA]',
      fashion: 'bg-[#E91E63]',
    };

    return tagColors[tag.toLowerCase()] || 'bg-gray-400';
  };

  if (!post) {
    return (
      <MainLayout>
        <div className="container w-11/12 mx-auto py-16">
          <h1 className="text-2xl font-bold">404 - Blog Post Not Found</h1>
          <p>The blog post you are looking for does not exist.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    
      <div className="w-11/12 md:px-4 mx-auto container">
        <div className="mx-auto py-10">
          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`text-sm font-medium px-3 py-1 rounded-md text-white ${getTagColor(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl font-bold mb-4 mt-4 font-harmattan">{post.title}</h1>
          <div className="flex items-center gap-3 text-sm text-gray-600 font-open-sans">
            <p>
              By <span className="font-semibold text-black">{post.user.username}</span>
            </p>
            <span>-</span>
            <p>
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <div className="h-[1px] mt-6 w-full bg-[#DDDDDD]"></div>

          {/* Display Image */}
          <div className="mt-10 relative w-full h-[300px] md:h-[500px]">
            <Image
              src={post.images?.[0] || '/default-image.png'} // Default image fallback
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>

          {/* Blog Content */}
          <div className="mt-8 font-open-sans">
            <p className="text-gray-700">{post.content}</p>
          </div>
        </div>
      </div>
   
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: { select: { username: true } },
      },
    });

    if (!post) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post: {
          ...post,
          createdAt: post.createdAt.toISOString(),
        },
      },
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return {
      notFound: true,
    };
  }
};

export default BlogPost;
