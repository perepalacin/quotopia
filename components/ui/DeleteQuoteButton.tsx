"use client";
import { Trash2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Button } from './button';
import { DialogClose } from '@radix-ui/react-dialog';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DeleteButtonProps {
    id: String;
}

const DeleteQuoteButton = (props: DeleteButtonProps) => {

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false)

    const router = useRouter();

    const handleQuoteDelete = () => {
        const loadingToast  = toast.loading('Deleting...', {id: "ApiCall"});
        setIsLoading(true);
        fetch(`/api/new/${props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            toast.dismiss(loadingToast);
            setIsLoading(false);
            setOpen(false);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            toast.success("Quote deleted succesfully", {id: "succesfullDelete"});
            router.refresh();
        })
        .catch(error => {
            console.error('There was a problem with your delete operation:', error);
        });
    }

  return (
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger className='py-1.5 px-1.5 bg-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 dark:bg-neutral-700 rounded-sm'><Trash2 /></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle >Are you sure you want to delete this quote?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete the quote
        and remove all traces of it in the database.
      </DialogDescription>
    </DialogHeader>
    <div className='flex flex-row justify-center gap-2'>
        <Button disabled={isLoading} variant={"mainaccent"} type='submit' onClick={handleQuoteDelete}>
            Delete
        </Button>
        <DialogClose asChild>
            <Button disabled={isLoading} type="button">
              Close
            </Button>
          </DialogClose>

    </div>
  </DialogContent>
</Dialog>
  )
}

export default DeleteQuoteButton