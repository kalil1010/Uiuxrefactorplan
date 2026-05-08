/**
 * Format a timestamp as a relative time string (e.g., "2 hours ago")
 * @param timestamp - Unix timestamp in milliseconds
 * @param locale - Locale string (e.g., "en", "ar")
 * @returns Formatted relative time string
 */
export function formatRelativeTime(timestamp: number, locale: string): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const diffInMs = timestamp - Date.now();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (Math.abs(diffInMinutes) < 60) {
    return rtf.format(diffInMinutes, 'minute');
  } else if (Math.abs(diffInHours) < 24) {
    return rtf.format(diffInHours, 'hour');
  } else {
    return rtf.format(diffInDays, 'day');
  }
}
