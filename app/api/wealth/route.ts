import { NextResponse } from 'next/server';
import { 
  getAllWealthData, 
  setWealthHero, 
  setWealthTicker, 
  setWealthLeadStory, 
  createWealthSideStory, 
  updateWealthSideStory, 
  deleteWealthSideStory, 
  createWealthPulseItem, 
  updateWealthPulseItem, 
  deleteWealthPulseItem, 
  createWealthStoryGridItem, 
  updateWealthStoryGridItem, 
  deleteWealthStoryGridItem, 
  setWealthOpinionStrip 
} from '@/lib/firebase';

export async function GET() {
  try {
    const data = await getAllWealthData();
    return NextResponse.json(data || {});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch wealth data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, section, id, data } = body;

    switch (action) {
      case 'update_hero':
        await setWealthHero(data);
        break;
      case 'update_ticker':
        await setWealthTicker(data);
        break;
      case 'update_lead':
        await setWealthLeadStory(data);
        break;
      case 'create_side':
        await createWealthSideStory(data);
        break;
      case 'update_side':
        await updateWealthSideStory(id, data);
        break;
      case 'delete_side':
        await deleteWealthSideStory(id);
        break;
      case 'create_pulse':
        await createWealthPulseItem(data);
        break;
      case 'update_pulse':
        await updateWealthPulseItem(id, data);
        break;
      case 'delete_pulse':
        await deleteWealthPulseItem(id);
        break;
      case 'create_grid':
        await createWealthStoryGridItem(data);
        break;
      case 'update_grid':
        await updateWealthStoryGridItem(id, data);
        break;
      case 'delete_grid':
        await deleteWealthStoryGridItem(id);
        break;
      case 'update_opinion':
        await setWealthOpinionStrip(data);
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update wealth data' }, { status: 500 });
  }
}
