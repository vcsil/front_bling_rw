import { DateRange } from "@/pages/Dashboard/Dashboard/date-range-picker/types/types-picker";

export interface CardsProps {
    amount: number;
    oldAmount: number;
    percent: number;
}

export interface FilterOptionsProps {
    rangeDate: DateRange;
    setRangeDate: (_dateRange: DateRange) => void;
}

export interface MarkupProps {
    rangeDate: DateRange;
}

export interface StatusCategoryProps {
    category: string;
    quantity: number;
    color: string;
    total: number;
}

export interface BlingStatusProps {
    categoriesData: {
        categories: {
            category: string;
            quantity: number;
            color: string;
        }[];
        total: number;
    };
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
