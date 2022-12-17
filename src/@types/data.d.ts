interface RoomObject {
    x: number;
    y: number;
    name: string;
    occupy: string[];
}

interface PatientObject {
    name: string;
    id: string;
    bedHistory: BedHistory[];
    transferringFrom: null | string;
    transferringTo: null | string;
    transferringProgress: number;
}

interface BedHistory {
    bedCode: string;
    transferInDate: Date;
    transferOutDate: Date;
}

declare module 'src/data-set/json-data/patients.json' {
    const value: {
        [key: string]: PatientObject[]
    };
    export default value;
}

declare module 'src/data-set/json-data/rooms.json' {
    const value: string[];
    export default value;
}