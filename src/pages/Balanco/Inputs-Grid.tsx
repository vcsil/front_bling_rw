import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { DepositsT, InputsGridProps } from "./types";
import useGetDeposits from "@/hooks/api/Balance/useGetDeposits";
import { useEffect, useState } from "react";
import AlertModal from "@/components/modals/alertModal";

export default function InputsGrid({
    idDeposit,
    setIdDeposit,
    totalRead,
    unit,
    setUnit,
    codeProduct,
    setCodeProduct,
}: InputsGridProps): JSX.Element {
    const [depositAlert, setDepositAlert] = useState<boolean>(false);
    const [allDeposits, setAllDeposits] = useState<DepositsT[]>([{ id: 0, nome: "carregando.." }]);
    const { getDeposits } = useGetDeposits();

    async function getAllDeposits() {
        const cardsApi = await getDeposits();

        setAllDeposits(cardsApi);

        return;
    }

    useEffect(() => {
        getAllDeposits().catch((e) => console.log(e));
        // console.log("oi");
    }, []);

    function alterDeposit(nameDeposit: string) {
        const deposit = allDeposits.find((dep) => dep.nome === nameDeposit);

        if (deposit) {
            setIdDeposit(deposit.id);
        }
    }

    function alterUnit(e: React.ChangeEvent<HTMLInputElement>) {
        const quantity = Number(e.target.value);
        if (quantity > 0) {
            setUnit(quantity);
        }
    }

    function alterIdProduct(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            if (allDeposits.find((dep) => dep.id === idDeposit)) {
                setCodeProduct(Number(e.target.value));
                e.target.value = "";
                e.preventDefault();
                return;
            }
            setDepositAlert(!depositAlert);
            e.preventDefault();
        }
    }

    return (
        <div className="grid gap-4 grid-cols-2 min-[1360px]:grid-cols-5">
            <div className="col-span-2 min-[1360px]:col-span-3 space-y-1.5">
                <Label htmlFor="deposit">Depósito</Label>
                <Select onValueChange={alterDeposit} disabled={Boolean(idDeposit)}>
                    <SelectTrigger id="deposit">
                        <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        {allDeposits.map((deposit, index) => (
                            <SelectItem key={index} value={deposit.nome}>
                                {deposit.nome}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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
                <Input id="code" onKeyDown={alterIdProduct} />
            </div>
            {depositAlert ? (
                <AlertModal
                    title={"Selecione o depósito"}
                    description={"Para iniciar a contagem das peças é necessário definir qual deposito sera considerado."}
                    show={depositAlert}
                    setShow={setDepositAlert}
                />
            ) : null}
        </div>
    );
}
