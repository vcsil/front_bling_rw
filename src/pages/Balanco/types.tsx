export interface InputsGridProps {
    idDeposit: number;
    setIdDeposit: React.Dispatch<React.SetStateAction<number>>;
    totalRead: number;
    unit: number;
    setUnit: React.Dispatch<React.SetStateAction<number>>;
    codeProduct: number;
    setCodeProduct: React.Dispatch<React.SetStateAction<number>>;
}

export interface DepositsT {
    id: number;
    nome: string;
}

export interface ProductPhotoProps {
    imageUrl: string | undefined;
    productName: string;
    price: number;
}

export interface BalanceProductT {
    id_bling: string;
    nome: string;
    codigo: string;
    preco: number;
    produtos_midias:
        | {
              url: string;
          }
        | undefined;
    produtos_estoques: { saldo_fisico: number }[];
}

export interface ProductReadProps {
    codeProduct: number;
    nameProduct: string;
    reads: number;
    totalDeposit: number;
}
