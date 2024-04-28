import { QuoteProps } from "@/types/types_d";
import QuoteItem from "./QuoteItem";


interface PageContentProps {
    quotes: QuoteProps[],
  }


const PageContent = ({quotes}: PageContentProps) => {


  console.log(quotes);

  // const {user} = useUser();
  // if (fragment.length !== 0) {
  //   for (const i in fragment) {
  //     if (Number(fragment[i].id) == herocard) {
  //       fragment = fragment.splice(i, 1);
  //     }
  //   }

  if (quotes.length === 0) {
    return (
      <p>Sorry we couldn't find what you were looking for!</p>
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