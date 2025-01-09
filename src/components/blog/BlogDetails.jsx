const BlogDetails = ({ title, content, author, date }) => {
    return (
      <article className="prose max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-gray-500 text-sm mb-6">
          By {author} | {new Date(date).toLocaleDateString()}
        </p>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    );
  };
  
  export default BlogDetails;
  