import useAsync from "@/hooks/useAsync";

import * as productsApi from "@/services/productsServices/productsListAPI";

export default function useGetProductsList() {
    const {
        data: productsList,
        loading: productsListLoading,
        error: productsListError,
        act: getProductsList,
    } = useAsync(productsApi.getProductsList, false);

    return {
        productsList: productsList,
        productsListLoading,
        productsListError,
        getProductsList,
    };
}
