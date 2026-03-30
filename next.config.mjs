/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. URL Yönlendirmeleri (Rewrites)
  async rewrites() {
    return [
      {
        // Kullanıcı tarayıcıya /home yazdığında...
        source: '/home',
        // Arka planda aslında anasayfayı (/) göster.
        destination: '/',
      },
    ];
  },

  // 2. Görsel Optimizasyonu (İleride projelerine resim eklediğinde lazım olacak)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Her yerden resim çekebilmene izin verir
      },
    ],
  },
};

export default nextConfig;