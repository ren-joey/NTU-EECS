import * as p5Types from 'p5';

const transferPatientsRenderer = (
    p5: p5Types,
    transferPatientsWithRecord: TransferRecordWithPosition[]
) => {
    for (let i = 0; i < transferPatientsWithRecord.length; i++) {
        const transferPatientWithRecord = transferPatientsWithRecord[i];
        const {
            currentPosition,
            patient
        } = transferPatientWithRecord;
        patient.infectStatus ? p5.fill('#f00') : p5.fill('#00000055');
        p5.strokeWeight(0);
        p5.ellipse(
            currentPosition.x,
            currentPosition.y,
            10,
            10
        );

        if (patient.infectStatus) {
            p5.fill('#f00');
            p5.textStyle('bold');
            p5.textSize(14);
            p5.text(
                `${patient.id}
${patient.name}`,
                currentPosition.x,
                currentPosition.y
            );
        }
    }
};

export default transferPatientsRenderer;
export {
    transferPatientsRenderer
};