import { ContentSkeleton } from "@/components/ui/ContentSkeleton";
import PageContent from "@/components/ui/PageContent";
import SearchBar from "@/components/ui/SearchBar";
import { QuoteProps, QuotesPath } from "@/types/types_d";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

interface SavedPageProps {
  searchParams: {
    page: string;
    category: string;
    query: string;
  };
}

const page = async ({ searchParams }: SavedPageProps) => {

  const { userId } = auth();

  
  if (!userId) {
    redirect("/");
  }
  
  const page = searchParams.page || "1";
  
  var quotes: QuoteProps[] = [];
  var quotesCount = 0;
  if (searchParams.category && searchParams.query) {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_DEPLOYMENT_BASE_URL}/api/saved/${userId}/${page}/${searchParams.query}/${searchParams.category}
  `
      )
      .then((response) => {
        quotes = response.data.quotes;
        quotesCount = response.data.quotesCount[0];

      })
      .catch((error) => {
        console.log("Error failed to fetch feed data:" + error);
      });
  } else {
    await axios
      .get(`${process.env.NEXT_PUBLIC_DEPLOYMENT_BASE_URL}/api/saved/${userId}/${page}`)
      .then((response) => {
        quotes = response.data.quotes;
        quotesCount = response.data.quotesCount[0];
      })
      .catch((error) => {
        console.log("Error failed to fetch user uploaded quotes:" + error);
      });
  }
  

  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <p className="text-4xl font-semibold">
        Your 
        <span className="font-bold text-indigo-500"> favorite</span> quotes
      </p>
      <div className="w-full">
        <SearchBar />
      </div>
      <Suspense fallback={<ContentSkeleton />}>
        <PageContent quotes={quotes} path={QuotesPath.saved} count={quotesCount}/>
      </Suspense>
    </div>
  );
};

export default page;
