"use client";
import React from 'react'
import { Button } from './button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface ShowMoreButtonProps {
    author: String;
}

const ShowMoreButton = (props: ShowMoreButtonProps) => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    //When we click the button, we update the url so that the parent component can do an api call to get the related content!
    const handleClick = () => {
        const params = new URLSearchParams(searchParams);
        params.set("relatedContent", "true");
        router.replace(`${pathname}/?${params.toString()}`);
    }

  return (
    <div>
        <Button variant="mainaccent" onClick={handleClick}>
            Show more quotes by {props.author}
        </Button>
    </div>
  )
}

export default ShowMoreButton