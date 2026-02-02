import type { Metadata } from "next";
import { Cairo, Tajawal, Amiri } from "next/font/google";
import "../globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "متجر إلكتروني - تسوق بثقة وسهولة",
  description: "متجرك الإلكتروني الموثوق للتسوق الآمن والسريع",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <head>
        <link rel="icon" href="http://104.234.26.192:3000/uploads/companies/company-1769093110255-195980110.png" type="image/png" />
        <link rel="shortcut icon" href="http://104.234.26.192:3000/uploads/companies/company-1769093110255-195980110.png" type="image/png" />
        <link rel="apple-touch-icon" href="http://104.234.26.192:3000/uploads/companies/company-1769093110255-195980110.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="http://104.234.26.192:3000/uploads/companies/company-1769093110255-195980110.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="http://104.234.26.192:3000/uploads/companies/company-1769093110255-195980110.png" />
      </head>
      <body
        className={`${cairo.variable} ${tajawal.variable} ${amiri.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
