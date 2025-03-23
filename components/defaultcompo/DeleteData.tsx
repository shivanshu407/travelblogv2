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
import {deletebtn, publisherschema} from "@/lib/zodschema";
import {useAction} from "next-safe-action/hooks";
import {DeleteBlogAction, publishBlogAction} from "@/lib/actions";
import {toast} from "sonner";

type ispublished = {
    postId: number
}

export default function DeleteBtn2({postId} : ispublished) {
    const {execute, status, result} = useAction(DeleteBlogAction,{
        onSuccess: ({data}) => {
            if (data?.failure){
                toast.error(data.failure)
            }
            if (data?.success){
                toast.success(data.success)
            }
        }
    })
    const form = useForm<z.infer<typeof deletebtn>>({
        resolver: zodResolver(deletebtn),
        defaultValues: {
            postId: postId
        },
    })

    function onSubmit(values : z.infer<typeof deletebtn>) {
        execute(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

                <Button type="submit"
                        variant="outline"
                        size="sm"
                        className="w-full border-0 justify-start"
                        disabled={status === "executing"}
                >{status === "executing"? "Deleting": "Delete"}</Button>
            </form>
        </Form>
    )
}