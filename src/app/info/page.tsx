'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Rocket, Heart, Code2, Terminal, Cpu, Globe2 } from "lucide-react";
import { motion, useScroll, useSpring, Variants } from "framer-motion";

export default function InfoPage() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState("en");
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setMounted(true);
    const getCookie = (name: string): string | undefined => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return undefined;
    };

    const langCookie = getCookie("lang");
    if (langCookie) {
      setLang(langCookie);
    }
  }, []);

  // TypeScript'i rahatlatan o ufak ama etkili çözümler ("as const" eklendi)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 80, damping: 20 }
    },
  };

  const scrollVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  const content = {
    tr: {
      title: "Hikayem",
      subtitle: "Kodlamaya olan tutkum ve yolculuğum.",
      greeting: "Merhaba, ben Hasan Yusuf.",
      bio1: "Türkiye'de yaşayan 15 yaşında tutkulu bir Full-Stack geliştiriciyim. Yaşıtlarım oyun oynarken, ben o oyunların arkasındaki sistemleri, web sitelerinin nasıl çalıştığını ve sunucuların birbiriyle nasıl konuştuğunu anlamaya çalışıyordum. Bu merak, beni modern web teknolojilerinin derinliklerine çekti.",
      bio2: "Henüz resmi bir kurumsal geçmişim veya şirket deneyimim yok. Ancak kendi başıma, en güncel teknolojileri (Next.js, TypeScript, Prisma, PostgreSQL) kullanarak uçtan uca onlarca proje geliştirdim. Kod yazmak benim için bir iş değil, karmaşık problemleri zarif çözümlere dönüştürme sanatıdır.",
      excitementTitle: "İlk Müşterim İçin Hazırım",
      excitementText: "Şu anda kariyerimin en heyecan verici noktasındayım: İlk profesyonel işlerimi almak ve gerçek müşteriler için değer üretmek! Genç yaşımın verdiği tükenmez enerji, öğrenme açlığı ve modern teknolojilere olan hakimiyetimle projelerinize yenilikçi bir bakış açısı getirmeye hazırım. İlk mutlu müşterim neden siz olmayasınız?",
      location: "Türkiye",
      age: "15 Yaşında",
      status: "Freelance",
      cta: "Birlikte Çalışalım"
    },
    en: {
      title: "My Story",
      subtitle: "My passion for coding and my journey.",
      greeting: "Hello, I'm Hasan Yusuf.",
      bio1: "I'm a 15-year-old passionate Full-Stack developer living in Turkey. While my peers were playing games, I was trying to understand the systems behind those games, how websites work, and how servers communicate with each other. This curiosity drew me deep into modern web technologies.",
      bio2: "I don't have an official corporate background or company experience yet. However, I have developed dozens of end-to-end projects on my own using the latest technologies (Next.js, TypeScript, Prisma, PostgreSQL). Coding isn't a job for me; it's the art of turning complex problems into elegant solutions.",
      excitementTitle: "Ready for My First Client",
      excitementText: "I am currently at the most exciting point of my career: taking on my first professional jobs and creating value for real clients! With the inexhaustible energy of my young age, hunger for learning, and mastery of modern technologies, I am ready to bring an innovative perspective to your projects. Why shouldn't you be my first happy client?",
      location: "Turkey",
      age: "15 Years Old",
      status: "Freelance",
      cta: "Let's Work Together"
    }
  };

  const t = lang === "tr" ? content.tr : content.en;

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-slate-900 selection:bg-blue-200 selection:text-blue-900 font-sans overflow-x-hidden pb-32">
      
      <motion.div 
        style={{ scaleX }} 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 origin-left z-50 rounded-r-full" 
      />

      <section className="relative max-w-4xl mx-auto px-6 pt-32 md:pt-48 pb-16 flex flex-col items-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full flex flex-col items-center">
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-950 mb-6">
            {t.title}
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-500 font-medium tracking-tight max-w-2xl">
            {t.subtitle}
          </motion.p>
        </motion.div>
      </section>

      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={scrollVariants}
        className="max-w-5xl mx-auto px-6 mb-24"
      >
        <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-full -z-10 opacity-50"></div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-1 flex flex-col gap-6">
              <div className="w-full aspect-square bg-slate-100 rounded-[2rem] flex items-center justify-center border border-slate-200 overflow-hidden relative group">
                <Terminal size={80} className="text-slate-300 group-hover:scale-110 group-hover:text-blue-600 transition-all duration-500" />
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-300"></div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="bg-white p-2.5 rounded-xl text-blue-600 shadow-sm"><MapPin size={20} /></div>
                  <span className="font-bold text-slate-700">{t.location}</span>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="bg-white p-2.5 rounded-xl text-blue-600 shadow-sm"><Calendar size={20} /></div>
                  <span className="font-bold text-slate-700">{t.age}</span>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="bg-white p-2.5 rounded-xl text-blue-600 shadow-sm"><Globe2 size={20} /></div>
                  <span className="font-bold text-slate-700">{t.status}</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-8 tracking-tight">{t.greeting}</h2>
              <div className="space-y-6 text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                <p>{t.bio1}</p>
                <p>{t.bio2}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={scrollVariants}
        className="max-w-5xl mx-auto px-6"
      >
        <div className="bg-slate-950 rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/30 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 bg-blue-600/20 text-blue-400 px-5 py-2.5 rounded-xl font-bold mb-8 border border-blue-500/20">
                <Rocket size={20} />
                {lang === "tr" ? "Yeni Başlangıçlar" : "New Beginnings"}
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tighter leading-tight">
                {t.excitementTitle}
              </h2>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium mb-10">
                {t.excitementText}
              </p>
              <Link href="/contact" className="inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30">
                {t.cta} <ArrowRight size={20} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl flex flex-col items-center text-center gap-4 hover:border-blue-500/50 transition-colors">
                <div className="bg-slate-800 p-4 rounded-2xl text-blue-400"><Code2 size={32} /></div>
                <span className="font-bold text-slate-200">Clean Code</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl flex flex-col items-center text-center gap-4 hover:border-blue-500/50 transition-colors mt-8">
                <div className="bg-slate-800 p-4 rounded-2xl text-pink-400"><Heart size={32} /></div>
                <span className="font-bold text-slate-200">Passion</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl flex flex-col items-center text-center gap-4 hover:border-blue-500/50 transition-colors -mt-8">
                <div className="bg-slate-800 p-4 rounded-2xl text-emerald-400"><Cpu size={32} /></div>
                <span className="font-bold text-slate-200">Modern Tech</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl flex flex-col items-center text-center gap-4 hover:border-blue-500/50 transition-colors">
                <div className="bg-slate-800 p-4 rounded-2xl text-purple-400"><Terminal size={32} /></div>
                <span className="font-bold text-slate-200">Problem Solving</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

    </main>
  );
}