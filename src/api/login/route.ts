import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const admins = [
      { email: "admin@hasanyusufbarutcu.com.tr", password: "Hasan7812" }
    ];

    const isValidAdmin = admins.find(
      (admin) => admin.email === email && admin.password === password
    );

    if (isValidAdmin) {
      // BURASI ÇOK ÖNEMLİ: cookies() artık await edilmeli
      const cookieStore = await cookies();
      
      cookieStore.set('admin_auth', 'authenticated_token_true', {
        maxAge: 24 * 60 * 60,
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  } catch (error) {
    console.error("LOGIN API HATASI:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}