import getRandomInteger from '../math/get-random-integer';

const randomPick = <T>(arr: T[]): T => {
    return arr[
        getRandomInteger(0, arr.length - 1)
    ];
};

export default randomPick;
export {
    randomPick
};
