import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false, // Disable bodyParser to handle file uploads with formidable
  },
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = formidable({ multiples: false });

  try {
    // Parse the incoming form
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    if (!files.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = files.file.filepath;
    const fileType = files.file.mimetype;

    // Validate file type (accept only images)
    if (!fileType.startsWith('image/')) {
      await fs.unlink(filePath); // Clean up temporary file
      return res.status(400).json({ message: 'Invalid file type. Only images are allowed.' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'profile_pictures', // Specify a folder in your Cloudinary account
    });

    // Remove temporary file
    await fs.unlink(filePath);

    return res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);

    // Remove the temporary file in case of errors
    if (error.path && error.code === 'ENOENT') {
      try {
        await fs.unlink(error.path);
      } catch (unlinkError) {
        console.error('Error cleaning up temporary file:', unlinkError);
      }
    }

    return res.status(500).json({ message: 'Upload failed', error: error.message });
  }
};

export default handler;
