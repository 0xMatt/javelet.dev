import { getRelativeDate, truncateText } from '@/lib/utils';

describe('utilities', () => {
  it('can truncate text', () => {
    expect(truncateText('This will get cutoff', 9)).toBe('This will…');
    expect(truncateText('This will stay', 25)).toBe('This will stay');
  });
  it('can get a relative date', () => {
    expect(getRelativeDate(new Date())).toBe('0 seconds ago');
  });
});
