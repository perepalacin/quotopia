"use client";

import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Button } from "./button";
import { Loader2Icon, PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


const formSchema = z.object({
    author: z.string().min(2, {message: "Author name must have at least two characters"}).max(100,{message: "Author name should be below 100 characters"}),
    quote: z.string().min(4, {message: "The quote text should have at least four characters"}).max(500, {message: "Quote text can not exceed 500 characters"}),
});


const UploadQuoteForm = () => {

    const [topics, setTopics ] = useState<Array<[string, number]>>([]);
    const [topicInput, setTopicInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            author: "",
            quote: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        const requestedTopics = [];
        for (let i = 0; i < topics.length; i++ ) {
            requestedTopics.push(topics[i][0]);
        }
        const data = {
            quote: values.quote,
            author: values.author,
            topics: requestedTopics,
        };
        try {
            fetch('/api/new', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(data => {
                console.log(data);
                toast.success("Quote uploaded succesfully", {id: "succesfullUpload"});
                router.push(`/quote/${data._id}`);
              })
              .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
              });
              //We create the edit call too
            // } else {
            //   await axios.post(`/api/recipe`, formData, {
            //     headers: {
            //       "Content-Type": "multipart/form-data",
            //     },
            //     data: formData,
            //   });
            // }
          } catch (error) {
            toast.error("Something went wrong, please try again later", {
              id: "quoteUpdateError",
            });
            setIsLoading(false);
            return null;
          }
    }

    const handleTopicInputChange = (e: string) => {
        setTopicInput(e);
        return null;
    }

    const handleAddTopic = () => {
        if (!topicInput) {
            toast.error("A topic can't be empty", {id: "emptyTopic"});
            return null;
        }
        if (topics.length === 0) {
            setTopics([[topicInput, 0]])
        } else {
            const topicsArray = topics;
            topics.push([topicInput, topics.length]);
            setTopics(topicsArray);
            console.log(topicsArray);
        }

        setTopicInput("");
        return null;
    }

    const deleteTopic = (index: number) => {
        console.log("Delete");
        console.log(index);
        //We avoid mutatting the state by adding the spread operator in front
        const topicsArray = [...topics];        
        topicsArray.splice(index, 1);
        topicsArray.forEach((item, i) => {
            item[1] = i;
        });
        console.log(topicsArray);
        setTopics(topicsArray);
        return null;
    }

  return (
    <div className='group w-full sm:w-2/3 break-inside-avoid-column h-auto max-w-full relative flex flex-col px-5 py-5 border rounded-md shadow-md bg-white dark:bg-neutral-900 mt-4 z-1'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <FormField
            control={form.control}
            name={"author"}
            render={({ field })=> (
                <FormItem className="flex flex-col gap-2 items-center">
                <FormLabel className="hidden">Author name:</FormLabel>
                <FormControl>
                    <input 
                        type="search"
                        maxLength={100}
                        placeholder = "Nikola Tesla"
                        className="w-full text-2xl border-2 font-semibold text-[#FFFFFF] rounded-sm px-2 py-2 [&::-webkit-search-cancel-button]:grayscale" 
                        {...field}
                        />
                </FormControl>
                {/* <FormDescription>
                    This is your public display name.
                </FormDescription> */}
                <FormMessage className="text-[red]"/>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name={"quote"}
            render={({ field })=> (
                <FormItem className="flex flex-col gap-2 items-center">
                <FormLabel className="hidden">Quote text:</FormLabel>
                <FormControl>
                    <textarea 
                        placeholder = "The scientific man does not aim at an immediate result. He does not expect that his advanced ideas will be readily taken up. His work is like that of the planter — for the future. His duty is to lay the foundation for those who are to come, and point the way."
                        maxLength={500}
                        rows = {7}
                        className="w-full border-2 rounded-sm px-2 py-2" 
                        {...field}
                        />
                </FormControl>
                {/* <FormDescription>
                    This is your public display name.
                </FormDescription> */}
                <FormMessage className="text-[red]"/>
                </FormItem>
            )}
            />
            <div className="flex flex-row gap-2">
                {topics.map((item) => {
                    return (
                        <div key={item[1]} className="flex flex-row gap-1 items-center pl-4 pr-3 py-1 bg-gradient-to-bl from-indigo-400 to-indigo-600 dark:from-indigo-600 dark:to-indigo-900 rounded-2xl border border-indigo-900 dark:border-indigo-600">
                            <p className="italic">
                                #{item[0]}
                            </p>
                            <Button onClick={() => {deleteTopic(item[1])}} type={"button"} variant={"clorse"} size={"clorse"}>
                                <XIcon size={16}/>
                            </Button>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-row gap-2 items-center">
                <p className="font-semibold">Topics:</p>
            <input
                onChange={(event) => {handleTopicInputChange(event.target.value)}}
                placeholder = "Science"
                value = {topicInput}
                className="w-full border-2 rounded-sm px-2 py-2 [&::-webkit-search-cancel-button]:grayscale" 
                />
            <Button onClick={handleAddTopic} type="button" className="flex flex-row gap-2" variant={"outline"}>
                <PlusIcon size={14}/>
                Add topic
            </Button>
            </div>
            <div className="w-full flex flex-row justify-end mt-2">
                <Button type="submit" variant={"mainaccent"} className="w-44" disabled={isLoading}>
                    {isLoading ? (
                        <Loader2Icon className="animate-spin w-4 h-4" />
                    ) :
                    <p>Post</p>
                    }
                </Button>
            </div>
            </form>
        </Form>
    </div>
  )
}

export default UploadQuoteForm