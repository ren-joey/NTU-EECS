import p5Types from 'p5';
import { useEffect, useState } from 'react';
import Sketch from 'react-p5';
import rooms from 'src/data-set/json-data/rooms.json';

import './rooms.scss';
import SideBar from './SideBar/SideBar';
import patientObjectDistributer from './functions/patient-object-distributer';
import roomObjectsOrganizer from './functions/room-objects-organizer';
import getCanvasSize from './functions/get-canvas-size';
import getTransferPatientRecordsWithPosition from './functions/get-transfer-patient-records-with-position';
import transferPatientsRenderer from './renderers/transfer-patients-renderer';
import roomEntitiesRenderer from './renderers/room-entities-renderer';
import newPatientsRenderer from './renderers/new-patients-renderer';
import leavingPatientsRenderer from './renderers/leaving-patients-renderer';
import getNewPatientRecordsWithPosition from './functions/get-new-patient-records-with-position';
import getLeavingPatientRecordsWithPosition from './functions/get-leaving-patient-records-with-position';
import LocationSketch from './LocationSketch/LocationSketch';

const buttonClasses = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mx-1 rounded';

interface RoomMappingByBedCode {
    [key: string]: RoomObject
}

let counter = 0;

const P5Sketch = () => {
    const [dateStart, setDateStart] = useState(new Date('2021/01/01 00:00:00'));
    const [speed, setSpeed] = useState(5);
    const [roomObjects, setRoomObjects] = useState<RoomObject[]>(
        roomObjectsOrganizer(rooms)
    );
    const [selectedRoom, setSelectedRoom] = useState<null|RoomObject>(null);
    const [selectedPatient, setSelectedPatient] = useState<null|PatientObject>(null);
    const [paused, setPaused] = useState(false);
    const [
        transferPatientsWithRecord,
        setTransferPatientsWithRecord
    ] = useState<TransferRecordWithPosition[]>([]);
    const [
        newPatientsWithRecord,
        setNewPatientsWithRecord
    ] = useState<TransferRecordWithPosition[]>([]);
    const [
        leavingPatientsWithRecord,
        setLeavingPatientsWithRecord
    ] = useState<TransferRecordWithPosition[]>([]);
    const getRoomByBedCode = (bedCode: string): RoomObject => {
        const roomMap = roomObjects.reduce((map: RoomMappingByBedCode, room) => {
            map[room.name] = room;
            return map;
        }, {});

        return roomMap[bedCode];
    };
    const togglePause = () => setPaused((b) => !b);
    const setSpeedAndResetCounter = (speed: number) => {
        setSpeed(speed);
        counter = 0;
    };

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(getCanvasSize(), getCanvasSize()).parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {
        if (paused) return;

        counter += speed;
        if (counter % 10 !== 0) return;

        p5.clear();
        setDateStart(
            new Date(
                Date.parse(dateStart.toString()) + (1000 * 3600)
            )
        );

        const {
            roomObjects: _roomObjects,
            transferPatients,
            newPatients,
            leavingPatients
        } = patientObjectDistributer(
            dateStart,
            rooms,
            roomObjects,
            getRoomByBedCode
        );
        const _transferRecordsWithPosition = getTransferPatientRecordsWithPosition(
            transferPatients.concat(transferPatientsWithRecord)
        );
        const _newPatientsRecordsWithPosition = getNewPatientRecordsWithPosition(
            newPatients.concat(newPatientsWithRecord)
        );
        const _leavingPatientRecordsWithPosition = getLeavingPatientRecordsWithPosition(
            leavingPatients.concat(leavingPatientsWithRecord)
        );

        transferPatientsRenderer(p5, _transferRecordsWithPosition);
        newPatientsRenderer(p5, _newPatientsRecordsWithPosition);
        leavingPatientsRenderer(p5, _leavingPatientRecordsWithPosition);
        roomEntitiesRenderer(p5, roomObjects);
        newPatientsRenderer(p5, []);
        leavingPatientsRenderer(p5, []);

        setTransferPatientsWithRecord(_transferRecordsWithPosition);
        setNewPatientsWithRecord(_newPatientsRecordsWithPosition);
        setLeavingPatientsWithRecord(_leavingPatientRecordsWithPosition);
        setRoomObjects(_roomObjects);
    };

    return (
        <div>
            <Sketch
                setup={setup}
                draw={draw}
            />

            {
                selectedPatient !== null && (
                    <LocationSketch
                        patientObject={selectedPatient}
                        setSelectedPatient={setSelectedPatient}
                    />
                )
            }

            {
                selectedRoom !== null && (
                    <SideBar
                        roomObject={selectedRoom}
                        setSelectedRoom={setSelectedRoom}
                        setSelectedPatient={setSelectedPatient}
                    />
                )
            }

            <div
                className="rooms-container"
                style={{
                    width: getCanvasSize(),
                    height: getCanvasSize()
                }}
            >
                <div className="time">
                    {
                        dateStart.toString()
                    }
                    <br />
                    <button
                        className={buttonClasses}
                        onClick={() => setSpeedAndResetCounter(1)}
                    >x1
                    </button>
                    <button
                        className={buttonClasses}
                        onClick={() => setSpeedAndResetCounter(2)}
                    >x2
                    </button>
                    <button
                        className={buttonClasses}
                        onClick={() => setSpeedAndResetCounter(5)}
                    >x5
                    </button>
                    <button
                        className={buttonClasses}
                        onClick={() => setSpeedAndResetCounter(10)}
                    >x10
                    </button>
                    <button
                        className={buttonClasses}
                        onClick={() => togglePause()}
                    >{ paused ? 'play' : 'pause'}
                    </button>
                </div>
                {
                    roomObjects.map((room, idx) => (
                        <div
                            className="room"
                            style={{
                                top: room.y,
                                left: room.x
                            }}
                            onClick={() => setSelectedRoom(room)}
                            key={`room${idx}`}
                        >
                            {room.name}
                            <br />
                            <span>
                                (-){room.occupy.length - Number(room.infectedAmount)}
                            </span>
                            &emsp;
                            <span className="danger-text">
                                (+){Number(room.infectedAmount)}
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default P5Sketch;
