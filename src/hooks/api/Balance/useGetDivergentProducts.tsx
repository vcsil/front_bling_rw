import useAsync from "@/hooks/useAsync";

import * as balanceDivergentProducts from "@/services/balancoServices/balanceDivergentProducts";

export default function useGetDivergentProducts() {
    const {
        data: divergentProducts,
        loading: divergentProductsLoading,
        error: divergentProductsError,
        act: getDivergentProducts,
    } = useAsync(balanceDivergentProducts.getDivergentProducts, false);

    return {
        divergentProducts: divergentProducts,
        divergentProductsLoading,
        divergentProductsError,
        getDivergentProducts,
    };
}
