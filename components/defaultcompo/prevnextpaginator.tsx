'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {PaginationItem, PaginationPrevious, PaginationNext} from "@/components/ui/pagination";
import {Button} from "@/components/ui/button";



interface PaginationprevControlsProps {
    hasPrevPage: boolean
    url: string
}
interface PaginationnextControlsProps {
    hasNextPage: boolean
    url: string
}

export function PrevButton({hasPrevPage, url}: PaginationprevControlsProps){
    const router = useRouter()
    const searchParams = useSearchParams()

    const page = searchParams.get('page') ?? '1'
    const per_page = searchParams.get('per_page') ?? '5'

    return(
        <PaginationItem>
            <Button variant="outline" className={`cursor-pointer block ${!hasPrevPage ? 'hidden' : ''}`}
            onClick={() => {
                router.push(`${url}/?page=${Number(page) - 1}`)
            }}
            >
                Previous
            </Button>
        </PaginationItem>
    )
}
export function NextButton({hasNextPage, url}: PaginationnextControlsProps){
    const router = useRouter()
    const searchParams = useSearchParams()

    const page = searchParams.get('page') ?? '1';
    const per_page = searchParams.get('per_page') ?? '5'

    return(
        <PaginationItem>
            <Button variant="outline" className={`cursor-pointer block ${!hasNextPage ? 'hidden' : ''}`}
                            disabled={!hasNextPage}
                                onClick={() => {
                                    router.push(`${url}/?page=${Number(page) + 1}`)
                                }}
            >
                Next
            </Button>
        </PaginationItem>
    )
}