import { useContext, useEffect, useState } from "react";
import { ThemeProviderContext } from "@/components/theme-provider";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormattedDate } from "@/pages/Dashboard/Dashboard/date-range-picker/utils/utils-picker";
import { MarkupProps, OrderSalesPerDayT } from "@/pages/Dashboard/Dashboard/types";
import Chart from "@/components/amCharts5/Markup/MarkupChart";
import { TrendingUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import useGetSalesPerDay from "@/hooks/api/useGetSalesPerDay";

export default function Markup({ rangeDateMain: rangeDate, situationsSales }: MarkupProps) {
    const { colors: themeColors } = useContext(ThemeProviderContext);

    const [salesPerDay, setSalesPerDay] = useState<OrderSalesPerDayT[]>([]);

    const dateRangeFrom = useFormattedDate(rangeDate.from, "pt-br");
    const dateRangeTo = useFormattedDate(rangeDate.to, "pt-br");

    const { getSalesPerDay } = useGetSalesPerDay();

    async function orderSalesPerDay() {
        const salesPDay = await getSalesPerDay(rangeDate, situationsSales);

        const salesPDayFormatted = salesPDay.map((obj) => ({
            date: new Date(obj.date).getTime(),
            value: Number(obj.value),
        }));

        setSalesPerDay(salesPDayFormatted);
        return;
    }

    useEffect(() => {
        orderSalesPerDay().catch((e) => console.log(`Markup ${e}`));
    }, [rangeDate, situationsSales]);

    return (
        <>
            <Card className="col-span-6 min-[1360px]:col-span-3">
                <CardHeader className="flex-row items-center">
                    <TrendingUp />
                    <CardTitle className="text-xl pl-2 mt-0">Markup - (Custo direto - Faturamento Líquido)</CardTitle>
                </CardHeader>
                <Separator />
                <CardDescription className="text-center pt-2">
                    Vendas: {dateRangeFrom} até {dateRangeTo}
                </CardDescription>
                <CardContent className="px-0 items-center">
                    <Chart data={salesPerDay} themeColors={themeColors} />
                </CardContent>
            </Card>
        </>
    );
}
