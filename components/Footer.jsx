import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/5 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/5">
          <div className="md:col-span-2">
            <p className="font-display text-2xl text-white tracking-widest uppercase mb-4">LuxeShop</p>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Curated luxury for those who understand that true style is never accidental.
            </p>
          </div>
          <div>
            <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-6">Navigate</p>
            <ul className="space-y-3">
              {[['/', 'Home'], ['/shop', 'Shop'], ['/cart', 'Cart']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-white/50 hover:text-white text-sm transition-colors duration-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-6">Follow</p>
            <ul className="space-y-3">
              {['Instagram', 'Pinterest', 'TikTok'].map(s => (
                <li key={s}>
                  <span className="text-white/50 hover:text-white text-sm transition-colors duration-300 cursor-pointer">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">© 2025 LuxeShop. All rights reserved.</p>
          <p className="text-white/20 text-xs">Crafted with intention.</p>
        </div>
      </div>
    </footer>
  );
}