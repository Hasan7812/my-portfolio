'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = document.cookie.split('; ').find(row => row.startsWith('cookieConsent='));
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    document.cookie = "cookieConsent=true; path=/; max-age=31536000";
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[420px] bg-slate-900 border border-slate-800 text-slate-300 p-6 rounded-2xl shadow-2xl z-[9999] flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="bg-blue-600/20 p-2.5 rounded-xl text-blue-500 shrink-0">
          <ShieldAlert size={24} />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg mb-1">Gizlilik ve Veri Politikası</h3>
          <p className="text-sm text-slate-400 leading-relaxed font-medium">
            Sizlere daha iyi bir deneyim sunabilmek ve yasal gerekçelerle verilerinizi anonim olarak işliyoruz.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-2">
        <button 
          onClick={acceptCookies} 
          className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-500 transition-colors text-sm shadow-lg"
        >
          Anladım
        </button>
        <Link 
          href="/privacy" 
          className="flex-1 bg-slate-800 text-slate-300 font-bold py-3 rounded-xl border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors text-sm text-center"
        >
          Detaylı Bilgi
        </Link>
      </div>
    </div>
  );
}