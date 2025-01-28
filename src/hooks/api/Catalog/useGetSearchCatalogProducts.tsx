import useAsync from "@/hooks/useAsync";

import * as catalogApi from "@/services/catalogServices/catalogSearchAPI";

export default function useGetSearchCatalogProducts() {
    const {
        data: catalogSearch,
        loading: catalogSearchLoading,
        error: catalogSearchError,
        act: getCatalogSearch,
    } = useAsync(catalogApi.getSearchCatalogProducts, false);

    return {
        catalogSearch: catalogSearch,
        catalogSearchLoading,
        catalogSearchError,
        getCatalogSearch,
    };
}
