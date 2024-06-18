import styled from "styled-components";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import useGetProduct from "@/hooks/api/Balance/useGetProduct";
import InputsGrid from "@/pages/Balanco/Inputs-Grid";
import ProductPhoto from "@/pages/Balanco/ProductPhoto";
import ProductRead from "@/pages/Balanco/ProductRead";
import HistoryRead from "@/pages/Balanco/HistoryRead";
import { BalanceProductT } from "@/pages/Balanco/types";

export default function BalancoPage() {
    const [idDeposit, setIdDeposit] = useState<number>(0);
    const [totalRead, setTotalRead] = useState<number>(0);
    const [unit, setUnit] = useState<number>(1);

    const [codeProduct, setCodeProduct] = useState<number>(0);
    const [product, setProduct] = useState<BalanceProductT>({
        id_bling: "0",
        nome: "Não começado",
        codigo: "0",
        preco: 0,
        produtos_midias: {
            url: "./no-image.svg",
        },
        produtos_estoques: [
            {
                saldo_fisico: 0,
            },
        ],
    });

    const { getProduct } = useGetProduct();

    async function getBalanceProduct() {
        const balanceProduct = await getProduct(idDeposit, codeProduct);

        setProduct(balanceProduct);

        return;
    }

    useEffect(() => {
        if (codeProduct > 0) {
            getBalanceProduct().catch((e) => console.log(e));
        }
        // console.log("oi");
    }, [codeProduct]);

    return (
        <>
            <div defaultValue="overview" className="space-y-4">
                <div className="flex justify-between">
                    <Titulo>Conferência de estoque</Titulo>
                    <div className="flex items-center gap-2">
                        <Button variant={"secondary"}>Reiniciar</Button>
                        <Button>Gerar Balanço</Button>
                    </div>
                </div>
                <div className="grid gap-4 grid-cols-2 min-[1360px]:grid-cols-11">
                    <div className="col-span-2 min-[1360px]:col-span-5 space-y-4">
                        <InputsGrid
                            idDeposit={idDeposit}
                            setIdDeposit={setIdDeposit}
                            totalRead={totalRead}
                            unit={unit}
                            setUnit={setUnit}
                            codeProduct={codeProduct}
                            setCodeProduct={setCodeProduct}
                        />
                        <ProductRead
                            codeProduct={codeProduct}
                            nameProduct={product.nome}
                            reads={0}
                            totalDeposit={product.produtos_estoques[0].saldo_fisico}
                        />
                        <HistoryRead />
                    </div>
                    <div className="col-span-2 min-[1360px]:col-span-6 space-y-1.5">
                        <ProductPhoto imageUrl={product.produtos_midias?.url} productName={product.nome} price={product.preco} />
                    </div>
                </div>
            </div>
        </>
    );
}

const Titulo = styled.h1`
    font-weight: 700;
    font-size: 40px;
`;
