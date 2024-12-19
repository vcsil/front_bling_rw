import useAsync from "@/hooks/useAsync";

import * as getAllProductsCategories from "@/services/productsServices/productsCategoriesAPI";

export default function useGetAllCategories() {
    const {
        data: categories,
        loading: categoriesLoading,
        error: categoriesError,
        act: getCategories,
    } = useAsync(getAllProductsCategories.getAllProductsCategories, true);

    return {
        categories: categories,
        categoriesLoading,
        categoriesError,
        getCategories,
    };
}
