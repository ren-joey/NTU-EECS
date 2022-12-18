import * as p5Types from 'p5';
import getCanvasSize from '../functions/get-canvas-size';
import roomRenderer from './room-renderer';

const entrance: RoomObject = {
    name: 'Entrance',
    occupy: [],
    x: 10,
    y: getCanvasSize() / 2 - 25
};

const newPatientsRenderer = (
    p5: p5Types,
    patientsWithRecord: TransferRecordWithPosition[]
) => {
    roomRenderer(p5, entrance);

    for (let i = 0; i < patientsWithRecord.length; i++) {
        const transferPatientWithRecord = patientsWithRecord[i];
        const {
            currentPosition,
            patient
        } = transferPatientWithRecord;
        patient.infectStatus ? p5.fill('#f00') : p5.fill('#00000022');
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

export default newPatientsRenderer;
export {
    newPatientsRenderer,
    entrance
};