import Image from "next/image";
import {Card, CardContent} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Separator} from "@/components/ui/separator";
import AddForm from "@/components/defaultcompo/commentform";
import {db} from "@/app/db/db";
import {categories, comments, posts, users} from "@/app/db/schema";
import {eq} from "drizzle-orm";
import {Skeleton} from "@/components/ui/skeleton";
import {LoadingFallback, SuspenseImage} from "@/components/defaultcompo/SuspenseImage";
import {Suspense} from "react";
import {SignedIn, SignedOut} from "@clerk/nextjs";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import getuserid from "@/lib/getuserid";

type SingleblogProps = {
    slug: string
}

export function SkeletonBlog(){
    return (
        <div>
            <div className="mt-4 flex flex-row gap-4">
                <div className="h-full w-full">
                    <div className="h-full relative">
                        <Skeleton className="aspect-[11/8] overflow-hidden rounded-xl object-cover object-center w-full h-[450px]"/>
                        <div className="absolute top-4 left-4">
                        <span
                            className="px-2 py-1 text-sm bg-transparent rounded-full text-foreground w-fit"><Skeleton className="h-4 w-[200px]" /></span>
                            <span
                                className="px-2 py-1 ml-2 text-sm bg-transparent rounded-full text-foreground capitalize"><Skeleton className="h-4 w-[200px]" /></span>
                        </div>
                        <div className="absolute top-4 right-4">
                        <span
                            className="px-2 py-1 ml-2 text-sm bg-transparent rounded-full text-foreground ca"><Skeleton className="h-4 w-[200px]" /></span>
                        </div>
                        <div className="absolute bottom-4 left-4">
                            <div
                                className="px-6 h-16 text-2xl bg-background rounded-sm text-foreground capitalize flex flex-row justify-start items-center">
                                <h1><Skeleton className="h-4 w-[200px]" /></h1></div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex flex-col gap-4 mt-4">
                            <Skeleton className="h-4 w-[300px]" />
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Comments</h1>
                            <p className="text-muted-foreground">Share your thoughts and feedback on this article.</p>
                            <Card>
                                <CardContent className="gap-6 flex flex-row w-full p-4">
                                    <div className="flex flex-col w-full">
                                        <ScrollArea className="h-96 w-full whitespace-nowrap rounded-md border p-8">
                                                <div>
                                                    <div className="flex items-start gap-4 w-full mt-4 mb-4">
                                                        <Avatar className="w-10 h-10 border">
                                                            <AvatarImage src="/placeholder.svg"/>
                                                            <AvatarFallback>AC</AvatarFallback>
                                                        </Avatar>
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2">

                                                                <div className="font-medium">

                                                                    <Skeleton className="h-4 w-[200px]" />
                                                                </div>
                                                                <div className="text-xs text-muted-foreground">2 days
                                                                    ago
                                                                </div>
                                                            </div>
                                                            <p>
                                                                <Skeleton className="h-4 w-[200px]" />
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Separator/>
                                                </div>
                                        </ScrollArea>
                                    </div>

                                    <Skeleton className="h-[400px] w-full" />
                                </CardContent>

                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function Singleblog({slug}: SingleblogProps) {
    const blog = await db.select().from(posts).where(eq(posts.slug, slug))
    if ((blog[0].ispublished === false)) return <div>404</div>
    const category = await db.select().from(categories).where(eq(categories.id, blog[0].categoryId))
    const author = await db.select().from(users).where(eq(users.id, blog[0].authorId))
    const comment = await db.select().from(comments).where(eq(comments.postId, blog[0].id))

    async function getCommentName(userID: number) {
        const data = await db.select().from(users).where(eq(users.id, userID))
        return data[0].username
        const userid = getuserid()
    }

    return (
        <div>
            <div className="mt-4 flex flex-row gap-4">
                <div className="h-full w-full">
                    <div className="h-full relative">
                        <Suspense fallback={<LoadingFallback />}>
                        <SuspenseImage src={blog[0].headerimageurl} alt="placeholder" width={1500} height={1500} className="aspect-[11/8] overflow-hidden rounded-xl object-cover object-center w-full h-[450px]"/>
                        </Suspense>
                        <div className="absolute top-4 left-4">
                        <span
                            className="px-2 py-1 text-sm bg-background rounded-full text-foreground">{`${blog[0].createdAt.getUTCDate()}-${blog[0].createdAt.getUTCMonth() + 1}-${blog[0].createdAt.getUTCFullYear()}`}</span>
                            <span
                                className="px-2 py-1 ml-2 text-sm bg-background rounded-full text-foreground capitalize">{category[0].name}</span>
                        </div>
                        <div className="absolute top-4 right-4">
                        <span
                            className="px-2 py-1 ml-2 text-sm bg-background rounded-full text-foreground ca">By {author[0].username}</span>
                        </div>
                        <div className="absolute bottom-4 left-4">
                            <div
                                className="px-6 h-16 text-2xl bg-background rounded-sm text-foreground capitalize flex flex-row justify-start items-center">
                                <h1>{blog[0].title}</h1></div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="prose mt-4">
                            <div dangerouslySetInnerHTML={{__html: blog[0].content}}></div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Comments</h1>
                            <p className="text-muted-foreground">Share your thoughts and feedback on this </p>
                            <Card>
                                <CardContent className="gap-6 flex flex-row w-full p-4">
                                    <div className="flex flex-col w-full">
                                        <ScrollArea className="h-96 w-full whitespace-nowrap rounded-md border p-8">
                                            {comment.map((comment, index) => (
                                                <div key={index}>
                                                    <div className="flex items-start gap-4 w-full mt-4 mb-4">
                                                        <Avatar className="w-10 h-10 border">
                                                            <AvatarImage src="/placeholder.svg"/>
                                                            <AvatarFallback>AC</AvatarFallback>
                                                        </Avatar>
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2">

                                                                <div className="font-medium">

                                                                    {getCommentName(comment.userId)}
                                                                </div>
                                                                <div className="text-xs text-muted-foreground">2 days
                                                                    ago
                                                                </div>
                                                            </div>
                                                            <p>
                                                                {comment.content}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Separator/>
                                                </div>
                                            ))}
                                        </ScrollArea>
                                    </div>
                                    <div className="w-full">
                                    <SignedOut>
                                        <div className="flex flex-row gap-4">
                                            <Link href="/sign-in">
                                                <Button>Sign in to comment</Button>
                                            </Link>
                                            <Link href="/sign-up">
                                                <Button>Sign up to comment</Button>
                                            </Link>
                                        </div>
                                    </SignedOut>
                                    <SignedIn>
                                            <AddForm postId={blog[0].id}/>

                                    </SignedIn>
                                    </div>
                                </CardContent>

                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}