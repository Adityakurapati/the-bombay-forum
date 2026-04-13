import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, remove, push, query, orderByChild, equalTo, DataSnapshot } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

// Articles
export async function getArticles() {
  const articlesRef = ref(database, 'articles');
  const snapshot = await get(articlesRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.entries(data).map(([id, val]: [string, any]) => ({
      id,
      ...val,
    }));
  }
  return [];
}

export async function getArticleById(id: string) {
  const articleRef = ref(database, `articles/${id}`);
  const snapshot = await get(articleRef);
  if (snapshot.exists()) {
    return { id, ...snapshot.val() };
  }
  return null;
}

export async function getArticleBySlug(slug: string) {
  const articlesRef = ref(database, 'articles');
  const snapshot = await get(articlesRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    const articleId = Object.keys(data).find((key) => data[key].slug === slug);
    if (articleId) {
      return { id: articleId, ...data[articleId] };
    }
  }
  return null;
}

export async function createArticle(data: any) {
  const articlesRef = ref(database, 'articles');
  const newArticleRef = push(articlesRef);
  await set(newArticleRef, {
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return newArticleRef.key;
}

export async function updateArticle(id: string, data: any) {
  const articleRef = ref(database, `articles/${id}`);
  await set(articleRef, {
    ...data,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteArticle(id: string) {
  const articleRef = ref(database, `articles/${id}`);
  await remove(articleRef);
}

// Categories
export async function getCategories() {
  const categoriesRef = ref(database, 'categories');
  const snapshot = await get(categoriesRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.entries(data).map(([id, val]: [string, any]) => ({
      id,
      ...val,
    }));
  }
  return [];
}

export async function getCategoryBySlug(slug: string) {
  const categoriesRef = ref(database, 'categories');
  const snapshot = await get(categoriesRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    const categoryId = Object.keys(data).find((key) => data[key].slug === slug);
    if (categoryId) {
      return { id: categoryId, ...data[categoryId] };
    }
  }
  return null;
}

export async function createCategory(data: any) {
  const categoriesRef = ref(database, 'categories');
  const newCategoryRef = push(categoriesRef);
  await set(newCategoryRef, {
    ...data,
    createdAt: new Date().toISOString(),
  });
  return newCategoryRef.key;
}

export async function updateCategory(id: string, data: any) {
  const categoryRef = ref(database, `categories/${id}`);
  await set(categoryRef, data);
}

export async function deleteCategory(id: string) {
  const categoryRef = ref(database, `categories/${id}`);
  await remove(categoryRef);
}

// Founders
export async function getFounders() {
  const foundersRef = ref(database, 'founders');
  const snapshot = await get(foundersRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.entries(data).map(([id, val]: [string, any]) => ({
      id,
      ...val,
    }));
  }
  return [];
}

export async function getFounderBySlug(slug: string) {
  const foundersRef = ref(database, 'founders');
  const snapshot = await get(foundersRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    const founderId = Object.keys(data).find((key) => data[key].slug === slug);
    if (founderId) {
      return { id: founderId, ...data[founderId] };
    }
  }
  return null;
}

export async function createFounder(data: any) {
  const foundersRef = ref(database, 'founders');
  const newFounderRef = push(foundersRef);
  await set(newFounderRef, {
    ...data,
    createdAt: new Date().toISOString(),
  });
  return newFounderRef.key;
}

export async function updateFounder(id: string, data: any) {
  const founderRef = ref(database, `founders/${id}`);
  await set(founderRef, data);
}

export async function deleteFounder(id: string) {
  const founderRef = ref(database, `founders/${id}`);
  await remove(founderRef);
}

// Creators
export async function getCreators() {
  const creatorsRef = ref(database, 'creators');
  const snapshot = await get(creatorsRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.entries(data).map(([id, val]: [string, any]) => ({
      id,
      ...val,
    }));
  }
  return [];
}

export async function getCreatorBySlug(slug: string) {
  const creatorsRef = ref(database, 'creators');
  const snapshot = await get(creatorsRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    const creatorId = Object.keys(data).find((key) => data[key].slug === slug);
    if (creatorId) {
      return { id: creatorId, ...data[creatorId] };
    }
  }
  return null;
}

export async function createCreator(data: any) {
  const creatorsRef = ref(database, 'creators');
  const newCreatorRef = push(creatorsRef);
  await set(newCreatorRef, {
    ...data,
    createdAt: new Date().toISOString(),
  });
  return newCreatorRef.key;
}

export async function updateCreator(id: string, data: any) {
  const creatorRef = ref(database, `creators/${id}`);
  await set(creatorRef, data);
}

export async function deleteCreator(id: string) {
  const creatorRef = ref(database, `creators/${id}`);
  await remove(creatorRef);
}

// Admins
export async function getAdminByEmail(email: string) {
  const adminsRef = ref(database, 'admins');
  const snapshot = await get(adminsRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    const adminId = Object.keys(data).find((key) => data[key].email === email);
    if (adminId) {
      return { id: adminId, ...data[adminId] };
    }
  }
  return null;
}

export async function verifyAdminAccess(email: string, accessKey: string): Promise<boolean> {
  const admin = await getAdminByEmail(email);
  return admin && admin.accessKey === accessKey;
}

// ─────────────────────────────────────────────────────────
// Future Page
// ─────────────────────────────────────────────────────────

// Hero (singleton)
export async function getFutureHero() {
  const snap = await get(ref(database, 'future/hero'));
  return snap.exists() ? snap.val() : null;
}
export async function setFutureHero(data: any) {
  await set(ref(database, 'future/hero'), data);
}

// Lead Story (singleton)
export async function getFutureLeadStory() {
  const snap = await get(ref(database, 'future/leadStory'));
  return snap.exists() ? snap.val() : null;
}
export async function setFutureLeadStory(data: any) {
  await set(ref(database, 'future/leadStory'), data);
}

// Side Items (list)
export async function getFutureSideItems() {
  const snap = await get(ref(database, 'future/sideItems'));
  if (!snap.exists()) return [];
  return Object.entries(snap.val()).map(([id, val]: [string, any]) => ({ id, ...val }));
}
export async function createFutureSideItem(data: any) {
  const r = push(ref(database, 'future/sideItems'));
  await set(r, data);
  return r.key;
}
export async function updateFutureSideItem(id: string, data: any) {
  await set(ref(database, `future/sideItems/${id}`), data);
}
export async function deleteFutureSideItem(id: string) {
  await remove(ref(database, `future/sideItems/${id}`));
}

// Signal Cards (list)
export async function getFutureSignalCards() {
  const snap = await get(ref(database, 'future/signalCards'));
  if (!snap.exists()) return [];
  return Object.entries(snap.val()).map(([id, val]: [string, any]) => ({ id, ...val }));
}
export async function createFutureSignalCard(data: any) {
  const r = push(ref(database, 'future/signalCards'));
  await set(r, data);
  return r.key;
}
export async function updateFutureSignalCard(id: string, data: any) {
  await set(ref(database, `future/signalCards/${id}`), data);
}
export async function deleteFutureSignalCard(id: string) {
  await remove(ref(database, `future/signalCards/${id}`));
}

// Story Grid (list)
export async function getFutureStoryGrid() {
  const snap = await get(ref(database, 'future/storyGrid'));
  if (!snap.exists()) return [];
  return Object.entries(snap.val()).map(([id, val]: [string, any]) => ({ id, ...val }));
}
export async function createFutureStoryItem(data: any) {
  const r = push(ref(database, 'future/storyGrid'));
  await set(r, data);
  return r.key;
}
export async function updateFutureStoryItem(id: string, data: any) {
  await set(ref(database, `future/storyGrid/${id}`), data);
}
export async function deleteFutureStoryItem(id: string) {
  await remove(ref(database, `future/storyGrid/${id}`));
}

// Opinion Strip (singleton)
export async function getFutureOpinionStrip() {
  const snap = await get(ref(database, 'future/opinionStrip'));
  return snap.exists() ? snap.val() : null;
}
export async function setFutureOpinionStrip(data: any) {
  await set(ref(database, 'future/opinionStrip'), data);
}

// Fetch everything in one call
export async function getAllFutureData() {
  const snap = await get(ref(database, 'future'));
  if (!snap.exists()) return null;
  const d = snap.val();
  const listify = (obj: any) =>
    obj ? Object.entries(obj).map(([id, val]: [string, any]) => ({ id, ...val })) : [];
  return {
    hero: d.hero || null,
    leadStory: d.leadStory || null,
    sideItems: listify(d.sideItems).sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0)),
    signalCards: listify(d.signalCards).sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0)),
    storyGrid: listify(d.storyGrid).sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0)),
    opinionStrip: d.opinionStrip || null,
  };
}

