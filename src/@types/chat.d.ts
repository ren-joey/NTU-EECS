type GridPoints = GridPoint[][]

interface Point {
    x: number;
    y: number;
}

interface ChatInfo {
    chatPosition: ChatPosition;
    xAxis: AxisInfo;
    yAxis: AxisInfo;
    gridMap: GridMap;
    gridPoints: GridPoint[][];
}

interface TextPosition extends Point {
    name: string;
}

interface GridPoint extends Point {
    xLabel: string;
    yLabel: string;
}

interface GridMap {
    [key: string]: {
        [key: string]: GridPoint
    }
}

interface AxisInfo {
    gap: number;
    labels: TextPosition[]
}

interface ChatPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}