export const FlagStrArr = ['Y', 'N'] as const;

export type FlagString = typeof FlagStrArr[number];