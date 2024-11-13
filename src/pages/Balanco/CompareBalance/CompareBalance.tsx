import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import usePostBalanceCompare from "@/hooks/api/Balance/usePostBalanceCompare";
import { CompareBalanceTable } from "./CompareBalance-Table";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ConferenceProductsT, IdDepositLocalStorageT } from "../types";
import { Button } from "@/components/ui/button";

export default function CompareBalancePage() {
    const navigate = useNavigate();

    const { postBalanceCompare } = usePostBalanceCompare();

    const idDepositLocalStorageInitial: IdDepositLocalStorageT[] = [];
    const [idDepositLocalStorage] = useLocalStorage("idDeposit", idDepositLocalStorageInitial);
    const conferenceProductsInitial: ConferenceProductsT = {};
    const [conferenceProductsLocalStorage] = useLocalStorage("conferenceProducts", conferenceProductsInitial);

    const depositName = `: ${idDepositLocalStorage[0]?.nome || ""}`;

    function countsProducts() {
        if (idDepositLocalStorage.length > 0) {
            postBalanceCompare(idDepositLocalStorage[0].idDeposit)
                .then((response) => {
                    console.log(response);
                })
                .catch((err: Error) => {
                    console.log(err);
                    navigate("/");
                });
        }
    }

    return (
        <>
            <div className="flex justify-between">
                <Titulo>Comparação de estoque</Titulo>
                {Object.keys(conferenceProductsLocalStorage).length > 0 ? (
                    <div className="flex items-center gap-2">
                        <Button
                            variant={"destructive"}
                            onClick={() => {
                                countsProducts();
                            }}
                        >
                            Fazer comparação{depositName}
                        </Button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <CompareBalanceTable />
        </>
    );
}

const Titulo = styled.h1`
    width: 500px;
    font-weight: 700;
    font-size: 40px;
`;
