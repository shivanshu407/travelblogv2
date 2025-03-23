"use server";

import {blogschema, category, commentschema, deletebtn, deletecategory, publisherschema, saveblogschema, TextGeneration} from "@/lib/zodschema";
import {actionClient} from "@/lib/safe-action";
import {revalidatePath} from "next/cache";
import {currentUser} from "@clerk/nextjs/server";
import {eq} from "drizzle-orm";
import {db} from "@/app/db/db";
import {categories, comments, posts, users} from "@/app/db/schema";
import adminControl, { Allowedtodelete } from "./AdminControl";
import { redirect } from "next/navigation";


export async function getUserIdAction() {
    try {
        const user = await currentUser()
        const currentuserid = user?.id.toString();
        if (!currentuserid) return null;
        const userfinal = await db.select().from(users).where(eq(users.userId, currentuserid))
        return userfinal[0].id
    } catch (error: any) {
        return new error("Failed to get user id")
    }
}
export const createcomment = actionClient.schema(commentschema).action(async ({ parsedInput: { comment,postId } }) => {
    try {
        const userid = await getUserIdAction()
        await db.insert(comments).values({
            content: comment,
            userId: userid,
            postId: postId
        })
        revalidatePath(`/blog/${postId}`)
        return {
            success: 'Added Successfully',
        };
    }catch (error: any) {
        return {failure: "Incorrect credentials"};
    }
});
export const createBlogAction = actionClient.schema(blogschema).action(async ({ parsedInput: { title, slug, content, headerimageurl, description,categoryid } }) => {
        try {
            const userid = await getUserIdAction()
            if(userid){
                await db.insert(posts).values({
                    title: title,
                    slug: slug,
                    content: content,
                    headerimageurl: headerimageurl,
                    authorId: userid,
                    categoryId: categoryid,
                    isfeatured: false,
                    ispublished: true,
                    description: description
                })
                revalidatePath(`/dashboard`)
                return {
                    success: 'Added Successfully',
                };
            }else{
                return { failure: "Incorrect Data" };
            }
        }catch (error: any) {
            return { failure: "Incorrect credentials" };
        }
    });

export const saveBlogAction = actionClient
    .schema(saveblogschema)
    .action(async ({ parsedInput: { title, slug, content, headerimageurl,blogid,description,categoryid } }) => {
        try {
            const userid = await getUserIdAction()
            if (headerimageurl){
                await db.update(posts)
                    .set({
                        title: title,
                        content: content,
                        slug: slug,
                        headerimageurl: headerimageurl,
                        description: description,
                        categoryId: categoryid
                    })
                    .where(eq(posts.id, blogid));
            }else {
                await db.update(posts)
                    .set({
                        title: title,
                        content: content,
                        slug: slug,
                        description: description,
                        categoryId: categoryid
                    })
                    .where(eq(posts.id, blogid));
            }
            return {
                success: 'Saved Successfully',
            };
        }catch (error: any) {
            return { failure: "Incorrect credentials" };
        }
    });

export const publishBlogAction = actionClient.schema(publisherschema).action(async ({ parsedInput: { ispublished, postId } }) => {
    try {
        const userid = await getUserIdAction()
        await db.update(posts)
            .set({
                ispublished: ispublished
            })
            .where(eq(posts.id, postId));
        revalidatePath(`/dashboard`)
        return {
            success: 'Published Successfully',
        };
    }catch (error: any) {
        return { failure: "Incorrect credentials" };
    }

});

export const DeleteBlogAction = actionClient.schema(deletebtn).action(async ({ parsedInput: { postId } }) => {
    try {
        const userid = await getUserIdAction()
        const isallowed = await Allowedtodelete(userid)
        if(isallowed){
            await db.delete(comments).where(eq(comments.postId, postId))
            await db.delete(posts).where(eq(posts.id, postId))
            revalidatePath(`/dashboard`)
            return {
                success: 'Deleted Successfully',
            };
        }else {
            return { failure: "Incorrect credentials" };
        }
    }catch (error: any) {
        return { failure: "Incorrect credentials" };
    }

});

export const deletecategoryAction = actionClient.schema(deletecategory).action(async({parsedInput: {categoryId}}) => {
    try{
        const isadmin = await adminControl()
        if(isadmin){
            await db.delete(posts).where(eq(posts.categoryId, categoryId))
            await db.delete(categories).where(eq(categories.id, categoryId))
            revalidatePath(`/admin`)
            return {
                success: 'Deleted Successfully',
            };
        }else {
            return { failure: "Incorrect credentials" };
        }
    }catch (error: any) {
        return { failure: "Incorrect credentials" };
    }
})


export const CategoryMaker = actionClient.schema(category).action(async ({ parsedInput: { name, description } }) => {
    try{
        const userid = await getUserIdAction()
            if(userid){
                await db.insert(categories).values({
                    name: name,
                    description: description
                })
                revalidatePath(`/admin`)
                return {
                    success: 'Added Successfully',
                };
            }else{
                return { failure: "Incorrect Data" };
            }
    }catch(error : any){
        return { failure: "Failed" };    
    }});