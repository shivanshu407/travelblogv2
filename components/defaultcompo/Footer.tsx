import {MountainIcon} from "lucide-react";
import Link from "next/link";

export default function Footer(){
    return (
        <footer className=" bg-muted py-6 w-full">
            <div className="container max-w-5xl flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
                <div className="flex items-center gap-2">
                    <MountainIcon className="h-6 w-6"/>
                    <span className="text-lg font-semibold">Blog Site</span>
                </div>
                <p className="text-sm text-muted-foreground">&copy; 2024 Blog Site. All rights reserved.</p>
                <nav className="flex items-center gap-4">
                    <Link href="#" className="text-sm hover:underline underline-offset-4" prefetch={false}>
                        Home
                    </Link>
                    <Link href="#" className="text-sm hover:underline underline-offset-4" prefetch={false}>
                        About
                    </Link>
                    <Link href="#" className="text-sm hover:underline underline-offset-4" prefetch={false}>
                        Contact
                    </Link>
                    <Link href="#" className="text-sm hover:underline underline-offset-4" prefetch={false}>
                        Privacy
                    </Link>
                </nav>
            </div>
        </footer>
    )
}