import { QuoteProps } from "@/types/types_d";
import QuoteItem from "./QuoteItem";
import Image from "next/image";
import { ContentSkeleton } from "./ContentSkeleton";


interface PageContentProps {
    quotes: QuoteProps[],
  }


const PageContent = ({quotes}: PageContentProps) => {


  console.log(quotes);

  if (quotes.length === 0) {
    return (
      <div className="flex flex-col gap-2 items-center mt-5">
        <Image src={"/images/EmptyLight.png"} width={250} height={250} alt="Image of a thinker" className="dark:hidden w-44"/>
        <Image src={"/images/EmptyDark.png"} width={250} height={250} alt="Image of a thinker" className="hidden dark:block w-44"/>
        <p className="font-bold text-2xl text-center">Sorry we couldn't find what you were looking for!</p>
      </div>
    )
  }
  return (
    <div className='columns-1 sm:columns-2 xl:columns-3 gap-4'>
      <div className='grid'>
          {quotes.map((quote: QuoteProps) => (
            <QuoteItem
              key={Number(quote._id)} 
              data={quote}
              // user={user}
            />
          ))}
        </div>
    </div>
  )
}

export default PageContent