"use client";

import useDebounce from '@/lib/hooks/useDebounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEventHandler, useEffect, useState } from 'react'

const SearchBar = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const category = searchParams.get("category");
    const query = searchParams.get("query");

    const [searchQuery, setSearchQuery] = useState(query || "");
    const [searchCategory, setSearchCategory] = useState("Contents");

    const debouncedValue = useDebounce<string>(searchQuery, 500);

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchQuery(e.target.value);
    }

    const onClick = (categoryName: string | undefined) => {
        const params = new URLSearchParams(searchParams);
        if (categoryName) {
          setSearchCategory(categoryName);
          params.set("category", categoryName);
        }
        router.replace(`${pathname}?${params.toString()}`);
    }


    useEffect(() => {
        const query = {
            query: debouncedValue,
            category: category,
        };

        const params = new URLSearchParams(searchParams);

        if (debouncedValue) {
            params.set("query", debouncedValue);
        } else {
            params.delete("query");
        }

        router.replace(`${pathname}?${params.toString()}`)

    }, [debouncedValue, router, category]);


  return (
    <div className="flex flex-col gap-2">
        <div className="flex md:flex-row flex-col gap-2 justify-center items-center">
          <div className="flex flex-row gap-2 px-1 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-sm shadow-sm">
            <button
              onClick={() => {
                onClick("Contents");
              }}
              className={`py-1 px-4 dark:hover:bg-indigo-600 hover:bg-indigo-500 rounded-sm shadow-md ${
                searchCategory === "Contents"
                  ? "bg-indigo-500 dark:bg-indigo-600 text-white"
                  : "dark:bg-neutral-800 bg-neutral-100"
              }`}
            >
              Contents
            </button>
            <button
              onClick={() => {
                onClick("Author");
              }}
              className={`py-1 px-4 dark:hover:bg-indigo-600 hover:bg-indigo-500 rounded-sm shadow-md ${
                searchCategory === "Author"
                  ? "bg-indigo-500 dark:bg-indigo-600 text-white"
                  : "dark:bg-neutral-800 bg-neutral-100"
              }`}
            >
              Author
            </button>
            <button
              onClick={() => {
                onClick("Topics");
              }}
              className={`py-1 px-4 dark:hover:bg-indigo-600 hover:bg-indigo-500 rounded-sm shadow-md ${
                searchCategory === "Topics"
                  ? "bg-indigo-500 dark:bg-indigo-600 text-white"
                  : "dark:bg-neutral-800 bg-neutral-100"
              }`}
            >
              Topics
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-center mx-5 md:mx-0">
          <input
            type="search"
            className="w-full sm:w-1/2 border-2 rounded-sm px-2  py-2 shadow-md [&::-webkit-search-cancel-button]:grayscale"
            placeholder={"Search for quotes by " + searchCategory + "..."}
            autoFocus = {true}
            //TODO: replace this!
            value={searchQuery}
            //onChange = {(e) => {setSearchQuerry(e.target.value)}}
            onChange={onChange}
            //defaultValue={searchParams.get('query')?.toString()}
          />
        </div>
      </div>
  )
}

export default SearchBar