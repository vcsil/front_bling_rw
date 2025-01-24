export interface InputsGridProps {
    idDeposit: number | undefined;
    setIdDeposit: React.Dispatch<React.SetStateAction<number | undefined>>;
    idDepositLocalStorage: IdDepositLocalStorageT[];
    setIdDepositLocalStorage: (_value: IdDepositLocalStorageT[] | ((_val: IdDepositLocalStorageT[]) => IdDepositLocalStorageT[])) => void;
    unit: number;
    setUnit: React.Dispatch<React.SetStateAction<number>>;
    codeProduct: string | undefined;
    setCodeProduct: React.Dispatch<React.SetStateAction<string | undefined>>;
    logsProducts: LogProduct[];
    errorHandling: (_e: Error) => void;
    BoxAviso: (_title: string, _message: string) => void;
    addLogsProducts: (_id: number, _id_bling: number, _quantityRead: number, _code: string, _name: string) => void;
    product: BalanceProductT | undefined;
    totalRead: number;
    BoxAvisoManual: (
        _title: string,
        _message: string,
        _showNotification: boolean,
        _setShowNotification: React.Dispatch<React.SetStateAction<boolean>>,
    ) => void;
}

export interface IdDepositLocalStorageT {
    idDeposit: number;
    nome: string;
}

export interface DepositsT {
    id: number;
    nome: string;
}

export interface ProductPhotoProps {
    imageUrl: string | undefined;
    productName: string | undefined;
    price: number | undefined;
}

export interface BalanceProductT {
    id_bling: string;
    nome: string;
    codigo: string;
    preco: number;
    produtos_midias:
        | {
              url: string | undefined;
              diretorio_local: string | undefined;
          }
        | undefined;
    produtos_estoques: { saldo_fisico: number }[];
}

export interface ProductReadProps {
    codeProduct: string | undefined;
    nameProduct: string | undefined;
    reads: number | undefined;
    totalDeposit: number | undefined;
}

export interface LogProduct {
    id: number;
    id_bling: number;
    quantityRead: number;
    code: string;
    name: string;
}

export interface HistoryReadProps {
    setTotalRead: React.Dispatch<React.SetStateAction<number>>;
    logsProducts: LogProduct[] | undefined;
    setLogsProducts: React.Dispatch<React.SetStateAction<LogProduct[]>>;
    conferenceProducts: ConferenceProductsT;
    setConferenceProducts: (_value: ConferenceProductsT | ((_val: ConferenceProductsT) => ConferenceProductsT)) => void;
    BoxAviso: (_title: string, _message: string) => void;
}

export interface LogProductsProps {
    index: number;
    logs: LogProduct[];
    setLogs: React.Dispatch<React.SetStateAction<LogProduct[]>>;
    log: LogProduct;
    conferenceProducts: ConferenceProductsT;
    setConferenceProducts: (_value: ConferenceProductsT | ((_val: ConferenceProductsT) => ConferenceProductsT)) => void;
    BoxAviso: (_title: string, _message: string) => void;
}

export type ConferenceProductsT = Record<number, { quantity: number; code: string; name: string }>;

export interface AllBalancePerDayDepositT {
    id: number;
    nome: string;
    data: string;
}

export interface DivergentProductsT {
    id_produto: bigint;
    codigo: string;
    nome: string;
    saldo_antes: number;
    saldo_depois: number;
    dir_image: string | null | undefined;
}
