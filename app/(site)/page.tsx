import { ContentSkeleton } from "@/components/ui/ContentSkeleton";
import PageContent from "@/components/ui/PageContent";
import SearchBar from "@/components/ui/SearchBar";
import { QuoteProps, QuotesPath } from "@/types/types_d";
import axios from "axios";
import { Suspense } from "react";

interface RootPageProps {
    searchParams: {
      category: string;
      query: string;
    }
  }

const page = async ({searchParams}: RootPageProps) => {
  var quotes: QuoteProps[] = [];
  if (searchParams.category && searchParams.query) {
    await axios.get(`http://localhost:3000/api/feed/${searchParams.query}/${searchParams.category}
    `)
    .then((response) => {
      quotes = response.data;
    })
    .catch((error) => {
      console.log("Error failed to fetch feed data:" + error);
    });
  } else {
    await axios.get(`http://localhost:3000/api/feed/`)
    .then((response) => {
      quotes = response.data;
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
        <PageContent quotes={quotes} path={QuotesPath.feed}/>
      </Suspense>
    </div>
  );
};

export default page;
