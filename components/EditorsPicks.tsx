const picks = [
  {
    category: "The Suite",
    title: "The Alibaug Retreat: Redefining Tropical Modernism.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZMHNmqSexwU7PV2iMKlX7tA4ZTZAvPWp1iOg7StFmefOEnwefF9KT7_yMzhO3HLR8chtOghYOf6jsEocY076-k8xyxI2u-Y2_0euzY-EhrA81fMgYSU7cwVXvLf0f0uZS4uV9AzO7o1WviMLhte_bSm0uyrF3OXno9WjY-8_Eo7X_iD68m2hdKAcDscMZRmpNW3pwbSng88HH1esvNy43r1_20YTLT6yhdeIE_-y4UzAJVMBzrj_o93YW54xJz60ry7WrlDqu0E7Q",
  },
  {
    category: "The Exchange",
    title: "Decoding the SaaS Correction: A Founder's Survival Guide.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzfkR7XHVKEzhpxjzCcDy1AuwpIdME8YaWsS33K64SYOFa9OGjtP0W8F5huAyl5VR9aCYG9pFGBuHwfSMZiM7W-3-rWTaavCFtBUrSupm-Mtvgy8dD9N2JsvEMtGl3SSVlyl1NEvDM3KORfhyKQpDYkLKAb7iPfudO2c_mCKBI_tFApGaJNWSv5f95Gj8dwujom8GLpjquvdw2756ze7Leev2-diwBDQgU8XkEsr0XWl217p6tAda4YfyoomfJqsgWFUYRX6IA-jc8",
  },
  {
    category: "Future",
    title: "Ladakh's New Sovereign: The Rise of Ultra-Luxe Glamping.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDkUQG1ap0LIWsOI2U4mlCKdXZrW80P5L6vOF3jF_MWeMFI6u0jr9qJS8HlynmAf8ZB5q3HAcTJkehrBEqM5EcY6OyotBNU6qfepfpjoh1Y3ZuT0cfsRsEDxt-IiL9s9ytFWlbjAt9mRmDv8hjkR8aEmjLSVOIah55Vybb-G-u2XQ-hmgtejfTc74IPejYRHdCc3kW0zfKUIw5Tst7mhIxU-r6JRBZl0bngqLuVjo71YdxUQKCCKSemzOsVScw0SGjlecOWLHkZUsf-",
  },
];

export default function EditorsPicks() {
  return (
    <div className="lg:w-[35%] flex flex-col gap-12">
      <div className="border-b border-outline-variant pb-2">
        <h2 className="text-[12px] font-bold tracking-[0.3em] uppercase text-accent-teal">
          Editor's Picks
        </h2>
      </div>
      <div className="space-y-12">
        {picks.map((pick, idx) => (
          <div key={idx} className="flex gap-6 items-start group">
            <div className="w-32 h-32 flex-shrink-0 bg-surface-container overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt={pick.title}
                src={pick.image}
              />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-widest text-accent-teal font-bold">
                {pick.category}
              </span>
              <h3 className="font-headline text-xl mt-2 leading-snug group-hover:text-accent-teal transition-colors">
                {pick.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
