import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"

type children = {
    children: React.ReactNode
}
export default function AdminHeader({children}: children) {
    return (
        <>
        <header
            className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4 sm:h-16 sm:px-6">
            <div className="flex items-center gap-4">
                <span className="text-lg font-semibold sm:text-xl">Admin</span>
            </div>
            <div>
                <Link href="/dashboard" >
                    <Button className="capitalize" variant='outline'>go to dashboard</Button>
                </Link>
            </div>
        </header>
            <Tabs defaultValue="posts" className="mx-6 my-4">
                <TabsList>
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="category">Category</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                {children}
            </Tabs>
        </>
    )
}