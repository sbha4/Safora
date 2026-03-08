import en from './en.json';
import si from './si.json';
import ta from './ta.json';

export type Language = 'en' | 'si' | 'ta';

export const LANGUAGES: { code: Language; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'si', label: 'Sinhala', nativeLabel: 'සිංහල' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
];

const translations: Record<Language, Record<string, string>> = { en, si, ta };

export function getStoredLanguage(): Language {
  const stored = localStorage.getItem('safora_lang');
  if (stored && (stored === 'en' || stored === 'si' || stored === 'ta')) return stored;
  return 'en';
}

export function setStoredLanguage(lang: Language) {
  localStorage.setItem('safora_lang', lang);
}

export function translate(key: string, lang: Language, params?: Record<string, string | number>): string {
  let text = translations[lang]?.[key] || translations.en[key] || key;
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, String(v));
    });
  }
  return text;
}

export default translations;
