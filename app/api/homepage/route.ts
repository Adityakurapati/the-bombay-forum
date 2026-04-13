import { NextRequest, NextResponse } from 'next/server';
import {
  getAllHomepageData,
  setHomepageCoverStory,
  createHomepageEditorPick, updateHomepageEditorPick, deleteHomepageEditorPick,
  createHomepageFeaturedWeekItem, updateHomepageFeaturedWeekItem, deleteHomepageFeaturedWeekItem,
  createHomepageSuiteCarouselItem, updateHomepageSuiteCarouselItem, deleteHomepageSuiteCarouselItem,
} from '@/lib/firebase';

export async function GET() {
  try {
    const data = await getAllHomepageData();
    return NextResponse.json(data ?? {});
  } catch (error) {
    console.error('[Homepage] GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch homepage data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { section, data } = body;

    switch (section) {
      case 'coverStory':     await setHomepageCoverStory(data); break;
      case 'editorPick':     return NextResponse.json({ id: await createHomepageEditorPick(data) });
      case 'featuredWeek':   return NextResponse.json({ id: await createHomepageFeaturedWeekItem(data) });
      case 'suiteCarousel':  return NextResponse.json({ id: await createHomepageSuiteCarouselItem(data) });
      default: return NextResponse.json({ error: 'Unknown section' }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Homepage] POST Error:', error);
    return NextResponse.json({ error: 'Failed to save homepage data' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { section, id, data } = body;

    switch (section) {
      case 'editorPick':    await updateHomepageEditorPick(id, data); break;
      case 'featuredWeek':  await updateHomepageFeaturedWeekItem(id, data); break;
      case 'suiteCarousel': await updateHomepageSuiteCarouselItem(id, data); break;
      default: return NextResponse.json({ error: 'Unknown section' }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Homepage] PUT Error:', error);
    return NextResponse.json({ error: 'Failed to update homepage data' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');
    const id = searchParams.get('id');
    if (!section || !id) return NextResponse.json({ error: 'Missing params' }, { status: 400 });

    switch (section) {
      case 'editorPick':    await deleteHomepageEditorPick(id); break;
      case 'featuredWeek':  await deleteHomepageFeaturedWeekItem(id); break;
      case 'suiteCarousel': await deleteHomepageSuiteCarouselItem(id); break;
      default: return NextResponse.json({ error: 'Unknown section' }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Homepage] DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete homepage data' }, { status: 500 });
  }
}
