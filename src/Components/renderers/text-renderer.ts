import p5Types from 'p5';

const textRenderer = (p5: p5Types, labels: TextPosition[]) => {
    for (let i = 0; i < labels.length; i++) {
        const label = labels[i];
        const { name, x, y } = label;
        p5.fill(0x0);
        p5.strokeWeight(0);
        p5.text(name, x, y);
    }
};

export default textRenderer;
export {
    textRenderer
};