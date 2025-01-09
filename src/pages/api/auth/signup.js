import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    console.log('Invalid request method:', req.method);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, email, password } = req.body;

    // Debugging: Log request body
    console.log('Request Body:', req.body);

    // Validate input
    if (!username || !email || !password) {
      console.log('Validation Error: Missing fields', { username, email, password });
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Debugging: Log the JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.log('JWT_SECRET is missing in .env');
      throw new Error('JWT_SECRET is not defined.');
    } else {
      console.log('JWT_SECRET is loaded.');
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    console.log('Existing User Check:', existingUser);
    if (existingUser) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log('New User Created:', newUser);

    // Validate newUser before proceeding
    if (!newUser || !newUser.id || !newUser.email || !newUser.username) {
      console.error('Error: Invalid new user object', newUser);
      throw new Error('Failed to create new user.');
    }

    // Generate JWT token
    const tokenPayload = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    };
    console.log('JWT Payload:', tokenPayload);

    // Validate the payload before generating the token
    if (!tokenPayload.id || !tokenPayload.email || !tokenPayload.username) {
      console.error('Invalid token payload:', tokenPayload);
      throw new Error('Invalid payload for JWT.');
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated JWT Token:', token);

    // Respond with success and JWT token
    return res.status(201).json({
      message: 'User created successfully.',
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      },
      token,
    });

  } catch (error) {
    // Debugging: Catch and log errors
    console.error('Signup Error:', error);

    // Specific error messages for known issues
    if (error.name === 'JsonWebTokenError') {
      console.error('JWT Error: Ensure JWT_SECRET is set and valid.');
    } else if (error.name === 'PrismaClientKnownRequestError') {
      console.error('Prisma Error: Check database schema and connection.');
    }

    return res.status(500).json({
      message: 'Something went wrong.',
      error: error.message,
    });
  }
}
