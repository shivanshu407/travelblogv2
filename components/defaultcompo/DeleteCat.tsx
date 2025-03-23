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
import {deletebtn, deletecategory, publisherschema} from "@/lib/zodschema";
import {useAction} from "next-safe-action/hooks";
import {DeleteBlogAction, deletecategoryAction, publishBlogAction} from "@/lib/actions";
import {toast} from "sonner";
import { AlertDialogAction } from '@radix-ui/react-alert-dialog'

type ispublished = {
    categoryId: number
}

export default function DeleteBtn3({categoryId} : ispublished) {
    const {execute, status, result} = useAction(deletecategoryAction,{
        onSuccess: ({data}) => {
            if (data?.failure){
                toast.error(data.failure)
            }
            if (data?.success){
                toast.success(data.success)
            }
        }
    })
    const form = useForm<z.infer<typeof deletecategory>>({
        resolver: zodResolver(deletecategory),
        defaultValues: {
            categoryId: categoryId
        },
    })

    function onSubmit(values : z.infer<typeof deletecategory>) {
        execute(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

            <AlertDialogAction type='submit' ><Button>Delete</Button></AlertDialogAction>
            </form>
        </Form>
    )
}