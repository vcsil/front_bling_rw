import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useGetBalancesDayDeposits from "@/hooks/api/Balance/useGetBalancesDayDeposits";
import { formatDataToStringToUser } from "@/services/utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function CompareBalanceTable() {
    const { balancesDayDeposits, balancesDayDepositsError, balancesDayDepositsLoading } = useGetBalancesDayDeposits();
    const navigate = useNavigate();

    useEffect(() => {
        if (balancesDayDepositsError && balancesDayDepositsError instanceof Error) {
            console.error(balancesDayDepositsError);
        }
    }, [balancesDayDepositsError]);

    function clickBalance(idDeposit: number, date: string) {
        const dateFormat = date.split("T")[0];
        navigate(`/balanco/compare/${idDeposit}/${dateFormat}`);
        return true;
    }

    return (
        <Table>
            <TableCaption>Uma lista com os saldos dos últimos balanços.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Depósito</TableHead>
                    <TableHead className="text-right">Data</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {balancesDayDepositsError || balancesDayDepositsLoading ? (
                    <TableRow className="cursor-pointer">
                        <TableCell className="font-medium">
                            <Skeleton className="w-1/3 h-[10px] m-2" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="w-1/3 h-[10px] m-2" />
                        </TableCell>
                        <TableCell className="text-right">
                            <Skeleton className="w-1/3 h-[10px] m-2" />
                        </TableCell>
                    </TableRow>
                ) : (
                    balancesDayDeposits?.map((balance, index) => (
                        <TableRow key={index} className="cursor-pointer" onClick={() => clickBalance(balance.id, balance.data)}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{balance.nome}</TableCell>
                            <TableCell className="text-right">{formatDataToStringToUser(new Date(balance.data))}</TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right">{balancesDayDeposits?.length || 0}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
