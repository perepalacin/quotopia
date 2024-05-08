import { QuoteProps, QuotesPath } from "@/types/types_d";
import QuoteItem from "./QuoteItem";
import Image from "next/image";
import Pagination from "./Pagination";


interface PageContentProps {
    quotes: QuoteProps[];
    path: QuotesPath;
    count: number;
  }


const PageContent = ({quotes, path, count}: PageContentProps) => {




  if (quotes.length === 0) {
    return (
      <div className="flex flex-col gap-2 items-center mt-5">
        {path === QuotesPath.feed ?
        <div className="flex flex-col gap-2 items-center">
          <Image src={"/images/EmptyLight.png"} width={250} height={250} alt="Image of a thinker" className="dark:hidden w-44"/>
          <Image src={"/images/EmptyDark.png"} width={250} height={250} alt="Image of a thinker" className="hidden dark:block w-44"/>
          <p className="font-bold text-2xl text-center text-indigo-500">Sorry, it's not you, it's us</p>
          <p className="font-bold text-2xl text-center">we do not have any content that matches your search</p>
        </div>
      :
        <div className="flex flex-col gap-2 items-center">
          <Image src={"/images/Empty2Light.png"} width={250} height={250} alt="Image of a thinker" className="dark:hidden w-44"/>
          <Image src={"/images/Empty2Dark.png"} width={250} height={250} alt="Image of a thinker" className="hidden dark:block w-44"/>
          <p className="font-bold text-2xl text-center text-indigo-500">You haven't posted anything yet</p>
          <p className="font-semibold text-2xl text-center italic">“The journey of a thousand miles begins with one step.”</p>
        </div>
      }
      </div>
    )
  }
  return (
    <div>  
      <div className='columns-1 sm:columns-2 xl:columns-3 gap-4'>
        <div className='grid'>
            {quotes.map((quote: QuoteProps) => (
              <QuoteItem
                key={Number(quote._id)} 
                data={quote}
                path = {path}
                
                // user={user}
                />
              ))}
          </div>
      </div>
      <Pagination count={count}/>
    </div>
  )
}

export default PageContent