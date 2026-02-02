'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { useState, useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const switchLanguage = (newLocale: string) => {
    startTransition(() => {
      // Get the current path without the locale prefix
      const segments = pathname.split('/').filter(Boolean);
      const currentLocale = segments[0];
      
      // Remove locale from segments if it exists
      let pathSegments = segments;
      if (currentLocale === 'ar' || currentLocale === 'en') {
        pathSegments = segments.slice(1);
      }
      
      // Build new path with new locale
      const pathWithoutLocale = pathSegments.length > 0 ? `/${pathSegments.join('/')}` : '';
      const newPath = `/${newLocale}${pathWithoutLocale}`;
      
      router.push(newPath);
      router.refresh();
      setIsOpen(false);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        disabled={isPending}
      >
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium uppercase">{locale}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[120px] z-50">
            <button
              onClick={() => switchLanguage('ar')}
              className={`w-full px-4 py-2 text-right hover:bg-gray-50 transition-colors ${
                locale === 'ar' ? 'bg-gray-100 font-semibold' : ''
              }`}
            >
              العربية
            </button>
            <button
              onClick={() => switchLanguage('en')}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                locale === 'en' ? 'bg-gray-100 font-semibold' : ''
              }`}
            >
              English
            </button>
          </div>
        </>
      )}
    </div>
  );
}
