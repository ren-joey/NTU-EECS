import getCanvasSize from './get-canvas-size';

const roomObjectsOrganizer = (rooms: string[]): RoomObject[] => {
    const radius = rooms.length * 100 / Math.PI / 2;
    const roomObjects = rooms.map((room, idx) => {
        const anglePeriod = Math.PI * 2 / rooms.length;
        const angle = anglePeriod * idx;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        return {
            name: room,
            x: x + (getCanvasSize() / 2),
            y: y + (getCanvasSize() / 2),
            occupy: []
        };
    });

    return roomObjects;
};

export default roomObjectsOrganizer;
export {
    roomObjectsOrganizer
};