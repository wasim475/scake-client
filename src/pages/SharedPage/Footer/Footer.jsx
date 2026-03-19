import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import Logo from '../../../components/Logo';

const links = {
  Shop: [
    { label: "Birthday Cakes", href: "/shop/birthday" },
    { label: "Wedding Cakes", href: "/shop/wedding" },
    { label: "Chocolate Cakes", href: "/shop/chocolate" },
    { label: "Custom Cakes", href: "/custom" },
    { label: "Cupcakes", href: "/shop/cupcakes" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/story" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Press", href: "/press" },
  ],
  Support: [
    { label: "FAQs", href: "/faq" },
    { label: "Track Order", href: "/track" },
    { label: "Returns & Refunds", href: "/refund" },
    { label: "Delivery Info", href: "/delivery" },
    { label: "Contact Us", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socials = [
  { icon: <Facebook size={15} />, href: "#", label: "Facebook" },
  { icon: <Instagram size={15} />, href: "#", label: "Instagram" },
  { icon: <Youtube size={15} />, href: "#", label: "YouTube" },
  { icon: <Twitter size={15} />, href: "#", label: "Twitter" },
];

const contact = [
  { icon: <MapPin size={13} className="shrink-0 mt-0.5" />, text: "Tangail Sadar, Tangail 1900, Bangladesh" },
  { icon: <Phone size={13} className="shrink-0" />, text: "+880 1000 000 000" },
  { icon: <Mail size={13} className="shrink-0" />, text: "hello@***.com" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1A0A0A] text-white/70">

      {/* Newsletter strip */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center gap-6 justify-between">
          <div>
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              🎂 Get Sweet Deals in Your Inbox
            </h3>
            <p className="text-sm text-white/50 mt-0.5">New cakes, exclusive discounts — no spam, ever.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 sm:w-64 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 outline-none focus:border-[#E8627A]/60 transition-colors"
            />
            <button className="px-5 py-2.5 bg-[#E8627A] hover:bg-[#C04060] text-white text-sm font-semibold rounded-xl transition-colors active:scale-95 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 space-y-4">
            {/* Logo */}
            <Logo/>

            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Premium handcrafted cakes made fresh daily in Dhaka. Every order is baked with love and delivered with care.
            </p>

            {/* Contact */}
            <ul className="space-y-2">
              {contact.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-white/50">
                  <span className="text-[#E8627A] mt-0.5">{c.icon}</span>
                  {c.text}
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#E8627A]/20 hover:text-[#E8627A] border border-white/5 flex items-center justify-center text-white/50 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">{title}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-white/45 hover:text-[#E8627A] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <span>© {new Date().getFullYear()} Sanzida's Cake. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <span>Made with 🩷 in Tangail</span>
            <span className="flex gap-2">
              {["💳", "📱", "💵"].map((icon, i) => (
                <span key={i} className="w-7 h-5 bg-white/5 border border-white/10 rounded flex items-center justify-center text-[11px]">{icon}</span>
              ))}
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
}