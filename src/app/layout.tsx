import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'استودیو معماری نو | استودیو طراحی و معماری معاصر',
  description: 'وب‌سایت اختصاصی استودیو معماری نو؛ طراحی فضاهایی معاصر، مینیمال و شاعرانه برای زندگی، نور و سکوت با رویکرد ادیتوریال و سینمایی.',
  openGraph: {
    title: 'استودیو معماری نو | استودیو طراحی و معماری معاصر',
    description: 'وب‌سایت اختصاصی استودیو معماری نو؛ طراحی فضاهایی معاصر، مینیمال و شاعرانه برای زندگی، نور و سکوت با رویکرد ادیتوریال و سینمایی.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preload" href="/fonts/Morabba-Light-FD.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/IRANYekanX-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#F5F4F0] text-[#111111] antialiased selection:bg-[#111111] selection:text-[#F5F4F0]">
        {children}
      </body>
    </html>
  );
}
