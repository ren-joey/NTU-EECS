const getCanvasSize = () => {
    return window.innerHeight > window.innerWidth
        ? window.innerWidth
        : window.innerHeight;
};

export default getCanvasSize;
export {
    getCanvasSize
};