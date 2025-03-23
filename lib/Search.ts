import { sql } from 'drizzle-orm';
import {posts} from "@/app/db/schema";
import {db} from "@/app/db/db";


export default async function SearchResult(query:string){
    const title = {query};
    const results = await db
        .select({
            id: posts.id,
            title: posts.title,
            description: posts.description,
            slug: posts.slug,
        })
        .from(posts)
        .where(sql`to_tsvector('english', ${posts.title}) @@ to_tsquery('english', ${title})`);
    return results;
}