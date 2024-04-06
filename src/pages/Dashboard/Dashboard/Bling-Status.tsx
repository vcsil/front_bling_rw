import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FileBarChart } from "lucide-react";

import { BlingOrderStatus, BlingStatusProps, OrderSalesStatusProps } from "@/pages/Dashboard/Dashboard/types";
import useGetOrderStatus from "@/hooks/api/useGetOrderStatus";
import { useEffect, useState } from "react";

const _init_colors =
    "bg-[#E9DC40] bg-[#3FB57A] bg-[#CBCBCB] bg-[#0065F9] bg-[#FF7835] bg-[#FF66E3] bg-[#85F39E] bg-[#c946e6] bg-[#00fbff] bg-[#fff700] bg-[#ff0000] bg-[#ffa200] bg-[#006b07] bg-[#ff5cd3] bg-[#E9DC40] bg-[#3FB57A] bg-[#CBCBCB] bg-[#0065F9]";

function OrderSalesStatus({ status, quantity, color, total }: OrderSalesStatusProps): JSX.Element {
    const tailwindColor = `bg-[${color}]`;

    return (
        <div className="py-3 space-y-2">
            <div className="flex justify-between">
                <p>{status}</p>
                <p>
                    {quantity}/{total}
                </p>
            </div>
            <Progress value={(quantity / total) * 100} className="h-1.5" indicatorColor={tailwindColor} />
        </div>
    );
}

export default function BlingStatus({ dateRange }: BlingStatusProps): JSX.Element {
    const [orderStatus, setOrderStatus] = useState<BlingOrderStatus[]>([]);
    const [orderTotal, setOrderTotal] = useState<number>(0);

    const { getOrderStatus } = useGetOrderStatus();

    async function blingOrderStatus() {
        const orderStatusPeriod = await getOrderStatus(dateRange);

        setOrderTotal(orderStatusPeriod.total);
        setOrderStatus(orderStatusPeriod.blingOrderStatus);
        return;
    }

    useEffect(() => {
        blingOrderStatus().catch((e) => console.log("BlingStatus: " + e));
    }, [dateRange]);

    return (
        <>
            <Card className="col-span-6 min-[1140px]:col-span-3 min-[1360px]:col-span-2">
                <CardHeader className="flex-row items-center">
                    <FileBarChart />
                    <CardTitle className="text-xl pl-2 mt-0">Bling Status</CardTitle>
                </CardHeader>
                <Separator />

                <CardContent className="pt-2">
                    <ScrollArea className="h-[300px] min-[1140px]:h-[450px] min-[1360px]:h-[300px]">
                        {orderStatus.map((status, index) => (
                            <OrderSalesStatus
                                status={status.nome}
                                quantity={Number(status.total)}
                                color={status.cor}
                                total={orderTotal}
                                key={index}
                            />
                        ))}
                    </ScrollArea>
                </CardContent>
            </Card>
        </>
    );
}
