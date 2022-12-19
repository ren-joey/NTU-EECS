import p5Types from 'p5';
import getTimelinePointsForRelevant from '../functions/get-timeline-points-for-relevant';
import pointsToLinesRenderer from './points-to-lines-renderer';
import textRenderer from './text-renderer';

const relevantPatientsTimelineRenderer = (
    p5: p5Types,
    relevantPatients: PatientObject[],
    gridMap: GridMap,
    gridPoints: GridPoints,
    xAxis: AxisInfo
) => {
    for (let i = 0; i < relevantPatients.length; i++) {
        const patient = relevantPatients[i];
        const yTranslate = i - Math.floor(relevantPatients.length / 2);
        const points = getTimelinePointsForRelevant(
            patient.bedHistoryBackup || patient.bedHistory,
            gridMap,
            gridPoints,
            xAxis,
            yTranslate
        );
        const lastPoint = points[points.length - 1];
        pointsToLinesRenderer(
            p5,
            points,
            patient.infectStatus ? 'red' : '#33333366',
            patient.infectStatus? 2 : 1
        );
        if (patient.infectStatus) {
            textRenderer(
                p5,
                [{ name: patient.name, x: lastPoint.x, y: lastPoint.y}]
            );
        }
    }
};

export default relevantPatientsTimelineRenderer;
export {
    relevantPatientsTimelineRenderer
};