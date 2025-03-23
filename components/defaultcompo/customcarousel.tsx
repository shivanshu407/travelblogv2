import {db} from "@/app/db/db";
import {categories, posts} from "@/app/db/schema";
import {eq} from "drizzle-orm";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function Customcarousel() {
    const blogs = await db.select().from(posts).where(eq(posts.isfeatured, true))
    async function categoryname(id: number) {
        const categoryName = await db.select().from(categories).where(eq(categories.id, id));
        return categoryName[0].name
    }
    return (
        <div className="grid  md:grid-cols-4 sm:grid-cols-2 gap-4 mt-4">
            {blogs.map((blog,index) => (
                <Card key={index}>
                    <CardHeader>
                        <Image
                            src={blog.headerimageurl}
                            width={800}
                            height={500}
                            alt="Blog post thumbnail"
                            className="aspect-[4/3] w-full rounded-t-lg object-cover"
                        />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="inline-block rounded-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground capitalize">
                            <Link href={'/category/'+blog.categoryId} prefetch={false}>
                                {categoryname(blog.categoryId)}
                            </Link>
                        </div>
                        <h3 className="text-xl font-bold">{blog.title}</h3>
                        <p className="text-muted-foreground">
                            {blog.description}
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Link
                            href={'/blog/'+blog.slug}
                            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                            prefetch={false}
                        >
                            Read More
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}