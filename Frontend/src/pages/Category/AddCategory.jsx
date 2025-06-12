// import React, { useEffect } from 'react'
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

// const AddCategory = () => {

//     const formSchema = z.object({
//         name: z.string().min(3, 'Name must be at least 3 character long.'),
//         slug: z.string().min(3, 'Slug must be at least 3 character long.'),
//     })

//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             name: '',
//             slug: '',
//         },
//     })



//     const categoryName = form.watch('name')

//     useEffect(() => {
//         if (categoryName) {
//             const slug = slugify(categoryName, { lower: true })
//             form.setValue('slug', slug)
//         }
//     }, [categoryName])

//     async function onSubmit(values) {
//         try {
//             const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/category/add`, {
//                 method: 'post',
//                 headers: { 'Content-type': 'application/json' },
//                 body: JSON.stringify(values)
//             })
//             const data = await response.json()
//             if (!response.ok) {
//                 return showToast('error', data.message)
//             }
//             form.reset()
//             showToast('success', data.message)
//         } catch (error) {
//             showToast('error', error.message)
//         }
//     }

//     return (
//         <div>
//             <Card className="pt-5 max-w-screen-md mx-auto">
//                 <CardContent>
//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)}  >
//                             <div className='mb-3'>
//                                 <FormField
//                                     control={form.control}
//                                     name="name"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Name</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="Enter your name" {...field} />
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

//                             <Button type="submit" className="w-full">Submit</Button>
//                         </form>
//                     </Form>

//                 </CardContent>
//             </Card>

//         </div>
//     )
// }

// export default AddCategory

//-----------------------------------------------------------------

import React, { useEffect } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import slugify from 'slugify'
import { showToast } from '@/helpers/showToast'
import { getEvn } from '@/helpers/getEnv'

const AddCategory = () => {

    const formSchema = z.object({
        name: z.string().min(3, 'Name must be at least 3 character long.'),
        slug: z.string().min(3, 'Slug must be at least 3 character long.'),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            slug: '',
        },
    })

    const categoryName = form.watch('name')

    useEffect(() => {
        if (categoryName) {
            const slug = slugify(categoryName, { lower: true })
            form.setValue('slug', slug)
            // console.log("🟨 Slug generated from name:", slug)
        }
    }, [categoryName])

    async function onSubmit(values) {
        // console.log("🟡 Form submitted with values:", values)

        const apiUrl = `${getEvn('VITE_API_BASE_URL')}/category/add`
        // console.log("🌍 Full API URL:", apiUrl)

        try {
            // console.log("🌐 Sending POST request...")
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // important if you're using cookies
                body: JSON.stringify(values)
            })

            // console.log("📬 Server responded with status:", response.status)

            let data;
            try {
                data = await response.json()
                // console.log("📨 JSON response from server:", data)
            } catch (jsonErr) {
                // console.error("❌ Failed to parse JSON response:", jsonErr)
                showToast('error', 'Invalid server response')
                return;
            }

            if (!response.ok) {
                // console.error("❌ Server returned error:", data.message)
                showToast('error', data.message)
                return;
            }

            // console.log("✅ Category added successfully:", data.message)
            showToast('success', data.message)
            form.reset()

        } catch (error) {
            // console.error("🔥 Network or fetch error:", error.message)
            showToast('error', error.message)
        }
    }

    return (
        <div>
            <Card className="pt-5 max-w-screen-md mx-auto">
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-3'>
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

                            <Button type="submit" className="w-full">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddCategory



// import React, { useEffect } from 'react'
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

// const AddCategory = () => {

//     const formSchema = z.object({
//         name: z.string().min(3, 'Name must be at least 3 character long.'),
//         slug: z.string().min(3, 'Slug must be at least 3 character long.'),
//     })

//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             name: '',
//             slug: '',
//         },
//     })

//     const categoryName = form.watch('name')

//     useEffect(() => {
//         if (categoryName) {
//             const slug = slugify(categoryName, { lower: true })
//             form.setValue('slug', slug)
//             console.log("🟨 Slug generated from name:", slug)
//         }
//     }, [categoryName])

//     async function onSubmit(values) {
//         console.log("🟡 Form submitted with values:", values)

//         const apiUrl = `${getEvn('VITE_API_BASE_URL')}/category/add`
//         console.log("🌍 Full API URL:", apiUrl)

//         const response = await fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             credentials: 'include',
//             body: JSON.stringify(values)
//         })

//         console.log("📬 Server responded with status:", response.status)

//         const data = await response.json()
//         console.log("📨 JSON response from server:", data)

//         if (!response.ok) {
//             console.error("❌ Server returned error:", data.message)
//             showToast('error', data.message)
//             return
//         }

//         console.log("✅ Category added successfully:", data.message)
//         showToast('success', data.message)
//         form.reset()
//     }

//     return (
//         <div>
//             <Card className="pt-5 max-w-screen-md mx-auto">
//                 <CardContent>
//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)}>
//                             <div className='mb-3'>
//                                 <FormField
//                                     control={form.control}
//                                     name="name"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Name</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="Enter your name" {...field} />
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

//                             <Button type="submit" className="w-full">Submit</Button>
//                         </form>
//                     </Form>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }

// export default AddCategory
