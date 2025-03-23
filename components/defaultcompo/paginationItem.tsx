'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {PaginationItem, PaginationLink} from "@/components/ui/pagination";


export default function PaginationItem1({data, url}: {data: number, url: string}){
    const router = useRouter()
    const searchParams = useSearchParams()
    const page = searchParams.get('page') ?? '1'
    const per_page = searchParams.get('per_page') ?? '5'

    return(
        <>
            {Array.from({ length: data }, (_, i) => (
                <PaginationItem key={i}>
                    <PaginationLink className={`cursor-pointer`}
                        isActive={Number(page) === i + 1}
                                    onClick={() => {
                                        router.push(`${url}/?page=${i+1}`)
                                    }}
                    >{i + 1}</PaginationLink>
                </PaginationItem>
            ))}
        </>
    )
}