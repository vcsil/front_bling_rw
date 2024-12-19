import useAsync from "@/hooks/useAsync";

import * as productsApi from "@/services/productsServices/productsSearchAPI";

export default function useGetSearchProducts() {
    const {
        data: productsSearch,
        loading: productsSearchLoading,
        error: productsSearchError,
        act: getProductsSearch,
    } = useAsync(productsApi.getSearchProducts, false);

    return {
        productsSearch: productsSearch,
        productsSearchLoading,
        productsSearchError,
        getProductsSearch,
    };
}
