import { useEffect, useState } from "react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { CardsMidProps, MidCardProps, CardComponentCarouselProps } from "@/pages/Dashboard/Dashboard/types";
import { formatMoeda, formatPercent } from "@/pages/Dashboard/Dashboard/utils";

function CardComponent({ card, isLast, isSmallScreen }: MidCardProps): JSX.Element {
    const isPositive = card.percent > 0;

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center py-8">
                <div className="flex">
                    {isPositive ? (
                        <>
                            <ArrowBigUp color="var(--cor-verde)" />
                            <h3 className="text-[var(--cor-verde)]">{formatPercent(card.percent)}</h3>
                        </>
                    ) : (
                        <>
                            <ArrowBigDown color="var(--cor-vermelho)" />
                            <h3 className="text-[var(--cor-vermelho)]">{formatPercent(card.percent)}</h3>
                        </>
                    )}
                </div>
                <h3 className="text-xl font-bold">{formatMoeda(card.value)}</h3>
                <h3 className="text-lg">{card.name}</h3>
            </div>
            {!isLast && <Separator orientation={!isSmallScreen ? "vertical" : "horizontal"} />}
        </>
    );
}

function CardComponentCarousel({ card }: CardComponentCarouselProps): JSX.Element {
    const isPositive = card.percent > 0;
    return (
        <CarouselItem className="min-[1140px]:w-20">
            <Card className="flex justify-center items-center py-5 border-0 min-[1140px]:border">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex mb-1.5">
                        {isPositive ? (
                            <>
                                <ArrowBigUp color="var(--cor-verde)" />
                                <h3 className="text-[var(--cor-verde)]">{formatPercent(card.percent)}</h3>
                            </>
                        ) : (
                            <>
                                <ArrowBigDown color="var(--cor-vermelho)" />
                                <h3 className="text-[var(--cor-vermelho)]">{formatPercent(card.percent)}</h3>
                            </>
                        )}
                    </div>
                    <h3 className="text-xl font-bold">{formatMoeda(card.value)}</h3>
                    <h3 className="text-lg">{card.name}</h3>
                </div>
            </Card>
        </CarouselItem>
    );
}

export default function CardsMid({ cards }: CardsMidProps): JSX.Element {
    const [isSmallScreen, setIsSmallScreen] = useState(typeof window !== "undefined" ? window.innerWidth < 1360 : false);

    useEffect(() => {
        const handleResize = (): void => {
            setIsSmallScreen(window.innerWidth < 1360);
        };

        window.addEventListener("resize", handleResize);

        // Clean up event listener on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="col-span-6 min-[1140px]:col-span-3 min-[1360px]:col-span-5 block min-[1360px]:flex  w-full rounded-lg shadow-sm border-0 min-[1360px]:border">
            {isSmallScreen ? (
                <div className="flex justify-center items-center h-full w-full">
                    <Carousel>
                        <CarouselContent>
                            {cards.map((card, index) => (
                                <CardComponentCarousel card={card} key={index} />
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            ) : (
                cards.map((card, index) => (
                    <CardComponent card={card} key={index} isLast={index === cards.length - 1} isSmallScreen={isSmallScreen} />
                ))
            )}
        </div>
    );
}
