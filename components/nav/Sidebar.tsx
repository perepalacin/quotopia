"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import NavMenu from "./NavMenu";
import { ModeToggle } from "../ui/DarkModeToggle";
import ButtonSignIn from "../auth/ButtonSignIn";
import ButtonSignUp from "../auth/ButtonSignUp";



//I have built this component to pass in server components inside!
const Sidebar = () => {

    const router = useRouter();

    return (
        <div className="w-full pt-2 pb-10 top-0 z-30 sticky bg-gradient-to-t from-transparent to-white dark:to-black to-80%">
            <div className="mx-auto w-full  max-w-screen-xl px-2.5 md:px-20 flex flex-row justify-between">
            <div className="flex flex-row justify-between items-center">
                <Link href="/" className='flex flex-row items-center gap-1 flex-center'>  
                    <Image 
                        src="/images/logo.svg"
                        alt = "Quotopia Logo"
                        width ={25}
                        height={25}
                        className='object-contain dark:hidden block'
                    /> 
                    <Image 
                        src="/images/logo-white.svg"
                        alt = "Quotopia Logo"
                        width ={25}
                        height={25}
                        className='object-contain dark:block hidden'
                    />
                    <p className='hidden sm:block text-xl font-semibold sm:text-2xl sm:font-bold'>Quotopia</p>
                </Link>
            </div>
            <div className="flex flex-row gap-2 items-end">
                <ModeToggle />
                <ButtonSignIn />
                <ButtonSignUp />
                {/* {user ? 
                <div className="flex flex-row gap-2">
                    <Button className="dark:bg-indigo-600 bg-indigo-500 text-white hover:bg-indigo-600 dark:hover:bg-indigo-700" variant="secondary" onClick={handleClick}>
                        Create a new entry
                    </Button>
                    <NavMenu 
                    onIncrement={handleLogout}/>
                </div>
                : 
                <div className="flex flex-row gap-2">
                    <Button variant="outline" onClick={authModal.onOpen}>
                        Sign In
                    </Button>
                    <Button className="dark:bg-indigo-600 bg-indigo-500 text-white" onClick={authModal.onOpen}>
                        Sign Up
                    </Button>
                </div>
                } */}
            </div>
            </div>
        </div>
    )
}

export default Sidebar;