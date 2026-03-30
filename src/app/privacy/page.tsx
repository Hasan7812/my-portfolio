'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { motion, Variants } from "framer-motion";
import privacyData from "../../language/privacy.json";

type LangKey = keyof typeof privacyData;

export default function PrivacyPage() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<LangKey>("en");

  useEffect(() => {
    setMounted(true);
    const getCookie = (name: string): string | undefined => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return undefined;
    };
    
    const langCookie = getCookie("lang") as LangKey;
    if (langCookie && privacyData[langCookie]) {
      setLang(langCookie);
    }
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const t = privacyData[lang] || privacyData["en"];

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-slate-900 selection:bg-blue-200 selection:text-blue-900 font-sans pb-32">
      <div className="max-w-4xl mx-auto px-6 pt-32 md:pt-48">
        
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl shadow-slate-200/40 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-full -z-10 opacity-50"></div>
          
          <motion.div variants={itemVariants}>
            <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-12 transition-colors group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
              {t.back || "Ana Sayfaya Dön"}
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-5 mb-12 border-b border-slate-100 pb-10">
            <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg shadow-blue-600/20">
              <ShieldCheck size={36} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950">
              {t.title || "Gizlilik Politikası"}
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-10 text-lg text-slate-600 leading-relaxed font-medium">
            <section className="group">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                {t.sec1_title || "1. Veri Toplama"}
              </h2>
              <p className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                {t.sec1_desc || "Sitemizi ziyaret ettiğinizde yasal zorunluluklar ve analitik süreçler (hangi sayfaların daha çok okunduğunu anlamak) amacıyla anonim IP adresi ve tarayıcı bilgileriniz toplanır."}
              </p>
            </section>

            <section className="group">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                {t.sec2_title || "2. Çerezler (Cookies)"}
              </h2>
              <p className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                {t.sec2_desc || "Sitemizin dil seçeneklerini hatırlaması ve size özel deneyim sunabilmesi için tarayıcınızda geçici ve kalıcı çerezler (cookies) saklanmaktadır."}
              </p>
            </section>

            <section className="group">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                {t.sec3_title || "3. Veri Güvenliği"}
              </h2>
              <p className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                {t.sec3_desc || "Toplanan tüm veriler şifreli veritabanlarımızda güvenle saklanmakta olup, hiçbir koşulda üçüncü şahıs veya kurumlarla ticari amaçla paylaşılmamaktadır."}
              </p>
            </section>
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}