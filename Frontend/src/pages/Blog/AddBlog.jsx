// import React, { useEffect, useState } from 'react'
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { z } from 'zod'
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import slugify from 'slugify'
// import { showToast } from '@/helpers/showToast'
// import { getEvn } from '@/helpers/getEnv'
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import { useFetch } from '@/hooks/useFetch'
// import Dropzone from 'react-dropzone'
// import Editor from '@/components/Editor'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { RouteBlog } from '@/helpers/RouteName'

// const AddBlog = () => {
//     const navigate = useNavigate()
//     const user = useSelector((state) => state.user)
//     const { data: categoryData, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/category/all-category`, {
//         method: 'get',
//         credentials: 'include'
//     })

//     const [filePreview, setPreview] = useState()
//     const [file, setFile] = useState()

//     const formSchema = z.object({
//         category: z.string().min(3, 'Category must be at least 3 character long.'),
//         title: z.string().min(3, 'Title must be at least 3 character long.'),
//         slug: z.string().min(3, 'Slug must be at least 3 character long.'),
//         blogContent: z.string().min(3, 'Blog content must be at least 3 character long.'),
//     })

//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             category: '',
//             title: '',
//             slug: '',
//             blogContent: '',
//         },
//     })

//     const handleEditorData = (event, editor) => {
//         const data = editor.getData()
//         console.log(data)
//         form.setValue('blogContent', data)
//     }


//     const blogTitle = form.watch('title')

//     useEffect(() => {
//         if (blogTitle) {
//             const slug = slugify(blogTitle, { lower: true })
//             form.setValue('slug', slug)
//         }
//     }, [blogTitle])

//     async function onSubmit(values) {
//      console.log(values)
//         try {
//             const newValues = { ...values, author: user.user._id }
//             if (!file) {
//                 showToast('error', 'Feature image required.')
//             }

//             const formData = new FormData()
//             formData.append('file', file)
//             formData.append('data', JSON.stringify(newValues))

//             const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/blog/add`, {
//                 method: 'post',
//                 credentials: 'include',
//                 body: formData
//             })
//             const data = await response.json()
//             if (!response.ok) {
//                 return showToast('error', data.message)
//             }
//             form.reset()
//             setFile()
//             setPreview()
//             navigate(RouteBlog)
//             showToast('success', data.message)
//         } catch (error) {
//             showToast('error', error.message)
//         }
//     }

//     const handleFileSelection = (files) => {
//         const file = files[0]
//         const preview = URL.createObjectURL(file)
//         setFile(file)
//         setPreview(preview)
//     }

//     return (
//         <div>
//             <Card className="pt-5">
//                 <CardContent>
//                     <h1 className='text-2xl font-bold mb-4'>Edit Blog</h1>
//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)}  >
//                             <div className='mb-3'>
//                                 <FormField
//                                     control={form.control}
//                                     name="category"
//                                     render={({ field }) => (

//                                         <FormItem>

//                                             <FormLabel>Category</FormLabel>
//                                             <FormControl>
//                                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                                                     <SelectTrigger  >
//                                                         <SelectValue placeholder="Select" />
//                                                     </SelectTrigger>
//                                                     <SelectContent>
//                                                         {categoryData && categoryData.category.length > 0 &&
//                                                             categoryData.category.map(category => <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>)
//                                                         }


//                                                     </SelectContent>
//                                                 </Select>

//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                             </div>
//                             <div className='mb-3'>
//                                 <FormField
//                                     control={form.control}
//                                     name="title"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Title</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="Enter blog title" {...field} />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                             </div>
//                             <div className='mb-3'>
//                                 <FormField
//                                     control={form.control}
//                                     name="slug"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Slug</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="Slug" {...field} />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                             </div>
//                             <div className='mb-3'>
//                                 <span className='mb-2 block'>Featured Image</span>
//                                 <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
//                                     {({ getRootProps, getInputProps }) => (
//                                         <div {...getRootProps()}>
//                                             <input {...getInputProps()} />
//                                             <div className='flex justify-center items-center w-36 h-28 border-2 border-dashed rounded'>
//                                                 <img src={filePreview} />
//                                             </div>
//                                         </div>
//                                     )}
//                                 </Dropzone>
//                             </div>
//                             <div className='mb-3'>

