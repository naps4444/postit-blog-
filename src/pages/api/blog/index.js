import multer from 'multer';
import nextConnect from 'next-connect';
import prisma from '@/lib/prisma'; // Ensure default export is used

// Configure multer for multiple file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  }),
});

// Middleware for handling multiple files under the "images" field
const uploadMiddleware = upload.array('images', 10);

// Configure nextConnect
const apiRoute = nextConnect({
  onError(error, _req, res) {
    console.error('Error handler triggered:', error);
    res.status(500).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(_req, res) {
    res.status(405).json({ error: 'Method not allowed' });
  },
});

// Apply multer middleware
apiRoute.use(uploadMiddleware);

// POST route
apiRoute.post(async (req, res) => {
  console.log('Incoming POST request body:', req.body);
  console.log('Uploaded files:', req.files);

  const { title, content, tags, userId } = req.body;

  // Ensure `tags` is an array of strings
  const tagsArray = Array.isArray(tags)
    ? tags
    : tags.split(',').map((tag) => tag.trim());

  // Extract file paths from uploaded files
  const images = req.files.map((file) => `/uploads/${file.filename}`);

  try {
    // Create a new post
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        tags: tagsArray, // Ensure tags are stored as an array
        images,
        userId: parseInt(userId, 10), // Parse userId to integer
      },
    });

    console.log('Post created successfully:', newPost);
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Export the API route
export default apiRoute;

// Disable Next.js body parser for this API route
export const config = {
  api: {
    bodyParser: false,
  },
};
