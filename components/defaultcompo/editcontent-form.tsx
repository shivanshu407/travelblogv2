'use client'

import { useEffect, useState } from 'react'

import Editor from '@/components/editor'
import editor from '@/components/editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createBlogAction, saveBlogAction } from '@/lib/actions'
import { toast } from 'sonner'
import { uploadImage } from "@/lib/uploader";
import { useAction } from "next-safe-action/hooks";
import { generateJSON } from "@tiptap/html";
import {
    AIHighlight,
    HorizontalRule,
    Placeholder,
    StarterKit,
    TaskItem,
    TaskList,
    TiptapImage,
    TiptapLink,
    UpdatedImage
} from "novel/extensions";
import { JSONContent } from "novel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '../ui/dialog'
import { AlertDialogHeader } from '../ui/alert-dialog'
import Generation from '@/lib/Generation'

export const defaultValue = {
    type: 'doc',
    content: [
        {
            type: 'paragraph',
            content: [
                {
                    type: 'text',
                    text: 'Type "/" for commands or start writing...'
                }
            ]
        }
    ]
}
type editor = {
    contentset: string
    slugset: string
    titleset: string
    idset: number
    discriptionset: string
    categoryset: number
    categories?: TravelCategories;
}

interface TravelCategory {
    id: number;
    name: string;
    description: string | null;
}

type TravelCategories = TravelCategory[];

interface TravelCategoriesProps {
    categories?: TravelCategories;
}
export default function EditContentForm({ contentset, slugset, titleset, idset, categories = [], discriptionset, categoryset }: editor) {
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [json, setJson] = useState<JSONContent>()
    const [content, setContent] = useState<string>('')
    const [image, setImage] = useState<File>()
    const [prop, setProp] = useState('')
    const [preview, setPreview] = useState(false)

    const [description, setDescription] = useState('')
    const [category, setCategory] = useState<number>(1)
    const { execute, result, status } = useAction(saveBlogAction, {
        onSuccess: ({ data }) => {
            if (data?.failure) {
                toast.error(data.failure)
            }
            if (data?.success) {
                toast.success(data.success)
            }
        },
        onError: (error) => {
            toast.error("failed")
        }
    })
    function datasetter() {

        return generateJSON(contentset, [
            TiptapImage,
            TiptapLink,
            UpdatedImage,
            TaskList,
            TaskItem,
            HorizontalRule,
            StarterKit,
            Placeholder,
            AIHighlight
        ])
    }
    useEffect(() => {
        setTitle(titleset)
        setSlug(slugset)
        setContent(contentset)
        setDescription(discriptionset)
        setCategory(categoryset)
    }, []);

    useEffect(() => {
        const name = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')

        setSlug(name)
    }, [title])

    async function generatecode() {

        
    }

    async function handleSubmit() {


        const file = image
        if (!file) {
            toast.error('Image is required')
            execute({ title, slug, content, blogid: idset, description, categoryid: category })
        } else {
            const headerimageurl = await uploadImage(file)
            execute({ title, slug, content, blogid: idset, headerimageurl, description, categoryid: category })
        }



    }

    return (
        <div className='flex flex-row gap-5'>
            <div className="w-full">
                <CardHeader>
                    <CardTitle className="flex flex-row justify-between">
                        <p>Edit Blog</p>
                        <div className="flex flex-row justify-center items-center gap-2">
                            <Switch checked={preview} onCheckedChange={
                                (checked) => {
                                    setPreview(checked)
                                }
                            } id="airplane-mode" />
                            <Label htmlFor="airplane-mode" className="text-xl">Preview</Label>
                        </div>
                    </CardTitle>

                </CardHeader>
                <CardContent>
                    <div className="mt-6 flex w-full flex-col gap-4">
                        <div className='flex flex-col gap-4'>
                            <div className="flex gap-4">
                                <Input
                                    required={true}
                                    type='text'
                                    placeholder='Title'
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                                <Input
                                    required={true}
                                    type='text'
                                    placeholder='Slug'
                                    value={slug}
                                    onChange={e => setSlug(e.target.value)}
                                />

                                <Input
                                    required={true}
                                    type='file'
                                    name='Image'
                                    accept="image/*"
                                    placeholder='Image'
                                    onChange={event => {
                                        if (event.target.files) {
                                            setImage(event.target.files[0])
                                        }
                                    }}
                                />
                                <Select onValueChange={e => setCategory(Number(e))} value={String(category)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Categories</SelectLabel>
                                            {categories.map((category, index) => (
                                                <SelectItem key={index} value={String(category.id)}
                                                    className="capitalize">
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Textarea
                                required={true}
                                placeholder='Description'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />

                        </div>

                        <div>
                            <div className="w-full flex justify-end">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">Generate</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <AlertDialogHeader>
                                            <DialogTitle>Generate</DialogTitle>
                                            <DialogDescription>
                                                Please Enter Your Prompt
                                            </DialogDescription>
                                        </AlertDialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="flex flex-col gap-4">
                                                <Label htmlFor="username" className="text-right">
                                                    Title For Blog
                                                </Label>
                                                <Input
                                                    id="prompt"
                                                    value={prop}
                                                    onChange={e => setProp(e.target.value)}
                                                    className="col-span-3"
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" >Save changes</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <Editor initialValue={datasetter()} onChange={setContent} />
                        </div>

                        <Button onClick={handleSubmit} disabled={status === 'executing'}>
                            {status === 'executing' ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                    <div className="w-full">

                    </div>
                </CardContent>
            </div>
            {preview &&
                <div className="w-full p-6 flex flex-col gap-8">
                    <CardHeader className="w-full p-0 pb-5">
                        <CardTitle>
                            <p>Preview</p>
                        </CardTitle>

                    </CardHeader>
                    <Input
                        disabled={true}
                        className="h-10"
                        type='text'
                        placeholder='Slug'
                        value={"http://localhost:3000/blog/" + slug}
                        onChange={e => setSlug(e.target.value)}
                    />
                    <Card>

                        <CardContent>

                            <div dangerouslySetInnerHTML={{ __html: content }} className="prose mt-4"></div>
                        </CardContent>
                    </Card>
                </div>}
        </div>
    )
}
