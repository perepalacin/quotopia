import { Skeleton } from "@/components/ui/skeleton"
 
export function ContentSkeleton() {
  return (
    <div className='columns-1 sm:columns-2 xl:columns-3 gap-4 mt-5'>
      <div className='grid'>
        <Skeleton className="h-[120px] f-full rounded-md" />
        <Skeleton className="h-[150px] f-full rounded-md" />
        <Skeleton className="h-[180px] f-full rounded-md" />
        <Skeleton className="h-[210px] f-full rounded-md" />
        <Skeleton className="h-[120px] f-full rounded-md" />
        <Skeleton className="h-[90px] f-full rounded-md" />
        <Skeleton className="h-[150px] f-full rounded-md" />
      </div>
    </div>
  )
}