import { QuoteProps } from "@/types/types_d";
import { Bookmark } from "lucide-react";
import Link from "next/link";

interface QuoteItemProps {
    quote: QuoteProps;
}
const HeroQuoteItem: React.FC<QuoteItemProps> = ({
    quote
}) => {

    return (
        <div className='group w-full sm:w-2/3 break-inside-avoid-column h-auto max-w-full relative flex flex-col px-5 py-5 gap-4 border rounded-md shadow-md bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-4 z-1'>
            <div className="opacity-0 drop-shadow-md absolute right-0 top-0 flex flex-row gap-1.5 transition translate translate-x-1/4 group-hover:opacity-100 group-hover:translate-x-0">
                <div className='py-1.5 px-1.5 bg-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 dark:bg-neutral-700 rounded-sm cursor-pointer'>
                    <Bookmark/>
                </div>
            </div>
            <div className='flex flex-row gap-4 items-center'>
                    <div className='flex flex-col gap-1'>
                        <h1 className='font-bold text-2xl'>{quote.author}</h1>
                        <div className='flex flex-row gap-2'>
                            {quote.topics.map((item) => (
                                <Link href = {`/?category=Topics&query=${item}`} className="">
                                    <p className='text-sm text-neutral-400 dark:text-neutral-400 hover:underline' key={item.length}>#{item}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <p className='italic dark:text-neutral-200'>"{quote.quote}"</p>
            </div>
        )
    }

export default HeroQuoteItem