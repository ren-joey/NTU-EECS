import p5Types from 'p5';
import getTimelinePoints from '../functions/get-timeline-points';
import pointsToLinesRenderer from './points-to-lines-renderer';

const timelineRenderer = (
    p5: p5Types,
    bedHistories: BedHistory[],
    gridMap: GridMap
) => {
    const points = getTimelinePoints(bedHistories, gridMap);
    pointsToLinesRenderer(p5, points);
};

export default timelineRenderer;
export {
    timelineRenderer
};