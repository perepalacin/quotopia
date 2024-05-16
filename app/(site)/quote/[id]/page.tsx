import { ContentSkeleton } from "@/components/ui/ContentSkeleton";
import HeroQuoteItem from "@/components/ui/HeroQuoteItem";
import PageContent from "@/components/ui/PageContent";
import ShowMoreButton from "@/components/ui/ShowMoreButton";
import { Separator } from "@/components/ui/separator";
import { QuoteProps, QuotesPath } from "@/types/types_d";
import axios from "axios";
import { Suspense } from "react";

interface QuotePageProps {
  searchParams: {
    relatedContent: string;
    page: string;
  }
  params: {
    id: string;
  }
}

const page = async ({searchParams, params}: QuotePageProps) => {
    var quote: QuoteProps = {
        author: "",
        creator: "",
        topics: [],
        quote: "",
        lastedit: new Date(),
        _id: "1",
        favs: [],
    };
    const id = params.id;
    var relatedContent: QuoteProps[] = [];
    console.log(id);
    await axios.get(`${process.env.DEPLOYMENT_BASE_URL}/api/quotes/${id}`)
    .then((response) => {
      quote = response.data;
    })
    .catch((error) => {
      console.log("Error failed to fetch quote data:" + error);
      throw new Error('Quote not found');
    });

    if (searchParams.relatedContent === "true") {
      await axios.get(`${process.env.DEPLOYMENT_BASE_URL}/api/author/authorquotes/${quote.author}/${quote._id}`)
    .then((response) => {
      relatedContent = response.data;
    })
    .catch((error) => {
      console.log("Failed to fetch quote data " + error);
      throw new Error('Author not found');
    });
    }

  return (
    <div className="flex flex-col items-center gap-4">
      <HeroQuoteItem key={1} quote={quote} />
      {searchParams.relatedContent !== "true" ?
      <ShowMoreButton author={quote.author}/>
      :
      <div className="flex flex-col gap-2">
        {
          searchParams.relatedContent === "true" ?
          <div>
          <Separator />
          <Suspense fallback={<ContentSkeleton />}>
            <PageContent quotes={relatedContent} path={QuotesPath.feed} count={0}/>
          </Suspense>
          </div>
          :
            <p className="text-center font-3xl font-semibold">More quotes by {quote.author}</p>
        }
      </div>
      }
    </div>
  );
};

export default page;
