import p5Types from 'p5';

const pointsToLinesRenderer = (
    p5: p5Types,
    points: Point[],
    color = 'green',
    weight = 3
) => {
    console.log(points);
    for (let i = 0; i < points.length - 1; i++) {
        const point = points[i];
        const nextPoint = points[i + 1];
        p5.stroke(color);
        p5.strokeWeight(weight);
        p5.line(
            point.x,
            point.y,
            nextPoint.x,
            nextPoint.y
        );
    }
};

export default pointsToLinesRenderer;
export {
    pointsToLinesRenderer
};