import UploadQuoteForm from '@/components/ui/UploadQuoteForm';
import { QuoteProps } from '@/types/types_d';
import { auth } from '@clerk/nextjs/server';
import axios from 'axios';
import { redirect } from 'next/navigation';
import React from 'react'

interface CreateQuotePage {
    params: {
        id: string;
      }
}

const page = async ({params}: CreateQuotePage) => {
  
    const {userId} = auth();

    if (!userId) {
        redirect("/sign-up");
    }

    var quote: QuoteProps = {
        author: "",
        creator: "",
        topics: [],
        quote: "",
        lastedit: new Date(),
        _id: "",
        favs: [],
    };

    const id = params.id;
    if (id !== "new") {
        await axios.get(`http://localhost:3000/api/quotes/${id}`)
        .then((response) => {
            quote = response.data;
            console.log(quote);
        })
        .catch((error) => {
            console.log("Error failed to fetch quote data:" + error);
            throw new Error('Quote not found');
        });
    }
        
        return (
    <div className='flex flex-col gap-2 items-center'>
        <p className='text-4xl font-semibold'>Upload your own <span className='font-bold text-indigo-500'>quote</span></p>
        <UploadQuoteForm quote={quote}/>
    </div>
  )
}

export default page