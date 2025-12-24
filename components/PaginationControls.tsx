'use client'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

interface PaginationControlsProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function PaginationControls({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationControlsProps) {
    const generatePageNumbers = () => {
        const pages: (number | string)[] = []
        const maxVisible = 5

        if (totalPages <= maxVisible) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        const start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
        const end = Math.min(totalPages, start + maxVisible - 1)

        if (start > 1) {
            pages.push(1)
            if (start > 2) pages.push('...')
        }

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        if (end < totalPages) {
            if (end < totalPages - 1) pages.push('...')
            pages.push(totalPages)
        }

        return pages
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onPageChange(currentPage - 1)}
                        className={cn(
                            currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer',
                            'text-primary text-2xl'
                        )}
                    />
                </PaginationItem>

                {generatePageNumbers().map((page, idx) =>
                    page === '...' ? (
                        <PaginationItem key={idx}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={idx}>
                            <PaginationLink
                                onClick={() => onPageChange(page as number)}
                                isActive={currentPage === page}
                                className='cursor-pointer text-primary text-2xl'
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => onPageChange(currentPage + 1)}
                        className={cn(
                            currentPage === totalPages
                                ? 'pointer-events-none opacity-50'
                                : 'cursor-pointer',
                            'text-primary text-2xl'
                        )}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
