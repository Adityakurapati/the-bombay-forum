import { NextRequest, NextResponse } from 'next/server';
import {
  getAllSuiteData,
  setSuiteHero,
  createSuiteFeaturedCard, updateSuiteFeaturedCard, deleteSuiteFeaturedCard,
  setSuitePullQuote,
  setSuiteFeaturedStrip,
  createSuiteSecondRowItem, updateSuiteSecondRowItem, deleteSuiteSecondRowItem,
} from '@/lib/firebase';

export async function GET() {
  try {
    const data = await getAllSuiteData();
    return NextResponse.json(data ?? {});
  } catch (error) {
    console.error('[Suite] GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch suite data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { section, data } = body;

    switch (section) {
      case 'pullQuote':     await setSuitePullQuote(data); break;
      case 'featuredStrip': await setSuiteFeaturedStrip(data); break;
      case 'featuredCard':  return NextResponse.json({ id: await createSuiteFeaturedCard(data) });
      case 'secondRowItem': return NextResponse.json({ id: await createSuiteSecondRowItem(data) });
      default: return NextResponse.json({ error: 'Unknown section' }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Suite] POST Error:', error);
    return NextResponse.json({ error: 'Failed to save suite data' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { section, id, data } = body;

    switch (section) {
      case 'featuredCard':  await updateSuiteFeaturedCard(id, data); break;
      case 'secondRowItem': await updateSuiteSecondRowItem(id, data); break;
      default: return NextResponse.json({ error: 'Unknown section' }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Suite] PUT Error:', error);
    return NextResponse.json({ error: 'Failed to update suite data' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');
    const id = searchParams.get('id');
    if (!section || !id) return NextResponse.json({ error: 'Missing params' }, { status: 400 });

    switch (section) {
      case 'featuredCard':  await deleteSuiteFeaturedCard(id); break;
      case 'secondRowItem': await deleteSuiteSecondRowItem(id); break;
      default: return NextResponse.json({ error: 'Unknown section' }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Suite] DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete suite data' }, { status: 500 });
  }
}
