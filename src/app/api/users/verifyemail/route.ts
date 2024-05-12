import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Extract the verification token from the request body
    const reqBody = await request.json();
    const { token } = reqBody;

    // Find the user with the given verification token
    const user = await findUserByToken(token);

    // Update the user's email as verified
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    // Return success response with the user's email
    return NextResponse.json(
      { message: 'Email verified successfully', email: user.email },
      { status: 200 },
    );
  } catch (error) {
    // Return error response if an exception occurs during the verification process
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function findUserByToken(token: string) {
  const user = await User.findOne({
    verifyToken: token,
    verifyTokenExpiry: { $gt: Date.now() },
  });
  if (!user) {    
    await removeUserByToken(token);
    return NextResponse.json(
      { error: 'Invalid token, try signing up again' },
      { status: 401 },
    );
  }
  return user;
}

async function removeUserByToken(token: string) {
  await User.findOneAndDelete({ verifyToken: token });
}

