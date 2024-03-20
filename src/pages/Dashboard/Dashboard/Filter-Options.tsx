import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

import { Separator } from "@/components/ui/separator";

import { FancyMultiSelect } from "@/pages/Dashboard/Dashboard/multi-select/fancy-multi-select";
import { DateRangePicker } from "@/pages/Dashboard/Dashboard/date-range-picker/date-range-picker";
import { FilterOptionsProps } from "@/pages/Dashboard/Dashboard//types";

export default function FilterOptions({ rangeDateMain, rangeDateCompare, setRangeDateMain }: FilterOptionsProps): JSX.Element {
    return (
        <div className="grid gap-4 grid-cols-2 min-[1360px]:grid-cols-10">
            <Card className="col-span-2 min-[1360px]:col-span-4">
                <CardContent className="p-0 items-center">
                    <FancyMultiSelect />
                </CardContent>
            </Card>
            <Card className="col-span-2 lg:col-span-1 min-[1360px]:col-span-3">
                <CardContent className="px-3 py-1 h-full w-full min-h-9">
                    <div className="flex h-full items-center space-x-2">
                        <div className="flex h-full items-center space-x-2">
                            <CalendarDays size={16} />
                            <h4 style={{ width: "52px" }} className="text-xs">
                                Periodo
                            </h4>
                        </div>
                        <Separator orientation="vertical" />
                        <div className="flex h-full w-full">
                            <DateRangePicker
                                onUpdate={(values) => setRangeDateMain(values.range, "main")}
                                initialDateFrom={rangeDateMain.from}
                                initialDateTo={rangeDateMain.to}
                                align="start"
                                locale="pt-BR"
                                showCompare={false}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="col-span-2 lg:col-span-1 min-[1360px]:col-span-3">
                <CardContent className="px-3 py-1 h-full w-full min-h-9">
                    <div className="flex h-full items-center space-x-2">
                        <div className="flex h-full items-center space-x-2">
                            <CalendarDays size={16} />
                            <h4 className="text-xs">Comparar</h4>
                        </div>
                        <Separator orientation="vertical" />
                        <div className="flex h-full w-full">
                            <DateRangePicker
                                onUpdate={(values) => setRangeDateMain(values.range, "compare")}
                                initialDateFrom={rangeDateCompare.from}
                                initialDateTo={rangeDateCompare.to}
                                align="start"
                                locale="pt-BR"
                                showCompare={false}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
