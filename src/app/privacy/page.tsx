import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 py-32 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-slate-100">
        
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-semibold mb-10 transition-colors">
          <ArrowLeft size={18} /> Ana Sayfaya Dön
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Gizlilik Politikası</h1>
        </div>

        <div className="space-y-8 text-slate-600 leading-relaxed font-medium">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Veri Toplama</h2>
            <p>Sitemizi ziyaret ettiğinizde yasal zorunluluklar ve analitik süreçler (hangi sayfaların daha çok okunduğunu anlamak) amacıyla anonim IP adresi ve tarayıcı bilgileriniz toplanır.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Çerezler (Cookies)</h2>
            <p>Sitemizin dil seçeneklerini hatırlaması ve size özel deneyim sunabilmesi için tarayıcınızda geçici ve kalıcı çerezler (cookies) saklanmaktadır.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Veri Güvenliği</h2>
            <p>Toplanan tüm veriler şifreli veritabanlarımızda güvenle saklanmakta olup, hiçbir koşulda üçüncü şahıs veya kurumlarla ticari amaçla paylaşılmamaktadır.</p>
          </section>
        </div>
      </div>
    </div>
  );
}