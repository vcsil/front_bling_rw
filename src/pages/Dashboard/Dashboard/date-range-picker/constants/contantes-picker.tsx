import { DaysType, MonthType, Preset } from "@/pages/Dashboard/Dashboard/date-range-picker/types/types-picker";

// Define presets
export const PRESETS: Preset[] = [
    { name: "today", label: "Hoje" },
    // { name: "yesterday", label: "Ontem" },
    // { name: "last7", label: "Úlitmos 7 dias" },
    { name: "thisWeek", label: "Esta semana" },
    { name: "lastWeek", label: "Semana passada" },
    { name: "last14", label: "Úlitmos 14 dias" },
    // { name: "last30", label: "Úlitmos 30 dias" },
    { name: "thisMonth", label: "Este mês" },
    { name: "lastMonth", label: "Mês passado" },
];

export const MONTHS: MonthType = {
    0: "Janeiro",
    1: "Fevereiro",
    2: "Março",
    3: "Abril",
    4: "Maio",
    5: "Junho",
    6: "Julho",
    7: "Agosto",
    8: "Setembro",
    9: "Outubro",
    10: "Novembro",
    11: "Dezembro",
};

export const DAYS: DaysType = {
    0: "Dom",
    1: "Seg",
    2: "Ter",
    3: "Qua",
    4: "Qui",
    5: "Sex",
    6: "Sáb",
};
