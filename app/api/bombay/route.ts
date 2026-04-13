import { NextRequest, NextResponse } from 'next/server';
import {
  getAllBombayData,
  setBombayHero,
  setBombayLeadStory,
  createBombaySideStory, updateBombaySideStory, deleteBombaySideStory,
  createBombayPulseItem, updateBombayPulseItem, deleteBombayPulseItem,
  createBombayStoryItem, updateBombayStoryItem, deleteBombayStoryItem,
  setBombayOpinionStrip,
} from '@/lib/firebase';

export async function GET() {
  try {
    const data = await getAllBombayData();
    return NextResponse.json(data ?? {});
  } catch (error) {
    console.error('[Bombay] GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch bombay data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { section, data } = body;

    switch (section) {
      case 'leadStory':    await setBombayLeadStory(data); break;
      case 'opinionStrip': await setBombayOpinionStrip(data); break;
      case 'sideStory':    return NextResponse.json({ id: await createBombaySideStory(data) });
      case 'pulseItem':    return NextResponse.json({ id: await createBombayPulseItem(data) });
      case 'storyItem':    return NextResponse.json({ id: await createBombayStoryItem(data) });
      default: return NextResponse.json({ error: 'Unknown section' }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Bombay] POST Error:', error);
    return NextResponse.json({ error: 'Failed to save bombay data' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { section, id, data } = body;

    switch (section) {
      case 'sideStory': await updateBombaySideStory(id, data); break;
      case 'pulseItem': await updateBombayPulseItem(id, data); break;
      case 'storyItem': await updateBombayStoryItem(id, data); break;
      default: return NextResponse.json({ error: 'Unknown section' }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Bombay] PUT Error:', error);
    return NextResponse.json({ error: 'Failed to update bombay data' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');
    const id = searchParams.get('id');
    if (!section || !id) return NextResponse.json({ error: 'Missing params' }, { status: 400 });

    switch (section) {
      case 'sideStory': await deleteBombaySideStory(id); break;
      case 'pulseItem': await deleteBombayPulseItem(id); break;
      case 'storyItem': await deleteBombayStoryItem(id); break;
      default: return NextResponse.json({ error: 'Unknown section' }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Bombay] DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete bombay data' }, { status: 500 });
  }
}
