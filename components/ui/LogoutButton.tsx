"use client";

import { useClerk } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export const LogoutButton = () => {
    const { signOut } = useClerk();
    const router = useRouter();
  return (
    <div
      onClick={() => {
        signOut(() => router.push("/"));
      }}
      className="flex flex-row cursor-pointer"
    >
      <LogOut className="mr-2 h-4 w-4" />
      <p>Log out</p>
    </div>
  );
};
