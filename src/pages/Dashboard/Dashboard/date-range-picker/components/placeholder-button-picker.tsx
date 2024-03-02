import { PlaceholderButtonProps } from "@/pages/Dashboard/Dashboard/date-range-picker/types/types-picker";
import { useFormattedDate } from "@/pages/Dashboard/Dashboard/date-range-picker/utils/utils-picker";

export default function PlaceholderButton({ locale, range, rangeCompare }: PlaceholderButtonProps): JSX.Element {
    const dateRangeFrom = useFormattedDate(range.from, locale);
    const dateRangeTo = useFormattedDate(range.to, locale);
    const equalsRangeDate = dateRangeFrom === dateRangeTo;

    function useFormatCompareDate(): JSX.Element | undefined {
        const dateRangeCompareFrom = useFormattedDate(rangeCompare?.from, locale);
        const dateRangeCompareTo = useFormattedDate(rangeCompare?.to, locale);
        const equalsRangeCompareDate = dateRangeCompareFrom === dateRangeCompareTo;

        if (rangeCompare?.from) {
            return (
                <div className="opacity-60 text-xs -mt-1">
                    {/* Check if there are two dates and if they are different */}
                    {rangeCompare.to && !equalsRangeCompareDate && (
                        <>
                            vs. {dateRangeCompareFrom} até {dateRangeCompareTo}
                        </>
                    )}
                    {/* Check if there is only one date and if they are the same */}
                    {(!rangeCompare.to || equalsRangeCompareDate) && <>vs. {dateRangeCompareFrom}</>}
                </div>
            );
        }
    }

    return (
        <div className="text-right w-full flex flex-col items-center justify-center">
            <div className="py-1">
                {/* Check if there are two dates and if they are different */}
                {range.to && !equalsRangeDate && (
                    <div>
                        {dateRangeFrom} até {dateRangeTo}
                    </div>
                )}
                {/* Check if there is only one date and if they are the same */}
                {(!range.to || equalsRangeDate) && <div>{dateRangeFrom}</div>}
            </div>
            {useFormatCompareDate()}
        </div>
    );
}
