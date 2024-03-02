import { Tabs, TabsContent } from "@/components/ui/tabs";

import { DateRange } from "@/pages/Dashboard/Dashboard/date-range-picker/types/types-picker";
import { categories_data, mid_cards_data } from "@/pages/Dashboard/Dashboard/constants";
import FilterOptions from "@/pages/Dashboard/Dashboard/Filter-Options";
import ResumeCards from "@/pages/Dashboard/Dashboard/Resume-Cards";
import BlingStatus from "@/pages/Dashboard/Dashboard/Bling-Status";
import CardsMid from "@/pages/Dashboard/Dashboard/Cards-Mid";
import Markup from "@/pages/Dashboard/Dashboard/Markup";
import { useState } from "react";

export default function Dashboard() {
    const [initialDateFrom, setTnitialDateFrom] = useState<Date | string>("2024-01-02");
    const [initialDateTo, setTnitialDateTo] = useState<Date | string>("2024-02-02");

    const [rangeDate, setRangeDate] = useState<DateRange>({
        from: new Date(new Date(initialDateFrom).setHours(0, 0, 0, 0)),
        to: initialDateTo
            ? new Date(new Date(initialDateTo).setHours(0, 0, 0, 0))
            : new Date(new Date(initialDateFrom).setHours(0, 0, 0, 0)),
    });

    return (
        <>
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsContent value="overview" className="space-y-4">
                    <FilterOptions rangeDate={rangeDate} setRangeDate={setRangeDate} />
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
