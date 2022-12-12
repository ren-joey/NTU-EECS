/**
 * BedClassCode	IsolateReasonCode	IsolateReasonChinName
 * 83	1	本院Sputum AFS(+)
 * 83	2	外院Sputum AFS(+)
 * 83	3	本院Sputum AFS(-)、culture: TB
 * 83	4	水痘、瀰漫性帶狀皰疹
 * 83	5	多重抗藥性
 * 83	6	外院Sputum AFS(-)、culture: TB
 * 83	7	疑似/確定結核病
 * 83	9	其他
 * 81	1	接觸隔離(如多重抗藥性細菌)
 * 81	2	飛沫隔離
 * 81	3	其他
 * 8E	1	接觸隔離(多重抗藥性細菌NDM-1)
 * 8E	2	接觸隔離(多重抗藥性細菌KPC)
 * 8E	3	接觸隔離(多重抗藥性細菌VRE)
 * 8E	4	接觸隔離(多重抗藥性細菌toxigenic-C. difficile)
 * 83	8	法定傳染病且非自願入住
 * 85	8	法定傳染病且非自願入住
 * 89	8	法定傳染病且非自願入住
 * 8J	1	本院Sputum AFS(+)
 * 8J	2	外院Sputum AFS(+)
 * 8J	3	本院Sputum AFS(-)、culture: TB
 * 8J	4	水痘、瀰漫性帶狀皰疹
 * 8J	5	多重抗藥性
 * 8J	6	外院Sputum AFS(-)、culture: TB
 * 8J	7	疑似/確定結核病
 * 8J	8	法定傳染病且非自願入住
 * 8J	9	其他
 * 8J	A	疑似/確診COVID-19
 * 85	9	其他
 * 85	7	疑似/確定結核病
 * 85	6	外院Sputum AFS(-)、culture: TB
 * 85	5	多重抗藥性
 * 85	4	水痘、瀰漫性帶狀皰疹
 * 89	9	其他
 * 89	7	疑似/確定結核病
 * 89	6	外院Sputum AFS(-)、culture: TB
 * 89	5	多重抗藥性
 * 89	4	水痘、瀰漫性帶狀皰疹
 * 87	3	其他
 * 87	2	飛沫隔離
 * 87	1	接觸隔離(如多重抗藥性細菌)
 * 88	3	其他
 * 88	2	飛沫隔離
 * 88	1	接觸隔離(如多重抗藥性細菌)
 * 8B	3	其他
 * 8B	2	飛沫隔離
 * 8B	1	接觸隔離(如多重抗藥性細菌)
 * 8C	3	其他
 * 8C	2	飛沫隔離
 * 8C	1	接觸隔離(如多重抗藥性細菌)
 * 8A	3	其他
 * 8A	2	飛沫隔離
 * 8A	1	接觸隔離(如多重抗藥性細菌)
 * 83	A	疑似/確診COVID-19
 * 81	4	飛沫傳染病(如百日咳、白喉、流行性腦脊髓膜炎等)
 * 81	5	接觸傳染病(如腸病毒、多重抗藥性細菌等)
 * 81	6	皮膚傳染病(如疥瘡、單純皰疹等)
 * 81	7	蟲媒傳染病(如登革熱、茲卡病毒感染症等)
 * 81	8	腸胃道傳染病(如傷寒、副傷寒等)
 * 85	A	疑似/確診COVID-19
 * 8I	3	本院Sputum AFS(-)、culture: TB
 * 8I	4	水痘、瀰漫性帶狀皰疹
 * 8I	1	本院Sputum AFS(+)
 * 8I	2	外院Sputum AFS(+)
 * 8I	5	多重抗藥性
 * 8I	6	外院Sputum AFS(-)、culture: TB
 * 8I	7	疑似/確定結核病
 * 8I	8	法定傳染病且非自願入住
 * 8I	9	其他
 * 8I	A	疑似/確診COVID-19
 */
export const IsolateReasonCodeStrArr = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A'
] as const;

export type IsolateReasonCodeString = typeof IsolateReasonCodeStrArr[number];