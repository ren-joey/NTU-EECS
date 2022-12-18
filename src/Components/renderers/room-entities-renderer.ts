import p5Types from 'p5';

const roomEntitiesRenderer = (p5: p5Types, roomObjects: RoomObject[]) => {
    for (let i = 0; i < roomObjects.length; i++) {
        const roomObject = roomObjects[i];
        const { infectedAmount } = roomObject;

        p5.strokeWeight(0);
        !infectedAmount
            ? p5.fill('#000')
            : p5.fill(`rgba(${100 + (infectedAmount * 50)}, 0, 0, 1)`);
        const size = 10 + 4 * (Number(infectedAmount) ? Number(infectedAmount) + 2 : 1 );
        p5.ellipse(
            roomObject.x,
            roomObject.y,
            size,
            size
        );
    }
};

export default roomEntitiesRenderer;
export {
    roomEntitiesRenderer
};