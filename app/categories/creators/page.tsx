import Link from 'next/link';
import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getCreators, getArticles } from '@/lib/firebase';

export const metadata = {
  title: 'Creators | THE BOMBAY FORUM',
  description:
    'The artists, filmmakers, designers and voices rewriting what India creates.',
};

export default async function CreatorsPage() {
  const [allCreators, allArticles] = await Promise.all([
    getCreators(),
    getArticles()
  ]);

  const creators = allCreators.filter((c: any) => c.status !== 'draft');
  const articles = allArticles.filter((a: any) => a.category === 'cat_creators' && a.published !== false);

  const featuredCreator = creators.length > 0 ? creators[0] : null;
  const facesCreators = creators.length > 1 ? creators.slice(1, 6) : [];

  const defaultContentGrid = [
    {
      category: 'Architect',
      title: 'The Vertical Forest: Reimagining Mumbai\'s Concrete Canopy',
      excerpt: 'How Ananya Shah is integrating sustainable ecosystems into high-rise living across the Bandra coastline.',
      read: '7 MIN READ',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6Q6R-bOVatPqZe077KemtaBJgTsgc0WeHCAcD926zQKZt-Ak3O_VBnw0otz4gXYV_e4VAe1KiYppGKqzqOWOmGJRb5bQod5AMqRrif_y097H2REDef9N7aXedOVVOsF-ySrKVtoaeQHNEfm11KUoNcC3MqKNpKFSwqgfrVBuAHBAIb8iSLQWBe3kgdmnw79kMQicRvu_ZE5N48VnuHWGwyhNTRL0E-PM8PL4YaKn0eHoR617rgDDU3Qdy4TA1vJuzqFUH3lOq0uh0',
      slug: '#'
    },
    {
      category: 'Visual Artist',
      title: 'The Digital Fresco: Art in the Age of NFT',
      excerpt: 'Inside the collaborative lab where heritage painters meet blockchain developers to preserve folklore.',
      read: '5 MIN READ',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtAS9fLR-y1dAZnKs7kq539480hfSjvaL59uueeYhV5QeDopirnEnRtiyv1Fy2IQ6PvCEzQnqAEoEE02mIqcrtvh7nDdA_hM39PPmAnML-iEsnnTzaOOB3twqOlciGLvMpu1ybCQgZNUOJVW-1_d_1HoJ8NA-wwQofqvS_X2ybMzOV20DkTANdccADy7SAiGziE1Wh8q5f1VDkDStoPQNhXiwwt7TnGgkOuNPMYS0lo5C8M3fpXG7uDeYek99pTMR1Wm5sK7bFl4Z6',
      slug: '#'
    },
    {
      category: 'Designer',
      title: 'Slow Fashion: The Return to the Loom',
      excerpt: 'Karan Johar\'s protege is ditching the runway for rural textile clusters in a bid for sustainability.',
      read: '9 MIN READ',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ6ZfUbA4nIGDF70jmEHgMzVp949WibNwQEWlXtrmD20DH0AK-Dj799lAhTSwbASZ6aR5-sUIJP6YNuXAWw3E3yIhSebgmIwIevSUFEx7UdRy7CGChsvpPO3lZosk1vqhWjMIRfkVjaAuIlSJwXAauWirQUsn7NCvDpcVRRFYu04SUQ-DjEr8nULu_cCf5aOHVTthOD-X8JhGkapKEfLjkEQy0cjS_gf_FzW1ccFwffRlNgdejqLJz6Xx6OorirFFhiwK9yPg8PDM_',
      slug: '#'
    },
    {
      category: 'Musician',
      title: 'Rhythms of the Street: The New Hip-Hop Wave',
      excerpt: 'How independent artists are bypassing major labels to create a sound that belongs solely to the gully.',
      read: '6 MIN READ',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbT-nxCVf2bx6eBsbjInptgdQ1qnWZj3bORMmrEf9zGrOOc_dIp4Y6-OCazZBNs5bTxL5HWPBRQSSfAW7BMsi1KH8431Egpz-kirg42wYuSACkQ64DAgXt_fA4m7-Q8Oa-ktIjAaw10VM9hRa4gOqJztTYzlgDrPz0dbp69L0yOfAXPVSjQrS_Iapr8NU3VZRjr33lMeEBue1jQ67y40IHg-A4zwjV6jpoUu8NDV2-_npgkM0JqEEQFQR347DS9-mtfv_Jf0CgBikz',
      slug: '#'
    },
    {
      category: 'Game Designer',
      title: 'Gamifying Indian Mythology',
      excerpt: 'A new generation of developers is using Unreal Engine 5 to bring ancient epics into the metaverse.',
      read: '12 MIN READ',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvK8kzVMDJL1Cb9ERoDGCpesxwHoUjnxVCTMY8wdGXGP0pdKT3GXJELBtuiaufSWZf1ZYJjJNANNZrRvUs0bRfqO7MoPdht7oqKPUIw0_HcIqRRXRz_RUHwWmr6Zb8IiTRw5qJQdyv0_rptsqaVHzZCluR5vAunx-aqkwqS2go9GETBBfIA5l4W9P9b9aK4kbjqL7Zg2AWsc2unawYBT1IJiR8bBhk5Yy2i6UsvsqQ3iFf5eYG_QkoaHEjN4qQqlyUxTyug5Bwd0Wu',
      slug: '#'
    },
    {
      category: 'Culinary Artist',
      title: 'The Plate as a Canvas: Modernist Indian Cuisine',
      excerpt: 'Chef Rohan Mehta is deconstructing the thali into a theatrical multi-sensory experience.',
      read: '8 MIN READ',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvz13wv0duAbEVOLuPWbh3DSw1U2XOO3Mz3rMwk2TShUiwwuKnLtonbIc15OrpXfYlZI6X0WzGjKZKzGOi_M7L_xkL_f7zG6KrN3f2wmxrIIsOEF3KUSoo3CcMnWDJbO51nX10qFXKI9i7VoOqlkrsTP-VL1DfCM-k5CDVIOwEIybZdhtcIQ_3gIR32r1eTYEgtlTro8_HJ75HJnwoAaB93psQm3XrkUmA_HOZYW7tC6vcW6iMUhrQZ8GSKlOPV-57tEnAZwxRmi9k',
      slug: '#'
    },
  ];

  const contentGrid = articles.length > 0 ? articles.slice(0, 6).map((a: any) => ({
    category: a.tags?.[0] || 'CREATOR',
    title: a.title,
    excerpt: a.subtitle || a.excerpt || a.content?.substring(0, 100) + '...',
    read: a.readTime ? `${a.readTime} MIN READ` : '5 MIN READ',
    image: a.featuredImage || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop',
    slug: `/articles/${a.slug}`
  })) : defaultContentGrid;

  const economyItems = [
    {
      sub: 'Monetization',
      title: 'Direct-to-Fan: The New Freedom',
      body: 'Why subscription models are outperforming advertising for niche creators in India\'s metros.',
    },
    {
      sub: 'Policy',
      title: 'The Ethics of AI Generation',
      body: 'A roundtable on copyright, deepfakes, and the future of digital personality rights in Bollywood.',
    },
    {
      sub: 'Finance',
      title: 'Venture Capital for Creators',
      body: 'Is the "Founder-Creator" hybrid the next big investment vertical for Sequoia and Lightspeed?',
    },
  ];

  const defaultFaces = [
    { name: 'Amrita Gill', role: 'Textile Innovator', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkd-Ju91VMo-4-1TFeatKqgPB4F5DX9Bp3VIZLyx1T4CPpQ8Ilv5foykQzpoKM2wpjZc9_eFI7AYkSJG6qcVj_tETgl-WhmY7e2-G4eQTDmsEHDZz9q4pXkRvsfNn2fO1bUkxweYIMG4dCbpojUePTz7I8qmPYlP6YS5T5n6qf19h0BUoR7dSrh3OagoZU4Wrq31zjTxbz7iP24i40sSbrz3kElxDsjzUPhqwy66WYETgiWuWsCqGhzRWDb2RX70GTLge1SurWQeYt' },
    { name: 'Kabir Seth', role: 'Indie Podcaster', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa2ynmipBKu5oWTrkfzyXZFpqejgG05a8nea9meTXyYvmSvnPCmkYCNOiPiu-f2ouO1_o_xlSZkhl1fD-AAYj9sph671BEOlCI_7jtSivRGAOF7AUMljozf9ehu7_g9bDs8O8pITM6SiKOEsVE-bcSD37kUYnSwldjdry6RkQJ8gc-eBnF2RlK_aVDysjNTfhpSNLoqDx74lgYr19-OD4Sa2jxaGnPnYZmUy_QwnuNJMTF0ezQ2quXpfnEa2pXfj8MdZfWdvB8dBV1' },
    { name: 'Zoya Qureshi', role: 'UX Sculptor', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2Mqo-RA5iWHYomBM2TmCXQ5po1nD4s7mhPlE67_JTqmL8Q2BTXwDtLU0l7xukBET1g-znIN2E9ZPvhu2gSUCzXVMhWABO0Rv8uKoKlZ9qI2n4F91KKhvL9FxsDUaIfYOJP-9H0FM-XzWaq3RQ8RVZ0a7RHQCtZRpnEWezzZaq1xM41xCZb8dxQ6CQXPYJd-AQWGo7AAxIOLe8BfeTqNpjgr1N3rP9bcULMDmya4shDXcnv450IqtLuJuPPsilYeftHBfIxOsP6mKH' },
    { name: 'Arjun Varma', role: 'Street Photographer', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFBEYpF0ByqMjBxtEaAnvVqalDNUXUBqRSf6xAZTWM4UBR0nq2UF-CKgNJt9ZhNnJzPjKEeQEHSTuLF-zSQ6UCAF8Ik1kG63dAk04Fa-cxRb2P62KLdFXW6IJZh4leFgE6iMyjl-_39PoqAJhT7K039yXPSJ0FbEqUmrP_Y4jspsbB-9SRaCneFFZU35YO04FmkqepkIjrfHpX22OzOtXmzNceGfPkn1tjhrocDz7uYotlwBGPh-cjCBTwdWFIUf8m8KZO508J9EMb' },
    { name: 'Isha Das', role: 'Creative Director', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCt56-Vu9a0UkQH2IxxWIUVP9Y8Xmln7wqiosn225L-UD8VR3H7hMn-AxKMpCdw2u4R7uIQZKCo0b_eJTZ8bIdI44X1EjbRCsQm7CbrKwedE-e6w6eC0B5gz3GOBd7LOIQix38ctg1_58hGsRh7r-7lgwpawF0zsLOisrhXMRpL4GvWPh6gMQUx16rDJ_EzoYfRAQ-js0kLoU_MrXmG4dpopqfo4eKYdxPahTnOcP7as1iKSaXs0U0vC8yzMzhTARkQ326AzWXM8xun' },
  ];

  return (
    <>
      <TopBar />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[751px] w-full overflow-hidden flex items-end">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover"
              alt="Visual artist in a Mumbai industrial studio"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwekZK8CvPH8zcv00z5QfT4aUDLjcBUElEl6PR9BDcs91PO56Li-DuiVA6psbRPnfhau34vnI5ah5ydfo8xZOVA7qE_LT-BWdBVOymzi-ETv0wxNo5JpVlfc14XG4ivUuEEC-BZDQCBeUQHAmHQ4AUtLbEEc12GIeL3NXt314ClFKj2U05cGXPMiHoIlskM_jd4vFjv5miqMF7WGw06xD5T1NAqQNi1IEnlwykDYUaEpDMZurWAVzV86dmi49Z-g3f1V4FCwrpxHDQ"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent" />
          </div>
          <div className="relative z-10 px-12 pb-20 max-w-4xl">
            <span className="inline-block px-3 py-1 bg-brand-teal text-white text-[10px] tracking-[0.3em] mb-6 font-label font-bold">
              CREATORS
            </span>
            <h1 className="text-white font-headline text-6xl md:text-8xl leading-[1.1] mb-6">
              Culture Has a<br />New Author.
            </h1>
            <p className="text-white/80 font-body text-xl md:text-2xl max-w-2xl leading-relaxed">
              The artists, filmmakers, designers and voices rewriting what India creates.
            </p>
          </div>
        </section>

        {/* Featured Creator */}
        {featuredCreator && (
          <section className="py-24 px-12" style={{ backgroundColor: '#F5F5F0' }}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt={`${featuredCreator.name} Portrait`}
                  src={featuredCreator.heroImage || featuredCreator.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAadXP028Z4z8ceVZjd1HSKIK4vXHFw0bNC_TfiVYPxtpqnvaxbqe82lH7Z3ws3AZ1tubkkAEumlqRWQKi1XPu8uKaHlps-ptV_jI7S8soJCQzFtDU71NgvWkDBbZxYu6VEeasQulM8Ez5NXubddyFs6krFG2OS9-ncsbMBH47tfzkiHDTDIWv2cmAhoQOyCI-Z2EG51H5dVEB4UoCIWGWLf4WPivDATl6AoPVQD2fNhtXl4ugShXSMSMTGHgjqu8qsPnTJSQmVC_'}
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-brand-teal text-[10px] tracking-[0.3em] font-bold mb-4 font-label">
                  FEATURED CREATOR
                </span>
                <h2 className="font-headline text-5xl mb-2">{featuredCreator.name}</h2>
                <p className="font-body text-secondary text-lg mb-8 uppercase tracking-widest text-[11px]">
                  {featuredCreator.specialization || featuredCreator.title} {featuredCreator.location ? `· ${featuredCreator.location}` : ''}
                </p>
                
                {/* Pull Quote */}
                <div className="border-l-4 border-brand-teal pl-8 mb-8">
                  <blockquote className="font-headline text-2xl text-brand-navy leading-relaxed italic">
                    "{featuredCreator.quote || featuredCreator.tagline || 'Bombay isn\'t just a city; it\'s a living, breathing storyboard that demands to be told through a lens of raw, unpolished truth.'}"
                  </blockquote>
                </div>
                
                {/* Body */}
                <div className="font-body text-on-surface/70 leading-relaxed mb-8 max-w-md">
                  {featuredCreator.bioParagraphs && featuredCreator.bioParagraphs.length > 0 ? (
                    featuredCreator.bioParagraphs.slice(0, 2).map((p: string, i: number) => (
                      <p key={i} className="mb-4">{p}</p>
                    ))
                  ) : (
                    <p>{featuredCreator.bio}</p>
                  )}
                </div>
                
                <Link
                  href={`/creators/${featuredCreator.slug}`}
                  className="text-brand-teal font-body font-bold text-sm tracking-widest border-b border-transparent hover:border-brand-teal transition-all pb-1"
                >
                  Read Their Story →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Content Grid */}
        <section className="py-24 px-12 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-6 mb-16">
              <span className="text-[11px] tracking-[0.4em] font-bold text-on-surface/40 uppercase whitespace-nowrap font-label">
                From Creators
              </span>
              <div className="h-[1px] bg-outline-variant/30 w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-12">
              {contentGrid.map((item: any, i: number) => (
                <article key={i} className="group flex flex-col cursor-pointer">
                  <Link href={item.slug}>
                    <div className="aspect-[16/10] overflow-hidden mb-6">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        alt={item.title}
                        src={item.image}
                      />
                    </div>
                    <span className="text-brand-teal text-[9px] tracking-[0.2em] font-bold mb-3 uppercase font-label">
                      {item.category}
                    </span>
                    <h3 className="font-headline text-2xl mb-3 group-hover:text-brand-teal transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-body text-on-surface/60 text-sm mb-4 line-clamp-2">
                      {item.excerpt}
                    </p>
                    <span className="text-on-surface/40 text-[10px] font-medium tracking-wide font-label uppercase">
                      {item.read}
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Creator Economy Strip */}
        <section className="bg-surface-container-high py-20 px-12">
          <div className="max-w-7xl mx-auto">
            <span className="text-[11px] tracking-[0.4em] font-bold text-on-surface/40 uppercase block mb-12 font-label">
              Creator Economy
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {economyItems.map((item) => (
                <div key={item.title} className="flex flex-col">
                  <span className="text-brand-teal text-[9px] tracking-[0.2em] font-bold mb-3 uppercase font-label">
                    {item.sub}
                  </span>
                  <h4 className="font-headline text-2xl mb-4">{item.title}</h4>
                  <p className="font-body text-on-surface/60 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Faces Strip */}
        <section className="py-24 px-12" style={{ backgroundColor: '#F5F5F0' }}>
          <div className="max-w-7xl mx-auto">
            <span className="text-[11px] tracking-[0.4em] font-bold text-on-surface/40 uppercase block mb-12 font-label">
              Faces
            </span>
            <div className="flex flex-nowrap md:grid md:grid-cols-5 gap-8 overflow-x-auto pb-8 md:pb-0">
              {facesCreators.length > 0 ? facesCreators.map((f: any) => (
                <Link key={f.id} href={`/creators/${f.slug}`} className="flex-shrink-0 w-[240px] md:w-full group cursor-pointer block">
                  <div className="aspect-square bg-surface-dim overflow-hidden mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">
                    <img className="w-full h-full object-cover" alt={f.name} src={f.image || f.heroImage} />
                  </div>
                  <h5 className="font-headline text-xl mb-1 group-hover:text-brand-teal transition-colors">{f.name}</h5>
                  <p className="font-body text-on-surface/50 text-xs">{f.specialization || f.title}</p>
                </Link>
              )) : defaultFaces.map((f) => (
                <div key={f.name} className="flex-shrink-0 w-[240px] md:w-full group cursor-pointer">
                  <div className="aspect-square bg-surface-dim overflow-hidden mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">
                    <img className="w-full h-full object-cover" alt={f.name} src={f.image} />
                  </div>
                  <h5 className="font-headline text-xl mb-1">{f.name}</h5>
                  <p className="font-body text-on-surface/50 text-xs">{f.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
