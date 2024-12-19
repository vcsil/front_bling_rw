import { useEffect } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useGetDeposits from "@/hooks/api/Balance/useGetDeposits";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface SelectDepositProps {
    idDeposit: number | undefined;
    setIdDeposit: React.Dispatch<React.SetStateAction<number | undefined>>;
    reff: React.MutableRefObject<HTMLDivElement | null>;
}

export default function SelectDeposit({ idDeposit, setIdDeposit, reff }: SelectDepositProps) {
    const { deposits, depositsLoading, depositsError } = useGetDeposits();

    function alterDeposit(nameDeposit: string) {
        if (deposits) {
            const deposit = deposits.find((dep) => dep.nome === nameDeposit);

            if (deposit) {
                setIdDeposit(deposit.id);
            }
            return;
        }
    }

    useEffect(() => {
        if (deposits !== null) {
            setIdDeposit(deposits.filter((deposit) => deposit.nome === "Geral")[0].id);
        }
    }, [deposits]);

    return (
        <div ref={reff} className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-1 space-y-1.5">
            <Label htmlFor="deposit">Depósito</Label>
            {depositsLoading || depositsError ? (
                <Card className="h-10 flex items-center" id="deposit">
                    <Skeleton className="w-1/3 h-[10px] m-2" />
                </Card>
            ) : (
                <Select onValueChange={alterDeposit}>
                    <SelectTrigger id="deposit">
                        <SelectValue
                            placeholder={(idDeposit && deposits?.filter((deposit) => deposit.id === idDeposit)[0].nome) || "Selecione"}
                        />
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
    );
}
