import prisma from '@/lib/prisma';
import cloudinary from 'cloudinary';

// Initialize Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to delete an image from Cloudinary
const deleteImage = async (imageUrl) => {
  try {
    const imagePublicId = imageUrl.split('/').pop().split('.')[0];
    const result = await cloudinary.uploader.destroy(imagePublicId);
    console.log('Cloudinary image deleted:', result);
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
};

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const post = await prisma.post.findUnique({
        where: { id: Number(id) },
      });

      if (post?.images && post.images.length > 0) {
        // Delete all images associated with the post from Cloudinary
        for (const imageUrl of post.images) {
          await deleteImage(imageUrl);
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
      // Filter out undefined values and only update defined fields
      const dataToUpdate = {};

      if (title !== undefined) {
        dataToUpdate.title = title;
      }

      if (content !== undefined) {
        dataToUpdate.content = content;
      }

      if (tags !== undefined) {
        dataToUpdate.tags = tags;
      }

      if (images !== undefined && images.length > 0) {
        // Ensure images is an array with valid values
        dataToUpdate.images = images.filter(image => image !== undefined);
      }

      // Perform the update with the filtered data
      const updatedPost = await prisma.post.update({
        where: { id: Number(id) },
        data: dataToUpdate,
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
