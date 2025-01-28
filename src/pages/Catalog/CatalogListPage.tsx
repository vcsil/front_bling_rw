import { useEffect, useRef, useState } from "react";

// import ProductsCategories from "@/pages/Products/ProductsCategories";
import { checkContainerWidthIsLess } from "@/pages/constants";
import CatalogList from "@/pages/Catalog/CatalogList";
// import ProductsSorting from "@/pages/Products/ProductsSorting";
import { OrderKeyT } from "@/pages/Products/types";

export default function CatalogListPage() {
    const [isHidden, setIsHidden] = useState(false);
    const [productCategory, setProductCategory] = useState<number | undefined>(undefined);

    const [productSorting, setProductSorting] = useState<OrderKeyT>(0);

    const [textSearch, setTextSearch] = useState<string>("");

    const containerRef = useRef(null);

    useEffect(() => {
        checkContainerWidthIsLess(containerRef, setIsHidden, 550);
        setTextSearch("");
    }, [productCategory, productSorting]);

    return (
        <>
            <div ref={containerRef} className="relative mx-auto flex max-w-screen-2xl flex-col gap-2 px-4 py-4 lg:flex-row pb-10">
                <div className="order-first w-full flex-none lg:max-w-[150px]">
                    {/* <ProductsCategories setProductCategory={setProductCategory} /> */}
                </div>
                <div className="order-last min-h-full w-full lg:order-none">
                    <CatalogList
                        idCategory={productCategory}
                        orderKey={productSorting}
                        textSearch={textSearch}
                        setTextSearch={setTextSearch}
                    />
                </div>
                <div className="order-none flex-none lg:order-last lg:w-[150px]">
                    {/* <ProductsSorting productSorting={productSorting} setProductSorting={setProductSorting} /> */}
                </div>
            </div>
        </>
    );
}
