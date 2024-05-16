"use client";
import { Bookmark, CheckIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import SaveButton from "./SaveButton";

interface UnsaveButtonProps {
  quoteId: String;
}

const UnsaveButton = (props: UnsaveButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const router = useRouter();

  const handleQuoteUnsave = async () => {
    setIsLoading(true);
    try {
      fetch(`/api/unbookmark/${props.quoteId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          toast.success("Quote unsaved succesfully", {
            id: "succesfullUpdate",
          });
          setIsLoading(false);
          setSaved(true);
          router.refresh();
        })
        .catch(() => {
          toast.error("This quote is not in your liked list", {id: "notLiked"});
          setIsLoading(false);
        });
    } catch (error) {
      toast.error("Something went wrong, please try again later", {
        id: "quoteUpdateError",
      });
      setIsLoading(false);
      return null;
    }
  };

  return (
    <div>
      { isLoading ?
      <Loader2Icon className="animate-spin w-4 h-4 mr-2" />
      :
      <div>
        { saved ?
        <SaveButton quoteId={props.quoteId} />
        :
        <div>
            <Bookmark fill="black" className="block dark:hidden" onClick={handleQuoteUnsave}/>
            <Bookmark fill="white" className="hidden dark:block" onClick={handleQuoteUnsave}/>
        </div>
        }
      </div>
      }
    </div>
  )
};

export default UnsaveButton;
