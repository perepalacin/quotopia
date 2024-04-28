import HeroQuoteItem from "@/components/ui/HeroQuoteItem";
import PageContent from "@/components/ui/PageContent";
import ShowMoreButton from "@/components/ui/ShowMoreButton";
import { Separator } from "@/components/ui/separator";
import { QuoteProps } from "@/types/types_d";
import axios from "axios";

interface QuotePageProps {
  searchParams: {
    relatedContent: string;
  }
  params: {
    id: string;
  }
}

const page = async ({searchParams, params}: QuotePageProps) => {
    var quote: QuoteProps = {
        author: "",
        creator: "",
        topics: ["1", "2"],
        quote: "",
        lastedit: new Date(),
        _id: "1",
        favs: 0,
    };
    const id = params.id;
    var relatedContent: QuoteProps[] = [];
    console.log(id);
    await axios.get(`http://localhost:3000/api/quotes/${id}`)
    .then((response) => {
      quote = response.data;
    })
    .catch((error) => {
      console.log("Error failed to fetch feed data:" + error);
    });

    if (searchParams.relatedContent === "true") {
      await axios.get(`http://localhost:3000/api/feed`)
    .then((response) => {
      relatedContent = response.data;
    })
    .catch((error) => {
      console.log("Error failed to fetch feed data:" + error);
    });
    }

  return (
    <div className="flex flex-col items-center gap-4">
      <HeroQuoteItem key={1} quote={quote} />
      {relatedContent.length === 0 ?
      <ShowMoreButton author={quote.author}/>
      :
      <div className="flex flex-col gap-2">
        <p className="text-center font-3xl font-semibold">More quotes by {quote.author}</p>
        <Separator />
        <PageContent quotes={relatedContent} />
      </div>
      }
    </div>
  );
};

export default page;
