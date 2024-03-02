interface DataPoint {
    date: number;
    value: number;
}

interface ThemeColor {
    primary: string;
    secondary: string;
    border: string;
}

export interface MarkupChartProps {
    data: DataPoint[];
    themeColors: ThemeColor;
}
