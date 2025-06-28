export interface ReadingTime {
  minutes: number;
  text: string;
  words: number;
}

export function getReadingTime(text: string): ReadingTime {
  const cleanText = text.replace(/<[^>]*>?/g, '').replace(/[^a-zA-Z\s]/g, '');

  const words = cleanText.split(/\s+/).filter((word) => word.length > 0);
  const wordCount = words.length;

  const WORDS_PER_MINUTE = 238;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);

  const readingTimeText = minutes === 1 ? '1 minute read' : `${minutes} minutes read`;

  return {
    minutes,
    text: readingTimeText,
    words: wordCount,
  };
}
