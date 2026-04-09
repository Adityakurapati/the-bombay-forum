import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAccess } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, accessKey } = body;

    if (!email || !accessKey) {
      return NextResponse.json(
        { error: 'Missing email or access key' },
        { status: 400 }
      );
    }

    const isValid = await verifyAdminAccess(email, accessKey);

    if (isValid) {
      return NextResponse.json({ success: true, email });
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('[v0] Admin Verification Error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}
