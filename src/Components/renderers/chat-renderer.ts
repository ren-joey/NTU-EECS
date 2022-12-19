import p5Types from 'p5';
import axisRenderer from './axis-renderer';
import textRenderer from './text-renderer';

const chatRenderer = (
    p5: p5Types,
    chatPosition: ChatPosition,
    xAxis: AxisInfo,
    yAxis: AxisInfo
) => {
    const {
        x,
        y,
        width,
        height
    } = chatPosition;
    p5.textStyle('normal');
    p5.stroke('rgba(0, 0, 0, 1)');
    p5.fill('rgba(255, 255, 255, 0)');
    p5.strokeWeight(1);
    p5.rect(
        x,
        y,
        width,
        height
    );

    textRenderer(p5, xAxis.labels);
    textRenderer(p5, yAxis.labels);
    axisRenderer(p5, chatPosition, xAxis, yAxis);
};

export default chatRenderer;
export {
    chatRenderer
};