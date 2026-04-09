import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileName = formData.get('fileName') as string;

    if (!file || !fileName) {
      return NextResponse.json(
        { error: 'Missing file or fileName' },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();
    const accountId = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID;
    const bucketName = process.env.NEXT_PUBLIC_R2_BUCKET_NAME;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    const r2Url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucketName}/objects/${fileName}`;

    const uploadResponse = await fetch(r2Url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/octet-stream',
      },
      body: buffer,
    });

    if (!uploadResponse.ok) {
      console.error('[v0] R2 Upload Error:', uploadResponse.statusText);
      return NextResponse.json(
        { error: 'Failed to upload to R2' },
        { status: 500 }
      );
    }

    // Generate public URL
    const publicUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${fileName}`;

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('[v0] Upload Error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
