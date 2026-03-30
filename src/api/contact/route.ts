import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const mailCountCookie = cookieStore.get('mail_count')?.value;
    const mailTimeCookie = cookieStore.get('mail_time')?.value;

    const now = new Date().getTime();
    let currentCount = mailCountCookie ? parseInt(mailCountCookie) : 0;
    let resetTime = mailTimeCookie ? parseInt(mailTimeCookie) : now + 24 * 60 * 60 * 1000;

    if (now > resetTime) {
      currentCount = 0;
      resetTime = now + 24 * 60 * 60 * 1000;
    }

    if (currentCount >= 3) {
      return NextResponse.json({ error: 'Limit exceeded' }, { status: 429 });
    }

    const { name, email, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, 
      replyTo: email,
      subject: `Portfolio Mesaj: ${subject}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background: #f8fafc; border-radius: 10px;">
          <h2 style="color: #0f172a;">Yeni İletişim Formu Mesajı</h2>
          <p><strong>Gönderen:</strong> ${name}</p>
          <p><strong>E-Posta:</strong> ${email}</p>
          <hr style="border: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    currentCount += 1;
    
    const response = NextResponse.json({ success: true });
    
    response.cookies.set('mail_count', currentCount.toString(), {
      maxAge: 24 * 60 * 60,
      path: '/',
      httpOnly: true,
    });
    
    response.cookies.set('mail_time', resetTime.toString(), {
      maxAge: 24 * 60 * 60,
      path: '/',
      httpOnly: true,
    });

    return response;

  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}