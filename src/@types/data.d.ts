interface RoomObject {
    x: number;
    y: number;
    name: string;
    occupy: string[];
}

interface PatientObject {
    name: string;
    bedHistory: BedHistory;
    transferringFrom: null | string;
    transferringTo: null | string;
    trnasferringProgress: number;
}

interface BedHistory {
    TransferInDate: Date;
    TransferOutDate: Date;
}