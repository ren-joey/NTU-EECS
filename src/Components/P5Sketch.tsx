import p5Types from 'p5';
import { useEffect, useState } from 'react';
import Sketch from 'react-p5';
import rooms from 'src/data-set/json-data/rooms.json';
import patients from 'src/data-set/json-data/patients.json';
import './rooms.scss';

const buttonClasses = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mx-1 rounded';

const x = 50;
const y = 50;
const size = () => window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;

const roomObjectOrganizer = (rooms: string[]): RoomObject[] => {
    const radius = rooms.length * 100 / Math.PI / 2;
    const roomObjects = rooms.map((room, idx) => {
        const anglePeriod = Math.PI * 2 / rooms.length;
        const angle = anglePeriod * idx;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        return {
            name: room,
            x: x + (size() / 2),
            y: y + (size() / 2),
            occupy: []
        };
    });

    return roomObjects;
};

const roomEntitiesRenderer = (p5: p5Types, roomObjects: RoomObject[]) => {
    p5.fill(0x0);

    for (let i = 0; i < roomObjects.length; i++) {
        const roomObject = roomObjects[i];
        p5.ellipse(
            roomObject.x,
            roomObject.y,
            30,
            30
        );
    }
};

const patientObjectDistributer = (date: Date, roomObjects: RoomObject[]) => {
    const newPatients = patients[date.toString()];
    for (let i = 0; i < newPatients.length; i++) {
        const patient = newPatients[i];
    }
};

const P5Sketch = () => {
    const [dateStart, setDateStart] = useState(new Date('2021/01/01 00:00:00'));
    const [speed, setSpeed] = useState(1);
    const [roomObjects, setRoomObjects] = useState<RoomObject[]>(
        roomObjectOrganizer(rooms)
    );

    useEffect(() => {
        roomObjects.forEach((roomObject) => {
            console.log(roomObject.x, roomObject.y);
        });
    }, [roomObjects]);

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(size(), size()).parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {
        p5.clear();
        setDateStart(
            new Date(
                Date.parse(dateStart.toString()) + (1000 * speed)
            )
        );

        roomEntitiesRenderer(p5, roomObjects);
        setRoomObjects(roomObjects);
    };

    return (
        <div>
            <Sketch
                setup={setup}
                draw={draw}
            />

            <div
                className="rooms-container"
                style={{
                    width: size(),
                    height: size()
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
                        onClick={() => setSpeed(100)}
                    >x100
                    </button>
                    <button
                        className={buttonClasses}
                        onClick={() => setSpeed(1000)}
                    >x1000
                    </button>
                    <button
                        className={buttonClasses}
                        onClick={() => setSpeed(10000)}
                    >x10000
                    </button>
                </div>
                {
                    roomObjects.map((room) => (
                        <div
                            className="room"
                            style={{
                                top: room.y,
                                left: room.x
                            }}
                            key={Math.random()}
                        >
                            {room.name}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default P5Sketch;
