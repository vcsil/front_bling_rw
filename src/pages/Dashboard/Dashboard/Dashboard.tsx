import { Tabs, TabsContent } from "@/components/ui/tabs";

import { DateRange } from "@/pages/Dashboard/Dashboard/date-range-picker/types/types-picker";
import FilterOptions from "@/pages/Dashboard/Dashboard/Filter-Options";
import ResumeCards from "@/pages/Dashboard/Dashboard/Resume-Cards";
import BlingStatus from "@/pages/Dashboard/Dashboard/Bling-Status";
import FinancialCards from "@/pages/Dashboard/Dashboard/Financial-Cards";
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
                        setSituationsSales={setSituationsSales}
                    />
                    <ResumeCards rangeDateMain={rangeDateMain} rangeDateCompare={rangeDateCompare} situationsSales={situationsSales} />
                    <div className="grid gap-4 grid-cols-6 min-[1360px]:grid-cols-5">
                        <Markup rangeDateMain={rangeDateMain} situationsSales={situationsSales} />
                        <BlingStatus dateRange={rangeDateMain} />
                        <FinancialCards rangeDateMain={rangeDateMain} rangeDateCompare={rangeDateCompare} />
                    </div>
                </TabsContent>
            </Tabs>
        </>
    );
}
