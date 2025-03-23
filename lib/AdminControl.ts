import {currentUser} from "@clerk/nextjs/server";
import {db} from "@/app/db/db";
import {users} from "@/app/db/schema";
import {eq} from "drizzle-orm";
import {Button} from "@/components/ui/button";
import {getUserIdAction} from "@/lib/actions";

export default async function adminControl(){
    const user = await currentUser()
    const currentuserid = user?.id.toString();
    if (!currentuserid) return null;
    const userfinal = await db.select().from(users).where(eq(users.userId, currentuserid))
    if (userfinal[0].roleId === 1) {
        return true
    } else {
        return false
    }
}

export async function Allowedtoedit({autherId}: {autherId: number}){
    const userid = await getUserIdAction()
    const isadmin =  await adminControl()
    if (isadmin){
        return true
    }else if (userid === autherId) {
        return true
    }else {
        return false
    }
}
export async function Allowedtodelete({autherId}: {autherId: number}){
    const userid = await getUserIdAction()
    const isadmin =  await adminControl()
    if (isadmin){
        return true
    }else if (userid === autherId) {
        return true
    }else {
        return false
    }
}