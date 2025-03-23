"use client"

import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {publisherschema} from "@/lib/zodschema";
import {useAction} from "next-safe-action/hooks";
import {publishBlogAction} from "@/lib/actions";
import {toast} from "sonner";

type ispublished = {
    ispublished: boolean
    postId: number
}

export default function DeleteBtn({ispublished, postId} : ispublished) {
    const {execute, status, result} = useAction(publishBlogAction,{
        onSuccess: ({data}) => {
            if (data?.failure){
                toast.error(data.failure)
            }
            if (data?.success){
                toast.success(data.success)
            }
        }
    })
    const form = useForm<z.infer<typeof publisherschema>>({
        resolver: zodResolver(publisherschema),
        defaultValues: {
            ispublished: !ispublished,
            postId: postId
        },
    })

    function onSubmit(values : z.infer<typeof publisherschema>) {
        execute(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

                <Button type="submit"
                        variant="outline"
                        size="sm"
                        className={`flex items-center justify-center w-full   ${ispublished? "bg-red-500 text-white hover:bg-red-600 hover:text-white" : "bg-white border text-black hover:bg-white/90 hover:text-black"} `}
                >{ispublished? "unpublish": "publish"  }</Button>
            </form>
        </Form>
    )
}