// ─────────────────────────────────────────────────────────
// Bombay Page
// ─────────────────────────────────────────────────────────

export async function getBombayHero() {
  const snap = await get(ref(database, 'bombay/hero'));
  return snap.exists() ? snap.val() : null;
}
export async function setBombayHero(data: any) {
  await set(ref(database, 'bombay/hero'), data);
}

export async function getBombayLeadStory() {
  const snap = await get(ref(database, 'bombay/leadStory'));
  return snap.exists() ? snap.val() : null;
}
export async function setBombayLeadStory(data: any) {
  await set(ref(database, 'bombay/leadStory'), data);
}

export async function getBombaySideStories() {
  const snap = await get(ref(database, 'bombay/sideStories'));
  if (!snap.exists()) return [];
  return Object.entries(snap.val()).map(([id, val]: [string, any]) => ({ id, ...val }));
}
export async function createBombaySideStory(data: any) {
  const r = push(ref(database, 'bombay/sideStories'));
  await set(r, data);
  return r.key;
}
export async function updateBombaySideStory(id: string, data: any) {
  await set(ref(database, `bombay/sideStories/${id}`), data);
}
export async function deleteBombaySideStory(id: string) {
  await remove(ref(database, `bombay/sideStories/${id}`));
}

export async function getBombayPulseItems() {
  const snap = await get(ref(database, 'bombay/pulseItems'));
  if (!snap.exists()) return [];
  return Object.entries(snap.val()).map(([id, val]: [string, any]) => ({ id, ...val }));
}
export async function createBombayPulseItem(data: any) {
  const r = push(ref(database, 'bombay/pulseItems'));
  await set(r, data);
  return r.key;
}
export async function updateBombayPulseItem(id: string, data: any) {
  await set(ref(database, `bombay/pulseItems/${id}`), data);
}
export async function deleteBombayPulseItem(id: string) {
  await remove(ref(database, `bombay/pulseItems/${id}`));
}

