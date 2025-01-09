import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import ReactPaginate from 'react-paginate';

const BlogPage = ({ posts }) => {
  const { data: session } = useSession();
  const [isClient, setIsClient] = useState(false);

  // Pagination state
  const itemsPerPage = 6; // Adjust this number based on your design
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Paginated items
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = posts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(posts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % posts.length;
    setItemOffset(newOffset);
  };

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

  if (!isClient) return null;

  return (
    <MainLayout>
      <div className="bg-[#F5F6F8] w-full px-5 md:px-6 lg:px-7 py-4 relative mx-auto">
        <div className="grid md:grid-cols-2 container xl:px-5 mx-auto">
          <div className="flex flex-col justify-center gap-9">
            <h1 className="text-4xl md:w-[370px] font-bold">
              You’ve got a story, Post<span className="text-[#0086B0]">it</span>.
            </h1>
            <p className="lg:w-8/12">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Coctetur
              egestas massa velit aliquam. Molestie bibendum hnt ipsum orci, platea
              aliquam id ut.
            </p>
          </div>
          <div>
            <Image src="/welcome.svg" alt="welcome-img" width={800} height={800} />
          </div>
        </div>
      </div>

      <div className="container w-full mx-auto py-16 px-3">
        {posts.length === 0 ? (
          <p>No blog posts found. Create one to get started!</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <div className="w-full bg-white rounded-lg p-4 sm:h-40 md:h-[540px] lg:h-[450px] xl:h-[550px] 2xl:h-[650px]">
                    {post.images?.[0] && (
                      <div className="relative">
                        <img
                          src={post.images[0]}
                          alt={post.title}
                          className="w-full h-[280px] object-cover mb-2 rounded"
                        />
                        {post.tags?.length > 0 && (
                          <div className="absolute top-[230px] left-5 flex gap-2">
                            {post.tags.map((tag, index) => (
                              <p
                                key={index}
                                className={`text-sm font-medium px-3 py-[3px] rounded-md text-white ${getTagColor(tag)}`}
                              >
                                {tag}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    <h2 className="text-[26px] font-semibold mb-2">{post.title}</h2>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
                      <Image
                        src="/default-profile.png"
                        alt="Profile Picture"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <p className="text-[#7B7B7B]">
                        By <span className="text-black">{post.user?.username || 'Unknown'}</span>
                      </p>
                      <span className="text-[#7B7B7B]">-</span>
                      <span className="text-[#7B7B7B]">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="text-[#7B7B7B] mt-2 min-h-20">{post.content.slice(0, 100)}...</p>
                    <div className="mt-4">
                      <Link
                        href={`/blog/${post.id}`}
                        className="text-[#0086B0] font-semibold flex items-center gap-2 hover:underline"
                      >
                        <Image src="/arrrig.svg" width={20} height={20} alt="arrow right icon" /> Read More...
                      </Link>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="<"
              containerClassName="flex justify-center mt-8 gap-2"
              pageClassName="px-4 py-2 border rounded-md"
              activeClassName="bg-[#0086B0] text-white"
              previousClassName="px-4 py-2 border rounded-md"
              nextClassName="px-4 py-2 border rounded-md"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </>
        )}
      </div>
    </MainLayout>
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

  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        content: true,
        tags: true,
        images: true,
        createdAt: true,
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    const serializedPosts = posts.map((post) => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
    }));

    return {
      props: { session, posts: serializedPosts },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: { session, posts: [] },
    };
  }
};

export default BlogPage;
