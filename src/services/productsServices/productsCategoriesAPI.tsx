import api from "@/services/api";

import { CategoryWSon } from "@/pages/Products/types";

export async function getAllProductsCategories(): Promise<CategoryWSon[]> {
    const response = await api.get("/products/categories");

    return response.data as CategoryWSon[];
}
