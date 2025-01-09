import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import MainLayout from '@/components/layouts/MainLayout';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import { useEffect, useState } from 'react';

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
    <MainLayout>
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-5">My Blogs</h1>
        {posts.length === 0 ? (
          <p>No blog posts found. Create one to get started!</p>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {posts.map((post) => (
              <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="text-gray-600">{post.content.slice(0, 100)}...</p>
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    onClick={() => handleDeleteClick(post.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={() => router.push(`/blog/edit/${post.id}`)}
                  >
                    Edit
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
    </MainLayout>
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
