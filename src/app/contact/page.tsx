'use client';

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, Variants } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
// JSON dosyamızı içe aktarıyoruz (yolu kendi klasör yapına göre ayarlayabilirsin)
import contactData from "../../language/contact.json";

type LangKey = keyof typeof contactData;

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<LangKey>("en");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "limited">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    setMounted(true);
    const getCookie = (name: string): string | undefined => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return undefined;
    };
    
    const langCookie = getCookie("lang") as LangKey;
    if (langCookie && contactData[langCookie]) {
      setLang(langCookie);
    }
  }, []);

  // TypeScript hatasını önleyen Variants tanımlamaları (as const)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.status === 429) {
        setStatus("limited");
      } else if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const t = contactData[lang];

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-slate-900 selection:bg-blue-200 selection:text-blue-900 font-sans pb-32">
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 origin-left z-50 rounded-r-full" />

      <section className="max-w-6xl mx-auto px-6 pt-32 md:pt-48">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="flex flex-col items-center text-center mb-20">
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-950 mb-6">
            {t.title}
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-slate-500 font-medium max-w-2xl">
            {t.subtitle}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start">
          {/* Sol Kısım - İletişim Bilgileri (Telefon Kaldırıldı) */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-2 bg-slate-950 text-white p-10 md:p-14 rounded-[3rem] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <h3 className="text-3xl font-extrabold mb-10 tracking-tight">{t.infoTitle}</h3>
            
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg"><Mail size={24} /></div>
                <div className="flex flex-col">
                  <span className="text-sm text-slate-400 font-semibold mb-1">Email</span>
                  <a href={`mailto:${t.mail}`} className="text-lg font-bold hover:text-blue-400 transition-colors">{t.mail}</a>
                </div>
              </div>
              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-lg"><MapPin size={24} /></div>
                <div className="flex flex-col">
                  <span className="text-sm text-slate-400 font-semibold mb-1">Location</span>
                  <span className="text-lg font-bold">{t.location}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sağ Kısım - Form Alanı */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-3 bg-white p-10 md:p-14 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40">
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-extrabold text-slate-950 mb-4">{t.success}</h3>
              </div>
            ) : status === "limited" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-24 h-24 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6">
                  <AlertCircle size={48} />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-950 mb-4">{t.limited}</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-600 pl-1">{t.name}</label>
                    <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 px-5 py-4 rounded-2xl outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all font-medium text-slate-900 placeholder:text-slate-400" placeholder="John Doe" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-600 pl-1">{t.email}</label>
                    <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 px-5 py-4 rounded-2xl outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all font-medium text-slate-900 placeholder:text-slate-400" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-600 pl-1">{t.subject}</label>
                  <input required type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full bg-slate-50 border border-slate-200 px-5 py-4 rounded-2xl outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all font-medium text-slate-900 placeholder:text-slate-400" placeholder="Project Idea" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-600 pl-1">{t.message}</label>
                  <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-slate-50 border border-slate-200 px-5 py-4 rounded-2xl outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all font-medium text-slate-900 placeholder:text-slate-400 resize-none" placeholder="..." />
                </div>
                
                {status === "error" && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 font-semibold">
                    <AlertCircle size={20} /> {t.error}
                  </div>
                )}

                <button disabled={status === "loading"} type="submit" className="mt-2 w-full bg-blue-600 text-white font-bold text-lg py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                  {status === "loading" ? <Loader2 size={24} className="animate-spin" /> : <><Send size={24} /> {t.send}</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}