"use client";

import { Jersey_25 } from "next/font/google";
import { Button } from "./button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
    count: number;
}

const Pagination = (props: PaginationProps) => {

    var count = props.count;

    let pages= [];

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const page = searchParams.get("page");
    const category = searchParams.get("category");
    const query = searchParams.get("query");


    console.log(count);
    //Remember to edit this if you change the limit in the end points
    if (count <= 20) {
        return (<></>)
    } else {
       count = Math.floor((count / 20) +1); 
       for (let i = 1; i <= count; i++) {
            pages.push(i);
       }
    }

    const handlePageChange = (item: string) => {
        const params = new URLSearchParams(searchParams);

        params.set("page", item);        
        if (query && category) {
            params.set("query", query);
            params.set("category", category);
        }
        router.push(`${pathname}?${params.toString()}`)
    }

  return (
    <div className="w-full mt-10 mb-16">
        {pages ?
        <ol className="w-fulll flex flex-row gap-2 justify-center">
            {pages.map((item) => {
                return (
                    <li key={item}>
                        <Button variant={Number(page) === item ? "mainaccent" : "outline"} onClick={() => handlePageChange(String(item))}>
                            {item}
                        </Button>
                    </li>
                )
            })}
        </ol>
        :
        <></>
        }
    </div>
  )
}

export default Pagination