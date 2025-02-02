import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import MainLayout from '@/components/layouts/MainLayout';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const MyBlogs = ({ posts }) => {
  const { data: session } = useSession();
  const router = useRouter(); 
  const [isClient, setIsClient] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDeleteClick = (postId) => {
    setSelectedPostId(postId);
    setDeletePopupOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(`/api/blog/${selectedPostId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        window.location.reload(); // Refresh the page to show updated posts
      } else {
        const error = await res.json();
        alert(`Failed to delete post: ${error.message}`);
      }
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('An unexpected error occurred.');
    } finally {
      setDeletePopupOpen(false);
    }
  };

  if (!isClient) return null;

  return (
    <>
      <div className="container w-11/12 mx-auto py-10 px-6 ">
        <div className='flex justify-between items-center'>        
        <h1 className="text-xl md:text-3xl font-semibold">My Stories</h1>
        <Link
  href="/createedit"
  className="bg-black font-medium text-white px-2 md:px-5 flex items-center h-9 rounded transition-transform duration-300 hover:bg-[#333] hover:scale-105"
>
  Write Story
</Link>

        </div>
        {posts.length === 0 ? (
          <p className='text-center py-10'>No blog posts found. Create one to get started!</p>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {posts.map((post) => (
              <div key={post.id} className="bg-white flex flex-col md:flex-row justify-between border-y-[2px] py-4 mt-8">

                <div className='w-full'>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-[#7B7B7B] mt-3">{post.content.slice(0, 100)}...</p>
                </div>
                
                <div className="flex md:h-11 mt-3 md:mt-0 md:justify-end  space-x-4 w-10/12 md:w-7/12">
  <button
    className="px-4 md:px-6 py-2 bg-[#0086B0] text-white font-medium rounded-md transition-transform duration-300 hover:bg-[#005f7d] hover:scale-105"
    onClick={() => router.push(`/blog/edit/${post.id}`)}
  >
    Edit Post
  </button>

  <button
    onClick={() => handleDeleteClick(post.id)}
    className="px-4 md:px-6 py-2 font-medium bg-white text-[#0086B0] rounded-md border-[1.5px] border-[#0086B0] transition-transform duration-300 hover:bg-[#eae8e8] hover:scale-105"
  >
    Delete
  </button>
</div>

              </div>
            ))}
          </div>
        )}
        <DeleteConfirmation
          isOpen={isDeletePopupOpen}
          onClose={() => setDeletePopupOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      </div>
      </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log('Session:', session);  // Debugging session object

  if (!session) {
    return {
      redirect: { destination: '/auth/login', permanent: false },
    };
  }

  try {
    const posts = await prisma.post.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, content: true },
    });

    console.log('Posts:', posts);  // Debugging posts data

    return {
      props: { posts },
    };
  } catch (error) {
    console.error(error);
    return { props: { posts: [] } };
  }
};

export default MyBlogs;
