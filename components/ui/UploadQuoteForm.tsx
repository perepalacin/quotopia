"use client";

import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Button } from "./button";
import { Loader2Icon, PlusIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { QuoteProps } from "@/types/types_d";
import useDebounce from "@/lib/hooks/useDebounce";
import axios from "axios";


const formSchema = z.object({
    author: z.string().min(2, {message: "Author name must have at least two characters"}).max(100,{message: "Author name should be below 100 characters"}),
    quote: z.string().min(4, {message: "The quote text should have at least four characters"}).max(500, {message: "Quote text can not exceed 500 characters"}),
});

interface UploadQuoteProps {
    quote: QuoteProps | null;
}


const UploadQuoteForm = (props: UploadQuoteProps) => {

    const [topics, setTopics ] = useState<Array<[string, number]>>([]);
    const [topicInput, setTopicInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    let debouncedValue = "";

    useEffect(() => {
        if (props.quote?.topics) {
            const topicsArray: Array<[string, number]> = [];
            for (let i = 0; i < props.quote.topics.length; i++) {
                topicsArray.push([String(props.quote.topics[i]), i]);
            }
            setTopics(topicsArray);
        }
    }, []);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            author: String(props.quote?.author) || "",
            quote: String(props.quote?.quote) || "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        setIsLoading(true);
        
        let quote = values.quote.trim().replace(/['"]+/g, '').trim();
        quote = quote.charAt(0).toUpperCase() + quote.slice(1);
        let currentTopic = "";

        const requestedTopics = [];
        for (let i = 0; i < topics.length; i++ ) {
            requestedTopics.push(topics[i][0]);
        }
        
        let uppercase = true;
        //Remove comas, wierd character spaces and add uppercases!
        for (let i = 0; i < topicInput.length; i++) {
            switch (topicInput[i]) {
                case " ":
                    uppercase = true;
                    break;
                case "'":
                    break;
                case '"':
                    break;
                case ",":
                    requestedTopics.push(requestedTopics);
                    currentTopic = "";
                    uppercase = true;
                    break;
                default:
                    if (uppercase === true) {
                        currentTopic = currentTopic + topicInput[i].toUpperCase();
                    } else {
                        currentTopic = currentTopic + topicInput[i].toLowerCase();
                    }
                    uppercase = false
                    if (i === topicInput.length -1) {
                        requestedTopics.push(currentTopic);
                    }
        }
        }
        const data = {
            quote: quote,
            author: values.author,
            topics: requestedTopics,
        };

        try {
            if (!props.quote?._id) {
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
                    toast.success("Quote uploaded succesfully", {id: "succesfullUpload"});
                    router.push(`/quote/${data._id}`);
                })
                .catch(error => {
                    console.error('There was a problem with your fetch operation:', error);
                });
            } else {
                fetch(`/api/new/${props.quote._id}`, {
                    method: 'PATCH',
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
                    toast.success("Quote updated succesfully", {id: "succesfullUpdate"});
                    router.push(`/quote/${data._id}`);
                })
                .catch(error => {
                    console.error('There was a problem with your fetch operation:', error);
                });
            }
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


    const deleteTopic = (index: number) => {
        //We avoid mutatting the state by adding the spread operator in front
        const topicsArray = [...topics];        
        topicsArray.splice(index, 1);
        topicsArray.forEach((item, i) => {
            item[1] = i;
        });
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
                        className="w-full text-2xl border-2 font-semibold rounded-sm px-2 py-2 [&::-webkit-search-cancel-button]:grayscale" 
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
                placeholder = "Science, Truth, Progress (hint: use commas to input multiple topics)"
                value = {topicInput}
                className="w-full border-2 rounded-sm px-2 py-2 [&::-webkit-search-cancel-button]:grayscale" 
                />
            </div>
            <div className="w-full flex flex-row justify-end mt-2">
                <Button type="submit" variant={"mainaccent"} className="w-44" disabled={isLoading}>
                    {isLoading ? (
                        <Loader2Icon className="animate-spin w-4 h-4 mr-2" />
                    ) :
                    <></>
                    }
                    { !props.quote?._id ?
                    <p>Post</p>
                    :
                    <p>Update</p>
                    }
                </Button>
            </div>
            </form>
        </Form>
    </div>
  )
}

export default UploadQuoteForm