//                                 <FormField
//                                     control={form.control}
//                                     name="blogContent"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Blog Content</FormLabel>
//                                             <FormControl>
//                                                 <Editor props={{ initialData: '', onChange: handleEditorData }} />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />

                                 
//                             </div>



//                             <Button type="submit" className="w-full">Submit</Button>
//                         </form>
//                     </Form>

//                 </CardContent>
//             </Card>

//         </div>
//     )
// }

// export default AddBlog





import React, { useEffect, useRef, useState } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import slugify from 'slugify'
import { showToast } from '@/helpers/showToast'
import { getEvn } from '@/helpers/getEnv'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { useFetch } from '@/hooks/useFetch'
import Dropzone from 'react-dropzone'
import JoditEditor from 'jodit-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RouteBlog } from '@/helpers/RouteName'

const AddBlog = () => {
    const navigate = useNavigate()
    const editor = useRef(null)
    const user = useSelector((state) => state.user)

    const { data: categoryData } = useFetch(`${getEvn('VITE_API_BASE_URL')}/category/all-category`, {
        method: 'get',
        credentials: 'include'
    })

    const [filePreview, setPreview] = useState()
    const [file, setFile] = useState()

    const formSchema = z.object({
        category: z.string().min(3, 'Category must be at least 3 character long.'),
        title: z.string().min(3, 'Title must be at least 3 character long.'),
        slug: z.string().min(3, 'Slug must be at least 3 character long.'),
        blogContent: z.string().min(3, 'Blog content must be at least 3 character long.'),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: '',
            title: '',
            slug: '',
            blogContent: '',
        },
    })

    const blogTitle = form.watch('title')

    useEffect(() => {
        if (blogTitle) {
            const slug = slugify(blogTitle, { lower: true })
            form.setValue('slug', slug)
        }
    }, [blogTitle])

    async function onSubmit(values) {
        try {
            const newValues = { ...values, author: user.user._id }
            if (!file) {
                showToast('error', 'Feature image required.')
                return
            }

            const formData = new FormData()
            formData.append('file', file)
            formData.append('data', JSON.stringify(newValues))

            const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/blog/add`, {
                method: 'post',
                credentials: 'include',
                body: formData
            })
            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }
            form.reset()
            setFile()
            setPreview()
            navigate(RouteBlog)
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
        }
    }

    const handleFileSelection = (files) => {
        const file = files[0]
        const preview = URL.createObjectURL(file)
        setFile(file)
        setPreview(preview)
    }

    return (
        <div>
            <Card className="pt-5">
                <CardContent>
                    <h1 className="text-2xl font-bold mb-4">Add Blog</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            {/* Category */}
                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {categoryData?.category?.map((cat) => (
                                                            <SelectItem key={cat._id} value={cat._id}>
                                                                {cat.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Title */}
                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter blog title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Slug */}
                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Slug" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Featured Image
                            <div className="mb-3">
                                <span className="mb-2 block">Featured Image</span>
                                <Dropzone onDrop={(files) => handleFileSelection(files)}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <div className="flex justify-center items-center w-36 h-28 border-2 border-dashed rounded">
                                                {filePreview ? <img src={filePreview} className="h-full" /> : <span>Upload</span>}
                                            </div>
                                        </div>
                                    )}
                                </Dropzone>
                            </div> */}


{/* Featured Image */}
<div className="mb-3">
  <FormLabel className="mb-2 block">Featured Image</FormLabel>

  <div className="flex justify-center">
    <Dropzone onDrop={(files) => handleFileSelection(files)}>
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="cursor-pointer w-full min-h-[8rem] border-2 border-dashed border-gray-300 rounded-xl relative overflow-hidden hover:border-gray-500 hover:bg-gray-50"
        >
          <input {...getInputProps()} />
          {filePreview ? (
            <div className="flex justify-center items-center h-32">
              <img
                src={filePreview}
                alt="Preview"
                className="max-h-32 w-auto mx-auto object-contain"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-500 text-sm text-center">
                Click or drop to upload
              </span>
            </div>
          )}
        </div>
      )}
    </Dropzone>
  </div>
</div>









                            {/* Blog Content with Jodit */}
                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="blogContent"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Blog Content</FormLabel>
                                            <FormControl>
                                                <JoditEditor
                                                    ref={editor}
                                                    value={field.value}
                                                    onChange={(newContent) => form.setValue('blogContent', newContent)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" className="w-full">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddBlog
