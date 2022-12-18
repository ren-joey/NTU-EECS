const addDate = (date: Date, num: number): Date => {
    return new Date(
        Date.parse(date.toString()) + num
    );
};

export default addDate;
export {
    addDate
};