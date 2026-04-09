import Link from 'next/link';
import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Aryan Varma | Creator Profile | THE BOMBAY FORUM',
  description:
    'Filmmaker capturing the rhythmic chaos and silent interludes of Mumbai\'s shifting landscape.',
};

const networkCreators = [
  {
    name: 'Isha Khanna',
    role: 'Designer',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBNHSkT6H4NcjcPJIEWP7s0k4FDnDoperWap5-1xnJ-vhxUQjox8n7Vg1GOc13fm3an6ZhlgOfp_Hn7DAOtqOXx3txOcrnF_GTlCQhyo3m66YP7QmPRJKVlBrzf3hyco0s8yhNh4xc6y3SwEZWzdECoWh1aN3wmLpI3Qp0jRntywLKtS047CuZa5ReBfoC6Jq3s458dhgisVU75CJt7DaYk7SdTLgWuosLo_-wOc4Z9Kr01g8Lb7-c5DBNup8XT4ZN9smFkTAbbu7qV',
  },
  {
    name: 'Kabir Shah',
    role: 'Musician',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCUcdPca9LE-eOWfE1XPKTbjyhCGobl9NG8uNgH9wzpqoJd_VCrBZWLhYTcwK03JOCAhP8WyhH6eXADBGUa7T6EpAPXjS2IRh_Dv1PWWqeGi92z9_0shVX2HLJAQPaNA4xjPSxWHtxy-B4bG0ZHJvVM3DXqCfqjGJAD-BRY0YnhEUCyn5OOkGevlCX3eYsb2QOyefk-uF3c23OP5gD2sZAwseXXFCG5ffPsYiKGfB6N3oNFDNrG-vXvhyP3KO9NpUyRl_XzvVqOL7dY',
  },
  {
    name: 'Meera Rao',
    role: 'Painter',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBIzJfZFhzjiSGVlX6bN7JE4fkRm8kCZ3zezxriLYyGDliZkzkskn1VXJzml-KGrrtT2GfVxwx...',
  },
  {
    name: 'Rohan Vora',
    role: 'Architect',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBeJS2P_5eG4N_syl41LKrj05wuZLCSj9-jug4bkJ-qPAT9_Ce6gwp3vXmhzipH2KD-0D6nKT0-if9x6NQ44iemvkva66IkSzN1B7lrjN7u_hAmnXuERtuqMzt3JeggyDVWFZpHTTXE0R8NR1srlzc5KEvS0zHbIqR_8SG2tMI3CqLOICFyZYaxHmM0adG7dD2ecfa4fVrZjrmwaMvbVWEoz4ayoPCPQ8j0WmhQCC517d7rpfvD1HND2rU1uhXtYDiTietKYdPkcPEJ',
  },
];

