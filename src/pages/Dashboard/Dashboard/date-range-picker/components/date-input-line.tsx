import { DateInputLineProps } from "@/pages/Dashboard/Dashboard/date-range-picker/types/types-picker";
import DateInput from "@/pages/Dashboard/Dashboard/date-range-picker/date-input";

export default function DateInputLine({ range, setRange, rangeCompare, setRangeCompare }: DateInputLineProps): JSX.Element {
    return (
        <div className="flex flex-col w-full justify-evenly">
            <div className="flex w-full justify-evenly items-center">
                <DateInput
                    id="1-"
                    value={range.from}
                    onChange={(date) => {
                        const toDate = range.to == null || date > range.to ? date : range.to;
                        setRange((prevRange) => ({
                            ...prevRange,
                            from: date,
                            to: toDate,
                        }));
                    }}
                />
                <div className="py-1 text-sm">até</div>
                <DateInput
                    id="2-"
                    value={range.to}
                    onChange={(date) => {
                        const fromDate = date < range.from ? date : range.from;
                        setRange((prevRange) => ({
                            ...prevRange,
                            from: fromDate,
                            to: date,
                        }));
                    }}
                />
            </div>
            {/* Show date line comparation */}
            {rangeCompare != null && (
                <>
                    <div className="flex w-full justify-evenly">
                        <DateInput
                            id="11-"
                            value={rangeCompare?.from}
                            onChange={(date) => {
                                if (rangeCompare) {
                                    const compareToDate = rangeCompare.to == null || date > rangeCompare.to ? date : rangeCompare.to;
                                    setRangeCompare((prevRangeCompare) => ({
                                        ...prevRangeCompare,
                                        from: date,
                                        to: compareToDate,
                                    }));
                                } else {
                                    setRangeCompare({
                                        from: date,
                                        to: new Date(),
                                    });
                                }
                            }}
                        />
                        <div className="py-1 text-sm">até</div>
                        <DateInput
                            id="22-"
                            value={rangeCompare?.to}
                            onChange={(date) => {
                                if (rangeCompare && rangeCompare.from) {
                                    const compareFromDate = date < rangeCompare.from ? date : rangeCompare.from;
                                    setRangeCompare({
                                        ...rangeCompare,
                                        from: compareFromDate,
                                        to: date,
                                    });
                                }
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
