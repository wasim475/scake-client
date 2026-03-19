import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  { id: 1, name: "Sadiya Islam Shanta", location: "Tangail", avatar: "RA", avatarBg: "bg-rose-400", rating: 5, date: "March 10, 2026", cake: "Classic Vanilla Dream", tag: "Birthday Cake", text: "Absolutely stunning cake! The vanilla sponge was so light and fluffy — exactly what I imagined for my daughter's birthday. Everyone at the party couldn't stop talking about it. Will definitely order again!" },
  { id: 2, name: "Karim Hossain", location: "Chittagong", avatar: "KH", avatarBg: "bg-amber-500", rating: 5, date: "February 28, 2025", cake: "Wedding Bliss Tier", tag: "Wedding Cake", text: "CakeHaus made our wedding day even more perfect. The 3-tier cake was a showstopper. The team was so helpful with customization and delivered right on time. Couldn't have asked for more." },
  { id: 3, name: "Taslima Islam", location: "Sylhet", avatar: "SI", avatarBg: "bg-purple-400", rating: 5, date: "March 5, 2025", cake: "Dark Chocolate Fudge", tag: "Chocolate Cake", text: "The richest chocolate cake I've ever had. The ganache layer was perfect — not too sweet, just right. Ordered for my husband's birthday and he absolutely loved it. 10/10!" },
  { id: 4, name: "Nadia Chowdhury Jhumur", location: "Mymensingh", avatar: "NC", avatarBg: "bg-teal-500", rating: 4, date: "March 15, 2025", cake: "Strawberry Dream", tag: "Fruit Cake", text: "Fresh strawberries, light cream — this cake was a dream. The custom message on top was a beautiful touch. Delivery was prompt and the packaging was lovely. Highly recommend!" },
  { id: 5, name: "Arif Rahman", location: "Rajshahi", avatar: "AR", avatarBg: "bg-indigo-400", rating: 5, date: "March 1, 2025", cake: "Unicorn Theme Cake", tag: "Custom Cake", text: "My daughter went crazy when she saw the unicorn cake! Every detail was perfect and it tasted amazing too. The team listened to all our requests. Truly a magical experience." },
  { id: 6, name: "Mitu Islam", location: "Chattagram", avatar: "MB", avatarBg: "bg-pink-500", rating: 5, date: "February 20, 2025", cake: "Assorted Cupcakes", tag: "Cupcakes", text: "Ordered 24 cupcakes for an office celebration. Every single one was perfect — moist, beautifully decorated, and delicious. My colleagues kept asking where they were from!" },
];

function StarRow({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={13} className={i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
      ))}
    </div>
  );
}

const VISIBLE = 3; // cards visible at once on desktop

export default function Reviews() {
  const [start, setStart] = useState(0);

  const prev = () => setStart((s) => Math.max(0, s - 1));
  const next = () => setStart((s) => Math.min(reviews.length - VISIBLE, s + 1));

  const canPrev = start > 0;
  const canNext = start < reviews.length - VISIBLE;

  // Summary stats
  const avg = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold tracking-widest text-[#E8627A] uppercase">What Customers Say</span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-bold text-[#3D1C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Customer Love
            </h2>

            {/* Aggregate rating */}
            <div className="flex items-center gap-3 mt-3">
              <span className="text-4xl font-bold text-[#3D1C2C]">{avg}</span>
              <div>
                <StarRow rating={5} />
                <p className="text-xs text-[#8B7070] mt-0.5">{reviews.length * 80}+ verified reviews</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-2 shrink-0">
            <button
              onClick={prev}
              disabled={!canPrev}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-[#8B7070] hover:border-[#E8627A] hover:text-[#E8627A] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              disabled={!canNext}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-[#8B7070] hover:border-[#E8627A] hover:text-[#E8627A] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Cards — scroll on mobile, windowed on desktop */}
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
          {reviews.slice(start, start + 6).map((r, i) => {
            const isVisible = i < VISIBLE;
            return (
              <div
                key={r.id}
                className={`min-w-[280px] sm:min-w-0 sm:flex-1 bg-[#FFF8F0] border border-[#E8627A]/10 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 ${
                  !isVisible ? "sm:hidden lg:block opacity-60 scale-95" : ""
                }`}
              >
                {/* Quote icon */}
                <Quote size={20} className="text-[#E8627A] opacity-40 -mb-1" />

                {/* Review text */}
                <p className="text-sm text-[#5C3D2E] leading-relaxed flex-1">"{r.text}"</p>

                {/* Cake tag */}
                <span className="inline-block self-start px-2.5 py-1 bg-[#FDEEF1] text-[#E8627A] text-[10px] font-semibold rounded-full">
                  {r.tag}
                </span>

                {/* Divider */}
                <div className="border-t border-[#E8627A]/10 pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full ${r.avatarBg} flex items-center justify-center text-white text-[11px] font-bold shrink-0`}>
                      {r.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#2A1A1A]">{r.name}</p>
                      <p className="text-[10px] text-[#8B7070]">{r.location} · {r.date}</p>
                    </div>
                  </div>
                  <StarRow rating={r.rating} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setStart(Math.min(i, reviews.length - VISIBLE))}
              className={`rounded-full transition-all duration-200 ${
                i === start ? "w-5 h-2 bg-[#E8627A]" : "w-2 h-2 bg-gray-200 hover:bg-[#E8627A]/40"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}