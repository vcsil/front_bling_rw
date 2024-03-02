import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";

import { DAYS, MONTHS } from "@/pages/Dashboard/Dashboard/date-range-picker/constants/contantes-picker";
import { CalendarPickerProps } from "@/pages/Dashboard/Dashboard/date-range-picker/types/types-picker";

interface SelectDayProps {
    from: Date | undefined;
    to?: Date;
}

export default function CalendarPicker({ isSmallScreen, range, setRange }: CalendarPickerProps): JSX.Element {
    function selectDay(value: SelectDayProps | undefined, selectedDay: Date): void {
        if (!value || !value.from) return;

        const { from, to } = range;

        if (to && from === to) {
            setRange({
                from: selectedDay < from ? selectedDay : from,
                to: selectedDay > to ? selectedDay : to,
            });
        } else {
            setRange({ from: selectedDay, to: selectedDay });
        }
    }

    return (
        <Calendar
            mode="range"
            locale={ptBR}
            onSelect={(value: SelectDayProps | undefined, selectedDay: Date) => {
                selectDay(value, selectedDay);
            }}
            selected={range}
            numberOfMonths={isSmallScreen ? 1 : 2}
            defaultMonth={new Date(new Date().setMonth(new Date().getMonth() - (isSmallScreen ? 0 : 1)))}
            formatters={{
                formatWeekdayName: (day) => `${DAYS[day.getDay()]}`,
                formatCaption: (month) => `${MONTHS[month.getMonth()]} ${month.getFullYear()}`,
            }}
        />
    );
}
