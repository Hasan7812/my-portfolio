'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { 
  ArrowRight, 
  Code2, 
  Database, 
  Layout, 
  Terminal, 
  Zap, 
  Globe, 
  Smartphone,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animasyon Varyantları
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
  };

  const fadeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // --- DATA BÖLÜMLERİ (İleride JSON'a veya Veritabanına taşıyabilirsin) ---

  const services = [
    {
      title: "Frontend Development",
      description: "Building pixel-perfect, highly interactive, and accessible user interfaces using React, Next.js, and modern CSS frameworks like Tailwind.",
      icon: <Layout size={28} className="text-blue-500" />,
      color: "from-blue-500/20 to-blue-600/5",
      borderColor: "group-hover:border-blue-500/50"
    },
    {
      title: "Backend Engineering",
      description: "Designing scalable, secure, and fast server-side architectures, RESTful APIs, and managing databases with Node.js, Express, and PostgreSQL.",
      icon: <Database size={28} className="text-emerald-500" />,
      color: "from-emerald-500/20 to-emerald-600/5",
      borderColor: "group-hover:border-emerald-500/50"
    },
    {
      title: "Full-Stack Integration",
      description: "Connecting the dots between front and back ends to deliver cohesive, end-to-end web applications with seamless data flow and state management.",
      icon: <Code2 size={28} className="text-purple-500" />,
      color: "from-purple-500/20 to-purple-600/5",
      borderColor: "group-hover:border-purple-500/50"
    },
    {
      title: "Performance Optimization",
      description: "Auditing and improving web vitals, implementing advanced caching strategies, and ensuring your app loads at lightning speed globally.",
      icon: <Zap size={28} className="text-orange-500" />,
      color: "from-orange-500/20 to-orange-600/5",
      borderColor: "group-hover:border-orange-500/50"
    }
  ];

  const featuredProjects = [
    {
      title: "E-Commerce Dashboard",
      category: "Full-Stack • Next.js",
      description: "A comprehensive admin panel with real-time analytics, inventory management, and secure payment gateway integrations.",
      image: "bg-gradient-to-br from-blue-500 to-indigo-600",
      tags: ["Next.js", "Prisma", "Tailwind", "Stripe"]
    },
    {
      title: "AI Content Generator",
      category: "Web App • OpenAI",
      description: "SaaS platform allowing users to generate high-quality marketing copy, blog posts, and images using advanced AI models.",
      image: "bg-gradient-to-br from-purple-500 to-pink-600",
      tags: ["React", "Node.js", "OpenAI API", "MongoDB"]
    }
  ];

  const techStack = ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL", "Prisma", "Docker", "Git", "Framer Motion", "Vercel"];

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500 selection:bg-blue-200 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100 overflow-hidden">
      
      {/* ================= HERO SECTION (Açılış Ekranı) ================= */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        {/* Dekoratif Arka Plan Işıkları */}
        <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blue-600/20 dark:bg-blue-600/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none transition-colors duration-500"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-indigo-600/20 dark:bg-indigo-600/10 rounded-full blur-[100px] md:blur-[120px] pointer-events-none transition-colors duration-500"></div>
        
        <div className="max-w-6xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Sol Kısım: Yazılar ve Butonlar */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="flex flex-col items-start text-left">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-sm mb-8 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              Available for new projects
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-950 dark:text-white leading-[1.1] mb-6 transition-colors duration-500">
              Building <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Digital
              </span> <br className="hidden md:block" />
              Experiences.
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium max-w-lg mb-10 leading-relaxed transition-colors duration-500">
              I am a Full-Stack Developer specializing in crafting highly scalable, fast, and visually stunning web applications that solve real-world problems.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-slate-900/20 dark:shadow-none hover:shadow-blue-600/30 group">
                Let's Talk <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/info" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-bold rounded-2xl flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm hover:shadow-md">
                About Me
              </Link>
            </motion.div>
          </motion.div>

          {/* Sağ Kısım: Görsel / Kod Bloğu İllüstrasyonu */}
          <motion.div initial="hidden" animate="visible" variants={fadeVariants} className="relative hidden lg:block w-full h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 dark:from-slate-900 dark:to-slate-800 rounded-[3rem] border border-white dark:border-slate-700 shadow-2xl dark:shadow-none transform rotate-3 transition-colors duration-500"></div>
            <div className="absolute inset-0 bg-white dark:bg-slate-950 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col transition-colors duration-500">
              {/* Fake Mac Header */}
              <div className="h-12 border-b border-slate-100 dark:border-slate-800 flex items-center px-6 gap-2 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-500">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              {/* Fake Code Content */}
              <div className="p-8 font-mono text-sm md:text-base flex-1 flex flex-col gap-4 text-slate-600 dark:text-slate-300 transition-colors duration-500">
                <p><span className="text-blue-500 dark:text-blue-400">import</span> {'{ Developer }'} <span className="text-blue-500 dark:text-blue-400">from</span> <span className="text-emerald-600 dark:text-emerald-400">'@world/talent'</span>;</p>
                <p className="mt-4"><span className="text-purple-500 dark:text-purple-400">const</span> <span className="text-amber-500 dark:text-amber-400">profile</span> = {'{'} </p>
                <p className="pl-6">name: <span className="text-emerald-600 dark:text-emerald-400">'Hasan Yusuf Barutcu'</span>,</p>
                <p className="pl-6">role: <span className="text-emerald-600 dark:text-emerald-400">'Full-Stack Web Developer'</span>,</p>
                <p className="pl-6">passion: <span className="text-emerald-600 dark:text-emerald-400">'Clean Code & Performance'</span>,</p>
                <p className="pl-6">coffee_level: <span className="text-emerald-600 dark:text-emerald-400">'Over 9000'</span></p>
                <p>{'};'}</p>
                <p className="mt-4"><span className="text-purple-500 dark:text-purple-400">export default</span> function <span className="text-blue-500 dark:text-blue-400">BuildFuture</span>() {'{'}</p>
                <p className="pl-6"><span className="text-purple-500 dark:text-purple-400">return</span> {'<GreatSuccess project={yourIdea} />'};</p>
                <p>{'}'}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= TEKNOLOJİ ŞERİDİ (Marquee) ================= */}
      <section className="py-10 border-y border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/20 backdrop-blur-sm overflow-hidden transition-colors duration-500">
        <div className="flex w-full whitespace-nowrap">
          <motion.div 
            animate={{ x: [0, -1035] }} // 1035px approximate width of one set
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="flex gap-16 items-center px-8"
          >
            {/* Şeridi kesintisiz yapmak için array'i 2 kez basıyoruz */}
            {[...techStack, ...techStack].map((tech, index) => (
              <span key={index} className="text-xl md:text-2xl font-black text-slate-300 dark:text-slate-800 uppercase tracking-widest flex items-center gap-4 transition-colors duration-500">
                {tech} <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= HİZMETLER (What I Do) ================= */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4 transition-colors duration-500">Specialized Services</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto transition-colors duration-500">From intuitive front-end interfaces to robust back-end systems, I provide end-to-end solutions tailored to your business goals.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className={`group bg-white dark:bg-slate-900/50 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/30 dark:shadow-none transition-all duration-500 hover:-translate-y-2 ${service.borderColor}`}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-8`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4 transition-colors duration-500">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium transition-colors duration-500">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ÖNE ÇIKAN PROJELER (Featured Work) ================= */}
      <section className="py-32 px-6 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-200/50 dark:border-slate-800/50 transition-colors duration-500 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4 transition-colors duration-500">Selected Works</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl transition-colors duration-500">A glimpse into some of the digital products I've architected and developed.</p>
            </div>
            {/* Buradaki linki ileride portfolyo rotasına (örneğin /projects) bağlayabiliriz */}
            <Link href="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline">
              View All Projects <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {featuredProjects.map((project, index) => (
              <div key={index} className="group cursor-pointer">
                {/* Proje Görsel Alanı (Şimdilik jilet gibi gradient) */}
                <div className={`w-full aspect-video ${project.image} rounded-[2rem] mb-6 shadow-2xl overflow-hidden relative border border-transparent dark:border-slate-700 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-blue-500/20`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  <div className="absolute top-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-slate-900 dark:text-white shadow-lg">
                    {project.category}
                  </div>
                </div>
                {/* Proje Detayları */}
                <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3 flex items-center gap-2 transition-colors duration-500 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {project.title} <ChevronRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium mb-6 line-clamp-2 transition-colors duration-500">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg transition-colors duration-500 border border-slate-200 dark:border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA (CALL TO ACTION) BÖLÜMÜ ================= */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-950 dark:bg-slate-900 rounded-[3rem] p-10 md:p-20 text-center shadow-2xl shadow-slate-900/30 dark:shadow-none relative overflow-hidden border border-transparent dark:border-slate-800 transition-colors duration-500">
            {/* Efektler */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 relative z-10 tracking-tight">
              Have an idea? <br />
              <span className="text-blue-400">Let's make it happen.</span>
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto relative z-10 font-medium">
              Whether you need a full-stack application from scratch, a performance audit, or a complex API integration, I'm here to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
              <Link href="/contact" className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1">
                <Terminal size={24} /> Start a Project
              </Link>
            </div>
          </div>
        </div>
      </section>
      
    </main>
  );
}