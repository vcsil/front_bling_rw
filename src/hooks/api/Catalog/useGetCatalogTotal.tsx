import useAsync from "@/hooks/useAsync";

import * as catalogApi from "@/services/catalogServices/catalogProductsTotalAPI";

export default function useGetCatalogTotal() {
    const {
        data: catalogTotalQuantity,
        loading: catalogTotalQuantityLoading,
        error: catalogTotalQuantityError,
        act: getCatalogTotalQuantity,
    } = useAsync(catalogApi.getCatalogProductsTotalQuantity, false);

    return {
        catalogTotalQuantity: catalogTotalQuantity,
        catalogTotalQuantityLoading,
        catalogTotalQuantityError,
        getCatalogTotalQuantity,
    };
}
