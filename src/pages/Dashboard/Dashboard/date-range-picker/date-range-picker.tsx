import { useState, useEffect, useRef } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronUpIcon, ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { DateRange, DateRangePickerProps } from "@/pages/Dashboard/Dashboard/date-range-picker/types/types-picker";
import PlaceholderButton from "@/pages/Dashboard/Dashboard/date-range-picker/components/placeholder-button-picker";
import DateInputLine from "@/pages/Dashboard/Dashboard/date-range-picker/components/date-input-line";
import CompareButton from "@/pages/Dashboard/Dashboard/date-range-picker/components/compare-button";
import { PRESETS } from "@/pages/Dashboard/Dashboard/date-range-picker/constants/contantes-picker";
import { getPresetRange } from "@/pages/Dashboard/Dashboard/date-range-picker/utils/utils-picker";
import CalendarPicker from "@/pages/Dashboard/Dashboard/date-range-picker/components/calendar-picker";

/** The DateRangePicker component allows a user to select a range of dates */
export function DateRangePicker({
    initialDateFrom = new Date(new Date().setHours(0, 0, 0, 0)),
    initialDateTo,
    initialCompareFrom,
    initialCompareTo,
    onUpdate,
    align = "end",
    locale = "pt-br",
    showCompare = true,
}: DateRangePickerProps & { filePath?: string }): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    const [range, setRange] = useState<DateRange>({
        from: new Date(new Date(initialDateFrom).setHours(0, 0, 0, 0)),
        to: initialDateTo
            ? new Date(new Date(initialDateTo).setHours(0, 0, 0, 0))
            : new Date(new Date(initialDateFrom).setHours(0, 0, 0, 0)),
    });

    const [rangeCompare, setRangeCompare] = useState<DateRange | undefined>(
        initialCompareFrom
            ? {
                  from: new Date(new Date(initialCompareFrom).setHours(0, 0, 0, 0)),
                  to: initialCompareTo
                      ? new Date(new Date(initialCompareTo).setHours(0, 0, 0, 0))
                      : new Date(new Date(initialCompareFrom).setHours(0, 0, 0, 0)),
              }
            : undefined,
    );

    // Refs to store the values of range and rangeCompare when the date picker is opened
    const openedRangeRef = useRef<DateRange | undefined>();
    const openedRangeCompareRef = useRef<DateRange | undefined>();

    const [selectedPreset, setSelectedPreset] = useState<string | undefined>(undefined);

    const [isSmallScreen, setIsSmallScreen] = useState(typeof window !== "undefined" ? window.innerWidth < 960 : false);

    useEffect(() => {
        const handleResize = (): void => {
            setIsSmallScreen(window.innerWidth < 960);
        };

        window.addEventListener("resize", handleResize);

        // Clean up event listener on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function setPreset(preset: string): void {
        const range = getPresetRange(preset);
        setRange(range);
        if (rangeCompare) {
            const rangeCompare = {
                from: new Date(range.from.getFullYear() - 1, range.from.getMonth(), range.from.getDate()),
                to: range.to ? new Date(range.to.getFullYear() - 1, range.to.getMonth(), range.to.getDate()) : undefined,
            };
            setRangeCompare(rangeCompare);
        }
    }

    function checkPreset(): void {
        for (const preset of PRESETS) {
            const presetRange = getPresetRange(preset.name);

            const normalizedRangeFrom = new Date(range.from);
            normalizedRangeFrom.setHours(0, 0, 0, 0);
            const normalizedPresetFrom = new Date(presetRange.from.setHours(0, 0, 0, 0));

            const normalizedRangeTo = new Date(range.to ?? 0);
            normalizedRangeTo.setHours(0, 0, 0, 0);
            const normalizedPresetTo = new Date(presetRange.to?.setHours(0, 0, 0, 0) ?? 0);

            if (
                normalizedRangeFrom.getTime() === normalizedPresetFrom.getTime() &&
                normalizedRangeTo.getTime() === normalizedPresetTo.getTime()
            ) {
                setSelectedPreset(preset.name);
                return;
            }
        }

        setSelectedPreset(undefined);
    }

    function resetValues(): void {
        setRange({
            from: typeof initialDateFrom === "string" ? new Date(initialDateFrom) : initialDateFrom,
            to: initialDateTo
                ? typeof initialDateTo === "string"
                    ? new Date(initialDateTo)
                    : initialDateTo
                : typeof initialDateFrom === "string"
                  ? new Date(initialDateFrom)
                  : initialDateFrom,
        });
        setRangeCompare(
            initialCompareFrom
                ? {
                      from: typeof initialCompareFrom === "string" ? new Date(initialCompareFrom) : initialCompareFrom,
                      to: initialCompareTo
                          ? typeof initialCompareTo === "string"
                              ? new Date(initialCompareTo)
                              : initialCompareTo
                          : typeof initialCompareFrom === "string"
                            ? new Date(initialCompareFrom)
                            : initialCompareFrom,
                  }
                : undefined,
        );
    }

    useEffect(() => {
        checkPreset();
    }, [range]);

    const PresetButton = ({ preset, label, isSelected }: { preset: string; label: string; isSelected: boolean }): JSX.Element => (
        <Button
            className={cn(isSelected && "pointer-events-none")}
            variant="ghost"
            onClick={() => {
                setPreset(preset);
            }}
        >
            <>
                <span className={cn("pr-2 opacity-0", isSelected && "opacity-70")}>
                    <CheckIcon width={18} height={18} />
                </span>
                {label}
            </>
        </Button>
    );

    // Helper function to check if two date ranges are equal
    const areRangesEqual = (a?: DateRange, b?: DateRange) => {
        if (!a || !b) return a === b; // If either is undefined, return true if both are undefined
        return a.from.getTime() === b.from.getTime() && (!a.to || !b.to || a.to.getTime() === b.to.getTime());
    };

    useEffect(() => {
        if (isOpen) {
            openedRangeRef.current = range;
            openedRangeCompareRef.current = rangeCompare;
        }
    }, [isOpen]);

    return (
        <Popover
            modal={true}
            open={isOpen}
            onOpenChange={(open: boolean) => {
                if (!open) {
                    resetValues();
                }
                setIsOpen(open);
            }}
        >
            <PopoverTrigger asChild>
                <Button size={"lg"} variant="ghost" className="px-0 w-full h-full items-center justify-between">
                    <PlaceholderButton locale={locale} range={range} rangeCompare={rangeCompare} />
                    <div className="opacity-60 -mr-2 scale-125">
                        {isOpen ? <ChevronUpIcon width={24} /> : <ChevronDownIcon width={24} />}
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent align={align} className="w-auto">
                <div className="flex py-2">
                    {/* Title and calendar */}
                    <div className="flex">
                        <div className="flex flex-col">
                            {/* Part above the calendars */}
                            <div className="flex flex-col lg:flex-row gap-2 px-3 justify-end items-center lg:items-start pb-4 lg:pb-0">
                                {/* Show compare button */}
                                <CompareButton
                                    showCompare={showCompare}
                                    range={range}
                                    setRange={setRange}
                                    rangeCompare={rangeCompare}
                                    setRangeCompare={setRangeCompare}
                                />
                                {/* Show input date line in the box*/}
                                <DateInputLine
                                    range={range}
                                    setRange={setRange}
                                    rangeCompare={rangeCompare}
                                    setRangeCompare={setRangeCompare}
                                />
                            </div>
                            {/* Part above calendars on small screens */}
                            {isSmallScreen && (
                                // 'Select' with PRESET dates
                                <Select
                                    defaultValue={selectedPreset}
                                    onValueChange={(value) => {
                                        setPreset(value);
                                    }}
                                >
                                    <SelectTrigger className="w-[180px] mx-auto mb-2">
                                        <SelectValue placeholder="Select..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PRESETS.map((preset) => (
                                            <SelectItem key={preset.name} value={preset.name}>
                                                {preset.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                            {/* Calendar */}
                            <div>
                                <CalendarPicker isSmallScreen={isSmallScreen} range={range} setRange={setRange} />
                            </div>
                        </div>
                    </div>
                    {/* PRESETS on the right */}
                    {!isSmallScreen && (
                        <div className="flex flex-col items-end gap-1 pr-2 ">
                            <div className="flex w-full flex-col items-end gap-1 pr-2 pl-6 pb-6">
                                {PRESETS.map((preset) => (
                                    <PresetButton
                                        key={preset.name}
                                        preset={preset.name}
                                        label={preset.label}
                                        isSelected={selectedPreset === preset.name}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                {/* Confirm and Cancel button */}
                <div className="flex justify-end gap-2 py-2 pr-4">
                    <Button
                        onClick={() => {
                            setIsOpen(false);
                            resetValues();
                        }}
                        variant="ghost"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => {
                            setIsOpen(false);
                            if (
                                !areRangesEqual(range, openedRangeRef.current) ||
                                !areRangesEqual(rangeCompare, openedRangeCompareRef.current)
                            ) {
                                onUpdate?.({ range, rangeCompare });
                            }
                        }}
                    >
                        Confirmar
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}

DateRangePicker.displayName = "DateRangePicker";
DateRangePicker.filePath = "@/pages/Dashboard/Dashboard/date-range-picker.tsx";
