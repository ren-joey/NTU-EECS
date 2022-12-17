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

export {};