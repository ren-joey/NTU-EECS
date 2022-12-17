const phoneNumberArr = [
    0910,
    0911,
    0912,
    0913,
    0914,
    0915,
    0916,
    0917,
    0918,
    0919,
    0920,
    0921,
    0922,
    0923,
    0924,
    0925,
    0926,
    0927,
    0928,
    0929,
    0930,
    0931,
    0932,
    0933,
    0934,
    0935,
    0936,
    0937,
    0938,
    0939,
    0952,
    0953,
    0954,
    0955,
    0956,
    0958,
    0960,
    0961,
    0963,
    0968,
    0970,
    0971,
    0972,
    0982,
    0986,
    0987,
    0988,
    0989
];

const selectFirstNumber = () => {
    const index = Math.floor(Math.random() * (phoneNumberArr.length - 1));

    return phoneNumberArr[index];
};

const selectNumbers = (num: number) => {
    const nums = [];
    for (let i = 0; i < num; i++) {
        const n = Math.floor(Math.random() * 9);

        nums.push(n);
    }

    return nums.join('');
};

const getRandomPhoneNumber = () => {
    const totalNumber = 10;
    let result = '';
    result += selectFirstNumber();
    result += selectNumbers(totalNumber - result.length);

    return result;
};

export default getRandomPhoneNumber;
export {
    getRandomPhoneNumber
};