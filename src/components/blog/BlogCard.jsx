import Link from 'next/link';

const BlogCard = ({ title, excerpt, slug }) => {
  return (
    <div className="border rounded-md p-4 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{excerpt}</p>
      <Link href={`/blog/${slug}`} legacyBehavior>
        <a className="text-blue-500 hover:underline">Read more</a>
      </Link>
    </div>
  );
};

export default BlogCard;