export async function getBombayStoryGrid() {
  const snap = await get(ref(database, 'bombay/storyGrid'));
  if (!snap.exists()) return [];
  return Object.entries(snap.val()).map(([id, val]: [string, any]) => ({ id, ...val }));
}
export async function createBombayStoryItem(data: any) {
  const r = push(ref(database, 'bombay/storyGrid'));
  await set(r, data);
  return r.key;
}
export async function updateBombayStoryItem(id: string, data: any) {
  await set(ref(database, `bombay/storyGrid/${id}`), data);
}
export async function deleteBombayStoryItem(id: string) {
  await remove(ref(database, `bombay/storyGrid/${id}`));
}

export async function getBombayOpinionStrip() {
  const snap = await get(ref(database, 'bombay/opinionStrip'));
  return snap.exists() ? snap.val() : null;
}
export async function setBombayOpinionStrip(data: any) {
  await set(ref(database, 'bombay/opinionStrip'), data);
}

export async function getAllBombayData() {
  const snap = await get(ref(database, 'bombay'));
  if (!snap.exists()) return null;
  const d = snap.val();
  const listify = (obj: any) =>
    obj ? Object.entries(obj).map(([id, val]: [string, any]) => ({ id, ...val })) : [];
  return {
    hero: d.hero || null,
    leadStory: d.leadStory || null,
    sideStories: listify(d.sideStories),
    pulseItems: listify(d.pulseItems),
    storyGrid: listify(d.storyGrid),
    opinionStrip: d.opinionStrip || null,
  };
}

// ─────────────────────────────────────────────────────────
// Suite Page
// ─────────────────────────────────────────────────────────

export async function getSuiteHero() {
  const snap = await get(ref(database, 'suite/hero'));
  return snap.exists() ? snap.val() : null;
}
export async function setSuiteHero(data: any) {
  await set(ref(database, 'suite/hero'), data);
}

export async function getSuiteFeaturedCards() {
  const snap = await get(ref(database, 'suite/featuredCards'));
  if (!snap.exists()) return [];
  return Object.entries(snap.val()).map(([id, val]: [string, any]) => ({ id, ...val }));
}
export async function createSuiteFeaturedCard(data: any) {
  const r = push(ref(database, 'suite/featuredCards'));
  await set(r, data);
  return r.key;
}
export async function updateSuiteFeaturedCard(id: string, data: any) {
  await set(ref(database, `suite/featuredCards/${id}`), data);
}
export async function deleteSuiteFeaturedCard(id: string) {
  await remove(ref(database, `suite/featuredCards/${id}`));
}

