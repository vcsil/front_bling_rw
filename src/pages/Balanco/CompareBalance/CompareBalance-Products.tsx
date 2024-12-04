import { useEffect, useState } from "react";
import styled from "styled-components";

import useGetDivergentProducts from "@/hooks/api/Balance/useGetDivergentProducts";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "react-router-dom";
import { DivergentroductsT } from "../types";

export default function CompareBalanceProducts() {
    const [divergentProducts, setDivergentProducts] = useState<DivergentroductsT[]>([]);
    const { idDeposit, dateBalance } = useParams();

    const { getDivergentProducts, divergentProductsError, divergentProductsLoading } = useGetDivergentProducts();

    useEffect(() => {
        if (idDeposit && dateBalance) {
            getDivergentProducts(Number(idDeposit), new Date(dateBalance))
                .then((divergent) => setDivergentProducts(divergent))
                .catch((e) => console.log(e));
        }
    }, [idDeposit, dateBalance]);

    return (
        <>
            <Titulo>Comparação de estoque</Titulo>
            <div className="flex flex-wrap md:grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {divergentProductsError || divergentProductsLoading ? (
                    <Card className="sm:flex cursor-pointer w-full">
                        <div className="h-full w-full pt-4 pb-3 px-3 space-y-2">
                            <Skeleton className="w-full h-52 flex justify-center items-center rounded-sm" />
                            <CardContent className="p-0">
                                <Skeleton className="h-6 w-full mb-2" />
                                <Skeleton className="h-4 w-1/3 font-medium mb-1" />
                                <div className="grid gap-2 grid-cols-3 w-full">
                                    <Skeleton className="h-3 mt-3" />
                                    <Skeleton className="h-3 mt-3" />
                                    <Skeleton className="h-3 mt-3" />
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                ) : (
                    divergentProducts.map((product, index) => (
                        <Card className="sm:flex cursor-pointer w-full" key={index}>
                            <div className="h-full w-full pt-4 pb-3 px-3 space-y-2">
                                <div className="w-full h-52 flex justify-center items-center rounded-sm">
                                    <img src={product.dir_image || "/no-image.svg"} alt={product.nome} className="h-full " />
                                </div>
                                <CardContent className="p-0">
                                    <div className="text-2xl font-bold mb-2 overflow-hidden text-ellipsis text-nowrap" title={product.nome}>
                                        {product.nome}
                                    </div>
                                    <div className="text-base font-medium mb-1">{product.codigo}</div>
                                    <div className="grid gap-2 grid-cols-3 w-full">
                                        <div className="text-base font-light text-left">Antes: {product.saldo_antes}</div>
                                        <div className="text-base font-light text-center">Depois: {product.saldo_depois}</div>
                                        {product.saldo_depois - product.saldo_antes > 0 ? (
                                            <div className="text-base font-normal text-green-500 text-right">
                                                Dif.: {product.saldo_depois - product.saldo_antes}
                                            </div>
                                        ) : (
                                            <div className="text-base font-normal text-red-500  text-right">
                                                Dif.: {product.saldo_depois - product.saldo_antes}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </>
    );
}

const Titulo = styled.h1`
    font-weight: 700;
    font-size: 40px;
    margin-bottom: 20px;
`;
