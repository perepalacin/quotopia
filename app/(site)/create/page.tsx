import UploadQuoteForm from '@/components/ui/UploadQuoteForm';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const page = () => {
  
    const {userId} = auth();

    if (!userId) {
        redirect("/sign-up");
    }

    return (
    <div className='flex flex-col gap-2 items-center'>
        <p className='text-4xl font-semibold'>Upload your own <span className='font-bold text-indigo-500'>quote</span></p>
        <UploadQuoteForm />
    </div>
  )
}

export default page