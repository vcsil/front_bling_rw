import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductsSearchProps {
    textSearch: string;
    setTextSearch: React.Dispatch<React.SetStateAction<string>>;
    searchProducts: (_text: string) => void;
}

export default function ProductsSearch({ textSearch, setTextSearch, searchProducts }: ProductsSearchProps) {
    useEffect(() => {
        searchProducts(textSearch);
    }, [textSearch]);

    return (
        <div className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-2 space-y-1.5">
            <Label htmlFor="productSearch">Buscar</Label>
            <div className="flex w-full items-center space-x-2">
                <Input
                    type="search"
                    id="productSearch"
                    placeholder="Busque por nome, ncm ou id."
                    onChange={(e) => setTextSearch(e.target.value)}
                    value={textSearch}
                />
                <Button type="submit" className="hidden">
                    Buscar
                </Button>
            </div>
        </div>
    );
}
