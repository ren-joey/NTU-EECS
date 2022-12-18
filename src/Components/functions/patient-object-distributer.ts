import patients from 'src/data-set/json-data/patients.json';
import getDefaultRoomMap from './get-default-room-map';

const patientObjectDistributer = (
    now: Date,
    rooms: string[],
    roomObjects: RoomObject[],
    getRoomByBedCode: (key: string) => RoomObject
): {
    roomObjects: RoomObject[],
    transferPatients: TransferRecord[],
    newPatients: PatientObject[],
    leavingPatients: PatientObject[]
} => {
    const roomMap = getDefaultRoomMap(rooms);
    const newPatients = patients[now.toString()];
    const leavingPatients: PatientObject[] = [];
    const transferPatients: TransferRecord[] = [];

    for (let i = 0; i < roomObjects.length; i += 1) {
        const roomObject = roomObjects[i];

        for (let i = roomObject.occupy.length - 1; i >= 0; i -= 1) {
            const patient = roomObject.occupy[i];

            while (
                patient.bedHistory.length > 0
                    && now > new Date(patient.bedHistory[0].transferOutDate)
            ) {
                const prevBed = patient.bedHistory.shift() as BedHistory;
                const transferPatient = roomObject.occupy.splice(i, 1)[0];

                if (patient.bedHistory.length > 0) {
                    transferPatients.push({
                        patient: transferPatient,
                        fromBed: roomObject,
                        toBed: getRoomByBedCode(
                            transferPatient.bedHistory[0].bedCode
                        ),
                        start: prevBed.transferOutDate,
                        end: transferPatient.bedHistory[0].transferInDate
                    });
                    newPatients.push(transferPatient);
                } else {
                    leavingPatients.push(transferPatient);
                }
            }
        }
    }

    if (newPatients && newPatients.length > 0) {
        for (let i = 0; i < newPatients.length; i++) {
            const patient = newPatients[i];
            roomMap[patient.bedHistory[0].bedCode].push(patient);
        }
    }

    for (let i = 0; i < roomObjects.length; i += 1) {
        const roomObject = roomObjects[i];
        roomObject.occupy = roomObject.occupy.concat(
            roomMap[roomObject.name]
        );
        roomObject.infectedAmount = roomObject.occupy.reduce(
            (total: number, patient) => {
                if (patient.infectStatus) return total + 1;
                return total;
            },
            0
        );
    }

    return {
        roomObjects,
        transferPatients,
        newPatients,
        leavingPatients
    };
};

export default patientObjectDistributer;
export {
    patientObjectDistributer
};