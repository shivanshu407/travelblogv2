import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuLink, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { ChevronRightIcon, MenuIcon, MountainIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { db } from "@/app/db/db";
import { categories, users } from "@/app/db/schema";
import { SearchClient } from "@/components/defaultcompo/SearchClient";
import { ModeToggle } from "../component/Toggle"

export default async function Header() {
    const cats = await db.select().from(categories).offset(1).limit(6)
    const author = await db.select().from(users).limit(6)
    return (
        <header
            className="sticky top-0 flex w-full shrink-0 justify-between items-center px-4 py-3 md:px-6 border-b z-50 bg-background">
            <div className="flex flex-row ">
                <Link href="#" className="mr-6 flex items-center" prefetch={false}>
                    <MountainIcon className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList>
                        <NavigationMenuLink asChild>
                            <Link
                                href="/"
                                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                                prefetch={false}
                            >
                                Home
                            </Link>
                        </NavigationMenuLink>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="grid w-[550px] grid-cols-2 p-2">

                                    {cats.map((cat, index) => (
                                        <NavigationMenuLink asChild key={index}>
                                            <Link
                                                href={`/category/${cat.id}`}
                                                className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                                                prefetch={false}
                                            >
                                                <div className="text-sm font-medium leading-none group-hover:underline">
                                                    {cat.name}
                                                </div>
                                                <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                    {cat.description}
                                                </div>
                                            </Link>
                                        </NavigationMenuLink>
                                    ))}
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Authors</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="grid w-[550px] grid-cols-2 p-2">
                                    {author.map((cat, index) => (
                                        <NavigationMenuLink asChild key={index}>
                                            <Link
                                                href={`/author/${cat.id}`}
                                                className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                                                prefetch={false}
                                            >
                                                <div className="text-sm font-medium leading-none group-hover:underline capitalize">{author[index].username}
                                                </div>
                                                <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                    Read our latest blog posts.
                                                </div>
                                            </Link>
                                        </NavigationMenuLink>
                                    ))}

                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link
                                href="#"
                                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                                prefetch={false}
                            >
                                Support
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="flex flex-row gap-4">
                <SearchClient />
                <Link href="/dashboard" className="ml-auto">
                    <Button variant="outline">Create Your Own Post</Button>
                </Link>
                <div className="w-fit">
                    <ModeToggle/>
                </div>
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <MenuIcon className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <Link href="#" className="flex items-center justify-center" prefetch={false}>
                        <MountainIcon className="h-6 w-6" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <div className="grid gap-2 py-6">
                        <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                            About
                        </Link>
                        <Collapsible className="grid gap-4">
                            <CollapsibleTrigger
                                className="flex w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                                Categories <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="-mx-6 grid gap-6 bg-muted p-6">
                                    {cats.map((cat, index) => (
                                        <Link href={`/category/${cat.id}`} className="group grid h-auto w-full justify-start gap-1"
                                            prefetch={false} key={index}>
                                            <div
                                                className="text-sm font-medium leading-none group-hover:underline">{cat.name}
                                            </div>
                                            <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                {cat.description}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                        <Collapsible className="grid gap-4 mt-3">
                            <CollapsibleTrigger
                                className="flex w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                                Author <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="-mx-6 grid gap-6 bg-muted p-6">
                                    {author.map((cat, index) => (
                                        <Link href={`/author/${cat.id}`} className="group grid h-auto w-full justify-start gap-1"
                                            prefetch={false} key={index}>
                                            <div className="text-sm font-medium leading-none group-hover:underline">
                                                {cat.username}
                                            </div>
                                            <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                Read our latest blog posts.
                                            </div>
                                        </Link>
                                    ))}

                                </div>
                            </CollapsibleContent>
                        </Collapsible>

                        <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                            Support
                        </Link>
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    )
}