export default function AryanVarmaPage() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        {/* Hero Split */}
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[795px]">
          <div className="relative overflow-hidden h-[530px] md:h-auto">
            <img
              alt="Aryan Varma — filmmaker portrait"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuNUVXxTu3WgNFzivSv9GNGwgM3gNT-RxU06eydO6O5w1H7aWaLkV9BQAZFiDOkxDkpA2uvuna102_UIKsjVRmZFIFtDrS2pP-kqJAqi-YKZE1JB6oslC1JtH-WJ7H_t7ybvFsJHNyO_5rIiGaGeDLgL9Puhog2p8DkLlhDq3wgRH2oEIsxKHa09w_BerlNQ2-hT3leMt9L361l_OHdLhsmP_cPg3vlujAG0fo25b-Hh14PaiSNRj-_z8ijQvC8X6MC0cUSg3_i1Oc"
            />
          </div>
          <div className="bg-surface-container-low flex flex-col justify-center px-8 md:px-20 py-16">
            <span className="font-label tracking-[0.3em] text-xs uppercase text-secondary mb-6 block">
              FILMMAKER · MUMBAI
            </span>
            <h1 className="font-headline text-6xl md:text-8xl leading-none tracking-tight mb-8">
              Aryan Varma
            </h1>
            <p className="font-body text-lg text-secondary leading-relaxed mb-8 max-w-lg">
              Capturing the rhythmic chaos and silent interludes of Mumbai's shifting landscape
              through a lens of raw intimacy.
            </p>
            <div className="flex flex-wrap gap-3 mb-12">
              {['INSTAGRAM', 'YOUTUBE', 'NEWSLETTER'].map((label) => (
                <span
                  key={label}
                  className="px-6 py-2 bg-white text-[10px] tracking-widest font-bold uppercase border border-outline-variant/20 cursor-pointer hover:bg-brand-navy hover:text-white transition-colors"
                >
                  {label}
                </span>
              ))}
            </div>
            <div className="border-l-4 border-brand-teal pl-8 mb-12">
              <p className="font-headline italic text-2xl text-on-surface leading-snug">
                "I don't look for stories in the monuments; I look for them in the steam of a chai
                glass at 4 AM."
              </p>
            </div>
            <div className="space-y-6 font-body text-on-surface/80 leading-relaxed max-w-xl">
              <p>
                Aryan Varma is a visual storyteller whose work bridges the gap between traditional
                documentary and modern digital aesthetic. With over a decade of traversing the gallis
                of Mumbai, his portfolio is a testament to the city's unyielding spirit.
              </p>
            </div>
            <Link
              href="#work"
              className="mt-12 inline-flex items-center space-x-4 font-label uppercase tracking-widest text-sm font-bold group"
            >
              <span>Explore Their Work</span>
              <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </section>

        {/* Editorial Body */}
        <article className="bg-white py-24 px-6">
          <div className="max-w-[720px] mx-auto">
            {/* Section 1 */}
            <section className="mb-20">
              <h3 className="font-headline text-4xl mb-8">The Eye Behind the Lens</h3>
              <div className="font-body text-lg leading-loose text-on-surface/90 space-y-6">
                <p>
                  <strong className="text-primary">Aryan's process is deceptively simple.</strong>{' '}
                  He walks. Sometimes for hours, sometimes for days, waiting for the city to reveal
                  its rhythm. In a world obsessed with resolution and frame rates, Varma prioritizes
                  the "feeling of the light." His work doesn't just show you Mumbai; it makes you
                  hear the hum of the local train and feel the humidity of the Arabian Sea.
                </p>
                <figure className="my-12">
                  <img
                    alt="Aryan at work — silhouette against Mumbai sunset"
                    className="w-full aspect-video object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdw4ycQyU6C7P0RhMLtUUf10hsT1HeLWwaDxWb3jeSieik0TQNLe7n5bbLgJG7WFcWa8IlG9WmfHHli-i3DqRagQkHWNxZco5WnJkZw29jb4kFhsE65FGiUzZaLsdvzR5EEr6Ptw7DkqxhmaLz0X8TDtJLfI2-65E-6t_5AgkMdFBEuztSB944QoEasydHtBjR9JACYFgjrxPTooZvj8YdPo1pa916GFtfiA96KW1NFxRO3MB7vPIL5wUy1FKLtrG6uoIVHeHf0d9U"
                  />
                  <figcaption className="mt-4 font-label text-[10px] tracking-widest text-secondary uppercase text-center">
                    Aryan capturing the monsoon arrival at Marine Drive, 2023.
                  </figcaption>
                </figure>
              </div>
            </section>

            {/* Pull Quote */}
            <section className="mb-20 py-16 border-y border-outline-variant/10">
              <div className="border-l-4 border-brand-teal pl-10">
                <h4 className="font-headline text-4xl italic mb-4">
                  "Bombay isn't my backdrop; it's the protagonist of every frame I've ever shot. It
                  breathes, it screams, and occasionally, it whispers secrets to those willing to
                  stay still."
                </h4>
                <cite className="font-label text-xs uppercase tracking-widest text-secondary not-italic">
                  — Aryan Varma on 'Mumbai Noir'
                </cite>
              </div>
            </section>

            {/* The Work */}
            <section className="mb-20" id="work">
              <h3 className="font-headline text-4xl mb-6">The Work</h3>
              <p className="font-body text-lg mb-12 text-on-surface/80">
                From underground hip-hop documentaries to silent vignettes of the Dabbawalas,
                Aryan's work spans the breadth of the human experience in the metropolis.
              </p>
              <div className="grid grid-cols-12 gap-4 mb-12">
                <div className="col-span-12 md:col-span-8 h-80 overflow-hidden">
                  <img
                    alt="Black and white Mumbai street"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA24z3XJqJz6A_Hd07fOXgO7BQMZJ73UlW-u1d_2nYzkQEBpHalGjn3Ro7L8RvxPtjjuUuApKZZm6swsEODpcNicSlyNCMA-DsXgsSS_HmEBflZSRa_Y7YXUfLfUlgJ55rp8lYhJXNTpmwP4LV0d5t3BYq-ALugL2R5vwehc6sPNg4IFgKdSFCUugLb3Woo_-ePVHOwZ1gauV4xL4CkXnM7S3mcQeh9-KwfTPocdeI-7Az0u2aoNiITg60zV2IFKC6D764xF1Og1R4R"
                  />
                </div>
                <div className="col-span-6 md:col-span-4 h-80 overflow-hidden">
                  <img
                    alt="Traditional fishing boat textures"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjIxHE1VI_tw4GkNT2TZIeJayim1YwLOv-A38TGhLLPz9dv0CmNdCcUSReitKIfL4SXzkBk_zxwqXUZT43AW99A-CsuVfom86bfd10RkIoPoIeb9FLS9aZc6BlHGIKE5rj0PuHaMJpU9EFJVS3JrvhUgsx_RXNR6EvS_os5eQmMKvlvoRI6i3lmprYayWfxEoIJFXm3q9EN-WcDpgTvjn6NGtCW3UbF7EQgNOuhbrfxSEfvvhANfy3MdT_P58yelaq0TOfB0v5GnN8"
                  />
                </div>
                <div className="col-span-12 h-64 md:h-96 overflow-hidden">
                  <img
                    alt="Mumbai skyline at blue hour"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCywWKOMUb4ujDMR8TRCwN6EH-4PWQSd7mtQiym8yQxI-F2uMS-BUVZxzIXl5q1AlN_zpUG55iBWJo1T5cMmXWOBZmIgN9KRRdhI2LRGWOAoVzhwif6ghD_LzME59FcjU2oEbqPrR6UUekGAFcDivEp6BSqtKzqJuvuknkOdLJqUlEb3MnMAPlQSStm4mv72L3_BbeG6jlW1T5MzNnXw1aqllFzANLKtBYkmpVu5O5uduJiwShNFX7CSMhmcvUCLWdVrAS9mtHOFwje"
                  />
                </div>
              </div>
              <div className="bg-surface-container py-12 px-8 flex flex-col items-center justify-center text-center">
                <span className="font-headline text-7xl text-primary mb-2">140M+</span>
                <span className="font-label tracking-[0.3em] text-xs uppercase font-bold">
                  Global Digital Views
                </span>
              </div>
            </section>

            {/* What Comes Next */}
            <section className="mb-20">
              <h3 className="font-headline text-4xl mb-8">What Comes Next</h3>
              <div className="font-body text-lg leading-loose text-on-surface/90 space-y-6">
                <p>
                  Varma is currently working on 'The Concrete Monsoon,' a feature-length
                  experimental film exploring the psychological impact of the rainy season on the
                  city's diverse residents.
                </p>
                <blockquote className="font-headline italic text-3xl text-primary py-8">
                  "The next phase is about silence. We've heard the noise. Now I want to capture the
                  quiet."
                </blockquote>
                <p>
                  As he moves into more narrative-driven cinema, his commitment to authenticity
                  remains his guiding light. The camera remains an extension of his soul, a tool not
                  just for seeing, but for understanding.
                </p>
              </div>
              <div className="mt-16 overflow-hidden">
                <img
                  alt="Abstract bokeh city lights"
                  className="w-full aspect-video object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdxCe8Mp3swTUrnqvm775Syu3J2V07jDzPicXRWpn6lMIEJ7OmpGwaspwfUpCnms0gjMMBgwjYfiI9AotuHMpwezBl8tlJdy11lJjvIfU4pxoxW-xFgBedtiFPUAQjSFI0vU5RDZkC-IPTRGwDSdK6kztNs_zgH8tPamu5-blz7u-C8-eQnlSEEJCJSlNnWDcCmQJE4shprnoF_NnnOGTYe4AAX8MVXaExnl_uN3k98LZxYka1Apk2o_4shtALcoCrifJ-Wfroi1qQ"
                />
              </div>
            </section>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-12 border-t border-outline-variant/20">
              {['FILMMAKER', 'DOCUMENTARY', 'MUMBAI', 'DIGITAL CREATOR', 'INDIE CINEMA'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold tracking-widest font-label border border-on-surface/10 px-4 py-1 text-secondary uppercase"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            {/* Author Bio */}
            <div className="mt-20 flex items-center space-x-6 p-8 bg-surface-bright border border-outline-variant/10">
              <img
                alt="Siddharth Mehta — Profile curator"
                className="w-16 h-16 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_MNsRAFkglMT74jfPrhPtbptDXeOT_DQMS8xvICsXjvIaAM7sNpureUV_dKM5ybAu0sUVLpnWuFrc3LKGNPScgq-EWGacHyJvPwpSM5JYS-A9PC9adTlBZmhYzFAw2ek56Wf4MpKp3yzKLw_M_M6aTVfglJfPKwD7wPL6K_pP5YMYAIsHfMT7h4TM25o2JZz6KCCygCVbgbHTdfGS-xPXuU1VhYH1Gss2mjNhxz-aoB_5UwEezloK_FAAP6mL_Gq7FDpCwl5xUvZD"
              />
              <div>
                <span className="font-label text-[10px] tracking-[0.2em] text-secondary uppercase block mb-1">
                  PROFILE BY
                </span>
                <h5 className="font-headline text-xl">Siddharth Mehta</h5>
              </div>
            </div>
          </div>
        </article>

        {/* Creator Network Strip */}
        <section className="bg-surface py-24 px-8 border-t border-outline-variant/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <h2 className="font-headline text-4xl">The Atelier Network</h2>
              <Link
                href="/categories/creators"
                className="font-label text-xs tracking-widest uppercase border-b-2 border-primary pb-1"
              >
                View All Creators
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {networkCreators.map((c) => (
                <div key={c.name} className="group cursor-pointer">
                  <div className="aspect-[4/5] overflow-hidden mb-4">
                    <img
                      alt={c.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      src={c.image}
                    />
                  </div>
                  <span className="font-label text-[10px] tracking-widest text-secondary uppercase">
                    {c.role}
                  </span>
                  <h4 className="font-headline text-2xl mt-2">{c.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section
          className="py-32 px-8 text-center text-white"
          style={{ backgroundColor: '#0B1929' }}
        >
          <div className="max-w-2xl mx-auto">
            <span className="font-label tracking-[0.4em] text-xs uppercase text-brand-red mb-6 block font-bold">
              ESSENTIAL DISPATCH
            </span>
            <h2 className="font-headline text-5xl md:text-6xl mb-8 leading-tight">
              The Saturday Communiqué
            </h2>
            <p className="font-body text-white/60 text-lg mb-12">
              Weekly meditations on cinema, architecture, and the evolving soul of Mumbai. Delivered
              every Saturday at dawn.
            </p>
            <form className="flex flex-col md:flex-row gap-0 max-w-lg mx-auto">
              <input
                className="flex-1 bg-white/5 border-none text-white font-label text-xs tracking-widest px-6 py-5 placeholder:text-white/30 focus:ring-1 focus:ring-brand-red outline-none"
                placeholder="YOUR EMAIL ADDRESS"
                type="email"
              />
              <button
                className="text-white font-label text-xs tracking-widest font-bold px-10 py-5 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#C8102E' }}
                type="submit"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
