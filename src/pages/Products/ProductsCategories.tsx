import { Link, useLocation, useNavigate } from "react-router-dom";
import { CircleFadingPlus } from "lucide-react";
import { cn } from "@/lib/utils";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectSeparator } from "@/components/ui/select";

import { activeAndTitlesClassName, itemsClassName, skeletonClassName } from "@/pages/constants";
import useGetAllCategories from "@/hooks/api/Products/useGetAllCategories";
import { CategoryWSon } from "@/pages/Products/types";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

const linkClassName = "w-full underline-offset-4 hover:underline dark:hover:text-neutral-100";

interface ProductCategoriesProps {
    categories: CategoryWSon[] | null;
    categoriesLoading: boolean;
    pathname: string;
}

function CollapsibleCategory(category: CategoryWSon, pathname: string, active: boolean, index: number) {
    return (
        <Collapsible key={index}>
            <CollapsibleTrigger className="w-full flex justify-between items-center">
                <div className="w-[100px] truncate text-left" title={category.nome_categoria}>
                    <Link
                        to={"/produtos/categoria/" + category.id_categoria}
                        className={cn(linkClassName, {
                            "underline underline-offset-4": active,
                        })}
                        onClick={(e) => active && e.preventDefault()}
                    >
                        {category.nome_categoria}
                    </Link>
                </div>
                <div className="h-full">
                    <CircleFadingPlus size={14} className="" />
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
                {category.filhos.map((sonCategory, indexSon) => {
                    const activeSon = Number(pathname.split("/")[3]) === sonCategory.id_categoria;
                    return (
                        <li
                            key={index + indexSon}
                            className="font-light py-1 ml-2 max-w-[90px] truncate"
                            title={sonCategory.nome_categoria}
                        >
                            <Link
                                to={"/produtos/categoria/" + sonCategory.id_categoria}
                                className={cn(linkClassName, {
                                    "underline underline-offset-4": activeSon,
                                })}
                                onClick={(e) => activeSon && e.preventDefault()}
                            >
                                {sonCategory.nome_categoria}
                            </Link>
                        </li>
                    );
                })}
            </CollapsibleContent>
        </Collapsible>
    );
}

function ProductCategoriesList({ categories, categoriesLoading, pathname }: ProductCategoriesProps) {
    return (
        <>
            <h1 className="text-lg font-semibold pb-2">Categorias</h1>
            {categoriesLoading ? (
                <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
                    <div className={cn(skeletonClassName, activeAndTitlesClassName)} />
                    <div className={cn(skeletonClassName, activeAndTitlesClassName)} />
                    <div className={cn(skeletonClassName, itemsClassName)} />
                    <div className={cn(skeletonClassName, itemsClassName)} />
                    <div className={cn(skeletonClassName, itemsClassName)} />
                    <div className={cn(skeletonClassName, itemsClassName)} />
                    <div className={cn(skeletonClassName, itemsClassName)} />
                    <div className={cn(skeletonClassName, itemsClassName)} />
                    <div className={cn(skeletonClassName, itemsClassName)} />
                    <div className={cn(skeletonClassName, itemsClassName)} />
                </div>
            ) : (
                <ul className="grid gap-3">
                    <li className="cursor-pointer w-[100px] truncate" title={"Todos"}>
                        <Link
                            to={"/produtos"}
                            className={cn("w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100", {
                                "underline underline-offset-4": pathname === "/produtos",
                            })}
                            onClick={(e) => pathname === "/produtos" && e.preventDefault()}
                        >
                            Todos
                        </Link>
                    </li>
                    {categories?.map((category, index) => {
                        const active = Number(pathname.split("/")[3]) === category.id_categoria;
                        if (category.filhos.length > 0) {
                            return CollapsibleCategory(category, pathname, active, index);
                        }
                        return (
                            <li key={index} className="cursor-pointer w-[100px] truncate" title={category.nome_categoria}>
                                <Link
                                    to={"/produtos/categoria/" + category.id_categoria}
                                    className={cn(linkClassName, {
                                        "underline underline-offset-4": active,
                                    })}
                                    onClick={(e) => active && e.preventDefault()}
                                >
                                    {category.nome_categoria}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
}

function ProductCategoriesDropDown({ categories, categoriesLoading, pathname }: ProductCategoriesProps) {
    const [categorySelected, setCategorySelected] = useState("");
    const navigate = useNavigate();

    const categoryProductInitial: { name: string; id: number }[] = [];
    const [categoryProduct, setCategoryProduct] = useLocalStorage("productCategoryList", categoryProductInitial);

    useEffect(() => {
        if (categorySelected.length > 1) {
            const nameCategory = categorySelected.split("-")[0];
            const idCategory = categorySelected.split("-")[1];
            setCategoryProduct([{ name: nameCategory, id: Number(idCategory) }]);

            navigate("/produtos/categoria/" + idCategory);
            return;
        } else if (categorySelected.length === 1) {
            setCategoryProduct([]);
            navigate("/produtos");
            return;
        } else if (pathname.split("/").length < 3) {
            setCategoryProduct([]);
            return;
        }
    }, [categorySelected, pathname]);

    function dropdownPlaceholder() {
        if (categoryProduct.length > 0) {
            return categoryProduct[0].name;
        }
        return "Categoria";
    }

    return (
        <div className="space-y-1.5">
            <Label htmlFor="category">Categoria</Label>
            <Select onValueChange={setCategorySelected}>
                <SelectTrigger className="w-full" id={"category"}>
                    {categoriesLoading ? (
                        <div className={cn(skeletonClassName, activeAndTitlesClassName)} />
                    ) : (
                        <SelectValue placeholder={dropdownPlaceholder()} />
                    )}
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value={"#"}>Todas</SelectItem>
                        <SelectSeparator />
                    </SelectGroup>
                    {categories?.map((category, index) => {
                        if (category.filhos.length > 0) {
                            return (
                                <SelectGroup key={index}>
                                    <SelectItem key={index} value={category.nome_categoria + "-" + category.id_categoria}>
                                        {category.nome_categoria}
                                    </SelectItem>
                                    {category.filhos.map((sonCategory, sonIndex) => {
                                        return (
                                            <SelectItem
                                                key={index + sonIndex}
                                                value={sonCategory.nome_categoria + "-" + sonCategory.id_categoria}
                                                className="font-light"
                                            >
                                                {sonCategory.nome_categoria}
                                            </SelectItem>
                                        );
                                    })}
                                    <SelectSeparator />
                                </SelectGroup>
                            );
                        }

                        return (
                            <SelectGroup key={index}>
                                <SelectItem value={category.nome_categoria + "-" + category.id_categoria}>
                                    {category.nome_categoria}
                                </SelectItem>
                                <SelectSeparator />
                            </SelectGroup>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
}

interface ProductsCategoriesProps {
    setProductCategory: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function ProductsCategories({ setProductCategory }: ProductsCategoriesProps) {
    const location = useLocation();
    const pathname = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.delete("q");

    const { categories, categoriesLoading } = useGetAllCategories();

    useEffect(() => {
        const pathnameList = pathname.split("/");
        if (pathnameList.length === 4) {
            setProductCategory(Number(pathnameList[3]));
        } else {
            setProductCategory(undefined);
        }
    }, [pathname]);

    return (
        <>
            <div className="lg:hidden">
                <ProductCategoriesDropDown categories={categories} categoriesLoading={categoriesLoading} pathname={pathname} />
            </div>
            <div className="hidden lg:block">
                <ProductCategoriesList categories={categories} categoriesLoading={categoriesLoading} pathname={pathname} />
            </div>
        </>
    );
}
