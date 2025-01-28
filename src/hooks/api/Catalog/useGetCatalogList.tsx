import useAsync from "@/hooks/useAsync";

import * as catalogApi from "@/services/catalogServices/catalogListAPI";

export default function useGetCatalogList() {
    const {
        data: catalogList,
        loading: catalogListLoading,
        error: catalogListError,
        act: getCatalogList,
    } = useAsync(catalogApi.getCatalogList, false);

    return {
        catalogList: catalogList,
        catalogListLoading,
        catalogListError,
        getCatalogList,
    };
}
