export function currencyFormatter(value: number, currency = 'USD', locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 4,
    }).format(value);
  }
  

  export function currencyFormatterReplace(value: number) {
    const parts = value.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${parts.join('.')}`;
  }