export interface DateInputProps {
    value?: Date;
    onChange: (_date: Date) => void;
}

export interface DateParts {
    day: number;
    month: number;
    year: number;
}
