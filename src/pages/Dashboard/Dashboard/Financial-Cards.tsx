import { useEffect, useState } from "react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { FinancialCardsProps, CardFinancialProps, CardComponentCarouselProps, FinancialCardsData } from "@/pages/Dashboard/Dashboard/types";
import { formatMoeda, formatPercentToString } from "@/pages/Dashboard/Dashboard/utils";
import useGetFinancialCards from "@/hooks/api/useGetFinancialCards";

function CardComponent({ card, isPercent, setIsPercent, isLast, isSmallScreen }: CardFinancialProps): JSX.Element {
    const isPositive = card.percent > 0;

    function financialCardClick() {
        setIsPercent(!isPercent);
    }

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center py-8">
                <button className="flex cursor-pointer" onClick={financialCardClick} onKeyDown={financialCardClick}>
                    {isPositive ? (
                        <>
                            <ArrowBigUp color="var(--cor-verde)" />
                            <h3 className="text-[var(--cor-verde)]">
                                {isPercent
                                    ? formatPercentToString(card.percent)
                                    : card.name === "Margem Lucro"
                                      ? formatPercentToString(card.compare)
                                      : formatMoeda(card.compare)}
                            </h3>
                        </>
                    ) : (
                        <>
                            <ArrowBigDown color="var(--cor-vermelho)" />
                            <h3 className="text-[var(--cor-vermelho)]">
                                {isPercent
                                    ? formatPercentToString(card.percent)
                                    : card.name === "Margem Lucro"
                                      ? formatPercentToString(card.compare)
                                      : formatMoeda(card.compare)}
                            </h3>
                        </>
                    )}
                </button>
                <h3 className="text-xl font-bold">
                    {card.name === "Margem Lucro" ? formatPercentToString(card.main) : formatMoeda(card.main)}
                </h3>
                <h3 className="text-lg">{card.name}</h3>
            </div>
            {!isLast && <Separator orientation={!isSmallScreen ? "vertical" : "horizontal"} />}
        </>
    );
}

function CardComponentCarousel({ card, isPercent, setIsPercent }: CardComponentCarouselProps): JSX.Element {
    const isPositive = card.percent > 0;

    function financialCardClick() {
        setIsPercent(!isPercent);
    }

    return (
        <CarouselItem className="min-[1140px]:w-20">
            <Card className="flex justify-center items-center py-5 border-0 min-[1140px]:border">
                <div className="flex flex-col justify-center items-center">
                    <button className="flex mb-1.5 cursor-pointer" onClick={financialCardClick} onKeyDown={financialCardClick}>
                        {isPositive ? (
                            <>
                                <ArrowBigUp color="var(--cor-verde)" />
                                <h3 className="text-[var(--cor-verde)]">
                                    {isPercent
                                        ? formatPercentToString(card.percent)
                                        : card.name === "Margem Lucro"
                                          ? formatPercentToString(card.compare)
                                          : formatMoeda(card.compare)}
                                </h3>
                            </>
                        ) : (
                            <>
                                <ArrowBigDown color="var(--cor-vermelho)" />
                                <h3 className="text-[var(--cor-vermelho)]">
                                    {isPercent
                                        ? formatPercentToString(card.percent)
                                        : card.name === "Margem Lucro"
                                          ? formatPercentToString(card.compare)
                                          : formatMoeda(card.compare)}
                                </h3>
                            </>
                        )}
                    </button>
                    <h3 className="text-xl font-bold">
                        {card.name === "Percentual" ? formatPercentToString(card.main) : formatMoeda(card.main)}
                    </h3>
                    <h3 className="text-lg">{card.name}</h3>
                </div>
            </Card>
        </CarouselItem>
    );
}

export default function FinancialCards({ rangeDateMain, rangeDateCompare }: FinancialCardsProps): JSX.Element {
    const [isSmallScreen, setIsSmallScreen] = useState(typeof window !== "undefined" ? window.innerWidth < 1360 : false);
    const [isPercent, setIsPercent] = useState<boolean>(true);

    const initialValuesCards = {
        name: "Loading...",
        main: 0,
        compare: 0,
        percent: 0,
    };
    const [cards, setCards] = useState<FinancialCardsData[]>([
        initialValuesCards,
        initialValuesCards,
        initialValuesCards,
        initialValuesCards,
        initialValuesCards,
    ]);

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

    const { getFinancialCards } = useGetFinancialCards();

    async function financialCards() {
        const cardsApi = await getFinancialCards({ rangeDateMain, rangeDateCompare });

        setCards(cardsApi);

        return;
    }

    useEffect(() => {
        financialCards().catch((e) => console.log(e));
        // console.log("oi");
    }, [rangeDateMain, rangeDateCompare]);

    return (
        <div className="col-span-6 min-[1140px]:col-span-3 min-[1360px]:col-span-5 block min-[1360px]:flex  w-full rounded-lg shadow-sm border-0 min-[1360px]:border">
            {isSmallScreen ? (
                <div className="flex justify-center items-center h-full w-full">
                    <Carousel>
                        <CarouselContent>
                            {cards.map((card, index) => (
                                <CardComponentCarousel card={card} isPercent={isPercent} setIsPercent={setIsPercent} key={index} />
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            ) : (
                cards.map((card, index) => (
                    <CardComponent
                        card={card}
                        isPercent={isPercent}
                        setIsPercent={setIsPercent}
                        key={index}
                        isLast={index === cards.length - 1}
                        isSmallScreen={isSmallScreen}
                    />
                ))
            )}
        </div>
    );
}
