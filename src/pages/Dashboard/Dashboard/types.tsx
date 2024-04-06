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

export interface MidCardsData {
    name: string;
    value: number;
    percent: number;
}

export interface MidCardProps {
    card: MidCardsData;
    isLast: boolean;
    isSmallScreen: boolean;
}

export interface CardsMidProps {
    cards: MidCardsData[];
}

export interface CardComponentCarouselProps {
    card: MidCardsData;
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
