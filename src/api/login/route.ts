import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // ------------------------------------------------------------------
    // MANUEL ADMİN HESAPLARI LİSTESİ
    // Buraya dilediğin kadar admin hesabını alt alta ekleyebilirsin.
    // ------------------------------------------------------------------
    const admins = [
      { 
        email: "admin@hasanyusufbarutcu.com.tr", 
        password: "Hasan7812" 
      },
      { 
        email: "hasanyusufbarutcu7812@gmail.com", 
        password: "Hasan7812" 
      },
      // Yeni hesap eklemek istersen virgül koyup aşağıya kopyala
    ];

    // Gelen e-posta ve şifre, yukarıdaki listedeki hesaplardan biriyle eşleşiyor mu?
    const isValidAdmin = admins.find(
      (admin) => admin.email === email && admin.password === password
    );

    if (isValidAdmin) {
      const response = NextResponse.json({ success: true });
      
      // Giriş başarılıysa tarayıcıya 24 saatlik güvenli bir bilet (cookie) bırakıyoruz
      response.cookies.set('admin_auth', 'authenticated_token_true', {
        maxAge: 24 * 60 * 60, // 24 Saat geçerli
        path: '/',
        httpOnly: true, // XSS saldırılarına karşı koruma (Sadece sunucu okuyabilir)
        secure: process.env.NODE_ENV === 'production', // Canlıda HTTPS zorunluluğu
        sameSite: 'lax',
      });

      return response;
    }

    // Bilgiler listedeki hiçbir hesapla uyuşmuyorsa 401 Yetkisiz hatası
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}