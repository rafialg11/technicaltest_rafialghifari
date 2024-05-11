import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

connect();
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, '60 s'),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Extract email and password from the request body
    const { email, password } = await request.json();

    // Find the user with the given email and isVerified set to true
    const user = await User.findOne({ email, isVerified: true });

    if (!user) {
      // Return error response if user is not found or not verified
      return NextResponse.json(
        { error: 'User not found or not verified' },
        { status: 404 },
      );
    }

    // Compare the provided password with the hashed password stored in the database
    const isValidPassword = await bcryptjs.compare(password, user.password);

    if (!isValidPassword) {
      // Check if the rate limit for the user has been reached
      const limit = await ratelimit.limit(request.ip ?? 'anonymous');

      // Return error response if the password is incorrect or there are too many requests
      return NextResponse.json(
        { error: limit.success ? 'Wrong password' : 'Too many requests' },
        { status: limit.success ? 404 : 429 },
      );
    }

    // Generate a JSON Web Token (JWT) containing the user's id, username, and email
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.TOKEN_SECRET!,
      { expiresIn: '1d' },
    );

    // Create a response object with the login status and the token
    const response = NextResponse.json({
      message: 'Login Success',
      success: true,
    });
    response.cookies.set('token', token, { httpOnly: true });

    return response;
  } catch (error: any) {
    // Return error response if an error occurs during the login process
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
