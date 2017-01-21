let USER_LOCALE = null;

export function currency(number) {
  const locale = USER_LOCALE || getUserLocale();
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(number);
}

function getUserLocale() {
  if (!USER_LOCALE) {
    USER_LOCALE = navigator.language
  } 
  return USER_LOCALE;
}

