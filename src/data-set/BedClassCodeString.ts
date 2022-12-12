import { IsolateReasonCodeStrArr } from './IsolateReasonCodeString';

/**
 * 
 * BedClassCode	BedClassChinName	IsolateFlag	DayStayFlag	ICUFlag	BedAlias
 * 1	西址三人房	N	N	N	健保床
 * 2	3、4人健保床	N	N	N	健保床
 * 3	西址四人房	N	N	N	健保床
 * 4	西址四人房,精神病床	N	N	N	健保床
 * 5	五人經濟床	N	N	N	健保床
 * 6	西址六人房,精神病床	N	N	N	健保床
 * 7	經濟病床	N	N	N	健保床
 * 8	東西址健保床	N	N	N	健保床
 * 9	2人健保床	N	N	N	健保床
 * 10	頭等二不收差額健保床	N	N	N	健保床
 * 11	嬰兒室	N	N	N	健保床
 * 12	自費托嬰床	N	N	N	單人差額病床
 * 13	病嬰逾期留院觀察	N	N	N	單人差額病床
 * 14	新生兒中重度	N	N	N	健保床
 * 15	嬰兒中重度	N	N	N	健保床
 * 20	精神特乙一	N	N	N	差額病床
 * 21	精神成人日間留院	N	Y	N	健保床
 * 22	精神兒童日間留院	N	Y	N	健保床
 * 23	精神健保床	N	N	N	健保床
 * 24	精神四人房	N	N	N	健保床
 * 25	精神五人房	N	N	N	健保床
 * 26	精神經濟床	N	N	N	健保床
 * 31	骨髓移植	N	N	N	健保床
 * 32	呼吸照護中心	N	N	N	健保床
 * 51	燒傷加護	N	N	Y	健保床
 * 52	燒傷病房	N	N	N	健保床
 * 61	頭等二	N	N	N	雙人差額病床
 * 62	頭等一	N	N	N	雙人差額病床
 * 63	特乙二	N	N	N	單人差額病床
 * 64	特乙一	N	N	N	單人差額病床
 * 65	特甲二	N	N	N	單人差額病床
 * 66	特甲一	N	N	N	單人差額病床
 * 67	產特甲二	N	N	N	單人差額病床
 * 68	產特甲一	N	N	N	單人差額病床
 * 6A	產特乙一	N	N	N	單人差額病床
 * 6B	產頭等一	N	N	N	雙人差額病床
 * 6C	待產特甲二	N	N	N	單人差額病床
 * 6F	特甲三	N	N	N	單人差額病床
 * 6G	特甲A	N	N	N	單人差額病床
 * 6H	景福一	N	N	N	單人差額病床
 * 6I	景福二	N	N	N	單人差額病床
 * 71	加護病床	N	N	Y	健保床
 * 72	新生兒ICU	N	N	Y	健保床
 * 73	嬰兒ICU	N	N	Y	健保床
 * 81	普通隔離	N	N	N	一般隔離
 * 82	正壓隔離	Y	N	N	正壓隔離
 * 83	負壓隔離	Y	N	N	負壓隔離
 * 84	碘131(隔離病床)	Y	N	N	健保床
 * 85	負壓隔離加護病床	Y	N	Y	負壓隔離
 * 86	核醫病床	Y	N	N	健保床
 * 88	一般隔離新生兒ICU	Y	N	Y	一般隔離
 * 89	負壓隔離新生兒ICU	Y	N	Y	健保床
 * 8A	一般隔離新生兒中重度	Y	N	N	健保床
 * 8D	負壓隔離呼吸照護中心	Y	N	N	健保床
 * 8E	雙人房當隔離床	N	N	N	健保床
 * 8F	單人健保床	N	N	N	健保床
 * 8G	心血管單人健保床	N	N	N	健保床
 * 8H	產單人健保床	N	N	N	健保床
 * 8I	單人檢疫病床	Y	N	N	單人檢疫病床
 * 8J	單人檢疫病床一	Y	N	N	單人檢疫病床
 * 99	VIP	N	N	N	單人差額病床
 */
export const BedClassCodeStrArr = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '31',
    '32',
    '51',
    '52',
    '61',
    '62',
    '63',
    '64',
    '65',
    '66',
    '67',
    '68',
    '6A',
    '6B',
    '6C',
    '6F',
    '6G',
    '6H',
    '6I',
    '71',
    '72',
    '73',
    '81',
    '82',
    '83',
    '84',
    '85',
    '86',
    '88',
    '89',
    '8A',
    '8D',
    '8E',
    '8F',
    '8G',
    '8H',
    '8I',
    '8J',
    '99'
];

export type BedClassCodeString = typeof IsolateReasonCodeStrArr[number];