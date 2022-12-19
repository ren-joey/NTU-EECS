const getLabelsPosition = ({
    chatPosition,
    xLabels,
    yLabels
}: {
    chatPosition: ChatPosition;
    xLabels: string[];
    yLabels: string[];
}): ChatInfo => {
    const {
        x,
        y,
        width,
        height
    } = chatPosition;
    const xGap = width / (xLabels.length + 1);
    const yGap = height / (yLabels.length + 1);
    const xAxis: AxisInfo = {
        gap: xGap,
        labels: []
    };
    for (let i = 0; i < xLabels.length; i++) {
        const label = xLabels[i];
        xAxis.labels.push({
            name: label,
            x: x + (xGap * (i + 1)),
            y: y + height + 20
        });
    }

    const yAxis: AxisInfo = {
        gap: yGap,
        labels: []
    };
    for (let i = 0; i < yLabels.length; i++) {
        const label = yLabels[i];
        yAxis.labels.push({
            name: label,
            x: x - 80,
            y: y + (yGap * (i + 1))
        });
    }

    const gridMap: GridMap = {};
    const gridPoints: GridPoints = new Array(xLabels.length + 2).fill(
        new Array(yLabels.length + 2)
    );
    for (let xp = 0; xp < gridPoints.length; xp++) {
        const yPoints = gridPoints[xp];

        for (let yp = 0; yp < yPoints.length; yp++) {
            const point: GridPoint = {
                xLabel: '',
                yLabel: '',
                x: 0,
                y: 0
            };
            if (xp === 0) {
                point.xLabel = 'left';
                point.x = x;
            } else if (xp === gridPoints.length - 1) {
                point.xLabel = 'right';
                point.x = x + width;
            } else {
                const xLabel = xAxis.labels[xp - 1];
                point.xLabel = xLabel.name;
                point.x = xLabel.x;
            }

            if (yp === 0) {
                point.yLabel = 'bottom';
                point.y = y + height;
            } else if (yp === yPoints.length - 1) {
                point.yLabel = 'top';
                point.y = y;
            } else {
                const yLabel = yAxis.labels[yp - 1];
                point.yLabel = yLabel.name;
                point.y = yLabel.y;
            }

            if (gridMap[point.xLabel] === undefined) gridMap[point.xLabel] = {};
            gridMap[point.xLabel][point.yLabel] = point;
            yPoints[yp] = point;
        }
    }

    return {
        chatPosition,
        xAxis,
        yAxis,
        gridMap,
        gridPoints
    };
};

export default getLabelsPosition;
export {
    getLabelsPosition
};