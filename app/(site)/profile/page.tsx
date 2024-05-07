import { ContentSkeleton } from "@/components/ui/ContentSkeleton";
import PageContent from "@/components/ui/PageContent";
import SearchBar from "@/components/ui/SearchBar";
import { QuoteProps, QuotesPath } from "@/types/types_d";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

interface ProfilePageRoots {
  searchParams: {
    category: string;
    query: string;
  };
}

const page = async ({ searchParams }: ProfilePageRoots) => {

  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  var quotes: QuoteProps[] = [];
  if (searchParams.category && searchParams.query) {
    await axios
      .get(
        `http://localhost:3000/api/profile/${userId}/${searchParams.query}/${searchParams.category}
  `
      )
      .then((response) => {
        quotes = response.data;
      })
      .catch((error) => {
        console.log("Error failed to fetch feed data:" + error);
      });
  } else {
    await axios
      .get(`http://localhost:3000/api/profile/${userId}`)
      .then((response) => {
        quotes = response.data;
      })
      .catch((error) => {
        console.log("Error failed to fetch user uploaded quotes:" + error);
      });
  }
  

  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <p className="text-4xl font-semibold">
        <span className="font-bold text-indigo-500">Quotes</span> posted by you
      </p>
      <div className="w-full">
        <SearchBar />
      </div>
      <Suspense fallback={<ContentSkeleton />}>
        <PageContent quotes={quotes} path={QuotesPath.profile}/>
      </Suspense>
    </div>
  );
};

export default page;
