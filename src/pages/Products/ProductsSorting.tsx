import { cn } from "@/lib/utils";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { OrderKeyT } from "@/pages/Products/types";

type ProductSortingProps = ProductsSortingProps & {
    sortingList: string[];
};

function ProductSortingList({ sortingList, productSorting, setProductSorting }: ProductSortingProps) {
    function changeSorting(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const target = event.target as HTMLTextAreaElement;

        setProductSorting(Number(target.value));
        return;
    }

    return (
        <>
            <h1 className="text-lg font-semibold pb-2">Ordenar por:</h1>
            <ul className="grid gap-3">
                {sortingList.map((sortingMode, idx) => (
                    <li key={idx} className="cursor-pointer w-[100px] truncate" title={sortingMode}>
                        <button
                            className={cn("w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100 text-left", {
                                "underline underline-offset-4": productSorting === idx,
                            })}
                            value={idx}
                            onClick={changeSorting}
                        >
                            {sortingMode}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}

function ProductSortingDropDown({ sortingList, productSorting, setProductSorting }: ProductSortingProps) {
    function dropdownPlaceholder() {
        if (sortingList.length > 0) {
            return sortingList[productSorting];
        }
        return "Ordernar por:";
    }

    return (
        <div className="space-y-1.5">
            <Label htmlFor="sortBy">Ordernar por</Label>
            <Select onValueChange={(value) => setProductSorting(Number(value))}>
                <SelectTrigger className="w-full" id={"sortBy"}>
                    <SelectValue placeholder={dropdownPlaceholder()} />
                </SelectTrigger>
                <SelectContent>
                    {sortingList.map((sortingMode, idx) => (
                        <SelectGroup key={idx}>
                            <SelectItem value={String(idx)}>{sortingMode}</SelectItem>
                        </SelectGroup>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

interface ProductsSortingProps {
    productSorting: number;
    setProductSorting: React.Dispatch<React.SetStateAction<OrderKeyT>>;
}

export default function ProductsSorting({ productSorting, setProductSorting }: ProductsSortingProps) {
    const sortingList = ["Mais novos", "Mais antigos", "Menor preço", "Maior preço"];

    return (
        <>
            <div className="lg:hidden">
                <ProductSortingDropDown sortingList={sortingList} productSorting={productSorting} setProductSorting={setProductSorting} />
            </div>
            <div className="hidden lg:block">
                <ProductSortingList sortingList={sortingList} productSorting={productSorting} setProductSorting={setProductSorting} />
            </div>
        </>
    );
}
