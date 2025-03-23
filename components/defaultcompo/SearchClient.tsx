"use client";
import {Input} from "@/components/ui/input";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

export function SearchClient(){
    const [search, setSearch] = useState('')
    const router = useRouter()

    return(
        <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => router.push('/search')}
            placeholder="Search blog posts..."
            className="w-full max-w-md rounded-lg bg-muted px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-200"
        />
    )
}
type TripArticle = {
    id: number;
    title: string;
    slug: string;
    description: string;
};

type TripArticleArray = TripArticle[];
interface SearchClientProps {
    TripArticle: TripArticleArray;
}
export function MainSearchClient(){ {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const searchParams = useSearchParams()
    useEffect(() => {
        setSearch(searchParams.get('q') || '')


    }, []);
    useEffect(() => {
        router.push(`/search/?q=${search}`)
    }, [search]);
    return(
        <Input
            name={'q'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blog posts..."
            className="w-full max-w-md rounded-lg bg-muted px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-200"
        />
    )}
}