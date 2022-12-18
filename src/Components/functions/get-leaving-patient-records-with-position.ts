import { exit } from '../renderers/leaving-patients-renderer';

const getLeavingPatientRecordsWithPosition = (
    transferRecords: (TransferRecord|TransferRecordWithPosition)[]
): TransferRecordWithPosition[] => {
    const transferRecordsWithPosition: TransferRecordWithPosition[] = [];

    for (let i = transferRecords.length - 1; i >= 0; i -= 1) {
        const transferRecord = transferRecords[i];

        if ('currentPosition' in transferRecord) {
            // const periodTime = Number(transferRecord.end) - Number(transferRecord.start);
            // const progress = (Number(now) - Number(transferRecord.start)) / periodTime;
            const {
                xStep,
                yStep,
                x,
                y,
                updateTimes,
                maxTimes
            } = transferRecord.currentPosition;

            if ( updateTimes < maxTimes ) {
                transferRecordsWithPosition.push({
                    ...transferRecord,
                    currentPosition: {
                        xStep,
                        yStep,
                        x: x + xStep,
                        y: y + yStep,
                        updateTimes: updateTimes + 1,
                        maxTimes
                    }
                });
            }
        } else {
            const periodX = exit.x - transferRecord.fromBed.x;
            const periodY = exit.y - transferRecord.fromBed.y;
            const maxTimes = 50;

            transferRecordsWithPosition.push({
                ...transferRecord,
                currentPosition: {
                    xStep: periodX / maxTimes,
                    yStep: periodY / maxTimes,
                    x: transferRecord.fromBed.x,
                    y: transferRecord.fromBed.y,
                    updateTimes: 0,
                    maxTimes
                }
            });
        }
    }

    return transferRecordsWithPosition;
};

export default getLeavingPatientRecordsWithPosition;
export {
    getLeavingPatientRecordsWithPosition
};