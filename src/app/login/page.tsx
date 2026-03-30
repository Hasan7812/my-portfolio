'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Mail, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, Variants } from "framer-motion";

// JSON dosyasının yolu
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

    if (!email || !password) {
      setErrorMessage(t.err_empty);
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setStatus("success");
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
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col relative overflow-hidden transition-colors duration-500 selection:bg-blue-200 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100">
      
      {/* Arka Plan Efektleri */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-[100px] pointer-events-none transition-colors duration-500"></div>

      <div className="flex-1 flex flex-col justify-center items-center px-6 py-20 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full max-w-md">
          
          {/* Başlık ve Geri Dön Butonu */}
          <motion.div variants={itemVariants} className="mb-10 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-bold mb-8 transition-colors group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
              {t.back}
            </Link>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-slate-950 dark:bg-slate-800 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-slate-900/20 dark:shadow-slate-900/50 transition-colors duration-500">
                <Lock size={32} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white mb-3 transition-colors duration-500">{t.title}</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors duration-500">{t.subtitle}</p>
          </motion.div>

          {/* Form Alanı */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900/80 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800 backdrop-blur-sm transition-colors duration-500">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-8 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={60} className="mb-4 animate-bounce" />
                <h3 className="text-2xl font-extrabold">{t.success}</h3>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="flex flex-col gap-6">
                
                {/* E-Posta Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-600 dark:text-slate-400 pl-1 transition-colors duration-500">{t.email}</label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-4 top-4 text-slate-400 dark:text-slate-500" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 pl-12 pr-5 py-4 rounded-2xl outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-600/10 dark:focus:ring-blue-500/10 transition-all font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white" 
                      placeholder="hello@example.com" 
                    />
                  </div>
                </div>

                {/* Şifre Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-600 dark:text-slate-400 pl-1 transition-colors duration-500">{t.password}</label>
                  <div className="relative">
                    <Lock size={20} className="absolute left-4 top-4 text-slate-400 dark:text-slate-500" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 pl-12 pr-5 py-4 rounded-2xl outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-600/10 dark:focus:ring-blue-500/10 transition-all font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white" 
                      placeholder="••••••••" 
                    />
                  </div>
                </div>

                {/* Hata Mesajı */}
                {status === "error" && (
                  <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3 font-semibold text-sm border border-transparent dark:border-red-500/20 transition-colors duration-500">
                    <AlertCircle size={20} className="shrink-0" /> {errorMessage}
                  </div>
                )}

                {/* Submit Butonu */}
                <button 
                  disabled={status === "loading"} 
                  type="submit" 
                  className="w-full bg-slate-950 dark:bg-blue-600 text-white font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-600 dark:hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20 dark:hover:shadow-blue-900/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? <Loader2 size={24} className="animate-spin" /> : t.btn_login}
                </button>
                
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}