import p5Types from 'p5';
import { useEffect, useMemo, useState } from 'react';
import Sketch from 'react-p5';
import getAxisInfoByBedHistories from '../functions/get-axis-info-by-bed-history';
import getCanvasSize from '../functions/get-canvas-size';
import getRelevantPatients from '../functions/get-relevant-patients';
import chatRenderer from '../renderers/chat-renderer';
import relevantPatientsTimelineRenderer from '../renderers/relevant-patients-timeline-renderer';
import timelineRenderer from '../renderers/timeline-renderer';
import './LocationSketch.scss';

const bedHistoriesPreprocessing = (bedHistories: BedHistory[]) => {
    return bedHistories.map((bedHistory) => {
        bedHistory.transferInDate = new Date(bedHistory.transferInDate);
        bedHistory.transferOutDate = new Date(bedHistory.transferOutDate);
        return bedHistory;
    });
};

const LocationSketch = ({
    patientObject,
    setSelectedPatient
}: {
    patientObject: PatientObject,
    setSelectedPatient: (key: (null|PatientObject)) => void
}) => {
    const [isDrawn, setIsDrawn] = useState(false);
    const [bedHistories, setBedHistories] = useState<BedHistory[]>(
        bedHistoriesPreprocessing(
            patientObject.bedHistoryBackup || patientObject.bedHistory
        )
    );
    const [relevantPatients, setRelevantPatients] = useState(
        getRelevantPatients(bedHistories, patientObject.id)
    );
    const infectedRelevantPatients = useMemo(() => {
        return relevantPatients.filter((patient) => patient.infectStatus);
    }, [relevantPatients]);

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(getCanvasSize(), getCanvasSize()).parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {
        if (isDrawn) return;
        p5.clear();

        const chatPosition: ChatPosition = {
            x: 300,
            y: getCanvasSize() / 2 - 150,
            width: getCanvasSize() - 400,
            height: relevantPatients.length > 10 ? 500 : 300
        };

        const {
            xAxis,
            yAxis,
            gridMap,
            gridPoints
        } = getAxisInfoByBedHistories(
            chatPosition,
            bedHistories
        );

        chatRenderer(
            p5,
            chatPosition,
            xAxis,
            yAxis
        );

        timelineRenderer(
            p5,
            bedHistories,
            gridMap
        );

        relevantPatientsTimelineRenderer(
            p5,
            relevantPatients,
            gridMap,
            gridPoints,
            xAxis
        );

        setIsDrawn(true);
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
                {
                    (infectedRelevantPatients.length > 0 && patientObject.infectStatus === false)
                        && (
                            <div className="subtitle infected">
                                注意：此患者曾與陽姓患者接觸 
                                {
                                    infectedRelevantPatients.map((patient) => (
                                        <span
                                            className="mx-1"
                                            key={Math.random()}
                                            onClick={() => setSelectedPatient(patient)}
                                        >{patient.name}
                                        </span>
                                    ))
                                }
                            </div>
                        )
                }

                {
                    (patientObject.infectStatus === true)
                        && (
                            <div className="subtitle infected">
                                注意：與此陽姓患者接觸的人員有 
                                {
                                    relevantPatients.map((patient) => (
                                        <span
                                            className="mx-1"
                                            key={Math.random()}
                                            onClick={() => setSelectedPatient(patient)}
                                        >{patient.name}
                                        </span>
                                    ))
                                }
                            </div>
                        )
                }
            </div>
            <Sketch
                setup={setup}
                draw={draw}
            />
        </div>
    );
};

export default LocationSketch;