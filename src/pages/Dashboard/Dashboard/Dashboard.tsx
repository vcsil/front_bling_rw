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

    const [rangeDate, setRangeDate] = useState<DateRange>({
        from: new Date(dashboardData.dateRange.from),
        to: new Date(dashboardData.dateRange.to),
    });

    function updateRangeDate(newRangeDate: DateRange): void {
        setRangeDate(newRangeDate);

        const newRangeDateTime = {
            from: newRangeDate.from.getTime(),
            to: newRangeDate.to.getTime(),
        };
        setDashboardData({ ...dashboardData, dateRange: newRangeDateTime });
    }

    return (
        <>
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsContent value="overview" className="space-y-4">
                    <FilterOptions rangeDate={rangeDate} setRangeDate={updateRangeDate} />
                    <ResumeCards />
                    <div className="grid gap-4 grid-cols-6 min-[1360px]:grid-cols-5">
                        <Markup rangeDate={rangeDate} />
                        <BlingStatus categoriesData={categories_data} />
                        <CardsMid cards={mid_cards_data} />
                    </div>
                </TabsContent>
            </Tabs>
        </>
    );
}
