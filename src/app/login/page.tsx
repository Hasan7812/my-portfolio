'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Mail, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, Variants } from "framer-motion";
import loginData from "../../language/login.json";

type LangKey = keyof typeof loginData;

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<LangKey>("en");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setMounted(true);
    const getCookie = (name: string): string | undefined => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return undefined;
    };
    
    const langCookie = getCookie("lang") as LangKey;
    if (langCookie && loginData[langCookie]) {
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

  const t = loginData[lang] || loginData["en"];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Boş alan kontrolü
    if (!email || !password) {
      setErrorMessage(t.err_empty);
      setStatus("error");
      return;
    }

    // Basit e-posta format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage(t.err_invalid_email);
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      // API'ye giriş isteği atıyoruz
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setStatus("success");
        // Başarılı girişte 1 saniye sonra Dashboard'a yönlendiriyoruz
        setTimeout(() => {
          window.location.href = "https://my.hasanyusufbarutcu.com.tr/dashboard";
        }, 1000);
      } else if (res.status === 401) {
        setStatus("error");
        setErrorMessage(t.err_auth_failed);
      } else {
        setStatus("error");
        setErrorMessage(t.err_server);
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(t.err_server);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans flex flex-col selection:bg-blue-200 selection:text-blue-900 relative overflow-hidden">
      
      {/* Arka Plan Süslemeleri */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex-1 flex flex-col justify-center items-center px-6 py-20 relative z-10">
        
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full max-w-md">
          
          <motion.div variants={itemVariants} className="mb-10 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-8 transition-colors group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
              {t.back}
            </Link>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-slate-950 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-slate-900/20">
                <Lock size={32} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-950 mb-3">
              {t.title}
            </h1>
            <p className="text-slate-500 font-medium">
              {t.subtitle}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-950 mb-2">{t.success}</h3>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="flex flex-col gap-6">
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-600 pl-1">{t.email}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <Mail size={20} />
                    </div>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 pl-12 pr-5 py-4 rounded-2xl outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all font-medium text-slate-900 placeholder:text-slate-400" 
                      placeholder="admin@hasanyusufbarutcu.com.tr" 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-600 pl-1">{t.password}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <Lock size={20} />
                    </div>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 pl-12 pr-5 py-4 rounded-2xl outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all font-medium text-slate-900 placeholder:text-slate-400" 
                      placeholder="••••••••" 
                    />
                  </div>
                </div>

                {status === "error" && errorMessage && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 font-semibold text-sm">
                    <AlertCircle size={20} className="shrink-0" /> {errorMessage}
                  </motion.div>
                )}

                <button 
                  disabled={status === "loading"} 
                  type="submit" 
                  className="mt-4 w-full bg-slate-950 text-white font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-600/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {status === "loading" ? (
                    <Loader2 size={24} className="animate-spin" />
                  ) : (
                    <>{t.btn_login}</>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}