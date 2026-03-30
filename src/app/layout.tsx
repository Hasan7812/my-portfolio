import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Globe, LayoutDashboard, Briefcase, Mail, LogIn, ChevronUp, Info } from "lucide-react";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "Hasan Yusuf Barutcu | Portfolio",
  description: "Full-Stack Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const languages = [
    { code: "tr", name: "Türkçe" },
    { code: "en", name: "English" },
    { code: "de", name: "Deutsch" },
    { code: "ru", name: "Русский" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "zh", name: "中文" },
    { code: "az", name: "Azərbaycanca" },
    { code: "kk", name: "Қазақша" },
    { code: "hi", name: "हिन्दी" }
  ];

  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#FAFAFA] text-slate-900 font-sans antialiased flex flex-col min-h-screen selection:bg-blue-100 selection:text-blue-900">
        
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
          <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-slate-950 group-hover:text-blue-600 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 relative z-10">
                  <path d="M12 2L2 19l4-2 6 5 6-5 4 2L12 2z" />
                </svg>
                <div className="absolute inset-0 bg-blue-100 rounded-full scale-0 group-hover:scale-125 transition-transform duration-500 opacity-50"></div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-950 uppercase">HYB.</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/portfolio" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">Portfolio</Link>
              <Link href="/info" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">Info</Link>
              <Link href="/contact" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">Contact</Link>
              <Link href="/login" className="text-sm font-bold bg-slate-950 text-white px-6 py-2.5 rounded-xl hover:bg-blue-600 hover:-translate-y-0.5 transition-all shadow-md hover:shadow-xl">Login</Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow pt-20">
          {children}
        </main>

        <footer className="bg-slate-950 text-slate-300 pt-24 pb-8 mt-20 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
            
            <div className="flex flex-col items-start gap-10">
              <Link href="/" className="flex items-center gap-3 group">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 text-white group-hover:text-blue-500 group-hover:-translate-y-1 transition-all duration-300">
                  <path d="M12 2L2 19l4-2 6 5 6-5 4 2L12 2z" />
                </svg>
                <span className="font-extrabold text-2xl tracking-tight text-white uppercase">HYB.</span>
              </Link>
              
              <nav className="flex flex-col gap-5">
                <Link href="/" className="flex items-center gap-4 text-slate-400 hover:text-white transition-all group w-max">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all shadow-lg"><LayoutDashboard size={18} /></div>
                  <span className="font-semibold tracking-wide">Home</span>
                </Link>
                <Link href="/portfolio" className="flex items-center gap-4 text-slate-400 hover:text-white transition-all group w-max">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all shadow-lg"><Briefcase size={18} /></div>
                  <span className="font-semibold tracking-wide">Portfolio</span>
                </Link>
                <Link href="/info" className="flex items-center gap-4 text-slate-400 hover:text-white transition-all group w-max">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all shadow-lg"><Info size={18} /></div>
                  <span className="font-semibold tracking-wide">Info</span>
                </Link>
                <Link href="/contact" className="flex items-center gap-4 text-slate-400 hover:text-white transition-all group w-max">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all shadow-lg"><Mail size={18} /></div>
                  <span className="font-semibold tracking-wide">Contact</span>
                </Link>
                <Link href="/login" className="flex items-center gap-4 text-slate-400 hover:text-white transition-all group w-max">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all shadow-lg"><LogIn size={18} /></div>
                  <span className="font-semibold tracking-wide">Login</span>
                </Link>
              </nav>
            </div>

            <div className="flex flex-col items-start md:items-end justify-end pb-2">
              <div className="relative group">
                <button className="flex items-center gap-3 bg-slate-900 px-6 py-4 rounded-2xl border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)]">
                  <Globe size={20} className="text-blue-500" />
                  <span className="font-bold tracking-wide">Select Language</span>
                  <ChevronUp size={18} className="text-slate-500 group-hover:text-slate-300 transition-colors" />
                </button>

                <div className="absolute bottom-full right-0 mb-4 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 p-2.5 z-50">
                  <div className="max-h-64 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full pr-1 flex flex-col gap-1">
                    {languages.map((lang) => (
                      <a 
                        key={lang.code} 
                        href="#" 
                        data-lang={lang.code} 
                        className="lang-select-btn flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-white font-semibold hover:pl-5"
                      >
                        <span className="uppercase text-[10px] font-extrabold text-slate-500 bg-slate-950 px-2 py-1 rounded-md w-8 text-center">{lang.code}</span>
                        {lang.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="max-w-5xl mx-auto px-6 mt-24 pt-8 border-t border-slate-800 flex justify-center">
            <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">
              &copy; 2026 hasanyusufbarutcu.com.tr all right reserved.
            </p>
          </div>
        </footer>

        <CookieBanner />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', () => {
                const buttons = document.querySelectorAll('.lang-select-btn');
                buttons.forEach(btn => {
                  btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lang = btn.getAttribute('data-lang');
                    document.cookie = "lang=" + lang + "; path=/; max-age=31536000";
                    window.location.reload();
                  });
                });
              });
            `
          }}
        />
      </body>
    </html>
  );
}