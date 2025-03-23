import {currentUser} from "@clerk/nextjs/server";
import {users} from "@/app/db/schema";
import {db} from "@/app/db/db";
import {eq} from "drizzle-orm";

export default async function getuserid(){
    const user = await currentUser()
    const currentuserid = user?.id.toString();
    if (!currentuserid) return null;
    const userdata = await db.select().from(users).where(eq(users.userId, currentuserid))
    return userdata[0].id
}
