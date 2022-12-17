export const SexStrArr = ['M', 'F'] as const;

export type SexString = typeof SexStrArr[number];