import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import generatePaginationLinks from "@/components/utils/paginatorGenerate";
import PaginationSelect from "@/components/utils/paginatorSelect";
import { cn } from "@/lib/utils";

interface PaginatorProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (_pageNumber: number) => void;
    showPreviousNext: boolean;
    hidden: boolean;
}

export default function Paginator({ currentPage, totalPages, onPageChange, showPreviousNext, hidden }: PaginatorProps) {
    return (
        <Pagination className={cn("col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-3 space-y-1.5", { hidden: hidden })}>
            <PaginationContent>
                {showPreviousNext && totalPages ? (
                    <PaginationItem>
                        <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} disabled={currentPage - 1 < 1} />
                    </PaginationItem>
                ) : null}

                {window.innerWidth < 768 ? (
                    <PaginationSelect currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                ) : (
                    generatePaginationLinks({ currentPage, totalPages, onPageChange })
                )}

                {showPreviousNext && totalPages ? (
                    <PaginationItem>
                        <PaginationNext onClick={() => onPageChange(currentPage + 1)} disabled={currentPage > totalPages - 1} />
                    </PaginationItem>
                ) : null}
            </PaginationContent>
        </Pagination>
    );
}
