import patients from 'src/data-set/json-data/patients.json';
import addDate from 'src/utils/date/add-date';
import { exit } from '../renderers/leaving-patients-renderer';
import { entrance } from '../renderers/new-patients-renderer';
import getDefaultRoomMap from './get-default-room-map';

const patientObjectDistributer = (
    now: Date,
    rooms: string[],
    roomObjects: RoomObject[],
    getRoomByBedCode: (key: string) => RoomObject
): {
    roomObjects: RoomObject[],
    transferPatients: TransferRecord[],
    newPatients: TransferRecord[],
    leavingPatients: TransferRecord[]
} => {
    const roomMap = getDefaultRoomMap(rooms);
    const newPatients = patients[now.toString()];
    const newPatientsWithRecord: TransferRecord[] = [];
    const leavingPatients: TransferRecord[] = [];
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
                } else {
                    leavingPatients.push({
                        patient: transferPatient,
                        fromBed: roomObject,
                        toBed: exit,
                        start: prevBed.transferOutDate,
                        end: addDate(prevBed.transferOutDate, 1000 * 60 * 60)
                    });
                }
            }
        }
    }

    if (newPatients && newPatients.length > 0) {
        for (let i = 0; i < newPatients.length; i++) {
            const patient = newPatients[i];
            const bedCode = patient.bedHistory[0].bedCode;
            const toBed = getRoomByBedCode(bedCode);
            const inDate = patient.bedHistory[0].transferInDate;
            roomMap[bedCode].push(patient);
            newPatientsWithRecord.push({
                patient: patient,
                fromBed: entrance,
                toBed,
                start: inDate,
                end: addDate(inDate, 1000 * 60 * 60)
            });
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
        newPatients: newPatientsWithRecord,
        leavingPatients
    };
};

export default patientObjectDistributer;
export {
    patientObjectDistributer
};