import { ThumbsUp, ArrowUp, ArrowDown, ThumbsDown, ShoppingCart, BarChart3, PieChart } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { DateRange } from "@/pages/Dashboard/Dashboard/date-range-picker/types/types-picker";
import { formatMoeda, formatPercentToString } from "@/pages/Dashboard/Dashboard/utils";
import { CardsProps } from "@/pages/Dashboard/Dashboard/types";
import useGetMainCards from "@/hooks/api/useGetMainCards";
import { useEffect, useState } from "react";

export default function ResumeCards({
    rangeDateMain,
    rangeDateCompare,
    situationsSales,
}: {
    rangeDateMain: DateRange;
    rangeDateCompare: DateRange;
    situationsSales: string[];
}) {
    const initialValuesCards = {
        amount: 0,
        oldAmount: 0,
        percent: 0,
    };
    const [ordersProps, setOrdersProps] = useState<CardsProps>(initialValuesCards);
    const [productsProps, setProductsProps] = useState<CardsProps>(initialValuesCards);
    const [valueProps, setValueProps] = useState<CardsProps>(initialValuesCards);
    const [ticketProps, setTicketProps] = useState<CardsProps>(initialValuesCards);

    const { getMainCards } = useGetMainCards();

    async function mainCards() {
        const cards = await getMainCards({ main: rangeDateMain, compare: rangeDateCompare, situationsSales });

        setOrdersProps(cards.salesOrdersQuantity);
        setProductsProps(cards.productsSoldQuantity);
        setValueProps(cards.amountInvoiced);
        setTicketProps(cards.averageTicket);

        return;
    }

    useEffect(() => {
        mainCards().catch((e) => console.log(e));
        // console.log("oi");
    }, [rangeDateMain, rangeDateCompare, situationsSales]);

    const ordersGrowth: boolean = ordersProps.percent > 0;
    const productsGrowth: boolean = productsProps.percent > 0;
    const valueGrowth: boolean = valueProps.percent > 0;
    const ticketGrowth: boolean = ticketProps.percent > 0;

    return (
        <div className="grid gap-4 md:grid-cols-2 min-[1140px]:grid-cols-4">
            <Card className="flex">
                <div className="flex justify-center items-center w-1/3">
                    {ordersGrowth ? <ThumbsUp color="#21A747" /> : <ThumbsDown color="#DF3447" />}
                </div>
                <div className="h-full w-full pt-4 pb-3 pr-3 space-y-2">
                    <CardHeader className="flex flex-row items-center justify-between  p-0">
                        <CardTitle className="text-base font-medium">Pedidos de venda</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="text-2xl font-bold mb-3">{ordersProps.amount}</div>
                        <div>
                            <Progress value={ordersProps.percent / 100} className="h-0.5 mb-1" />
                            <div className="flex justify-between items-center ">
                                <div className="flex items-center">
                                    {ordersGrowth ? <ArrowUp size={14} color="#21A747" /> : <ArrowDown size={14} color="#DF3447" />}
                                    <p className="text-sm text-muted-foreground text-center ml-1">
                                        {formatPercentToString(ordersProps.percent)}
                                    </p>
                                </div>
                                <p className="text-sm text-muted-foreground">{ordersProps.oldAmount} pedidos</p>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
            <Card className="flex">
                <div className="flex justify-center items-center w-1/3">
                    {productsGrowth ? <ShoppingCart color="#21A747" /> : <ShoppingCart color="#DF3447" />}
                </div>
                <div className="h-full w-full pt-4 pb-3 pr-3 space-y-2">
                    <CardHeader className="flex flex-row items-center justify-between  p-0">
                        <CardTitle className="text-base font-medium">Produtos vendidos</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="text-2xl font-bold mb-3">{productsProps.amount}</div>
                        <div>
                            <Progress value={productsProps.percent / 100} className="h-0.5 mb-1" />
                            <div className="flex justify-between items-center ">
                                <div className="flex items-center">
                                    {productsGrowth ? <ArrowUp size={14} color="#21A747" /> : <ArrowDown size={14} color="#DF3447" />}
                                    <p className="text-sm text-muted-foreground text-center ml-1">
                                        {formatPercentToString(productsProps.percent)}
                                    </p>
                                </div>
                                <p className="text-sm text-muted-foreground">{productsProps.oldAmount} peças</p>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
            <Card className="flex">
                <div className="flex justify-center items-center w-1/3">
                    {valueGrowth ? <BarChart3 color="#21A747" /> : <BarChart3 color="#DF3447" />}
                </div>
                <div className="h-full w-full pt-4 pb-3 pr-3 space-y-2">
                    <CardHeader className="flex flex-row items-center justify-between  p-0">
                        <CardTitle className="text-base font-medium">Valor faturado</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="text-2xl font-bold mb-3">{formatMoeda(valueProps.amount)}</div>
                        <div>
                            <Progress value={valueProps.percent / 100} className="h-0.5 mb-1" />
                            <div className="flex justify-between items-center ">
                                <div className="flex items-center">
                                    {valueGrowth ? <ArrowUp size={14} color="#21A747" /> : <ArrowDown size={14} color="#DF3447" />}
                                    <p className="text-sm text-muted-foreground text-center ml-1">
                                        {formatPercentToString(valueProps.percent)}
                                    </p>
                                </div>
                                <p className="text-sm text-muted-foreground">{formatMoeda(valueProps.oldAmount)}</p>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
            <Card className="flex">
                <div className="flex justify-center items-center w-1/3">
                    {ticketGrowth ? <PieChart color="#21A747" /> : <PieChart color="#DF3447" />}
                </div>
                <div className="h-full w-full pt-4 pb-3 pr-3 space-y-2">
                    <CardHeader className="flex flex-row items-center justify-between  p-0">
                        <CardTitle className="text-base font-medium">Ticket Médio</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="text-2xl font-bold mb-3">{formatMoeda(ticketProps.amount)}</div>
                        <div>
                            <Progress value={ticketProps.percent / 100} className="h-0.5 mb-1" />
                            <div className="flex justify-between items-center ">
                                <div className="flex items-center">
                                    {ticketGrowth ? <ArrowUp size={14} color="#21A747" /> : <ArrowDown size={14} color="#DF3447" />}
                                    <p className="text-sm text-muted-foreground text-center ml-1">
                                        {formatPercentToString(ticketProps.percent)}
                                    </p>
                                </div>
                                <p className="text-sm text-muted-foreground">{formatMoeda(ticketProps.oldAmount)}</p>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
}
