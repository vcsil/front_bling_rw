export interface Category {
    id_categoria: number;
    nome_categoria: string;
    id_categoria_pai: number;
    caminho_categoria: string;
}

export interface CategoryWSon extends Category {
    filhos: Category[];
}

export interface ProductListT {
    id_produto: bigint;
    codigo: string;
    nome: string;
    saldo: number;
    preco: number;
    dir_image: string | null | undefined;
}

export type ProductsListT = ProductListT & { filhos: ProductListT[] };

export type OrderKeyT = 0 | 1 | 2 | 3;
export type OrderT = "oldest" | "latest" | "lowestPrice" | "highestPrice";

export interface GetProductsListProps {
    idDeposit: number;
    idCategory: number | undefined;
    page: number;
    take: 6 | 18 | 48 | 96;
    orderKey: OrderKeyT;
}
