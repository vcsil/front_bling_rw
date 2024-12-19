import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Paginator from "@/components/utils/paginator";
import { Skeleton } from "@/components/ui/skeleton";
import { Grid, GridTileImage } from "@/pages/utils";

import useGetProductsTotal from "@/hooks/api/Products/useGetProductsTotalQuantity";
import useGetProductsList from "@/hooks/api/Products/useGetProductsList";

import { OrderKeyT, ProductsListT } from "@/pages/Products/types";
import SelectDeposit from "@/pages/Products/ProductsDepositSelect";
import ProductsSearch from "@/pages/Products/ProductsSearch";
import useGetSearchProducts from "@/hooks/api/Products/useGetSearchProducts";

function ProductItem({ product }: { product: ProductsListT }) {
    return (
        <Grid.Item className="animate-fadeIn">
            <Link className="relative inline-block h-full w-full" to={`/produto/${product.id_produto}`}>
                <GridTileImage
                    alt={product.nome}
                    label={{
                        title: product.nome,
                        amount: String(product.preco / 100),
                        currencyCode: "BRL",
                    }}
                    quantity={product.saldo}
                    productChildren={product.filhos}
                    src={product.dir_image || "/no-image.svg"}
                    // fill
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
            </Link>
        </Grid.Item>
    );
}

interface ProductsListProps {
    idCategory: number | undefined;
    orderKey: OrderKeyT;
    textSearch: string;
    setTextSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function ProductsList({ idCategory, orderKey, textSearch, setTextSearch }: ProductsListProps) {
    const [idDeposit, setIdDeposit] = useState<number | undefined>();

    const [products, setProducts] = useState<ProductsListT[]>([]);
    const [productsSearch, setProductsSearch] = useState<ProductsListT[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [take, _setTake] = useState<6 | 18 | 48 | 96>(48);

    const categoryRef = useRef<null | HTMLDivElement>(null);

    const { getProductsTotalQuantity } = useGetProductsTotal();
    const { getProductsList, productsListLoading, productsListError } = useGetProductsList();
    const { getProductsSearch, productsSearchLoading, productsSearchError } = useGetSearchProducts();

    const listCount = [1, 2, 3, 4, 5, 6];

    function searchProducts(text: string) {
        if (idDeposit) {
            if (textSearch.length > 2) {
                getProductsSearch({ idDeposit, idCategory, page: currentPage, take, orderKey, text })
                    .then((allProducts) => setProductsSearch(allProducts))
                    .catch((e) => console.log(e));
            }
        }
    }

    useEffect(() => {
        if (idDeposit) {
            getProductsList({ idDeposit, idCategory, page: currentPage, take, orderKey })
                .then((allProducts) => setProducts(allProducts))
                .catch((e) => console.log(e));

            getProductsTotalQuantity(idCategory)
                .then((productsTotal) => {
                    setTotalPages(Math.ceil(Number(productsTotal.total) / take));
                })
                .catch((e) => console.log(e));
        }
    }, [idCategory, idDeposit, currentPage, orderKey]);

    return (
        <Grid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            <ProductsSearch textSearch={textSearch} setTextSearch={setTextSearch} searchProducts={searchProducts} />
            <SelectDeposit idDeposit={idDeposit} setIdDeposit={setIdDeposit} reff={categoryRef} />

            {productsListLoading || productsListError || productsSearchLoading || productsSearchError ? (
                listCount.map((pos) => (
                    <Grid.Item key={pos}>
                        <Skeleton className="h-full w-full" />
                    </Grid.Item>
                ))
            ) : (
                <>
                    {textSearch.length > 2 && productsSearch
                        ? productsSearch.map((product) => <ProductItem key={product.id_produto} product={product} />)
                        : products.map((product) => <ProductItem key={product.id_produto} product={product} />)}
                    <Paginator
                        currentPage={currentPage + 1}
                        totalPages={totalPages}
                        onPageChange={(pg) => {
                            setCurrentPage(pg - 1);
                            if (categoryRef.current) {
                                categoryRef.current.scrollIntoView({ behavior: "instant", block: "start" });
                            }
                        }}
                        showPreviousNext={true}
                        hidden={textSearch.length > 2}
                    />
                </>
            )}
        </Grid>
    );
}
