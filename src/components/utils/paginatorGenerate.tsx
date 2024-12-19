// this implementation can be a bit jumpy for larger tables, but should be good for most and easily adaptable if not
// this file is where your logic for how when ellipses are shown and other fiddly bits

import { PaginationEllipsis, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import PaginationSelect from "@/components/utils/paginatorSelect";

interface ItemPaginationProps {
    page: number;
    currentPage: number;
    onPageChange: (_page: number) => void;
}

function itemPagination({ page, currentPage, onPageChange }: ItemPaginationProps) {
    return (
        <PaginationItem key={page}>
            <PaginationLink onClick={() => onPageChange(page)} isActive={page === currentPage} disabled={page === currentPage}>
                {page}
            </PaginationLink>
        </PaginationItem>
    );
}

interface GeneratePaginationLinksProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (_page: number) => void;
}

export default function generatePaginationLinks({ currentPage, totalPages, onPageChange }: GeneratePaginationLinksProps) {
    const pages: JSX.Element[] = [];

    if (totalPages <= 6) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(itemPagination({ page: i, currentPage, onPageChange }));
        }
    } else {
        for (let i = 1; i <= 2; i++) {
            pages.push(itemPagination({ page: i, currentPage, onPageChange }));
        }

        if (2 < currentPage && currentPage < totalPages - 1) {
            pages.push(<PaginationEllipsis key="ellipsis-before" />);
            pages.push(<PaginationSelect currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />);
        }
        pages.push(<PaginationEllipsis key="ellipsis-after" />);

        for (let i = totalPages - 1; i <= totalPages; i++) {
            pages.push(itemPagination({ page: i, currentPage, onPageChange }));
        }
    }
    return pages;
}
