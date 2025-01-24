import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import styled from "styled-components";

import { Button } from "@/components/ui/button";
import AlertModal, { AlertModalT } from "@/components/modals/alertModal";

import { BalanceProductT, LogProduct, ConferenceProductsT, IdDepositLocalStorageT } from "@/pages/Balanco/types";
import useGetProduct from "@/hooks/api/Balance/useGetProduct";
import ProductPhoto from "@/pages/Balanco/ProductPhoto";
import ProductRead from "@/pages/Balanco/ProductRead";
import HistoryRead from "@/pages/Balanco/HistoryRead";
import useLocalStorage from "@/hooks/useLocalStorage";
import InputsGrid from "@/pages/Balanco/Inputs-Grid";
import { ErrorT } from "@/types/types";
import usePostBalance from "@/hooks/api/Balance/usePostBalance";
import { useNavigate } from "react-router-dom";

export default function BalancoPage() {
    const navigate = useNavigate();

    const [idDeposit, setIdDeposit] = useState<number | undefined>();
    const [totalRead, setTotalRead] = useState<number>(0);
    const [unit, setUnit] = useState<number>(1);

    const [showError, setShowError] = useState<JSX.Element[]>([]);
    const [codeProduct, setCodeProduct] = useState<string | undefined>();
    const [productTotalRead, setProductTotalRead] = useState<number | undefined>();
    const [product, setProduct] = useState<BalanceProductT | undefined>();

    const [logsProducts, setLogsProducts] = useState<LogProduct[]>([]);

    const conferenceProductsInitial: ConferenceProductsT = {};
    const [conferenceProducts, setConferenceProducts] = useLocalStorage("conferenceProducts", conferenceProductsInitial);
    const idDepositLocalStorageInitial: IdDepositLocalStorageT[] = [];
    const [idDepositLocalStorage, setIdDepositLocalStorage] = useLocalStorage("idDeposit", idDepositLocalStorageInitial);

    const { getProduct } = useGetProduct();
    const { postBalance } = usePostBalance();

    useEffect(() => {
        if (idDeposit && codeProduct && codeProduct !== "") {
            getProduct(idDeposit, codeProduct)
                .then((productBalance) => {
                    setProduct(productBalance);
                    addLogsProducts(
                        logsProducts && logsProducts.length > 0 ? logsProducts[logsProducts.length - 1].id + 3 : 1,
                        Number(productBalance.id_bling),
                        unit,
                        productBalance.codigo,
                        productBalance.nome,
                    );
                })
                .catch((err: Error) => errorHandling(err));
        }
    }, [codeProduct]);

    function errorHandling(e: Error): void {
        if (axios.isAxiosError(e)) {
            const errorAxios = e as AxiosError;
            if (errorAxios.code === "ERR_NETWORK") {
                BoxAviso("Servidor desconectado", "Verifique a conexão com o servidor.");
                return;
            }
            const data = errorAxios.response?.data
                ? (errorAxios.response.data as ErrorT)
                : { error: errorAxios.message, type: errorAxios.name };
            BoxAviso(data.type, String(data.error));
            return;
        }
        console.log(e);
        return;
    }

    function BoxAviso(title: string, message: string) {
        if (showError.find((modalAlert: AlertModalT) => modalAlert.props.description === message)) return;

        const uniqueKey = new Date().getTime();
        setShowError([
            ...showError,
            <AlertModal
                key={uniqueKey}
                title={title}
                description={message}
                show={true}
                onClick={() => setShowError(showError.filter((i) => i.key !== String(uniqueKey)))}
            />,
        ]);
    }

    function BoxAvisoManual(
        title: string,
        message: string,
        showNotification: boolean,
        setShowNotification: React.Dispatch<React.SetStateAction<boolean>>,
    ) {
        if (showError.find((modalAlert: AlertModalT) => modalAlert.props.description === message)) return;

        const uniqueKey = new Date().getTime();
        setShowError([
            ...showError,
            <AlertModal
                key={uniqueKey}
                title={title}
                description={message}
                show={showNotification}
                onClick={() => {
                    setShowError(showError.filter((i) => i.key !== String(uniqueKey)));
                    setShowNotification(!showNotification);
                }}
            />,
        ]);
    }

    function addLogsProducts(id: number, id_bling: number, quantityRead: number, code: string, name: string) {
        const logLine = { id, id_bling, quantityRead, code, name };
        setLogsProducts([...logsProducts, logLine]);

        const existProduct = id_bling in conferenceProducts;

        if (existProduct) {
            const currentQuantity = conferenceProducts[id_bling].quantity;
            conferenceProducts[id_bling].quantity = currentQuantity + unit;
            setProductTotalRead(currentQuantity + unit);
            setConferenceProducts((prevProducts) => ({
                ...prevProducts,
                [id_bling]: { quantity: currentQuantity + unit, code, name },
            }));
        } else {
            setProductTotalRead(unit);
            setConferenceProducts((prevProducts) => ({
                ...prevProducts,
                [id_bling]: { quantity: unit, code, name },
            }));
        }
    }

    function saveConference() {
        postBalance(conferenceProducts)
            .then((response) => {
                console.log(response);
                navigate("/balanco/compare");
            })
            .catch((err: Error) => errorHandling(err));
    }

    useEffect(() => {
        if (Object.keys(conferenceProducts).length > 0) {
            const logsFromLocalStorage = Object.entries(conferenceProducts).map(([id, product], index) => ({
                id: index,
                id_bling: Number(id),
                quantityRead: product.quantity,
                code: product.code,
                name: product.name,
            }));
            setLogsProducts(logsFromLocalStorage);
        }
        if (idDepositLocalStorage.length > 0) {
            setIdDeposit(idDepositLocalStorage[0].idDeposit);
        }
    }, []);

    return (
        <>
            <div defaultValue="overview" className="space-y-4">
                <div className="flex justify-between">
                    <Titulo>Conferência de estoque</Titulo>
                    {idDepositLocalStorage.length > 0 ? (
                        <div className="flex items-center gap-2">
                            <Button
                                variant={"secondary"}
                                onClick={() => {
                                    window.location.reload();
                                    setConferenceProducts({});
                                    setIdDepositLocalStorage([]);
                                }}
                            >
                                Reiniciar
                            </Button>
                            <Button onClick={saveConference}>Gerar Balanço</Button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="grid gap-4 grid-cols-2 xl:grid-cols-11">
                    <div className="col-span-2 xl:col-span-5 space-y-4">
                        <InputsGrid
                            idDeposit={idDeposit}
                            setIdDeposit={setIdDeposit}
                            idDepositLocalStorage={idDepositLocalStorage}
                            setIdDepositLocalStorage={setIdDepositLocalStorage}
                            unit={unit}
                            setUnit={setUnit}
                            codeProduct={codeProduct}
                            setCodeProduct={setCodeProduct}
                            logsProducts={logsProducts}
                            errorHandling={errorHandling}
                            BoxAviso={BoxAviso}
                            addLogsProducts={addLogsProducts}
                            product={product}
                            totalRead={totalRead}
                            BoxAvisoManual={BoxAvisoManual}
                        />
                        <ProductRead
                            codeProduct={codeProduct}
                            nameProduct={product?.nome}
                            reads={productTotalRead}
                            totalDeposit={product?.produtos_estoques[0].saldo_fisico}
                        />
                        <HistoryRead
                            setTotalRead={setTotalRead}
                            logsProducts={logsProducts}
                            setLogsProducts={setLogsProducts}
                            conferenceProducts={conferenceProducts}
                            setConferenceProducts={setConferenceProducts}
                            BoxAviso={BoxAviso}
                        />
                    </div>
                    <div className="col-span-2 xl:col-span-6 space-y-1.5">
                        <ProductPhoto
                            imageUrl={product?.produtos_midias?.diretorio_local}
                            productName={product?.nome}
                            price={product?.preco}
                        />
                    </div>
                </div>
            </div>
            {showError.map((i) => i)}
        </>
    );
}

const Titulo = styled.h1`
    font-weight: 700;
    font-size: 40px;
`;
