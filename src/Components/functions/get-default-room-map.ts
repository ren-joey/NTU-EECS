interface PatientMappingByRoom {
    [key: string]: PatientObject[]
}

const getDefaultRoomMap = (rooms: string[]): PatientMappingByRoom => {
    return rooms.reduce((accumulator: PatientMappingByRoom, value) => {
        accumulator[value] = [];
        return accumulator;
    }, {});
};

export default getDefaultRoomMap;
export {
    getDefaultRoomMap
};