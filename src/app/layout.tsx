import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "../components/ThemeProvider";
import { ThemeToggle } from "../components/ThemeToggle";
import { User, Mail, ShieldCheck, Github, Linkedin, Instagram, Home } from "lucide-react";

// Google Fonts'tan modern ve jilet gibi bir font çekiyoruz
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: 'swap',
});

// Mobil cihazlarda tarayıcı çubuğu rengini temaya göre ayarlıyoruz
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// Full SEO ve Sosyal Medya Meta Etiketleri
export const metadata: Metadata = {
  title: {
    template: "%s | Hasan Yusuf Barutcu",
    default: "Hasan Yusuf Barutcu | Full-Stack Developer",
  },
  description: "Modern, hızlı, güvenli web uygulamaları ve profesyonel portfolyo.",
  keywords: ["Hasan Yusuf Barutcu", "Frontend", "Backend", "Full-Stack", "Developer", "Next.js", "React", "Portfolio"],
  authors: [{ name: "Hasan Yusuf Barutcu" }],
  creator: "Hasan Yusuf Barutcu",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://hasanyusufbarutcu.com.tr",
    title: "Hasan Yusuf Barutcu | Portfolyo",
    description: "Modern teknolojilerle geliştirilmiş, jilet gibi bir portfolyo deneyimi.",
    siteName: "Hasan Yusuf Barutcu",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasan Yusuf Barutcu | Portfolyo",
    description: "Modern teknolojilerle geliştirilmiş, jilet gibi bir portfolyo deneyimi.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: next-themes kütüphanesinin sorunsuz çalışması için şarttır!
    <html lang="tr" suppressHydrationWarning className="scroll-smooth">
      <body className={`${jakarta.className} bg-[#FAFAFA] dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased min-h-screen flex flex-col transition-colors duration-500 selection:bg-blue-200 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100`}>
        <ThemeProvider>
          
          {/* ================= HEADER (NAVBAR) ================= */}
          <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/75 dark:bg-slate-950/75 border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-500 shadow-sm">
            <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
              
              {/* Logo */}
              <Link href="/" className="text-2xl font-extrabold tracking-tighter text-slate-950 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                HYB<span className="text-blue-600">.</span>
              </Link>

              {/* Masaüstü Menü ve Tema Butonu */}
              <div className="flex items-center gap-4 sm:gap-6">
                <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600 dark:text-slate-400">
                  <Link href="/" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                    <Home size={16} className="group-hover:scale-110 transition-transform" /> Anasayfa
                  </Link>
                  <Link href="/info" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                    <User size={16} className="group-hover:scale-110 transition-transform" /> Hakkımda
                  </Link>
                  <Link href="/contact" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                    <Mail size={16} className="group-hover:scale-110 transition-transform" /> İletişim
                  </Link>
                  <Link href="/privacy" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                    <ShieldCheck size={16} className="group-hover:scale-110 transition-transform" /> Gizlilik
                  </Link>
                </nav>

                {/* Ayıraç */}
                <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

                {/* Tema Değiştirme Butonu (ThemeToggle) */}
                <ThemeToggle />
              </div>

            </div>
          </header>

          {/* ================= MAIN CONTENT ================= */}
          <main className="flex-1 w-full relative">
            {children}
          </main>

          {/* ================= FOOTER ================= */}
          <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800/50 py-10 transition-colors duration-500">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  © {new Date().getFullYear()} Hasan Yusuf Barutcu. Tüm hakları saklıdır.
                </p>
                <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
                  Modern web teknolojileriyle sevgiyle kodlandı.
                </p>
              </div>

              {/* Sosyal Medya İkonları */}
              <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors p-2 bg-slate-50 dark:bg-slate-900 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 bg-slate-50 dark:bg-slate-900 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Linkedin size={20} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors p-2 bg-slate-50 dark:bg-slate-900 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Instagram size={20} />
                </a>
              </div>

            </div>
          </footer>

        </ThemeProvider>
      </body>
    </html>
  );
}