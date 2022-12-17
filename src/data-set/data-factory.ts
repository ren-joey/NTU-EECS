import * as fs from 'fs';

const rooms = [
    '05A-01-01', '05A-01-02', '05A-01-03', '05A-01-04',
    '05A-02-01', '05A-02-02', '05A-02-03', '05A-02-04',
    '05A-03-01', '05A-03-02', '05A-03-03', '05A-03-04',
    '05A-04-01', '05A-04-02', '05A-04-03', '05A-04-04'
];

const randomPick = <T>(arr: T[]): T => {
    return arr[getRandomInteger(0, arr.length - 1)];
};

const getRandomInteger = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

const addDate = (date: Date, num: number): Date => {
    return new Date(
        Date.parse(date.toString()) + num
    );
};

const bedHistoryFactory = (start: Date): BedHistory[] => {
    const bedHistories: BedHistory[] = [];
    const transferTimes = Math.round(Math.random())
        ? 1
        : getRandomInteger(1, 3);

    for (let i = 0; i < transferTimes; i += 1) {
        const nextDate = addDate(start, 86400000 * getRandomInteger(1, 14));
        bedHistories.push({
            transferInDate: start,
            transferOutDate: nextDate,
            bedCode: randomPick(rooms)
        });
        start = nextDate;
    }

    return bedHistories;
};

const patientFactory = (start: Date): PatientObject => {
    return {
        bedHistory: bedHistoryFactory(start),
        name: '',
        id: '',
        transferringFrom: null,
        transferringTo: null,
        trnasferringProgress: 0
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
        const amount = Math.floor(Math.random() * 10);
        const dailyPatients: PatientObject[] = new Array(amount).fill(patientFactory(start));
        patients[start.toString()] = dailyPatients;
        start = new Date(Date.parse(start.toString()) + 3600000);
    }

    const patientsData = JSON.stringify(patients);
    fs.writeFileSync('src/data-set/json-data/patients.json', patientsData, 'utf-8');
};

(dataFactory)();

export {};