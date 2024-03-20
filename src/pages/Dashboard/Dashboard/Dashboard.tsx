import { Tabs, TabsContent } from "@/components/ui/tabs";

import { DateRange } from "@/pages/Dashboard/Dashboard/date-range-picker/types/types-picker";
import { categories_data, mid_cards_data } from "@/pages/Dashboard/Dashboard/constants";
import FilterOptions from "@/pages/Dashboard/Dashboard/Filter-Options";
import ResumeCards from "@/pages/Dashboard/Dashboard/Resume-Cards";
import BlingStatus from "@/pages/Dashboard/Dashboard/Bling-Status";
import CardsMid from "@/pages/Dashboard/Dashboard/Cards-Mid";
import Markup from "@/pages/Dashboard/Dashboard/Markup";
import { useContext, useState } from "react";
import DashboardContext from "@/hooks/useDashboard";

export default function Dashboard() {
    const { dashboardData, setDashboardData } = useContext(DashboardContext);

    const [rangeDateMain, setRangeDateMain] = useState<DateRange>({
        from: new Date(dashboardData.dateRangeMain.from),
        to: new Date(dashboardData.dateRangeMain.to),
    });
    const [rangeDateCompare, setRangeDateCompare] = useState<DateRange>({
        from: new Date(dashboardData.dateRangeCompare.from),
        to: new Date(dashboardData.dateRangeCompare.to),
    });
    const [situationsSales, setSituationsSales] = useState<string[]>(dashboardData.situationsSales);

    function updateRangeDate(newRangeDate: DateRange, rangeType: "main" | "compare"): void {
        const [setRangeDateFunction, dateRangeKey] =
            rangeType === "main" ? [setRangeDateMain, "dateRangeMain"] : [setRangeDateCompare, "dateRangeCompare"];

        setRangeDateFunction(newRangeDate);

        const newRangeDateTime = {
            from: newRangeDate.from.getTime(),
            to: newRangeDate.to.getTime(),
        };
        setDashboardData({ ...dashboardData, [dateRangeKey]: newRangeDateTime });
    }

    return (
        <>
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsContent value="overview" className="space-y-4">
                    <FilterOptions
                        rangeDateMain={rangeDateMain}
                        rangeDateCompare={rangeDateCompare}
                        setRangeDateMain={updateRangeDate}
                        situationsSales={situationsSales}
                    />
                    <ResumeCards rangeDateMain={rangeDateMain} rangeDateCompare={rangeDateCompare} />
                    <div className="grid gap-4 grid-cols-6 min-[1360px]:grid-cols-5">
                        <Markup rangeDateMain={rangeDateMain} />
                        <BlingStatus categoriesData={categories_data} />
                        <CardsMid cards={mid_cards_data} />
                    </div>
                </TabsContent>
            </Tabs>
        </>
    );
}