export async function getSuitePullQuote() {
  const snap = await get(ref(database, 'suite/pullQuote'));
  return snap.exists() ? snap.val() : null;
}
export async function setSuitePullQuote(data: any) {
  await set(ref(database, 'suite/pullQuote'), data);
}

export async function getSuiteFeaturedStrip() {
  const snap = await get(ref(database, 'suite/featuredStrip'));
  return snap.exists() ? snap.val() : null;
}
export async function setSuiteFeaturedStrip(data: any) {
  await set(ref(database, 'suite/featuredStrip'), data);
}

export async function getSuiteSecondRow() {
  const snap = await get(ref(database, 'suite/secondRow'));
  if (!snap.exists()) return [];
  return Object.entries(snap.val()).map(([id, val]: [string, any]) => ({ id, ...val }));
}
export async function createSuiteSecondRowItem(data: any) {
  const r = push(ref(database, 'suite/secondRow'));
  await set(r, data);
  return r.key;
}
export async function updateSuiteSecondRowItem(id: string, data: any) {
  await set(ref(database, `suite/secondRow/${id}`), data);
}
export async function deleteSuiteSecondRowItem(id: string) {
  await remove(ref(database, `suite/secondRow/${id}`));
}

export async function getAllSuiteData() {
  const snap = await get(ref(database, 'suite'));
  if (!snap.exists()) return null;
  const d = snap.val();
  const listify = (obj: any) =>
    obj ? Object.entries(obj).map(([id, val]: [string, any]) => ({ id, ...val })) : [];
  return {
    hero: d.hero || null,
    featuredCards: listify(d.featuredCards),
    pullQuote: d.pullQuote || null,
    featuredStrip: d.featuredStrip || null,
    secondRow: listify(d.secondRow),
  };
}

// ─────────────────────────────────────────────────────────
// Homepage
// ─────────────────────────────────────────────────────────

export async function getHomepageCoverStory() {
  const snap = await get(ref(database, 'homepage/coverStory'));
  return snap.exists() ? snap.val() : null;
}
export async function setHomepageCoverStory(data: any) {
  await set(ref(database, 'homepage/coverStory'), data);
}

export async function getHomepageEditorPicks() {
  const snap = await get(ref(database, 'homepage/editorPicks'));
  if (!snap.exists()) return [];
  return Object.entries(snap.val()).map(([id, val]: [string, any]) => ({ id, ...val }));
}
export async function createHomepageEditorPick(data: any) {
  const r = push(ref(database, 'homepage/editorPicks'));
  await set(r, data);
  return r.key;
}
export async function updateHomepageEditorPick(id: string, data: any) {
  await set(ref(database, `homepage/editorPicks/${id}`), data);
}
export async function deleteHomepageEditorPick(id: string) {
  await remove(ref(database, `homepage/editorPicks/${id}`));
}

export async function getHomepageFeaturedWeek() {
  const snap = await get(ref(database, 'homepage/featuredWeek'));
  if (!snap.exists()) return [];
  return Object.entries(snap.val()).map(([id, val]: [string, any]) => ({ id, ...val }));
}
export async function createHomepageFeaturedWeekItem(data: any) {
  const r = push(ref(database, 'homepage/featuredWeek'));
  await set(r, data);
  return r.key;
}
export async function updateHomepageFeaturedWeekItem(id: string, data: any) {
  await set(ref(database, `homepage/featuredWeek/${id}`), data);
}
export async function deleteHomepageFeaturedWeekItem(id: string) {
  await remove(ref(database, `homepage/featuredWeek/${id}`));
}

export async function getHomepageSuiteCarousel() {
  const snap = await get(ref(database, 'homepage/suiteCarousel'));
  if (!snap.exists()) return [];
  return Object.entries(snap.val()).map(([id, val]: [string, any]) => ({ id, ...val }));
}
export async function createHomepageSuiteCarouselItem(data: any) {
  const r = push(ref(database, 'homepage/suiteCarousel'));
  await set(r, data);
  return r.key;
}
export async function updateHomepageSuiteCarouselItem(id: string, data: any) {
  await set(ref(database, `homepage/suiteCarousel/${id}`), data);
}
export async function deleteHomepageSuiteCarouselItem(id: string) {
  await remove(ref(database, `homepage/suiteCarousel/${id}`));
}

