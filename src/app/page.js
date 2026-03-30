import Link from "next/link";
import { ArrowRight, Mail, Code2 } from "lucide-react";

export default function Home() {
  // Şimdilik örnek projeler koyuyoruz. İleride bunları dinamik yapacağız.
  const featuredProjects = [
    { 
      id: 1, 
      title: "Gelişmiş E-Ticaret Platformu", 
      desc: "Next.js ve Tailwind CSS ile kodlanmış tam donanımlı online mağaza.", 
      slug: "e-ticaret-projesi" 
    },
    { 
      id: 2, 
      title: "Kurumsal Yönetim Paneli (CRM)", 
      desc: "Prisma ve NextAuth entegreli güvenli müşteri yönetim sistemi.", 
      slug: "crm-panel" 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      
      {/* 1. BÖLÜM: HERO ALANI */}
      <main className="max-w-5xl mx-auto px-6 py-32 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Merhaba, Ben <span className="text-blue-600">Hasan Yusuf</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
          14 yaşında tutkulu bir Full-Stack Geliştiriciyim. İşletmeler için modern, hızlı ve güvenli web teknolojileri üretiyorum.
        </p>
        
        {/* Butonlar */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            href="/projects" 
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/30"
          >
            Projeleri Görüntüle <ArrowRight size={20} />
          </Link>
          <Link 
            href="/contact" 
            className="flex items-center justify-center gap-2 bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm"
          >
            Bize Ulaşın <Mail size={20} />
          </Link>
        </div>
      </main>

      {/* 2. BÖLÜM: İKNA VE DENEYİM ALANI */}
      <section className="bg-white py-24 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-2xl mb-6 text-blue-600 shadow-sm border border-blue-100">
            <Code2 size={40} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800">Neden Birlikte Çalışmalıyız?</h2>
          <p className="text-xl md:text-2xl leading-relaxed text-slate-700 font-medium italic">
            "Henüz resmi bir şirket deneyimim yok ama onlarca projeyi kendi başıma, en güncel teknolojilerle başarıyla kodladım. <span className="font-bold text-blue-600">Neden ilk mutlu müşterim sen olmayasın?</span>"
          </p>
        </div>
      </section>

      {/* 3. BÖLÜM: PROJE ÖNİZLEMELERİ */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <h3 className="text-3xl font-bold mb-12 text-center text-slate-800">Öne Çıkan Çalışmalarım</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <Link 
              href={`/projects/${project.slug}`} 
              key={project.id} 
              className="group block bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300"
            >
              {/* Proje Görsel Alanı (Şimdilik yer tutucu) */}
              <div className="aspect-video bg-slate-100 rounded-xl mb-6 flex items-center justify-center overflow-hidden border border-slate-100">
                 <span className="text-slate-400 font-medium group-hover:scale-105 transition-transform duration-300">
                   Görsel Yükleniyor...
                 </span>
              </div>
              <h4 className="text-2xl font-bold mb-3 text-slate-800 group-hover:text-blue-600 transition-colors">
                {project.title}
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {project.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>
      
    </div>
  );
}