const getTimelinePointsForRelevant = (
    bedHistories: BedHistory[],
    gridMap: GridMap,
    gridPoints: GridPoints,
    xAxis: AxisInfo,
    yTranslate: number
): Point[] => {
    const points: Point[] = [];
    for (let i = 0; i < bedHistories.length; i++) {
        const bedHistory = bedHistories[i];
        const {
            transferInDate: inDate,
            transferOutDate: outDate,
            bedCode
        } = bedHistory;
        let inX = 0;
        let outX = 0;

        for (let i = 0; i < xAxis.labels.length - 1; i++) {
            const label = xAxis.labels[i];
            const nextLabel = xAxis.labels[i + 1];
            const labelDate = new Date(label.name + ' 00:00:00');
            const nextLabelDate = new Date(nextLabel.name + ' 00:00:00');

            if (inDate >= labelDate && inDate <= nextLabelDate && inX === 0) {
                const percent = (Number(inDate) - Number(labelDate))
                                    / (Number(nextLabelDate) - Number(labelDate));
                inX = label.x + ((nextLabel.x - label.x) * percent);
            }

            if (outDate >= labelDate && outDate <= nextLabelDate && outX === 0) {
                const percent = (Number(outDate) - Number(labelDate))
                                    / (Number(nextLabelDate) - Number(labelDate));
                outX = label.x + ((nextLabel.x - label.x) * percent);
            }
        }

        if (i === 0) {
            if (inX !== 0) {
                points.push({
                    x: gridMap['left']['top'].x,
                    y: gridMap['left']['top'].y + yTranslate
                });
                points.push({
                    x: inX,
                    y: gridMap['left']['top'].y + yTranslate
                });
            } else {
                points.push({
                    x: gridMap['left'][bedCode].x,
                    y: gridMap['left'][bedCode].y + yTranslate
                });
            }
        }

        if (inX !== 0) {
            points.push({
                x: inX,
                y: gridMap['left'][bedCode].y + yTranslate
            });
        }

        if (outX !== 0) {
            points.push({
                x: outX,
                y: gridMap['left'][bedCode].y + yTranslate
            });
        }

        if (i === bedHistories.length - 1) {
            if (outX !== 0) {
                points.push({
                    x: outX,
                    y: gridMap['right']['top'].y + yTranslate
                });
                points.push({
                    x: gridMap['right']['top'].x,
                    y: gridMap['right']['top'].y + yTranslate
                });
            } else {
                points.push({
                    x: gridMap['right']['top'].x,
                    y: points[points.length - 1].y
                });
            }
        }
    }

    return points;
};

export default getTimelinePointsForRelevant;
export {
    getTimelinePointsForRelevant
};