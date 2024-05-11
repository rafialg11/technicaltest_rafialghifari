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

    if (!user) {
      // If the user is not found, remove the verification token and return an error
      await removeUserByToken(token);
      return NextResponse.json(
        { error: 'Invalid token, try signing up again' },
        { status: 400 },
      );
    }

    // Update the user's email as verified
    await updateUser(user);

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
  return User.findOne({
    verifyToken: token,
    verifyTokenExpiry: { $gt: Date.now() },
  });
}

async function removeUserByToken(token: string) {
  await User.findOneAndDelete({ verifyToken: token });
}

async function updateUser(user: any) {
  user.isVerified = true;
  user.verifyToken = undefined;
  user.verifyTokenExpiry = undefined;
  await user.save();
}
