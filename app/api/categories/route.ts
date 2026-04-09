import { NextRequest, NextResponse } from 'next/server';
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/lib/firebase';

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('[v0] Get Categories Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const categoryId = await createCategory(body);
    return NextResponse.json({ id: categoryId, ...body });
  } catch (error) {
    console.error('[v0] Create Category Error:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    await updateCategory(id, data);
    return NextResponse.json({ id, ...data });
  } catch (error) {
    console.error('[v0] Update Category Error:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
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
        { error: 'Missing category ID' },
        { status: 400 }
      );
    }

    await deleteCategory(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[v0] Delete Category Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
