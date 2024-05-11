import { getDataFromToken } from '@/helpers/getDataFromToken';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function GET(request: NextRequest) {
  try {
    // Get the user ID from the request token
    const userId = await getDataFromToken(request);

    // Find the user document in the database by ID, excluding the password field
    const user = await User.findOne({ _id: userId }).select('-password');

    // Return the user data as a JSON response
    return NextResponse.json({
      message: 'User found',
      data: user,
    });
  } catch (error: any) {
    // Return an error response if an exception occurs
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
