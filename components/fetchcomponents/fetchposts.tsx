import { TableCell, TableFooter, TableHead, TableHeader, TableRow, Table, TableBody, } from "@/components/ui/table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoveHorizontalIcon } from "lucide-react";
import { categories, posts } from "@/app/db/schema";
import { db } from "@/app/db/db";
import { and, count, eq } from "drizzle-orm";
import getuserid from "@/lib/getuserid";
import { Skeleton } from "@/components/ui/skeleton"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { PrevButton, NextButton } from "@/components/defaultcompo/prevnextpaginator";
import paginationItem from "@/components/defaultcompo/paginationItem";
import PaginationItem1 from "@/components/defaultcompo/paginationItem";
import { Suspense } from "react";
import PublishData from "@/components/defaultcompo/PublishData";
import DeleteBtn2 from "@/components/defaultcompo/DeleteData";
import Image from "next/image";
export async function SkeletonFetchPost() {
    return (
        <>
            <Card className="w-full">
                <CardHeader className="flex flex-row justify-between">
                    <div className="space-y-2">
                        <CardTitle>All Posts</CardTitle>
                        <CardDescription>Manage your blog posts.</CardDescription>
                    </div>
                    <div>
                        <Pagination>
                            <PaginationContent>
                                <Skeleton className="w-[300px] h-[40px]" />
                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead className="hidden sm:table-cell">Date</TableHead>
                                <TableHead className="hidden sm:table-cell">Status</TableHead>

                                <TableHead>
                                    <span className="">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow >
                                <TableCell className="font-medium">
                                    <Link href="#" className="hover:underline" prefetch={false}>
                                        <Skeleton className="w-[100px] h-[20px] rounded-full" />
                                    </Link>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell"><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <Skeleton className="w-[100px] h-[20px] rounded-full" />
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                                <Skeleton className="w-[40px] h-[40px] rounded-lg" />
                                                <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}
type paginationprops = {
    pagedata: number,
    per_pagedata: number,
    dataend: number,
    url: string
}
export async function Fetchposts({ pagedata, per_pagedata, dataend, url }: paginationprops) {
    const currentuser = await getuserid()
    if (!currentuser) return null;
    const toalpages = await db.select({ count: count() }).from(posts).where(eq(posts.authorId, currentuser))
    function gettotalpages() {
        if (toalpages[0].count > 5) {
            const numberofPages = Math.ceil(toalpages[0].count / per_pagedata)
            return numberofPages
        } else {
            const numberofPages = 1;
            return numberofPages
        }
    }
    const data = gettotalpages()
    const hasPrevPage = pagedata > 0;
    const hasNextPage = pagedata < data - 1;
    if (!currentuser) return null;
    const userblogs = await db.select().from(posts).where(eq(posts.authorId, currentuser)).offset(pagedata).limit(per_pagedata)
    return (
        <>
            <Card className="w-full">
                <CardHeader className="flex flex-row justify-between">
                    <div className="space-y-2">
                        <CardTitle>All Posts</CardTitle>
                        <CardDescription>Manage your blog posts.</CardDescription>
                    </div>
                    <div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem1 data={data} url={url} />
                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead className="hidden sm:table-cell">Date</TableHead>
                                <TableHead className="hidden sm:table-cell">Status</TableHead>

                                <TableHead>
                                    <span className="">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <Suspense fallback={<SkeleFetch />}>
                            <TableBody>
                                {userblogs.length === 0 ? (
                                    <TableRow >
                                    <TableCell className="font-medium">
                                        <Link href="#" className="hover:underline" prefetch={false}>
                                            No Blog Found
                                        </Link>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">No Blog Found</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                    No Blog Found
                                    </TableCell>
                                    <TableCell>
                                    No Blog Found
                                    </TableCell>
                                </TableRow>
                                ) : (
                                    <>
                                        {userblogs.map((blog, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">
                                                    <Link href="#" className="hover:underline" prefetch={false}>
                                                        {userblogs[index].title}
                                                    </Link>
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell">{`${userblogs[index].createdAt.getUTCDate()}-${userblogs[index].createdAt.getUTCMonth() + 1}-${userblogs[index].createdAt.getUTCFullYear()}`}</TableCell>
                                                <TableCell className="hidden sm:table-cell">
                                                    {userblogs[index].ispublished ? <Badge variant="secondary">Published</Badge> : <Badge variant="destructive">Not Published</Badge>}
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                                                <MoveHorizontalIcon className="h-4 w-4" />
                                                                <span className="sr-only">Toggle menu</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <PublishData ispublished={userblogs[index].ispublished} postId={userblogs[index].id} />
                                                            <Link href={`${url}/edit/${userblogs[index].id}`}>
                                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                            </Link>
                                                            <DeleteBtn2 postId={userblogs[index].id} />
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}</>
                                )}
                            </TableBody>
                        </Suspense>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}
export async function FetchCategories({ pagedata, per_pagedata, dataend, url }: paginationprops) {
    const currentuser = await getuserid()
    if (!currentuser) return null;
    const toalpages = await db.select({ count: count() }).from(categories)
    const usercategories = await db.select().from(categories).offset(pagedata).limit(per_pagedata)
    function gettotalpages() {
        if (toalpages[0].count > 5) {
            const numberofPages = Math.ceil(toalpages[0].count / per_pagedata)
            return numberofPages
        } else {
            const numberofPages = 1;
            return numberofPages
        }
    }
    const data = gettotalpages()
    const hasPrevPage = pagedata > 0;
    const hasNextPage = pagedata < data - 1;
    return (
        <>
            <Card className="w-full">
                <CardHeader className="flex flex-row justify-between">
                    <div className="space-y-2">
                        <CardTitle>All Posts</CardTitle>
                        <CardDescription>Manage your blog posts.</CardDescription>
                    </div>
                    <div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem1 data={data} url={url} />
                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead className="hidden sm:table-cell">Description</TableHead>
                                <TableHead className="hidden sm:table-cell">Status</TableHead>

                                <TableHead>
                                    <span className="">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {usercategories.map((blog, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        <Link href="#" className="hover:underline" prefetch={false}>
                                            {usercategories[index].name}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{usercategories[index].description}</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge variant="secondary">Active</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}

type fetchdata = {
    pagedata: number,
    per_pagedata: number,
    url: string
}
export async function Fetchdata({ pagedata, per_pagedata, url }: fetchdata) {
    const currentuser = await getuserid()
    if (!currentuser) return null;
    const userblogs = await db.select().from(posts).where(eq(posts.authorId, currentuser)).offset(pagedata).limit(per_pagedata)
    return (
        <TableBody>
            {userblogs.length === 0 ? (
                <div>No data Found</div>
            ) : (
                <>
                    {userblogs.map((blog, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                <Link href="#" className="hover:underline" prefetch={false}>
                                    {userblogs[index].title}
                                </Link>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{`${userblogs[index].createdAt.getUTCDate()}-${userblogs[index].createdAt.getUTCMonth() + 1}-${userblogs[index].createdAt.getUTCFullYear()}`}</TableCell>
                            <TableCell className="hidden sm:table-cell">
                                {userblogs[index].ispublished ? <Badge variant="secondary">Published</Badge> : <Badge variant="destructive">Not Published</Badge>}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoveHorizontalIcon className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <PublishData ispublished={userblogs[index].ispublished} postId={userblogs[index].id} />
                                        <Link href={`${url}/edit/${userblogs[index].id}`}>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                        </Link>
                                        <DeleteBtn2 postId={userblogs[index].id} />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}</>
            )}
        </TableBody>
    )
}

export function SkeleFetch() {
    return (
        <TableBody>
            <TableRow >
                <TableCell className="font-medium">
                    <Link href="#" className="hover:underline" prefetch={false}>
                        <Skeleton className="w-[200px] h-[30px]" />
                    </Link>
                </TableCell>
                <TableCell className="hidden sm:table-cell"><Skeleton className="w-[200px] h-[30px]" /></TableCell>
                <TableCell className="hidden sm:table-cell">
                    <Skeleton className="w-[200px] h-[30px]" />
                </TableCell>
                <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Skeleton className="w-[200px] h-[30px]" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <Skeleton className="w-[200px] h-[30px]" />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        </TableBody>
    )
}

export async function MainFetch() {
    const blogs = await db.select().from(posts).where(eq(posts.ispublished, true))
    return (
        <main className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">Latest Blog Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog, index) => (
                    <div key={index}
                        className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                        <Link href={`/blog/${blogs[index].slug}`} prefetch={false}>
                            <Image
                                src={blogs[index].headerimageurl}
                                alt={blogs[index].title}
                                width={400}
                                height={225}
                                className="w-full h-48 object-cover"
                                style={{ aspectRatio: "400/225", objectFit: "cover" }}
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-card-foreground">
                                    {blogs[index].title}
                                </h3>
                                <p className="text-card-foreground/80 mt-2 line-clamp-2">
                                    {blogs[index].description}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    )
}
type fetchcategory = {
    categoryid: number
}
export async function MainCategoryFetch({ categoryid }: fetchcategory) {
    const blogs = await db.select().from(posts).where(and(eq(posts.ispublished, true), eq(posts.categoryId, categoryid)))
    return (
        <main className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">Latest Blog Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog, index) => (
                    <div key={index}
                        className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                        <Link href={`/blog/${blogs[index].slug}`} prefetch={false}>
                            <Image
                                src={blogs[index].headerimageurl}
                                alt={blogs[index].title}
                                width={400}
                                height={225}
                                className="w-full h-48 object-cover"
                                style={{ aspectRatio: "400/225", objectFit: "cover" }}
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-card-foreground">
                                    {blogs[index].title}
                                </h3>
                                <p className="text-card-foreground/80 mt-2 line-clamp-2">
                                    {blogs[index].description}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    )
}