import getLabelsPosition from './get-label-position';

const getAxisInfoByBedHistories = (
    chatPosition: ChatPosition,
    bedHistory: BedHistory[]
): ChatInfo => {
    const xLabels: string[] = [];
    const yLabels: string[] = [];

    for (let i = 0; i < bedHistory.length; i++) {
        if (i === 0) {
            yLabels.push('entrance/exit');
        }
        const record = bedHistory[i];
        xLabels.push(record.transferInDate.toLocaleDateString());
        yLabels.push(record.bedCode);
        if (i === bedHistory.length - 1) {
            xLabels.push(record.transferOutDate.toLocaleDateString());
        }
    }
    yLabels.reverse();

    return getLabelsPosition({
        xLabels,
        yLabels,
        chatPosition
    });
};

export default getAxisInfoByBedHistories;
export {
    getAxisInfoByBedHistories
};