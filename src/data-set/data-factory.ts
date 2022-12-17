<<<<<<< HEAD
#!/usr/bin/env ts-node

import getRandomTaiwanAddress from '../utils/string/get-random-taiwan-address';
import { getRandomFamilyName, getRandomGivenName } from '../utils/string/get-random-chinese-name';
import getRandomTaiwanId from '../utils/string/get-random-taiwan-id';
import { PatientInfo } from './data-schema';

const factory = () => {
    const patientInfoArr: PatientInfo[] = [];
    const currentDateNumber = Date.parse(new Date().toString());

    for (let i = 0; i < 10; i++) {
        patientInfoArr.push({
            AcountID: getRandomTaiwanId(),
            FamilyName: getRandomFamilyName(),
            GivenName: getRandomGivenName(),
            Sex: Math.random() > 0.5 ? 'M' : 'F',
            Birthday: new Date(currentDateNumber - 500000000),
            ChartNo: '0000001',
            ContactAddress: getRandomTaiwanAddress(),
            DeadDate: null,
            RegisterAddress: getRandomTaiwanAddress()
        });
    }

    console.log(patientInfoArr);
};

(factory)();
=======
import * as fs from 'fs';

// const patientFactory = (): PatientObject => {
//     return {
//         bedHistory: [],
//         name: getRandom
//     }
// };

const dataFactory = () => {
    let start = new Date('2021/01/01 00:00:00');
    const end = new Date('2022/12/31 00:00:00');

    const rooms = [
        '05A-01-01', '05A-01-02', '05A-01-03', '05A-01-04',
        '05A-02-01', '05A-02-02', '05A-02-03', '05A-02-04',
        '05A-03-01', '05A-03-02', '05A-03-03', '05A-03-04',
        '05A-04-01', '05A-04-02', '05A-04-03', '05A-04-04'
    ];
    const roomsData = JSON.stringify(rooms);
    fs.writeFileSync('src/data-set/json-data/rooms.json', roomsData, 'utf-8');

    const patients: PatientObject[] = [];

    while (start < end) {
        start = new Date(Date.parse(start.toString()) + 3600000);
        const daylyPatients = Math.floor(Math.random() * 1000);
    }
};

(dataFactory)();
>>>>>>> 25a5939fd277e06ce6bdd6bf253deca9c05b27fc

export {};