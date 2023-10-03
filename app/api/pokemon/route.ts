import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    return NextResponse.json({ message: 'Fetch pokemon success' });
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch pokemon. Please try again later', {
      status: 500,
    });
  }
};
