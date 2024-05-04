import PageContent from '@/components/ui/PageContent';
import { QuoteProps } from '@/types/types_d';
import { auth } from '@clerk/nextjs/server';
import axios from 'axios';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    const {userId} = auth();
    
    if (!userId) {
        redirect("/");
    };

    var quotes: QuoteProps[] = [];
    await axios.get(`http://localhost:3000/api/profile/`)
    .then((response) => {
      quotes = response.data;
    })
    .catch((error) => {
      console.log("Error failed to fetch profile quotes:" + error);
    });

  return (
    <div className='flex flex-col gap-2 items-center'>
        <p className='text-4xl font-semibold'><span className='font-bold text-indigo-500'>Quotes</span> posted by you</p>
        <PageContent quotes={quotes}/>
    </div>
  )
}

export default page