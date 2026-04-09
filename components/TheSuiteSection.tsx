"use client";

import { useRef } from "react";

const luxuryItems = [
  {
    category: "The Suite",
    title: "The Vacheron Overseas: A Nomad's Companion.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5ZMaS3NmrMCHZgNYbhHlnCcdUpeCjLXU98BNaq4-4pcAWdfT97bHTWajifDoShNDm97kfDXscbZ9S-wzhjFFfRutp8bUWMod-ei7Rk60kc8J265KHwc9rSNo6paGjNNe7E2jxvz5LisU4ihApBg4AQng_Jcn8FMnhWqPTMSl4s7LUhwWa90doWaAabV62ZQXhUrdz_1gtxB5ABALo5MPoU5Fa9uz3Pia_Y6AddSIOddX5sXRW7V4nU8VmKls-E0iRf8clgr_yzeRJ",
  },
  {
    category: "The Suite",
    title: "The Loro Piana Storm System: Alpine Elegance Reimagined.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5ZMaS3NmrMCHZgNYbhHlnCcdUpeCjLXU98BNaq4-4pcAWdfT97bHTWajifDoShNDm97kfDXscbZ9S-wzhjFFfRutp8bUWMod-ei7Rk60kc8J265KHwc9rSNo6paGjNNe7E2jxvz5LisU4ihApBg4AQng_Jcn8FMnhWqPTMSl4s7LUhwWa90doWaAabV62ZQXhUrdz_1gtxB5ABALo5MPoU5Fa9uz3Pia_Y6AddSIOddX5sXRW7V4nU8VmKls-E0iRf8clgr_yzeRJ",
  },
  {
    category: "The Suite",
    title: "The Rivière Diamond Collar: A Century of Craftsmanship.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5ZMaS3NmrMCHZgNYbhHlnCcdUpeCjLXU98BNaq4-4pcAWdfT97bHTWajifDoShNDm97kfDXscbZ9S-wzhjFFfRutp8bUWMod-ei7Rk60kc8J265KHwc9rSNo6paGjNNe7E2jxvz5LisU4ihApBg4AQng_Jcn8FMnhWqPTMSl4s7LUhwWa90doWaAabV62ZQXhUrdz_1gtxB5ABALo5MPoU5Fa9uz3Pia_Y6AddSIOddX5sXRW7V4nU8VmKls-E0iRf8clgr_yzeRJ",
  },
];

export default function TheSuiteSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 400;
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="mb-32">
      <div className="flex justify-between items-end mb-16 border-b border-outline-variant/30 pb-8">
        <h2 className="font-headline text-5xl">The Suite</h2>
        <div className="flex gap-4">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 border border-outline-variant/50 flex items-center justify-center hover:bg-surface-container transition-colors group"
          >
            <span className="material-symbols-outlined group-hover:text-accent-teal">
              chevron_left
            </span>
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 border border-outline-variant/50 flex items-center justify-center hover:bg-surface-container transition-colors group"
          >
            <span className="material-symbols-outlined group-hover:text-accent-teal">
              chevron_right
            </span>
          </button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex gap-10 overflow-x-auto no-scrollbar pb-10"
      >
        {luxuryItems.map((item, idx) => (
          <div key={idx} className="min-w-[400px] group cursor-pointer">
            <div className="aspect-square bg-surface-container mb-8 overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt={item.title}
                src={item.image}
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-accent-teal font-bold">
                  {item.category}
                </span>
                <h4 className="font-headline text-2xl mt-3 group-hover:text-accent-teal transition-colors">
                  {item.title}
                </h4>
              </div>
              <span className="material-symbols-outlined text-accent-teal">
                bookmark
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
