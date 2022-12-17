//最小(包含)與最大(包含)值間的亂數
const getRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 取得身份證字號最後一個檢查碼
function getchknum(x: string){
    const a = [];
    const b = [10,11,12,13,14,15,16,17,34,18,19,20,21,22,35,23,24,25,26,27,28,29,32,30,31,33];

    for(let i = 65; i < 91; i++){
        a.push(String.fromCharCode(i));
    }    

    const num = a.indexOf(x.substring(0, 1));
    const b1 = parseInt(b[num].toString().substring(0, 1));
    const b2 = parseInt(b[num].toString().substring(1, 2));

    let fnum = b1 + (b2 * 9); // 英文字母算出的數字
    let ff = 1;
    for(let i=8; i > 0; i -= 1){
	    fnum += Number(x.substring(i, 1)) * ff;
	    ff++;
    }

    const final = (fnum % 10 === 0) ? 0 : 10 - (fnum % 10); // 檢查碼
    return final;
}

//取得身份證字號
const getRandomTaiwanId = () => {
    const a = [];
    // const b=[10,11,12,13,14,15,16,17,34,18,19,20,21,22,35,23,24,25,26,27,28,29,32,30,31,33];
    let value = '';
    for(let i = 65; i < 91; i += 1){
        a.push(String.fromCharCode(i));
    }
    value = a[getRandom(0,25)] + getRandom(1,2);
    for(let i = 0; i < 7; i += 1){
        value += getRandom(1,9);
    }
    return value += getchknum(value);
};

export default getRandomTaiwanId;
export { getRandomTaiwanId };