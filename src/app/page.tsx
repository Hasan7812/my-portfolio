'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Briefcase, CheckCircle2, Code2, Server, Zap, Database, Layout, Smartphone, ChevronRight } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import homeData from "../language/home.json";

type LangKey = keyof typeof homeData;

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<LangKey>("en");
  const [t, setT] = useState(homeData["en"]);
  
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

    const langCookie = getCookie("lang") as LangKey;
    if (langCookie && homeData[langCookie]) {
      setLang(langCookie);
      setT(homeData[langCookie]);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    },
  };

  const scrollVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-slate-900 selection:bg-blue-200 selection:text-blue-900 font-sans overflow-x-hidden">
      
      <motion.div 
        style={{ scaleX }} 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 origin-left z-50 rounded-r-full" 
      />

      <section className="relative max-w-6xl mx-auto px-6 pt-32 pb-24 md:pt-48 md:pb-32 flex flex-col items-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full flex flex-col items-center">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white text-blue-700 font-semibold text-sm mb-10 border border-slate-200 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
            {lang === "tr" ? "Yeni projelere açığım" : "Available for new projects"}
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-[7rem] font-extrabold tracking-tighter text-slate-950 mb-8 leading-[0.95]">
            {t.greeting} <br className="hidden md:block" />
            <motion.span 
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent"
            >
              Hasan Yusuf.
            </motion.span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl md:text-2xl lg:text-3xl text-slate-600 max-w-3xl mb-14 leading-relaxed font-medium tracking-tight">
            {t.description}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <Link href="/portfolio" className="group flex items-center justify-center gap-3 bg-slate-950 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(2,6,23,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.5)] hover:-translate-y-1">
              {t.btn_projects} 
              <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
            <Link href="/contact" className="flex items-center justify-center gap-3 bg-white text-slate-900 border-2 border-slate-200 px-10 py-5 rounded-2xl font-bold text-lg hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 shadow-sm">
              <Mail size={20} className="text-slate-500" />
              {t.btn_contact}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={scrollVariants}
        className="max-w-6xl mx-auto px-6 py-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: lang === "tr" ? "Yıl Deneyim" : "Years Exp.", value: "3+" },
            { label: lang === "tr" ? "Tamamlanan Proje" : "Projects", value: "20+" },
            { label: lang === "tr" ? "Mutlu Müşteri" : "Clients", value: "15+" },
            { label: lang === "tr" ? "Kahve (Fincan)" : "Cups of Coffee", value: "99+" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center shadow-sm">
              <span className="text-4xl md:text-5xl font-black text-slate-950 mb-2">{stat.value}</span>
              <span className="text-slate-500 font-semibold">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={scrollVariants}
        className="bg-slate-950 text-white py-32 mt-20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tighter">
              {lang === "tr" ? "Uzmanlık Alanlarım" : "My Expertise"}
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl">
              {lang === "tr" ? "Modern webin gerektirdiği tüm katmanlarda uçtan uca çözümler üretiyorum." : "I provide end-to-end solutions in all layers required by the modern web."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Layout, title: "Frontend", desc: "React, Next.js, Tailwind CSS" },
              { icon: Server, title: "Backend", desc: "Node.js, Express, Prisma, SQL" },
              { icon: Smartphone, title: "Responsive", desc: "Mobile-first, PWA, UI/UX" }
            ].map((service, i) => (
              <div key={i} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-10 rounded-[2rem] hover:bg-slate-800 transition-colors group">
                <div className="bg-blue-600/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-blue-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <service.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-slate-400 font-medium">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={scrollVariants}
        className="py-32"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 mb-6 tracking-tighter">{t.why_work_title}</h2>
            <div className="w-24 h-1.5 bg-blue-600 rounded-full"></div>
          </div>
          
          <div className="bg-white rounded-[3rem] p-10 md:p-20 border border-slate-100 relative overflow-hidden shadow-xl shadow-slate-200/20">
            <div className="absolute -top-12 -right-12 text-slate-50 opacity-50">
              <Briefcase size={250} />
            </div>
            
            <p className="text-2xl md:text-4xl text-slate-800 italic relative z-10 leading-snug font-medium tracking-tight">
              &quot;{t.why_work_text}&quot;
            </p>
            
            <div className="mt-12 flex items-center gap-4 relative z-10 bg-slate-50 w-max px-6 py-3 rounded-2xl border border-slate-100">
              <CheckCircle2 size={28} className="text-blue-600" />
              <span className="text-slate-700 font-bold text-lg">100% Satisfaction</span>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={scrollVariants}
        className="max-w-6xl mx-auto px-6 py-24 border-t border-slate-100"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tighter mb-4">{t.featured_title}</h2>
            <p className="text-xl text-slate-500 font-medium">
              {lang === "tr" ? "Son dönemde geliştirdiğim favori projelerim." : "My recent favorite projects that I've built."}
            </p>
          </div>
          <Link href="/portfolio" className="text-blue-600 font-bold text-lg hover:text-blue-700 flex items-center gap-2 transition-colors group bg-blue-50 px-6 py-3 rounded-xl hover:bg-blue-100">
            {lang === "tr" ? "Tümünü Gör" : "View All"} <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {[1, 2].map((item) => (
            <div key={item} className="group cursor-pointer bg-white p-6 rounded-[2.5rem] border border-slate-100 hover:border-blue-100 transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2">
              <div className="bg-slate-50 rounded-[2rem] h-64 md:h-80 mb-8 flex items-center justify-center border border-slate-100 overflow-hidden relative">
                <Code2 size={64} className="text-slate-300 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-500"></div>
              </div>
              <div className="px-4 pb-2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-bold rounded-lg">Next.js</span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-bold rounded-lg">PostgreSQL</span>
                </div>
                <h3 className="text-3xl font-extrabold text-slate-950 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">Premium Project {item}</h3>
                <p className="text-slate-500 text-lg font-medium leading-relaxed mb-6">
                  {lang === "tr" ? "Bu proje, modern web teknolojileri kullanılarak geliştirilmiş tam kapsamlı bir uygulamadır." : "This project is a full-stack application developed using modern web technologies."}
                </p>
                <div className="flex items-center text-blue-600 font-bold">
                  {lang === "tr" ? "İncele" : "Explore"} <ChevronRight size={20} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={scrollVariants}
        className="max-w-5xl mx-auto px-6 py-32 text-center"
      >
        <div className="bg-blue-600 rounded-[3rem] p-12 md:p-24 relative overflow-hidden shadow-2xl shadow-blue-600/20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter relative z-10">
            {lang === "tr" ? "Harika bir fikriniz mi var?" : "Have an awesome idea?"}
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto font-medium relative z-10">
            {lang === "tr" ? "Hemen iletişime geçin ve projenizi gerçeğe dönüştürelim." : "Get in touch today and let's turn your project into reality."}
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-transform duration-300 shadow-xl relative z-10">
            <Zap size={24} className="text-yellow-500" />
            {t.btn_contact}
          </Link>
        </div>
      </motion.section>

    </main>
  );
}