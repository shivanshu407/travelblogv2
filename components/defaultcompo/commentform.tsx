'use client';

import {useState} from "react";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import * as z from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {commentschema} from '@/lib/zodschema'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useAction} from "next-safe-action/hooks";
import { toast } from "sonner"
import {Textarea} from "@/components/ui/textarea";
import {createcomment} from "@/lib/actions";
type commentbtnprops = {
    postId: number
}

export default function  AddForm({postId} : commentbtnprops){
    const [isOpen, setIsOpen] = useState(false)
    const {execute, status, result} = useAction(createcomment,{
        onSuccess: ({data}) => {
            if (data?.failure){
                toast.error(data.failure)
            }
            if (data?.success){
                setIsOpen(false)
                toast.success(data.success)
            }

        },
        onError: (error) => {
            toast.error("failed")

        }
    })
    const form = useForm<z.infer<typeof commentschema>>({
        resolver: zodResolver(commentschema),
        defaultValues: {
            comment: '', postId: postId
        },
    })
    function onSubmit(values: z.infer<typeof commentschema>) {
        execute(values)

    }
    return(
        <div>
            <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">

                            <div>
                                <FormField
                                    control={form.control}
                                    name="comment"
                                    render={ ({field}) => (
                                        <FormItem>
                                            <FormLabel>Comment</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} placeholder="Enter Your comment here" className="w-full" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button disabled={status === 'executing'} className="w-full mt-4" type="submit">Submit</Button>
                        </form>
                    </Form>
        </div>
    )
}