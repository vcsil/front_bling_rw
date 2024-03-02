import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FileBarChart } from "lucide-react";
import { BlingStatusProps, StatusCategoryProps } from "@/pages/Dashboard/Dashboard/types";

function StatusCategory({ category, quantity, color, total }: StatusCategoryProps): JSX.Element {
    return (
        <div className="py-3 space-y-2">
            <div className="flex justify-between">
                <p>{category}</p>
                <p>
                    {quantity}/{total}
                </p>
            </div>
            <Progress value={(quantity / total) * 100} className="h-1.5" indicatorColor={color} />
        </div>
    );
}

export default function BlingStatus({ categoriesData }: BlingStatusProps): JSX.Element {
    const { categories, total } = categoriesData;
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
                        {categories.map((category, index) => (
                            <StatusCategory
                                category={category.category}
                                quantity={category.quantity}
                                color={category.color}
                                total={total}
                                key={index}
                            />
                        ))}
                    </ScrollArea>
                </CardContent>
            </Card>
        </>
    );
}
