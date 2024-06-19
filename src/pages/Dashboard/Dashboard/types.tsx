import { DateRange } from "@/pages/Dashboard/Dashboard/date-range-picker/types/types-picker";

export interface CardsProps {
    amount: number;
    oldAmount: number;
    percent: number;
}

export interface FilterOptionsProps {
    rangeDateMain: DateRange;
    rangeDateCompare: DateRange;
    setRangeDateMain: (_dateRange: DateRange, _rangeType: "main" | "compare") => void;
    situationsSales: string[];
    setSituationsSales: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface MarkupProps {
    rangeDateMain: DateRange;
    situationsSales: string[];
}

export interface OrderSalesStatusProps {
    status: string;
    quantity: number;
    color: string;
    total: number;
}

export interface BlingStatusProps {
    dateRange: DateRange;
}

export interface FinancialCardsData {
    name: string;
    main: number;
    compare: number;
    percent: number;
    details: string;
}

export interface CardFinancialProps {
    card: FinancialCardsData;
    isPercent: boolean;
    setIsPercent: React.Dispatch<React.SetStateAction<boolean>>;
    isLast: boolean;
    isSmallScreen: boolean;
}

export interface FinancialCardsProps {
    rangeDateMain: DateRange;
    rangeDateCompare: DateRange;
}

export interface CardComponentCarouselProps {
    card: FinancialCardsData;
    isPercent: boolean;
    setIsPercent: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FancyMultiSelectProps {
    situationsSales: string[];
    setSituationsSales: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface BlingOrderStatus {
    nome: string;
    cor: string;
    total: string;
}

export interface OrderStatusTotal {
    blingOrderStatus: BlingOrderStatus[];
    total: number;
}

export interface GetOrderSalesPerDayT {
    date: string;
    value: string;
}

export interface OrderSalesPerDayT {
    date: number;
    value: number;
}
