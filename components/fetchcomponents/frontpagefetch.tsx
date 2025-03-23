import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import {ArrowBigRight, ArrowRight, ChevronLeftIcon, ChevronRightIcon} from "lucide-react";

import {categories, posts} from "@/app/db/schema";
import {db} from "@/app/db/db";
import {desc, eq} from "drizzle-orm";
import {Button} from "@/components/ui/button";

export async function FetchCategory(){
    const category = await db.select().from(categories).limit(2).offset(2);
    return(
        <>
            {category.map((category, index) => (
                <div className="aspect-video md:aspect-auto md:flex-1 relative w-full h-48" key={index}>
                    <Image src="/background.svg" alt="placeholder" fill
                           className="rounded-xl object-cover object-center"/>
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0)] rounded-2xl"/>

                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center space-y-4">
                        <div className="absolute top-4 left-4">
                            <Link href={`/category/${category.id}`}>
                                <Button variant="outline"
                                        className="text-foreground flex flex-row gap-2 justify-center items-center h-8">View
                                    All<ArrowRight
                                        className="w-4 h-4"/></Button>
                            </Link>

                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-3xl font-bold text-white">{category.name}</h1>
                        <p className="max-w-xl text-lg sm:text-xs text-white">
                            {category.description}
                        </p>

                    </div>
                </div>
            ))}
        </>
    )
}

export async function Frontpagefetch() {
    const blogs = await db.select().from(posts).where(eq(posts.isfeatured, true)).orderBy(desc(posts.createdAt)).limit(3);
    return (
        <section className="w-full">
            <Carousel className="w-full h-4/5" opts={{loop: true}}>
                <CarouselContent>
                    {blogs.map((blog, index) => (
                        <CarouselItem key={index} className="bg-background">
                            <div className="relative w-full aspect-[16/9] overflow-hidden bg-background">
                                <Image
                                    src={blogs[index].headerimageurl}
                                    width={1920}
                                    height={1080}
                                    alt="Hero Image"
                                    className="w-full h-full object-cover rounded-2xl bg-background"
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0)] rounded-2xl"/>
                                <div
                                    className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center space-y-4">
                                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">{blogs[index].title}</h1>
                                    <p className="max-w-xl text-lg sm:text-xl text-white">

                                    </p>
                                    <Link
                                        href="#"
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                        prefetch={false}
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}

                </CarouselContent>
                <CarouselPrevious
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/50 p-2 hover:bg-white/75 focus:outline-none focus:ring-1 focus:ring-ring">
                    <ChevronLeftIcon className="h-6 w-6 text-muted-foreground"/>
                </CarouselPrevious>
                <CarouselNext
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/50 p-2 hover:bg-white/75 focus:outline-none focus:ring-1 focus:ring-ring">
                    <ChevronRightIcon className="h-6 w-6 text-muted-foreground"/>
                </CarouselNext>
            </Carousel>
        </section>
    )
}