export async function getAllHomepageData() {
  const snap = await get(ref(database, 'homepage'));
  if (!snap.exists()) return null;
  const d = snap.val();
  const listify = (obj: any) =>
    obj ? Object.entries(obj).map(([id, val]: [string, any]) => ({ id, ...val })) : [];
  return {
    coverStory: d.coverStory || null,
    editorPicks: listify(d.editorPicks),
    featuredWeek: listify(d.featuredWeek),
    suiteCarousel: listify(d.suiteCarousel),
  };
}
// ─────────────────────────────────────────────────────────
// Wealth Page
// ─────────────────────────────────────────────────────────

export async function getWealthHero() {
  const snap = await get(ref(database, 'wealth/hero'));
  return snap.exists() ? snap.val() : null;
}
export async function setWealthHero(data: any) {
  await set(ref(database, 'wealth/hero'), data);
}

export async function getWealthTicker() {
  const snap = await get(ref(database, 'wealth/ticker'));
  return snap.exists() ? snap.val() : null;
}
export async function setWealthTicker(data: any) {
  await set(ref(database, 'wealth/ticker'), data);
}

export async function getWealthLeadStory() {
  const snap = await get(ref(database, 'wealth/leadStory'));
  return snap.exists() ? snap.val() : null;
}
export async function setWealthLeadStory(data: any) {
  await set(ref(database, 'wealth/leadStory'), data);
}

export async function getWealthSideStories() {
  const snap = await get(ref(database, 'wealth/sideStories'));
  if (!snap.exists()) return [];
  return Object.entries(snap.val()).map(([id, val]: [string, any]) => ({ id, ...val }));
}
export async function createWealthSideStory(data: any) {
  const r = push(ref(database, 'wealth/sideStories'));
  await set(r, data);
  return r.key;
}
export async function updateWealthSideStory(id: string, data: any) {
  await set(ref(database, `wealth/sideStories/${id}`), data);
}
export async function deleteWealthSideStory(id: string) {
  await remove(ref(database, `wealth/sideStories/${id}`));
}

export async function getWealthPulseItems() {
  const snap = await get(ref(database, 'wealth/pulseItems'));
  if (!snap.exists()) return [];
  return Object.entries(snap.val()).map(([id, val]: [string, any]) => ({ id, ...val }));
}
export async function createWealthPulseItem(data: any) {
  const r = push(ref(database, 'wealth/pulseItems'));
  await set(r, data);
  return r.key;
}
export async function updateWealthPulseItem(id: string, data: any) {
  await set(ref(database, `wealth/pulseItems/${id}`), data);
}
export async function deleteWealthPulseItem(id: string) {
  await remove(ref(database, `wealth/pulseItems/${id}`));
}

export async function getWealthStoryGrid() {
  const snap = await get(ref(database, 'wealth/storyGrid'));
  if (!snap.exists()) return [];
  return Object.entries(snap.val()).map(([id, val]: [string, any]) => ({ id, ...val }));
}
export async function createWealthStoryGridItem(data: any) {
  const r = push(ref(database, 'wealth/storyGrid'));
  await set(r, data);
  return r.key;
}
export async function updateWealthStoryGridItem(id: string, data: any) {
  await set(ref(database, `wealth/storyGrid/${id}`), data);
}
export async function deleteWealthStoryGridItem(id: string) {
  await remove(ref(database, `wealth/storyGrid/${id}`));
}

export async function getWealthOpinionStrip() {
  const snap = await get(ref(database, 'wealth/opinionStrip'));
  return snap.exists() ? snap.val() : null;
}
export async function setWealthOpinionStrip(data: any) {
  await set(ref(database, 'wealth/opinionStrip'), data);
}

export async function getAllWealthData() {
  const snap = await get(ref(database, 'wealth'));
  if (!snap.exists()) return null;
  const d = snap.val();
  const listify = (obj: any) =>
    obj ? Object.entries(obj).map(([id, val]: [string, any]) => ({ id, ...val })) : [];
  return {
    hero: d.hero || null,
    ticker: d.ticker || null,
    leadStory: d.leadStory || null,
    sideStories: listify(d.sideStories),
    pulseItems: listify(d.pulseItems),
    storyGrid: listify(d.storyGrid),
    opinionStrip: d.opinionStrip || null,
  };
}
