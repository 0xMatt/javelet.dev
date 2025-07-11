import { slugify, unslugify } from '@/lib/slugify';

describe('slugify', () => {
  it('slugifies a string', () => {
    expect(slugify('Slug If Ied')).toBe('slug-if-ied');
  });
  it('unslugifies a string capitalizing nothing', () => {
    expect(unslugify('slug-if-ied')).toBe('slug if ied');
  });
  it('unslugifies a string capitalizing first letter', () => {
    expect(unslugify('slug-if-ied', 'first')).toBe('Slug if ied');
  });
  it('unslugifies a string capitalizing all letters', () => {
    expect(unslugify('slug-if-ied', 'all')).toBe('Slug If Ied');
  });
});
