import { ContentSkeleton } from "@/components/ui/ContentSkeleton";
import PageContent from "@/components/ui/PageContent";
import SearchBar from "@/components/ui/SearchBar";
import { QuoteProps, QuotesPath } from "@/types/types_d";
import axios from "axios";
import { Suspense } from "react";

interface RootPageProps {
    searchParams: {
      page: string;
      category: string;
      query: string;
    }
  }

const page = async ({searchParams}: RootPageProps) => {
  var quotes: QuoteProps[] = [];
  var quotesCount = 0;
  if (searchParams.category && searchParams.query && searchParams.page) {
    await axios.get(`${process.env.DEPLOYMENT_BASE_URL}/api/feed/${searchParams.page}/${searchParams.query}/${searchParams.category}
    `)
    .then((response) => {
      quotes = response.data.quotes;
      quotesCount = Number(response.data.quotesCount[0]);
    })
    .catch((error) => {
      console.log("Error failed to fetch feed data:" + error);
    });
  } else {
    let apiEndpoint = "";
    if (!searchParams.page) {
      apiEndpoint = `${process.env.DEPLOYMENT_BASE_URL}/api/main/0`;
    } else {
      apiEndpoint = `${process.env.DEPLOYMENT_BASE_URL}/api/main/${searchParams.page}`;
    }
    await axios.get(apiEndpoint)
    .then((response) => {
      quotes = response.data.quotes;
      quotesCount = Number(response.data.quotesCount[0]);
    })
    .catch((error) => {
      console.log("Error failed to fetch feed data:" + error);
    });
  }
    
  return (
    <div className="z-20 pb-10">
      {/* Landing Banner */}
      <div className="py-2 sm:py-1 lg:pb-5 pb-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Access the biggest collection of quotes ever!
            </h1>
            <p className="hidden md:block mt-3 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Explore unprecedented amounts of knowledge. Filtered by
              <span className="font-bold text-indigo-600 dark:text-indigo-500">
                {" "}
                Authors, Topics, Format and much more!
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* Landing Banner END*/}
      <SearchBar />
      <Suspense fallback={<ContentSkeleton />}>
        <PageContent quotes={quotes} path={QuotesPath.feed} count={quotesCount}/>
      </Suspense>
    </div>
  );
};

export default page;
