import Image from "next/image";
import {Skeleton} from "@/components/ui/skeleton";
import {cn} from "@/lib/utils";

type SuspenseImageProps = {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
}
export const SuspenseImage = ({ src, alt, width, height,className } : SuspenseImageProps) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            className={cn(className)}
        />
    );
};

export const LoadingFallback = () => (
    <Skeleton className="aspect-[11/8] overflow-hidden rounded-xl object-cover object-center w-full h-[450px]" />
);