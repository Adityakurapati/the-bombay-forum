// Script to seed Firebase Realtime Database with initial data
// Run with: node scripts/seed-firebase.js

const admin = require('firebase-admin');

const serviceAccount = {
  "type": "service_account",
  "project_id": "automate-data-433a6",
  "private_key_id": "key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk@automate-data-433a6.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
};

// Initialize Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://automate-data-433a6-default-rtdb.firebaseio.com'
// });

const db = admin.database();

const sampleData = {
  articles: {
    article1: {
      title: 'The New Arbiters of Indian Venture',
      subtitle: 'How a fresh wave of operators-turned-investors is dismantling the traditional Bombay club and rewriting the rules of Series A capital.',
      content: 'Full article content here...',
      category: 'Founders',
      author: 'Vikram Sethi',
      authorBio: 'Senior journalist and columnist',
      featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeakS4d7VAvGc94-5fbGDm5WDMQdhR0A3601e4zlDRf-B8K-W-1YpVmwXtECbAYyLLz5sLv-ke-MUUgmmIJZ1c_s3N5VG6FEVJbYQLuPgW9X6LLQ-Ou8cmxNlQDyjalx6huDiz_L9CPbKA5SpGDvYYOB7Yau4n2B2ik4yz62Xt_6g81BMwWkE5gdoYKn1ukjlhzZUvr96Zjw0CNlHq-pR5UXUU-93sc9tHTduxODiLkCXWbZhTdNTc-hrLAebS1kSCb79Xx_aAafGi',
      slug: 'new-arbiters-indian-venture',
      excerpt: 'Understanding the shift in venture capital dynamics in India',
      readTime: 12,
      published: true,
      createdAt: new Date().toISOString()
    },
    article2: {
      title: 'The Alibaug Retreat: Redefining Tropical Modernism',
      subtitle: 'How heritage meets contemporary design in India\'s newest luxury retreat.',
      content: 'Full article content here...',
      category: 'The Suite',
      author: 'Ananya Rao',
      featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZMHNmqSexwU7PV2iMKlX7tA4ZTZAvPWp1iOg7StFmefOEnwefF9KT7_yMzhO3HLR8chtOghYOf6jsEocY076-k8xyxI2u-Y2_0euzY-EhrA81fMgYSU7cwVXvLf0f0uZS4uV9AzO7o1WviMLhte_bSm0uyrF3OXno9WjY-8_Eo7X_iD68m2hdKAcDscMZRmpNW3pwbSng88HH1esvNy43r1_20YTLT6yhdeIE_-y4UzAJVMBzrj_o93YW54xJz60ry7WrlDqu0E7Q',
      slug: 'alibaug-retreat-tropical-modernism',
      excerpt: 'Luxury living redefined in coastal India',
      readTime: 8,
      published: true,
      createdAt: new Date().toISOString()
    }
  },
  categories: {
    founders: {
      name: 'The Founders',
      slug: 'founders',
      description: 'Stories from India\'s most influential entrepreneurs and their journey to building billion-dollar companies.',
      color: '#C8102E'
    },
    creators: {
      name: 'Creators',
      slug: 'creators',
      description: 'Discover the visionaries, artists, and innovators shaping Indian culture.',
      color: '#8BB0B8'
    },
    wealth: {
      name: 'Wealth',
      slug: 'wealth',
      description: 'Navigate the complexities of money, markets, and meaningful accumulation.',
      color: '#FFD700'
    }
  },
  founders: {
    nithin_kamath: {
      name: 'Nithin Kamath',
      slug: 'nithin-kamath',
      title: 'Founder & CEO, Zerodha',
      company: 'Zerodha',
      bio: 'Visionary entrepreneur who democratized stock trading in India through Zerodha, India\'s largest stock broker.',
      image: 'https://via.placeholder.com/400x500?text=Nithin+Kamath',
      quote: 'The future of finance is retail.',
      achievements: ['Founded Zerodha in 2010', 'Democratized Stock Trading in India', 'One of India\'s First SaaS Unicorns'],
      createdAt: new Date().toISOString()
    }
  },
  admins: {
    admin1: {
      email: 'admin@thebombayforum.com',
      name: 'Admin User',
      accessKey: 'admin123456',
      role: 'admin'
    }
  }
};

// Uncomment to seed data
/*
async function seedDatabase() {
  try {
    // await db.ref('articles').set(sampleData.articles);
    // await db.ref('categories').set(sampleData.categories);
    // await db.ref('founders').set(sampleData.founders);
    // await db.ref('admins').set(sampleData.admins);
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

seedDatabase();
*/

console.log('Seed data structure ready. Set credentials and uncomment seedDatabase() to seed Firebase.');
