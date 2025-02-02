import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const CreateEditBlog = ({ blog, isEdit = false }) => {
  const [title, setTitle] = useState(blog?.title || '');
  const [content, setContent] = useState(blog?.content || '');
  const [tags, setTags] = useState(blog?.tags || []);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState(blog?.images || []); // Display existing images
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    // Cleanup object URLs to prevent memory leaks
    return () => {
      previewImages.forEach((src) => URL.revokeObjectURL(src));
    };
  }, [previewImages]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages([...previewImages, ...files.map((file) => URL.createObjectURL(file))]);
  };

  const handleImageRemove = (index) => {
    setPreviewImages(previewImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session || !session.user || !session.user.id) {
      alert('You must be logged in to create or edit a blog post.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', tags.join(','));
    formData.append('userId', session.user.id);
    images.forEach((image) => formData.append('images', image));

    try {
      const res = await fetch(isEdit ? `/api/blog/${blog?.id}` : '/api/blog', {
        method: isEdit ? 'PUT' : 'POST',
        body: formData,
      });

      if (res.ok) {
        router.push('/blog');
      } else {
        const error = await res.json();
        alert(`Error saving blog post: ${error.message}`);
      }
    } catch (err) {
      console.error('Error saving blog post:', err);
      alert('An unexpected error occurred.');
    }
  };

  return (
    <div className="container w-11/12 mx-auto p-6 rounded bg-white">
      <h1 className="text-2xl font-semibold mb-4">{isEdit ? 'Edit Story' : 'Create Story'}</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col justify-center">
        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="mb-7 p-2 border w-full px-10 py-3"
          required
        />

        {/* Tags */}
        <select
          className="w-full border px-9 py-3 mb-4"
          onChange={(e) => setTags([...tags, e.target.value])}
          aria-label="Tags"
        >
          <option value="">Tags</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
            <option value="Business">Business</option>
            <option value="Food">Food</option>
            <option value="Finance">Finance</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Fashion">Fashion</option>
          
          {/* Add other tags */}
        </select>

        {/* Uploaded Images */}
        <div className="preview-grid px-10 mt-3">
          {previewImages.map((src, index) => (
            <div key={index} className="relative inline-block">
              <img src={src} alt={`Preview ${index + 1}`} className="w-24 h-24 object-cover rounded" />
              <button
                type="button"
                onClick={() => handleImageRemove(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* New Images Upload */}
        <div className='w-full border px-10 py-3'>          
        <input type="file" id="images" multiple onChange={handleImageChange} className="" />
        </div>

        {/* Content */}
        <textarea
          value={content}
          rows={10}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your story..."
          className="mb-4 px-10 py-3 border w-full mt-7"
          required
        />

<button
  type="submit"
  className="bg-[#0086B0] text-white p-2 mt-8 w-5/12 md:4/12 mx-auto rounded-sm transition duration-300 ease-in-out transform hover:bg-[#006e8c] hover:scale-105"
>
  {isEdit ? 'Update' : 'Publish'} Story
</button>

      </form>
    </div>
  );
};

export default CreateEditBlog;
