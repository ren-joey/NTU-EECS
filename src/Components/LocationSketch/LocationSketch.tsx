import p5 from 'p5';
import p5Types from 'p5';
import Sketch from 'react-p5';
import getCanvasSize from '../functions/get-canvas-size';
import './LocationSketch.scss';

interface Point {
    x: number;
    y: number;
}

const LocationSketch = ({
    patientObject,
    setSelectedPatient
}: {
    patientObject: PatientObject,
    setSelectedPatient: (key: (null|PatientObject)) => void
}) => {
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(getCanvasSize(), getCanvasSize()).parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {

        if (patientObject.bedHistoryBackup === undefined) return;

        const xLabels: string[] = [];
        const yLabels: string[] = [];
        const points: Point[] = [];
        p5.clear();

        const width = getCanvasSize() - 400;
        const height = 300;
        const x = 300;
        const y = getCanvasSize() / 2 - 150;
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

        const { bedHistoryBackup: bedHistory } = patientObject;
        for (let i = 0; i < bedHistory.length; i++) {
            const record = bedHistory[i];
            xLabels.push(new Date(record.transferInDate).toLocaleDateString());
            yLabels.push(record.bedCode);
            if (i === bedHistory.length - 1) {
                xLabels.push(
                    new Date(record.transferOutDate).toLocaleDateString()
                );
                yLabels.push('entrance/exit');
            }
        }

        const xGap = width / (xLabels.length + 1);
        const yGap = height / (yLabels.length + 1);
        points.push({
            x: x,
            y: y + yGap * (yLabels.length)
        });
        points.push({
            x: x + xGap,
            y: y + yGap * (yLabels.length)
        });

        xLabels.forEach((label, idx) => {
            p5.fill(0x0);
            p5.strokeWeight(0);
            p5.text(
                label,
                x + (xGap * (idx + 1)),
                y + height + 20
            );

            points.push({
                x: x + (xGap * (idx + 1)),
                y: y + (yGap * (idx + 1))
            });
            points.push({
                x: x + (xGap * (idx + 2)),
                y: y + (yGap * (idx + 1))
            });
        });

        points.push({
            x: x + (xGap * xLabels.length),
            y: y + yGap * (yLabels.length)
        });
        points.push({
            x: x + width,
            y: y + yGap * (yLabels.length)
        });

        yLabels.forEach((label, idx) => {
            p5.fill(0x0);
            p5.strokeWeight(0);
            p5.text(
                label,
                x - 100,
                y + (yGap * (idx + 1))
            );

            p5.stroke('rgba(0, 0, 0, 0.1)');
            p5.strokeWeight(1);
            p5.line(
                x,
                y + (yGap * (idx + 1)),
                x + width,
                y + (yGap * (idx + 1))
            );
        });

        for (let i = 0; i < points.length - 1; i++) {
            const point = points[i];
            const nextPoint = points[i + 1];
            p5.stroke('green');
            p5.strokeWeight(3);
            p5.line(
                point.x,
                point.y,
                nextPoint.x,
                nextPoint.y
            );
        }
    };

    return (
        <div className="location-sketch">
            <div
                className="cancel"
                onClick={() => {
                    setSelectedPatient(null);
                }}
            >X
            </div>
            <div className={`info ${patientObject.infectStatus ? 'infected' : ''}`}>
                <div className="title">
                    {patientObject.infectStatus ? '(+) ' : ''}
                    {patientObject.id}&nbsp;
                    {patientObject.name}
                </div>
            </div>
            <Sketch
                setup={setup}
                draw={draw}
            />
        </div>
    );
};

export default LocationSketch;