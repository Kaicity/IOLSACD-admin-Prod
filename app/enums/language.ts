export enum Language {
  ENGLISH = 'ENGLISH',
  VIETNAMESE = 'VIETNAMESE',
  CHINESE = 'CHINESE',
}

export const LANGUAGE_LABEL: Record<Language, string> = {
  [Language.ENGLISH]: 'Tiếng Anh',
  [Language.VIETNAMESE]: 'Tiếng Việt',
  [Language.CHINESE]: 'Tiếng Trung',
};
