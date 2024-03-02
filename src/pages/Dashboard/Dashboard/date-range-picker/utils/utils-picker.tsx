import { PRESETS } from "@/pages/Dashboard/Dashboard/date-range-picker/constants/contantes-picker";
import { DateRange } from "@/pages/Dashboard/Dashboard/date-range-picker/types/types-picker";

export function useFormattedDate(date: Date | undefined, locale = "pt-br"): string {
    if (!date) return "";

    return date.toLocaleDateString(locale, {
        month: "numeric",
        day: "numeric",
        year: "numeric",
    });
}

export function getPresetRange(presetName: string): DateRange {
    const preset = PRESETS.find(({ name }) => name === presetName);
    if (!preset) throw new Error(`Unknown date range preset: ${presetName}`);
    const from = new Date();
    const to = new Date();
    const first = from.getDate() - from.getDay();

    switch (preset.name) {
        case "today":
            from.setHours(0, 0, 0, 0);
            to.setHours(23, 59, 59, 999);
            break;
        case "yesterday":
            from.setDate(from.getDate() - 1);
            from.setHours(0, 0, 0, 0);
            to.setDate(to.getDate() - 1);
            to.setHours(23, 59, 59, 999);
            break;
        case "last7":
            from.setDate(from.getDate() - 6);
            from.setHours(0, 0, 0, 0);
            to.setHours(23, 59, 59, 999);
            break;
        case "last14":
            from.setDate(from.getDate() - 13);
            from.setHours(0, 0, 0, 0);
            to.setHours(23, 59, 59, 999);
            break;
        case "last30":
            from.setDate(from.getDate() - 29);
            from.setHours(0, 0, 0, 0);
            to.setHours(23, 59, 59, 999);
            break;
        case "thisWeek":
            from.setDate(first);
            from.setHours(0, 0, 0, 0);
            to.setHours(23, 59, 59, 999);
            break;
        case "lastWeek":
            from.setDate(from.getDate() - 7 - from.getDay());
            to.setDate(to.getDate() - to.getDay() - 1);
            from.setHours(0, 0, 0, 0);
            to.setHours(23, 59, 59, 999);
            break;
        case "thisMonth":
            from.setDate(1);
            from.setHours(0, 0, 0, 0);
            to.setHours(23, 59, 59, 999);
            break;
        case "lastMonth":
            from.setMonth(from.getMonth() - 1);
            from.setDate(1);
            from.setHours(0, 0, 0, 0);
            to.setDate(0);
            to.setHours(23, 59, 59, 999);
            break;
    }

    return { from, to };
}
