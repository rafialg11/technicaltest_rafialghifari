import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    // Create a JSON response object with a success message
    const response = NextResponse.json({
      message: 'Logout successful',
      success: true,
    });

    // Delete the 'token' cookie by setting it to an empty string with an expiration date in the past
    response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error: any) {
    // If an error occurs, return a JSON response with the error message and a 500 status code
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
