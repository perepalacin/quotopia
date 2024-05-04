import { ContentSkeleton } from "@/components/ui/ContentSkeleton";
import SearchBar from "@/components/ui/SearchBar";
import React from "react";

const Loading = () => {
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
      <ContentSkeleton />
    </div>
  );
};

export default Loading;
