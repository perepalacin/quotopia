import { Bookmark, Pencil, Trash2 } from "lucide-react";
import { QuoteProps, QuotesPath } from "@/types/types_d";
import Link from "next/link";
import SaveButton from "./SaveButton";
import DeleteQuoteButton from "./DeleteQuoteButton";

interface QuoteItemProps {
  data: QuoteProps;
  path: QuotesPath;
}
const QuoteItem: React.FC<QuoteItemProps> = ({ data, path }) => {
  return (
    <article className="relative group p-0 m-0">
      <Link
        href={`/quote/${data._id}`}
        className="group break-inside-avoid-column h-auto max-w-full relative flex flex-col px-5 py-5 gap-4 border rounded-md shadow-md bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-4 z-1 cursor-pointer"
      >
        <div className="flex flex-row gap-4 items-center">
          {/* { data.authorPicture !== "none" ? 
          <div className='w-10 h-10 flex justify-center'>
          <Image
          src={authorImagePath}
          alt="Author's Picture"
          width={40}
          height={40}
          className='object-cover rounded-full border-2 border-neutral-200 dark:border-neutral-700'
          />
          </div>
          :
          <></>
        } */}

          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-2xl">{data.author}</h1>
            <div className="flex flex-row gap-2">
              {data.topics.map((item) => (
                <p
                  className="text-sm text-neutral-400 dark:text-neutral-400"
                  key={item.length}
                >
                  #{item}
                </p>
              ))}
            </div>
          </div>
        </div>
        <p className="italic dark:text-neutral-200">"{data.quote}"</p>
      </Link>
      <div className="opacity-0 drop-shadow-md absolute right-2 top-6 flex flex-row gap-1.5 transition translate translate-x-1/4 group-hover:opacity-100 group-hover:translate-x-0 z-10">
        <div className="py-1.5 px-1.5 bg-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 dark:bg-neutral-700 rounded-sm">
          {path === "feed" ? <SaveButton /> : <></>}
          {path === "profile" ? (
            <Link href={`/create/${data._id}`}>
              <Pencil />
            </Link>
          ) : (
            <></>
          )}
          {path === "saved" ? (
            <div>
              <Bookmark fill="white" className="block dark:hidden" />
              <Bookmark fill="black" className="hidden dark:block" />
            </div>
          ) : (
            <></>
          )}
        </div>
        {path === "profile" ? (
          <div className="opacity-0 drop-shadow-md absolute right-12 top-0 flex flex-row gap-1.5 transition translate translate-x-1/4 group-hover:opacity-100 group-hover:translate-x-0 z-10">
              <DeleteQuoteButton id={data._id}/>
          </div>
        ) : (
          <></>
        )}
      </div>
    </article>
  );
};

export default QuoteItem;
