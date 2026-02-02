import { getRequestConfig } from 'next-intl/server';

export const locales = ['ar', 'en'] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  
  // Ensure we have a valid locale
  if (!locale || !locales.includes(locale as any)) {
    locale = 'ar';
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
