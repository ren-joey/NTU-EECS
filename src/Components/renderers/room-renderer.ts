import * as p5Types from 'p5';

const roomRenderer = (
    p5: p5Types,
    room: RoomObject
) => {
    p5.strokeWeight(1);
    p5.fill('rgb(255, 255, 255)');
    p5.rect(
        room.x,
        room.y,
        10,
        50
    );
    p5.fill('#000');
    p5.text(
        room.name,
        room.x,
        room.y - 5
    );
};

export default roomRenderer;
export {
    roomRenderer
};