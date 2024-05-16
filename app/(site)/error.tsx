"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const error = () => {
  return (
    <section className="flex flex-col gap-2 items-center w-full">
      <p className="text-4xl font-semibold">
        <span className="font-bold text-indigo-500">Sorry</span>, the content you are trying to access <span className="font-bold text-indigo-500">doesn&apos;t exist</span>
      </p>
      <Image src={"/images/Empty2Light.png"} width={250} height={250} alt="Image of a thinker" className="dark:hidden w-44"/>
      <Image src={"/images/Empty2Dark.png"} width={250} height={250} alt="Image of a thinker" className="hidden dark:block w-44"/>
      <Link href={"/"} className="mt-4">
        <Button variant={"mainaccent"}>
          Go back to the main page
        </Button>
      </Link>
    </section>
  )
}

export default error