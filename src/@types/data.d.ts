interface RoomObject {
    x: number;
    y: number;
    name: string;
    occupy: PatientObject[];
    infectedAmount?: number;
}

interface TransferRecord {
    patient: PatientObject;
    fromBed: RoomObject;
    toBed: RoomObject;
    start: Date;
    end: Date;
}

interface TransferRecordWithPosition extends TransferRecord {
    currentPosition: {
        xStep: number;
        yStep: number;
        x: number;
        y: number;
        updateTimes: number;
        maxTimes: number;
    }
}

interface PatientObject {
    id: string;
    name: string;
    address: string;
    bedHistory: BedHistory[];
    infectStatus: boolean;
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