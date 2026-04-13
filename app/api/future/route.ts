import { NextRequest, NextResponse } from 'next/server';
import {
  getAllFutureData,
  getFutureHero, setFutureHero,
  getFutureLeadStory, setFutureLeadStory,
  getFutureSideItems, createFutureSideItem, updateFutureSideItem, deleteFutureSideItem,
  getFutureSignalCards, createFutureSignalCard, updateFutureSignalCard, deleteFutureSignalCard,
  getFutureStoryGrid, createFutureStoryItem, updateFutureStoryItem, deleteFutureStoryItem,
  getFutureOpinionStrip, setFutureOpinionStrip,
} from '@/lib/firebase';

// GET /api/future            → all sections
// GET /api/future?section=X  → specific section
export async function GET(request: NextRequest) {
  try {
    const section = new URL(request.url).searchParams.get('section');
    if (!section) {
      const data = await getAllFutureData();
      return NextResponse.json(data ?? {});
    }
    let data: any = null;
    switch (section) {
      case 'hero':         data = await getFutureHero();        break;
      case 'leadStory':    data = await getFutureLeadStory();   break;
      case 'sideItems':    data = await getFutureSideItems();   break;
      case 'signalCards':  data = await getFutureSignalCards(); break;
      case 'storyGrid':    data = await getFutureStoryGrid();   break;
      case 'opinionStrip': data = await getFutureOpinionStrip(); break;
      default:
        return NextResponse.json({ error: 'Unknown section' }, { status: 400 });
    }
    return NextResponse.json(data ?? null);
  } catch (error) {
    console.error('[Future] GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch future data' }, { status: 500 });
  }
}

// PUT /api/future  body: { section, data }   → upsert singleton
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { section, data } = body;
    switch (section) {
      case 'hero':         await setFutureHero(data);        break;
      case 'leadStory':    await setFutureLeadStory(data);   break;
      case 'opinionStrip': await setFutureOpinionStrip(data); break;
      default:
        return NextResponse.json({ error: 'Unknown singleton section' }, { status: 400 });
    }
    return NextResponse.json({ success: true, section, data });
  } catch (error) {
    console.error('[Future] PUT error:', error);
    return NextResponse.json({ error: 'Failed to update future data' }, { status: 500 });
  }
}

// POST /api/future  body: { section, item }  → create list item
// POST /api/future  body: { section, id, item } → update existing list item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { section, id, item } = body;

    if (id) {
      // Update existing
      switch (section) {
        case 'sideItems':   await updateFutureSideItem(id, item);   break;
        case 'signalCards': await updateFutureSignalCard(id, item); break;
        case 'storyGrid':   await updateFutureStoryItem(id, item);  break;
        default:
          return NextResponse.json({ error: 'Unknown list section' }, { status: 400 });
      }
      return NextResponse.json({ success: true, id });
    } else {
      // Create new
      let newId: string | null = null;
      switch (section) {
        case 'sideItems':   newId = await createFutureSideItem(item)   as string; break;
        case 'signalCards': newId = await createFutureSignalCard(item) as string; break;
        case 'storyGrid':   newId = await createFutureStoryItem(item)  as string; break;
        default:
          return NextResponse.json({ error: 'Unknown list section' }, { status: 400 });
      }
      return NextResponse.json({ success: true, id: newId, ...item });
    }
  } catch (error) {
    console.error('[Future] POST error:', error);
    return NextResponse.json({ error: 'Failed to save future item' }, { status: 500 });
  }
}

// DELETE /api/future?section=X&id=Y
export async function DELETE(request: NextRequest) {
  try {
    const params = new URL(request.url).searchParams;
    const section = params.get('section');
    const id = params.get('id');
    if (!section || !id) {
      return NextResponse.json({ error: 'Missing section or id' }, { status: 400 });
    }
    switch (section) {
      case 'sideItems':   await deleteFutureSideItem(id);   break;
      case 'signalCards': await deleteFutureSignalCard(id); break;
      case 'storyGrid':   await deleteFutureStoryItem(id);  break;
      default:
        return NextResponse.json({ error: 'Unknown list section' }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Future] DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete future item' }, { status: 500 });
  }
}
