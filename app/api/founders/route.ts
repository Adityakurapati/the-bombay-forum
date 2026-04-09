import { NextRequest, NextResponse } from 'next/server';
import { getFounders, createFounder, updateFounder, deleteFounder } from '@/lib/firebase';

export async function GET() {
  try {
    const founders = await getFounders();
    return NextResponse.json(founders);
  } catch (error) {
    console.error('[v0] Get Founders Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch founders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const founderId = await createFounder(body);
    return NextResponse.json({ id: founderId, ...body });
  } catch (error) {
    console.error('[v0] Create Founder Error:', error);
    return NextResponse.json(
      { error: 'Failed to create founder' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    await updateFounder(id, data);
    return NextResponse.json({ id, ...data });
  } catch (error) {
    console.error('[v0] Update Founder Error:', error);
    return NextResponse.json(
      { error: 'Failed to update founder' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing founder ID' },
        { status: 400 }
      );
    }

    await deleteFounder(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[v0] Delete Founder Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete founder' },
      { status: 500 }
    );
  }
}
