"use client";
import { useRef, useState, useCallback, KeyboardEvent, useEffect } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { X } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import SituationsT from "@/pages/Dashboard/Dashboard/multi-select/type";
import useGetSituationsSales from "@/hooks/api/useGetSituations";

export function FancyMultiSelect() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);

    const { situationsList: SITUATIONS, situationsLoading } = useGetSituationsSales();

    const [selected, setSelected] = useState<SituationsT[]>([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (!situationsLoading) setSelected([SITUATIONS[1]]);
    }, [situationsLoading]);

    const handleUnselect = useCallback((situation: SituationsT) => {
        setSelected((prev) => prev.filter((s) => s.id !== situation.id));
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (input) {
            if (e.key === "Delete" || e.key === "Backspace") {
                if (input.value === "") {
                    setSelected((prev) => {
                        const newSelected = [...prev];
                        newSelected.pop();
                        return newSelected;
                    });
                }
            }
            // This is not a default behaviour of the <input /> field
            if (e.key === "Escape") {
                input.blur();
            }
        }
    }, []);

    if (situationsLoading) {
        return <Skeleton className="w-2/3 h-[10px] m-2" />;
    }

    const selectables = SITUATIONS.filter((situation) => !selected.includes(situation));

    return (
        <Command onKeyDown={handleKeyDown} className="h-fit overflow-visible bg-transparent">
            <div className="group border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex gap-1 flex-wrap">
                    {selected.map((situation) => {
                        return (
                            <Badge key={situation.id} variant="secondary">
                                {situation.nome}
                                <button
                                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleUnselect(situation);
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onClick={() => handleUnselect(situation)}
                                >
                                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                </button>
                            </Badge>
                        );
                    })}
                    {/* Avoid having the "Search" Icon */}
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder="Selecione a situação dos pedidos..."
                        className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                    />
                </div>
            </div>
            <div className="relative mt-0">
                {open && selectables.length > 0 ? (
                    <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                        <CommandGroup className="h-full overflow-auto">
                            {selectables.map((situation) => {
                                return (
                                    <CommandItem
                                        key={situation.id}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        onSelect={(_id) => {
                                            setInputValue("");
                                            setSelected((prev) => [...prev, situation]);
                                        }}
                                        className={"cursor-pointer"}
                                    >
                                        {situation.nome}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </div>
                ) : null}
            </div>
        </Command>
    );
}
