import { NextRequest, NextResponse } from 'next/server';
import { getCreators, createCreator, updateCreator, deleteCreator } from '@/lib/firebase';

export async function GET() {
  try {
    const creators = await getCreators();
    return NextResponse.json(creators);
  } catch (error) {
    console.error('[v0] Get Creators Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch creators' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const creatorId = await createCreator(body);
    return NextResponse.json({ id: creatorId, ...body });
  } catch (error) {
    console.error('[v0] Create Creator Error:', error);
    return NextResponse.json(
      { error: 'Failed to create creator' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    await updateCreator(id, data);
    return NextResponse.json({ id, ...data });
  } catch (error) {
    console.error('[v0] Update Creator Error:', error);
    return NextResponse.json(
      { error: 'Failed to update creator' },
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
        { error: 'Missing creator ID' },
        { status: 400 }
      );
    }

    await deleteCreator(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[v0] Delete Creator Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete creator' },
      { status: 500 }
    );
  }
}
