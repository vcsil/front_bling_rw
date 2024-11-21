import { useEffect, useRef, useState, ChangeEvent, FocusEvent, KeyboardEvent } from "react";

import { Input } from "@/components/ui/input";

import { DateInputProps, DateParts } from "@/pages/Dashboard/Dashboard/date-range-picker/types/types-input";
import { formatNumber } from "@/pages/Dashboard/Dashboard/date-range-picker/utils/utils-input";

export default function DateInput({ id, value, onChange }: { id: string } & DateInputProps) {
    const [date, setDate] = useState<DateParts>(() => {
        const d = value ? new Date(value) : new Date();
        return {
            day: d.getDate(),
            month: d.getMonth() + 1, // JavaScript months are 0-indexed
            year: d.getFullYear(),
        };
    });

    const monthRef = useRef<HTMLInputElement | null>(null);
    const dayRef = useRef<HTMLInputElement | null>(null);
    const yearRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const d = value ? new Date(value) : new Date();
        setDate({
            day: d.getDate(),
            month: d.getMonth() + 1,
            year: d.getFullYear(),
        });
    }, [value]);

    function validateDate(field: keyof DateParts, value: number): boolean {
        if (
            (field === "day" && (value < 1 || value > 31)) ||
            (field === "month" && (value < 1 || value > 12)) ||
            (field === "year" && (value < 1000 || value > 9999))
        ) {
            return false;
        }

        // Validate the day of the month
        const newDate = { ...date, [field]: value };
        const d = new Date(newDate.year, newDate.month - 1, newDate.day);
        return d.getFullYear() === newDate.year && d.getMonth() + 1 === newDate.month && d.getDate() === newDate.day;
    }

    function handleInputChange(field: keyof DateParts) {
        return (e: ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value ? Number(e.target.value) : "";
            const isValid = typeof newValue === "number" && validateDate(field, newValue);

            // If the new value is valid, update the date
            const newDate = { ...date, [field]: newValue };
            setDate(newDate);

            // only call onChange when the entry is valid
            if (isValid) {
                onChange(new Date(newDate.year, newDate.month - 1, newDate.day));
            }
        };
    }

    const initialDate = useRef<DateParts>(date);

    function handleBlur(field: keyof DateParts) {
        return (e: FocusEvent<HTMLInputElement>): void => {
            if (!e.target.value) {
                setDate(initialDate.current);
                return;
            }

            const newValue = Number(e.target.value);
            const isValid = validateDate(field, newValue);

            if (!isValid) {
                setDate(initialDate.current);
            } else {
                // If the new value is valid, update the initial value
                initialDate.current = { ...date, [field]: newValue };
            }
        };
    }

    function handleKeyDown(field: keyof DateParts) {
        return (e: KeyboardEvent<HTMLInputElement>) => {
            // Allow command (or control) combinations
            if (e.metaKey || e.ctrlKey) {
                return;
            }

            // Prevent non-numeric characters, excluding allowed keys
            if (
                !/^[0-9]$/.test(e.key) &&
                !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Delete", "Tab", "Backspace", "Enter"].includes(e.key)
            ) {
                e.preventDefault();
                return;
            }

            if (e.key === "ArrowUp") {
                e.preventDefault();
                let newDate = { ...date };

                if (field === "day") {
                    if (date[field] === new Date(date.year, date.month, 0).getDate()) {
                        newDate = { ...newDate, day: 1, month: (date.month % 12) + 1 };
                        if (newDate.month === 1) newDate.year += 1;
                    } else {
                        newDate.day += 1;
                    }
                }

                if (field === "month") {
                    if (date[field] === 12) {
                        newDate = { ...newDate, month: 1, year: date.year + 1 };
                    } else {
                        newDate.month += 1;
                    }
                }

                if (field === "year") {
                    newDate.year += 1;
                }

                setDate(newDate);
                onChange(new Date(newDate.year, newDate.month - 1, newDate.day));
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                let newDate = { ...date };

                if (field === "day") {
                    if (date[field] === 1) {
                        newDate.month -= 1;
                        if (newDate.month === 0) {
                            newDate.month = 12;
                            newDate.year -= 1;
                        }
                        newDate.day = new Date(newDate.year, newDate.month, 0).getDate();
                    } else {
                        newDate.day -= 1;
                    }
                }

                if (field === "month") {
                    if (date[field] === 1) {
                        newDate = { ...newDate, month: 12, year: date.year - 1 };
                    } else {
                        newDate.month -= 1;
                    }
                }

                if (field === "year") {
                    newDate.year -= 1;
                }

                setDate(newDate);
                onChange(new Date(newDate.year, newDate.month - 1, newDate.day));
            }

            if (e.key === "ArrowRight") {
                const StartInputSelection = e.currentTarget.selectionStart === 0;
                const EndInputSelection = e.currentTarget.selectionEnd === e.currentTarget.value.length;
                const EndInput = e.currentTarget.selectionStart === e.currentTarget.value.length;

                if (EndInput || (StartInputSelection && EndInputSelection)) {
                    e.preventDefault();
                    if (field === "day") monthRef.current?.focus();
                    if (field === "month") yearRef.current?.focus();
                }
            } else if (e.key === "ArrowLeft") {
                const StartInputSelection = e.currentTarget.selectionStart === 0;
                const EndInputSelection = e.currentTarget.selectionEnd === e.currentTarget.value.length;

                if (StartInputSelection || (StartInputSelection && EndInputSelection)) {
                    e.preventDefault();
                    if (field === "year") monthRef.current?.focus();
                    if (field === "month") dayRef.current?.focus();
                }
            }
        };
    }

    return (
        <div className="flex border rounded-lg items-center text-sm px-1">
            <Input
                type="text"
                id={"day" + id}
                ref={dayRef}
                max={31}
                maxLength={3}
                value={formatNumber(date.day)}
                onChange={handleInputChange("day")}
                onKeyDown={handleKeyDown("day")}
                onFocus={(e) => e.target.select()}
                onBlur={handleBlur("day")}
                className="p-0 outline-none w-7 border-none text-center"
                placeholder="DD"
            />
            <span className="opacity-20 -mx-px">/</span>
            <Input
                type="text"
                id={"month" + id}
                ref={monthRef}
                max={12}
                maxLength={3}
                value={formatNumber(date.month)}
                onChange={handleInputChange("month")}
                onKeyDown={handleKeyDown("month")}
                onFocus={(e) => e.target.select()}
                onBlur={handleBlur("month")}
                className="p-0 outline-none w-6 border-none text-center"
                placeholder="MM"
            />
            <span className="opacity-20 -mx-px">/</span>
            <Input
                type="text"
                id={"year" + id}
                ref={yearRef}
                max={9999}
                maxLength={4}
                value={date.year}
                onChange={handleInputChange("year")}
                onKeyDown={handleKeyDown("year")}
                onFocus={(e) => e.target.select()}
                onBlur={handleBlur("year")}
                className="p-0 outline-none w-12 border-none text-center"
                placeholder="AAAA"
            />
        </div>
    );
}

DateInput.displayName = "DateInput";
