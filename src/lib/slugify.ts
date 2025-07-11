export const slugify = (string: string) => {
  if (!string) return '';
  return string
    .toString()
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\_/g, '-')
    .replace(/\-\-+/g, '-')
    .replace(/\-$/g, '');
};

export const unslugify = (slug: string, capitalize?: 'first' | 'all') => {
  let string = slug.replace(/-/g, ' ');
  if (capitalize === 'all') {
    string = string
      .replace(/-/g, '-')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  } else if (capitalize === 'first') {
    string = string.replace(/^./, (char) => char.toUpperCase());
  }
  return string;
};
