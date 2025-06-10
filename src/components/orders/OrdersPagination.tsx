import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface OrdersPaginationProps {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
}

export const OrdersPagination = ({ page, totalPages, onPageChange }: OrdersPaginationProps) => {
    const createPageArray = () => {
        const pages: number[] = []

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (page > 2) pages.push(1)
            if (page > 3) pages.push(-1)

            for (let i = Math.max(1, page - 1); i <= Math.min(totalPages, page + 1); i++) {
                pages.push(i)
            }

            if (page < totalPages - 2) pages.push(-2)
            if (page < totalPages - 1) pages.push(totalPages)
        }

        return pages
    }

    return (
        <Pagination className="mt-6">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onPageChange(Math.max(1, page - 1))}
                        aria-disabled={page === 1}
                    />
                </PaginationItem>

                {createPageArray().map((p, index) => (
                    <PaginationItem key={index}>
                        {p === -1 || p === -2 ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                isActive={p === page}
                                onClick={() => onPageChange(p)}
                                href="#"
                            >
                                {p}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                        aria-disabled={page === totalPages}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
