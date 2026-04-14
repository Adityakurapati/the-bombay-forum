import { NextRequest, NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/articles';
import { createArticle, deleteArticle, updateArticle } from '@/lib/firebase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeRSS = searchParams.get('includeRSS') === 'true';

    const articles = await getAllArticles({ includeRSS });

    return NextResponse.json(articles);
  } catch (error) {
    console.error('[v0] Get Articles Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const articleId = await createArticle(body);
    return NextResponse.json({ id: articleId, ...body });
  } catch (error) {
    console.error('[v0] Create Article Error:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    await updateArticle(id, data);
    return NextResponse.json({ id, ...data });
  } catch (error) {
    console.error('[v0] Update Article Error:', error);
    return NextResponse.json(
      { error: 'Failed to update article' },
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
        { error: 'Missing article ID' },
        { status: 400 }
      );
    }

    await deleteArticle(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[v0] Delete Article Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}
