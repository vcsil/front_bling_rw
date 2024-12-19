import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaginationSelectProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (_page: number) => void;
}

export default function PaginationSelect({ currentPage, totalPages, onPageChange }: PaginationSelectProps) {
    return (
        <Select onValueChange={(value) => onPageChange(Number(value))}>
            <SelectTrigger className="max-w-[5rem]">
                <SelectValue placeholder={currentPage} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1)}>
                            {i + 1}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
