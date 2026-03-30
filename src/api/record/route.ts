import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { trackingId, ip, userAgent, path, lang } = body;

    let country = "Bilinmiyor";
    let city = "Bilinmiyor";

    if (ip && ip !== '::1' && ip !== '127.0.0.1') {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
        const geoData = await geoRes.json();
        
        if (geoData.status === 'success') {
          country = geoData.country;
          city = geoData.city;
        }
      } catch (geoErr) {
        console.error(geoErr);
      }
    } else {
      country = "Localhost (Test)";
      city = "Bilgisayarın";
    }

    const deviceType = /mobile/i.test(userAgent) ? "Mobile" : "Desktop";

    await prisma.userInfo.upsert({
      where: { trackingId },
      update: {
        ipAddress: ip,
        country,
        city,
        userAgent,
        deviceType,
        browserLang: lang,
        lastVisit: new Date(),
      },
      create: {
        trackingId,
        ipAddress: ip,
        country,
        city,
        userAgent,
        deviceType,
        browserLang: lang,
      }
    });

    const visitCount = await prisma.userPageRecord.count({
      where: { trackingId }
    });

    await prisma.userPageRecord.create({
      data: {
        trackingId,
        path,
        stepOrder: visitCount + 1,
        referrer: "Doğrudan/Bilinmiyor",
      }
    });

    await prisma.pageAnalytic.upsert({
      where: { path },
      update: {
        total: { increment: 1 },
        daily: { increment: 1 },
        weekly: { increment: 1 },
        monthly: { increment: 1 },
        yearly: { increment: 1 },
      },
      create: {
        path,
        total: 1,
        daily: 1,
        weekly: 1,
        monthly: 1,
        yearly: 1,
      }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Sunucu hatası" }, { status: 500 });
  }
}