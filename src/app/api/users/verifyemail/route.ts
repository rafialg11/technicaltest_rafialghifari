import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    const user = await findUserByToken(token);

    if (!user) {
      await removeUserByToken(token);
      return NextResponse.json({ error: 'Invalid token, try signing up again' }, { status: 400 });
    }

    await updateUser(user);
    return NextResponse.json(
      { message: 'Email verified successfully', email: user.email },
      { status: 200 },
    );
  } catch (error) {
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