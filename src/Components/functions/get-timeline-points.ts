const getTimelinePoints = (
    bedHistories: BedHistory[],
    gridMap: GridMap
    // gridPoints: GridPoints
): Point[] => {
    const points: Point[] = [];
    for (let i = 0; i < bedHistories.length; i++) {
        const bedHistory = bedHistories[i];
        const {
            transferInDate: inDate,
            transferOutDate: outDate,
            bedCode
        } = bedHistory;
        const inDateStr = inDate.toLocaleDateString();
        const outDateStr = outDate.toLocaleDateString();
        
        if (i === 0) {
            points.push(gridMap['left']['entrance/exit']);
            points.push(gridMap[inDateStr]['entrance/exit']);
        }

        points.push(gridMap[inDateStr][bedCode]);
        points.push(gridMap[outDateStr][bedCode]);

        if (i === bedHistories.length - 1) {
            points.push(
                gridMap[outDateStr]['entrance/exit']
            );
            points.push(gridMap['right']['entrance/exit']);
        }
    }

    return points;
};

export default getTimelinePoints;
export {
    getTimelinePoints
};