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

const buttonClasses = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mx-1 rounded';

interface RoomMappingByBedCode {
    [key: string]: RoomObject
}

const P5Sketch = () => {
    const [dateStart, setDateStart] = useState(new Date('2021/01/01 00:00:00'));
    const [speed, setSpeed] = useState(1);
    const [roomObjects, setRoomObjects] = useState<RoomObject[]>(
        roomObjectsOrganizer(rooms)
    );
    const [selectedRoom, setSelectedRoom] = useState<null|RoomObject>(null);
    const [paused, setPaused] = useState(false);
    const [
        transferPatientsWithRecord,
        setTransferPatientsWithRecord
    ] = useState<TransferRecordWithPosition[]>([]);
    const getRoomByBedCode = (bedCode: string): RoomObject => {
        const roomMap = roomObjects.reduce((map: RoomMappingByBedCode, room) => {
            map[room.name] = room;
            return map;
        }, {});

        return roomMap[bedCode];
    };
    const togglePause = () => setPaused((b) => !b);

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(getCanvasSize(), getCanvasSize()).parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {
        if (paused) return;

        p5.clear();
        setDateStart(
            new Date(
                Date.parse(dateStart.toString()) + (1000 * 3600 * speed)
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
            dateStart,
            transferPatients.concat(transferPatientsWithRecord)
        );

        transferPatientsRenderer(p5, _transferRecordsWithPosition);
        roomEntitiesRenderer(p5, roomObjects);
        setTransferPatientsWithRecord(_transferRecordsWithPosition);
        setRoomObjects(_roomObjects);
    };

    return (
        <div>
            <Sketch
                setup={setup}
                draw={draw}
            />

            {
                selectedRoom !== null && (
                    <SideBar
                        roomObject={selectedRoom}
                        setSelectedRoom={setSelectedRoom}
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
                        onClick={() => setSpeed(1)}
                    >x1
                    </button>
                    <button
                        className={buttonClasses}
                        onClick={() => setSpeed(10)}
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
                            (+){room.occupy.length - Number(room.infectedAmount)}
                            &emsp;(-){Number(room.infectedAmount)}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default P5Sketch;
