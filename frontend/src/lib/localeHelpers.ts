/**
 * Helper functions for locale-based text selection
 */

/**
 * Get localized text with fallback to Arabic if English is empty
 * @param arabicText - Arabic text (always available)
 * @param englishText - English text (optional)
 * @param locale - Current locale ('ar' or 'en')
 * @returns The appropriate text based on locale with fallback
 */
export function getLocalizedText(
  arabicText: string,
  englishText: string | null | undefined,
  locale: string
): string {
  if (locale === 'en' && englishText && englishText.trim() !== '') {
    return englishText;
  }
  return arabicText;
}

/**
 * Get localized name from an object with name and name_en properties
 */
export function getLocalizedName(
  item: { name: string; name_en?: string | null },
  locale: string
): string {
  return getLocalizedText(item.name, item.name_en, locale);
}

/**
 * Get localized description from an object with description and description_en properties
 */
export function getLocalizedDescription(
  item: { description?: string | null; description_en?: string | null },
  locale: string
): string {
  return getLocalizedText(item.description || '', item.description_en, locale);
}

/**
 * Get localized city name from delivery city object
 */
export function getLocalizedCityName(
  city: { city_name: string; city_name_en?: string | null },
  locale: string
): string {
  return getLocalizedText(city.city_name, city.city_name_en, locale);
}
