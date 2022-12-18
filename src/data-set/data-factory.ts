import * as fs from 'fs';
import randomPick from '../utils/array/random-pick';
import addDate from '../utils/date/add-date';
import getRandomInteger from '../utils/math/get-random-integer';
import { getRandomChineseName } from '../utils/string/get-random-chinese-name';
import getRandomTaiwanAddress from '../utils/string/get-random-taiwan-address';
import getRandomTaiwanId from '../utils/string/get-random-taiwan-id';

const rooms = [
    '04A-01-01', '04A-01-02', '04A-01-03',
    '04A-02-01', '04A-02-02', '04A-02-03',
    '04A-03-01', '04A-03-02', '04A-03-03',
    '05A-01-01', '05A-01-02', '05A-01-03',
    '05A-02-01', '05A-02-02', '05A-02-03',
    '05A-03-01', '05A-03-02', '05A-03-03'
];

const bedHistoryFactory = (start: Date): BedHistory[] => {
    const bedHistories: BedHistory[] = [];
    const transferTimes = Math.round(Math.random())
        ? 1
        : getRandomInteger(1, 3);

    for (let i = 0; i < transferTimes; i += 1) {
        const nextDate = addDate(start, 86400000 * getRandomInteger(3, 14));
        const bedCode = randomPick(rooms);
        bedHistories.push({
            bedCode,
            transferInDate: start,
            transferOutDate: nextDate
        });
        start = nextDate;
    }

    return bedHistories;
};

let infectRate = 0;

const patientFactory = (start: Date): PatientObject => {
    infectRate += Math.abs(Math.random() * 0.2 - 0.12);
    if (infectRate > 1) infectRate = 1;

    return {
        id: getRandomTaiwanId(),
        name: getRandomChineseName(),
        address: getRandomTaiwanAddress(),
        infectStatus: Math.random() * infectRate > 0.95 ? true : false,
        bedHistory: bedHistoryFactory(start),
        transferringFrom: null,
        transferringTo: null,
        transferringProgress: 0
    };
};

const dataFactory = () => {
    let start = new Date('2021/01/01 00:00:00');
    const end = new Date('2022/12/31 00:00:00');

    const roomsData = JSON.stringify(rooms);
    fs.writeFileSync('src/data-set/json-data/rooms.json', roomsData, 'utf-8');

    const patients: {
        [key: string]: PatientObject[]
    } = {};

    while (start < end) {
        const amount = Math.random() > 0.8 ? getRandomInteger(1, 3) : 0;
        const dailyPatients: PatientObject[] = [];
        for (let i = 0; i < amount; i++) {
            dailyPatients.push(patientFactory(start));
        }
        patients[start.toString()] = dailyPatients;
        start = new Date(Date.parse(start.toString()) + 3600000);
    }

    const patientsData = JSON.stringify(patients);
    fs.writeFileSync('src/data-set/json-data/patients.json', patientsData, 'utf-8');
};

(dataFactory)();

export {};