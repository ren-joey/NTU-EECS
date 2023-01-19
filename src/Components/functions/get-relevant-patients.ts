import addDate from 'src/utils/date/add-date';
import patientData from 'src/data-set/json-data/patients.json';
import { cloneDeep } from 'lodash';

const getRelevantPatients = (histories: BedHistory[], id: string): PatientObject[] => {
    const start = histories[0].transferInDate;
    let current = start;
    const end = histories[histories.length - 1].transferOutDate;
    const step = 3600000;
    const bedCodes = histories.map((record) => record.bedCode);
    let matchedPatients: PatientObject[] = [];
    const finalMatchedPatients: PatientObject[] = [];

    while (current <= end) {
        const patients = patientData[current.toString()];
        if (patients !== undefined) matchedPatients = matchedPatients.concat(patients);
        current = addDate(current, step);
    }

    for (let i = 0; i < matchedPatients.length; i++) {
        const matchedPatient = matchedPatients[i];
        if (matchedPatient.id === id) continue;

        const insideBedHistory: BedHistory[] = [];
        const { bedHistoryBackup: bedHistories } = matchedPatient;

        if (bedHistories !== undefined) {
            for (let i = 0; i < bedHistories.length; i++) {
                const history = bedHistories[i];
                history.transferInDate = new Date(history.transferInDate);
                history.transferOutDate = new Date(history.transferOutDate);

                if (bedCodes.indexOf(history.bedCode) > -1) {
                    for (let j = 0; j < histories.length; j++) {
                        const targetHistory = histories[j];
                        if (targetHistory.bedCode === history.bedCode
                            && (
                                (history.transferInDate >= targetHistory.transferInDate
                                    && history.transferInDate <= targetHistory.transferOutDate
                                )
                                || (history.transferOutDate >= targetHistory.transferInDate
                                    && history.transferOutDate <= targetHistory.transferOutDate
                                )
                            )
                        ) {
                            insideBedHistory.push(cloneDeep(history));
                        }
                    }
                }
            }
        }

        if (insideBedHistory.length > 0) {
            const newPatient = cloneDeep(matchedPatient);
            newPatient.bedHistoryBackup = insideBedHistory;
            finalMatchedPatients.push(newPatient);
        }
    }

    return finalMatchedPatients;
};

export default getRelevantPatients;
export {
    getRelevantPatients
};