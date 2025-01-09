// src/pages/api/posts/index.js
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const posts = await prisma.post.findMany({
        include: {
          user: true, // Include related user data if needed
        },
      });
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
