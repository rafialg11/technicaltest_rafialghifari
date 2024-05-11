import { connect } from '@/dbConfig/dbConfig';
import User from '../../../../models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Extract the user's data from the request body
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    // Check if the user already exists in the database
    const user = await User.findOne({ email });

    if (user) {
      // Return an error response if the user already exists
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 },
      );
    }

    // Hash the user's password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user document with the hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user document to the database
    const savedUser = await newUser.save();
    console.log(savedUser);

    // Send a verification email to the user
    await sendEmail({
      email,
      userId: savedUser._id,
    });

    // Return a success response with the created user data
    return NextResponse.json({
      message: 'User Created',
      success: true,
      savedUser,
    });
  } catch (error) {
    // Return an error response if an exception occurs during the signup process
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
