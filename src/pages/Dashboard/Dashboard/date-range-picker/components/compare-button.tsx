import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { CompareButtonProps } from "@/pages/Dashboard/Dashboard/date-range-picker/types/types-picker";

export default function CompareButton({ showCompare, range, setRange, rangeCompare, setRangeCompare }: CompareButtonProps): JSX.Element {
    return (
        <>
            {showCompare && (
                <>
                    <div className="flex items-center space-x-2 pr-4 py-1">
                        <Switch
                            defaultChecked={Boolean(rangeCompare)}
                            onCheckedChange={(checked: boolean) => {
                                if (checked) {
                                    if (!range.to) {
                                        setRange({
                                            from: range.from,
                                            to: range.from,
                                        });
                                    }
                                    setRangeCompare({
                                        from: new Date(range.from.getFullYear(), range.from.getMonth(), range.from.getDate() - 365),
                                        to: range.to
                                            ? new Date(range.to.getFullYear() - 1, range.to.getMonth(), range.to.getDate())
                                            : new Date(range.from.getFullYear() - 1, range.from.getMonth(), range.from.getDate()),
                                    });
                                } else {
                                    setRangeCompare(undefined);
                                }
                            }}
                            id="compare-mode"
                        />
                        <Label htmlFor="compare-mode">Compare</Label>
                    </div>
                </>
            )}
        </>
    );
}
