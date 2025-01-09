import { useSession } from 'next-auth/react';
import BlogCard from '@/components/blog/BlogCard'; // Ensure BlogCard is imported

const UserBlogList = () => {
  const { data: session } = useSession();

  // Ensure that session and session.user are defined before using them
  if (!session || !session.user) {
    return <p>You need to be logged in to view your blog posts.</p>;
  }

  const userEmail = session.user.email; // Access user email or other properties safely

  // Example: Fetch the user's blog posts (pseudo-code here)
  const blogs = [
    { title: 'First Post', excerpt: 'This is the first post', slug: 'first-post' },
    { title: 'Second Post', excerpt: 'This is the second post', slug: 'second-post' },
  ];

  return (
    <div>
      <h1>{session.user.name}'s Blog Posts</h1>
      {blogs.length === 0 ? (
        <p>No blog posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} title={blog.title} excerpt={blog.excerpt} slug={blog.slug} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBlogList;
