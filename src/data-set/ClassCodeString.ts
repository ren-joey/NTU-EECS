/**
 * I:住院 O:門診 E:急診
 */
export const BedClassCodeStrArr = [
    'I', 'O', 'E'
];

export type ClassCodeString = typeof BedClassCodeStrArr[number];