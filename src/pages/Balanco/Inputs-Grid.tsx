import { useEffect } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import useGetDeposits from "@/hooks/api/Balance/useGetDeposits";
import { InputsGridProps } from "@/pages/Balanco/types";
import { Card } from "@/components/ui/card";

export default function InputsGrid({
    idDeposit,
    setIdDeposit,
    idDepositLocalStorage,
    setIdDepositLocalStorage,
    unit,
    setUnit,
    codeProduct,
    setCodeProduct,
    logsProducts,
    errorHandling,
    addLogsProducts,
    BoxAviso,
    product,
    totalRead,
}: InputsGridProps): JSX.Element {
    const { deposits, depositsLoading, depositsError } = useGetDeposits();
    useEffect(() => {
        if (depositsError && depositsError instanceof Error) {
            errorHandling(depositsError);
        }
    }, [depositsError]);

    function alterDeposit(nameDeposit: string) {
        if (deposits) {
            const deposit = deposits.find((dep) => dep.nome === nameDeposit);

            if (deposit) {
                setIdDeposit(deposit.id);
                setIdDepositLocalStorage([{ idDeposit: deposit.id, nome: deposit.nome }]);
            }
            return;
        }
    }

    function alterUnit(e: React.ChangeEvent<HTMLInputElement>) {
        const quantity = Number(e.target.value);
        if (quantity > 0) {
            setUnit(quantity);
        }
    }

    function alterCodeProduct(e: React.KeyboardEvent<HTMLInputElement> & { target: { value: string } }) {
        if (e.key === "Enter") {
            // Só inclui produto se o deposito estiver selecionado
            if (idDeposit) {
                // Verifica se o produto é repetido pois não altera o estado para ativar o useEffect.
                const repeatedProduct = codeProduct === e.target.value;
                if (product && repeatedProduct) {
                    addLogsProducts(
                        logsProducts && logsProducts.length > 0 ? logsProducts[logsProducts.length - 1].id + 3 : 1,
                        Number(product.id_bling),
                        unit,
                        product.codigo,
                        product.nome,
                    );
                }

                setCodeProduct(e.target.value);
                e.target.value = "";

                e.preventDefault();
                return;
            }

            BoxAviso("Selecione o depósito!", "Para iniciar a contagem das peças é necessário definir qual depósito será considerado.");
            e.preventDefault();
            return;
        }
    }

    return (
        <div className="grid gap-4 grid-cols-2 min-[1360px]:grid-cols-5">
            <div className="col-span-2 min-[1360px]:col-span-3 space-y-1.5">
                <Label htmlFor="deposit">Depósito</Label>
                {depositsLoading || depositsError ? (
                    <Card className="h-10 flex items-center" id="deposit">
                        <Skeleton className="w-1/3 h-[10px] m-2" />
                    </Card>
                ) : (
                    <Select onValueChange={alterDeposit} disabled={Boolean(idDeposit)}>
                        <SelectTrigger id="deposit">
                            <SelectValue placeholder={idDepositLocalStorage[0]?.nome || "Selecione"} />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {deposits?.map((deposit, index) => (
                                <SelectItem key={index} value={deposit.nome}>
                                    {deposit.nome}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>
            <div className="col-span-2 lg:col-span-1 min-[1360px]:col-span-2 space-y-1.5">
                <Label htmlFor="read">Total lidos</Label>
                <Input id="read" disabled={true} value={totalRead} />
            </div>
            <div className="col-span-2 lg:col-span-1 min-[1360px]:col-span-2 space-y-1.5">
                <Label htmlFor="unit">Quantidade a ser lida</Label>
                <Input type="number" id="unit" value={unit} onChange={alterUnit} />
            </div>
            <div className="col-span-2 min-[1360px]:col-span-3 space-y-1.5">
                <Label htmlFor="code">Código do produto</Label>
                <Input id="code" onKeyDown={alterCodeProduct} />
            </div>
        </div>
    );
}
