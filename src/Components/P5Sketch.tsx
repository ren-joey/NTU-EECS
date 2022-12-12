import p5Types from 'p5';
import Sketch from 'react-p5';

let x = 50;
const y = 50;

const P5Sketch = () => {
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(500, 500).parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {
        p5.background(0);
        p5.ellipse(x, y, 70, 70);
        x += 1;
    };

    return (
        <Sketch
            setup={setup}
            draw={draw}
        />
    );
};

export default P5Sketch;
