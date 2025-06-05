"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {toast} from "sonner"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Clock} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";


const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().includes('@', {
        message: "Email must be at least 2 characters.",
    }),
    message: z.string().min(2, {
        message: "Message must be at least 10 characters.",
    }),
})

export default function InputForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast("You submitted the following values", {
            description: (
                <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
            ),
        })
    }

    return (
        <>
            <h3 className='text-lg font-medium'>Spam my inbox</h3>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 mx-auto">
                    <div className='flex flex-grow flex-col gap-5'>
                        <div className='flex flex-col gap-5 md:flex-row'>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem className={"w-full"}>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John doe" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem className={"w-full"}>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john@doe.com" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                            <FormField
                                control={form.control}
                                name="message"
                                render={({field}) => (
                                    <FormItem className={"w-full"}>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Type your message here." {...field}/>
                                        </FormControl>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                    </div>
                    <div className='my-5 flex items-center gap-2 dark:text-neutral-400'>
                        <Clock size={12}/>
                        <div className='text-sm'>
                            <span className='font-medium'>Avg. response:</span> 1-2 Hours (Working
                            Hours, GMT-5)
                        </div>
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>

        </>

    );
}

