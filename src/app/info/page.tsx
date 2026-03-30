'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Info, Target, Lightbulb, User, Code2, 
  Database, Layout, Wrench, Briefcase, GraduationCap, 
  ChevronRight, Star, Coffee, Users, Rocket 
} from "lucide-react";
import { motion, Variants } from "framer-motion";

// JSON dosyasının yolu: src/app/info -> src/language/info.json
import infoData from "../../language/info.json";

type LangKey = keyof typeof infoData;

export default function InfoPage() {
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
    if (langCookie && infoData[langCookie]) {
      setLang(langCookie);
    }
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Güvenli veri çekme ve Fallback (Yedek) metinler
  const t: any = infoData[lang] || infoData["en"];

  // Yetenekler Listesi
  const skills = [
    { title: "Frontend", icon: <Layout size={20} />, items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { title: "Backend", icon: <Database size={20} />, items: ["Node.js", "Express", "Next.js API", "Prisma", "PostgreSQL"] },
    { title: "Tools & DevOps", icon: <Wrench size={20} />, items: ["Git & GitHub", "Docker", "Coolify", "Vercel", "Linux"] },
    { title: "Architecture", icon: <Code2 size={20} />, items: ["RESTful APIs", "Microservices", "Clean Code", "MVC Pattern"] }
  ];

  // Deneyimler (Zaman Çizelgesi)
  const experiences = [
    { year: "2023 - Present", role: "Senior Full-Stack Developer", company: "Freelance", icon: <Briefcase size={20} />, desc: "Developing high-performance, SEO-friendly web applications using Next.js and Tailwind." },
    { year: "2021 - 2023", role: "Frontend Developer", company: "Tech Agency", icon: <Briefcase size={20} />, desc: "Built dynamic user interfaces and dashboard panels for enterprise clients." },
    { year: "2018 - 2021", role: "Computer Science", company: "University", icon: <GraduationCap size={20} />, desc: "Studied software engineering principles, algorithms, and database management." }
  ];

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-32 transition-colors duration-500 selection:bg-blue-200 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100">
      
      {/* Arka Plan Efektleri */}
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-[120px] pointer-events-none transition-colors duration-500"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-600/10 dark:bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none transition-colors duration-500"></div>

      <div className="max-w-5xl mx-auto px-6 pt-32 md:pt-40 relative z-10">
        
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="flex flex-col gap-16">
          
          {/* ================= HERO & BAŞLIK ================= */}
          <motion.div variants={itemVariants} className="flex flex-col items-start border-b border-slate-200 dark:border-slate-800 pb-10 transition-colors duration-500">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-bold mb-8 transition-colors group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
              {t.back || "Go Back"}
            </Link>
            
            <div className="flex items-center gap-6">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-5 rounded-3xl text-white shadow-xl shadow-blue-600/20 dark:shadow-blue-900/40">
                <Info size={40} />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white transition-colors duration-500 mb-2">
                  {t.title || "About Me"}
                </h1>
                <p className="text-xl text-slate-500 dark:text-slate-400 font-medium transition-colors duration-500 max-w-2xl">
                  {t.subtitle || "Discover my journey, skills, and the passion that drives my code."}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ================= İSTATİSTİKLER (STATS) ================= */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/50 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4"><Star size={24} /></div>
              <h3 className="text-3xl font-black text-slate-950 dark:text-white mb-1">5+</h3>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Years Experience</p>
            </div>
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/50 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-1">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4"><Rocket size={24} /></div>
              <h3 className="text-3xl font-black text-slate-950 dark:text-white mb-1">50+</h3>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Projects Done</p>
            </div>
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/50 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-1">
              <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mb-4"><Users size={24} /></div>
              <h3 className="text-3xl font-black text-slate-950 dark:text-white mb-1">30+</h3>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Happy Clients</p>
            </div>
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/50 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-1">
              <div className="w-12 h-12 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mb-4"><Coffee size={24} /></div>
              <h3 className="text-3xl font-black text-slate-950 dark:text-white mb-1">∞</h3>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Cups of Coffee</p>
            </div>
          </motion.div>

          {/* ================= BİLGİ KARTLARI (ABOUT, MISSION, VISION) ================= */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="md:col-span-2 bg-white dark:bg-slate-900/80 p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 backdrop-blur-sm transition-all duration-500 group hover:border-blue-200 dark:hover:border-blue-900">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center transition-colors duration-500 group-hover:bg-blue-600 group-hover:text-white">
                  <User size={24} />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white transition-colors duration-500">{t.about_title || "Who am I?"}</h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium transition-colors duration-500">
                {t.about_desc || "I am a passionate Full-Stack Developer dedicated to building scalable, modern, and user-friendly web applications. With a strong foundation in both frontend and backend technologies, I bridge the gap between design and robust functionality."}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900/80 p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 backdrop-blur-sm transition-all duration-500 group hover:border-emerald-200 dark:hover:border-emerald-900/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center transition-colors duration-500 group-hover:bg-emerald-600 group-hover:text-white">
                  <Target size={24} />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white transition-colors duration-500">{t.mission_title || "My Mission"}</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium transition-colors duration-500">
                {t.mission_desc || "To deliver clean, maintainable, and highly performant code that solves real-world problems and creates seamless digital experiences."}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900/80 p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 backdrop-blur-sm transition-all duration-500 group hover:border-purple-200 dark:hover:border-purple-900/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center transition-colors duration-500 group-hover:bg-purple-600 group-hover:text-white">
                  <Lightbulb size={24} />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white transition-colors duration-500">{t.vision_title || "My Vision"}</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium transition-colors duration-500">
                {t.vision_desc || "To continuously learn, adapt to new technologies, and contribute to innovative projects that shape the future of the web."}
              </p>
            </motion.div>
          </div>

          {/* ================= TEKNOLOJİ YIĞINI (TECH STACK) ================= */}
          <motion.div variants={itemVariants} className="mt-10">
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white mb-8 text-center">Tech Stack</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/50 shadow-lg shadow-slate-200/20 dark:shadow-none hover:border-blue-200 dark:hover:border-blue-900 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="text-blue-600 dark:text-blue-400">{skill.icon}</div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{skill.title}</h3>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {skill.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium text-sm">
                        <ChevronRight size={14} className="text-blue-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ================= DENEYİM (TIMELINE) ================= */}
          <motion.div variants={itemVariants} className="mt-10">
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white mb-10 text-center">Experience & Education</h2>
            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-6 md:ml-10 space-y-12 pb-10">
              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-8 md:pl-12">
                  {/* Timeline Noktası */}
                  <div className="absolute -left-[21px] top-1 w-10 h-10 bg-white dark:bg-slate-950 border-4 border-blue-100 dark:border-slate-800 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
                    {exp.icon}
                  </div>
                  <div className="bg-white dark:bg-slate-900/80 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/30 dark:shadow-none hover:-translate-y-1 transition-transform duration-300">
                    <span className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full mb-4">
                      {exp.year}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">{exp.role}</h3>
                    <h4 className="text-md font-bold text-slate-400 dark:text-slate-500 mb-4">{exp.company}</h4>
                    <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ================= CTA (CALL TO ACTION) ================= */}
          <motion.div variants={itemVariants} className="mt-10 mb-20">
            <div className="bg-gradient-to-r from-slate-950 to-slate-800 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden border border-transparent dark:border-slate-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 relative z-10">Let's Build Something Amazing.</h2>
              <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto relative z-10">
                Ready to turn your ideas into reality? I'm currently available for freelance work and exciting new projects.
              </p>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-blue-500/25 relative z-10">
                Get In Touch <ArrowLeft className="rotate-180" size={20} />
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}