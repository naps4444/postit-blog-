import prisma from '@/lib/prisma';
import cloudinary from 'cloudinary';

// Initialize Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload an image to Cloudinary
const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: 'blog-images', // Optional: Specify a folder for organization
    });
    return result.secure_url; // Return the uploaded image URL
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
};

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    // Existing DELETE logic
    try {
      const post = await prisma.post.findUnique({
        where: { id: Number(id) },
      });

      if (post?.images && post.images.length > 0) {
        for (const imageUrl of post.images) {
          await deleteImage(imageUrl); // Delete images from Cloudinary
        }
      }

      await prisma.post.delete({
        where: { id: Number(id) },
      });

      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  } else if (req.method === 'PUT') {
    const { title, content, tags, images } = req.body;

    try {
      const existingPost = await prisma.post.findUnique({
        where: { id: Number(id) },
      });

      if (!existingPost) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Process new images if provided as files
      let uploadedImages = [];
      if (images && Array.isArray(images)) {
        for (const image of images) {
          if (image.startsWith('data:')) {
            // Assuming new images are base64 strings
            const uploadedImage = await uploadImage(image);
            uploadedImages.push(uploadedImage);
          } else {
            // Keep existing image URLs
            uploadedImages.push(image);
          }
        }
      }

      const updatedPost = await prisma.post.update({
        where: { id: Number(id) },
        data: {
          title: title || existingPost.title,
          content: content || existingPost.content,
          tags: tags ? tags.split(',') : existingPost.tags, // Convert tags to an array
          images: uploadedImages.length > 0 ? uploadedImages : existingPost.images,
        },
      });

      res.status(200).json(updatedPost);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
