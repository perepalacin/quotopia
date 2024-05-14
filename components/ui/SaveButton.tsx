"use client";
import { Bookmark, CheckIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface SaveButtonProps {
  quoteId: String;
}

const SaveButton = (props: SaveButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleQuoteSave = async () => {
    setIsLoading(true);
    try {
      fetch(`/api/bookmark/${props.quoteId}`, {
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
          toast.success("Quote saved succesfully", {
            id: "succesfullUpdate",
          });
          setIsLoading(false);
          setSaved(true);
        })
        .catch(() => {
          toast.error("You already liked this quote", {id: "alreadyLiked"});
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
        <CheckIcon />
        :
        <Bookmark onClick={handleQuoteSave} />
        }
      </div>
      }
    </div>
  )
};

export default SaveButton;
