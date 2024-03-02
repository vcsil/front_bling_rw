import { Dispatch, SetStateAction } from "react";

export interface DateRange {
    from: Date;
    to: Date | undefined;
}

export interface DateRangePickerProps {
    /** Click handler for applying the updates from DateRangePicker. */
    onUpdate?: (_values: { range: DateRange; rangeCompare?: DateRange }) => void;
    /** Initial value for start date */
    initialDateFrom?: Date | string;
    /** Initial value for end date */
    initialDateTo?: Date | string;
    /** Initial value for start date for compare */
    initialCompareFrom?: Date | string;
    /** Initial value for end date for compare */
    initialCompareTo?: Date | string;
    /** Alignment of popover */
    align?: "start" | "center" | "end";
    /** Option for locale */
    locale?: string;
    /** Option for showing compare feature */
    showCompare?: boolean;
}

export interface Preset {
    name: string;
    label: string;
}

export type MonthType = Record<number, string>;

export type DaysType = Record<number, string>;

export interface CompareButtonProps {
    showCompare: boolean;
    range: DateRange;
    setRange: Dispatch<SetStateAction<DateRange>>;
    rangeCompare: DateRange | undefined;
    setRangeCompare: Dispatch<SetStateAction<DateRange | undefined>>;
}

export interface DateInputLineProps {
    range: DateRange;
    setRange: Dispatch<SetStateAction<DateRange>>;
    rangeCompare: DateRange | undefined;
    setRangeCompare: Dispatch<SetStateAction<DateRange | undefined>>;
}

export interface PlaceholderButtonProps {
    locale: string;
    range: DateRange;
    rangeCompare: DateRange | undefined;
}

export interface CalendarPickerProps {
    isSmallScreen: boolean;
    range: DateRange;
    setRange: Dispatch<SetStateAction<DateRange>>;
}
