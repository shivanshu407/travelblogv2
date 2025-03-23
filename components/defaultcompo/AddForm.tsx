'use client';

import {useState} from "react";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import * as z from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useAction} from "next-safe-action/hooks";
import { toast } from "sonner"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { category } from "@/lib/zodschema";
import { CategoryMaker } from "@/lib/actions";


export default function  AddForm(){
    const [isOpen, setIsOpen] = useState(false)
    const {execute, status, result} = useAction(CategoryMaker,{
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
    const form = useForm<z.infer<typeof category>>({
        resolver: zodResolver(category),
        defaultValues: {
            name: '', description: ''
        },
    })
    function onSubmit(values: z.infer<typeof category>) {
        execute(values)

    }
    return(
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Add</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle>Add Server To portal</DialogTitle>
                        <DialogDescription>
                            Click to save.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">

                            <FormField
                                control={form.control}
                                name="name"
                                render={ ({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={ ({field}) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                                <Button disabled={status === 'executing'} className="w-full mt-4" type="submit">Submit</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

        </div>
    )
}