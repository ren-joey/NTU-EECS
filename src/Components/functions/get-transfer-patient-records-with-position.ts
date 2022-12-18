import getRandomInteger from 'src/utils/math/get-random-integer';

const getTransferPatientRecordsWithPosition = (
    transferRecords: (TransferRecord|TransferRecordWithPosition)[]
): TransferRecordWithPosition[] => {
    const transferRecordsWithPosition: TransferRecordWithPosition[] = [];

    for (let i = transferRecords.length - 1; i >= 0; i -= 1) {
        const transferRecord = transferRecords[i];

        if (transferRecord.fromBed.name === transferRecord.toBed.name) {
            continue;
        } else if ('currentPosition' in transferRecord) {
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
            const periodX = transferRecord.toBed.x - transferRecord.fromBed.x;
            const periodY = transferRecord.toBed.y - transferRecord.fromBed.y;
            const maxTimes = getRandomInteger(50, 150);

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

export default getTransferPatientRecordsWithPosition;
export {
    getTransferPatientRecordsWithPosition
};