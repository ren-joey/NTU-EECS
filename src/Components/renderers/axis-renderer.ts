import p5Types from 'p5';

const axisRenderer = (
    p5: p5Types,
    chatPosition: ChatPosition,
    xAxis: AxisInfo,
    yAxis: AxisInfo
) => {
    const {
        width,
        height,
        x,
        y
    } = chatPosition;
    const { gap: xGap } = xAxis;
    const { gap: yGap } = yAxis;

    for (let i = 0; i < yAxis.labels.length; i++) {
        p5.stroke('rgba(0, 0, 0, 0.1)');
        p5.strokeWeight(1);
        p5.line(
            x,
            y + (yGap * (i + 1)),
            x + width,
            y + (yGap * (i + 1))
        );
    }

    for (let i = 0; i < yAxis.labels.length; i++) {
        p5.stroke('rgba(0, 0, 0, 0.1)');
        p5.strokeWeight(1);
        p5.line(
            x + (xGap * (i + 1)),
            y,
            x + (xGap * (i + 1)),
            y + height
        );
    }
};

export default axisRenderer;
export {
    axisRenderer
};