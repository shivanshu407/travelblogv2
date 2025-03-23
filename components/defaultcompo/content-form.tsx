'use client'

import { useEffect, useState } from 'react'
import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Editor from '@/components/editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createBlogAction } from '@/lib/actions'
import { toast } from 'sonner'
import {blogschema} from '@/lib/zodschema'
import {uploadImage} from "@/lib/uploader";
import {useAction} from "next-safe-action/hooks";
import {Textarea} from "@/components/ui/textarea";
import { redirect } from 'next/navigation'

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

interface TravelCategory {
    id: number;
    name: string;
    description: string | null ;
}

type TravelCategories = TravelCategory[];

interface TravelCategoriesProps {
    categories?: TravelCategories;  // Make the prop optional
}
export default function ContentForm({categories = []}: TravelCategoriesProps) {
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [content, setContent] = useState<string>('')
    const [image, setImage] = useState<File>()
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState<number>(1)
    const {execute, result, status} = useAction(createBlogAction,{
        onSuccess: ({data}) => {
            if (data?.failure){
                toast.error(data.failure)
            }
            if (data?.success){
                toast.success(data.success)
                redirect('/dashboard')
                
            }
        },
        onError: (error) => {
            toast.error("failed")
        }
    })

    useEffect(() => {
        const name = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')

        setSlug(name)
    }, [title])


    async function handleSubmit() {


        const file = image
        if (!file) {
            toast.error('Image is required')
            throw new Error('Image is required')
        }
        const headerimageurl = await uploadImage(file)
        execute({title, slug, content, headerimageurl, description, categoryid: category})

    }

    return (
        <div className='mt-6 flex w-full flex-col gap-4'>
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
                    <Select onValueChange={e => setCategory(Number(e))}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Categories</SelectLabel>
                                {categories.map((category, index) => (
                                    <SelectItem key={index} value={String(category.id)} className="capitalize">
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

            <Editor initialValue={defaultValue} onChange={setContent} />
            <Button onClick={handleSubmit} disabled={status === 'executing'}>
                {status === 'executing' ? 'Submitting...' : 'Create'}
            </Button>

        </div>
    )
}
