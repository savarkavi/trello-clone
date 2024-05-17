"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { createBoard } from "@/actions/create-board";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { Check, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrganization } from "@clerk/nextjs";

const ImagesArr = [
  {
    src: "https://cdn.pixabay.com/photo/2023/10/25/19/25/blue-8341156_1280.jpg",
    isLoaded: false,
  },
  {
    src: "https://cdn.pixabay.com/photo/2019/02/19/08/43/milky-way-4006343_1280.jpg",
    isLoaded: false,
  },
  {
    src: "https://cdn.pixabay.com/photo/2016/11/14/04/36/boy-1822614_1280.jpg",
    isLoaded: false,
  },
  {
    src: "https://cdn.pixabay.com/photo/2022/11/04/13/43/car-7569896_1280.jpg",
    isLoaded: false,
  },
  {
    src: "https://cdn.pixabay.com/photo/2023/08/18/15/02/cat-8198720_1280.jpg",
    isLoaded: false,
  },
  {
    src: "https://cdn.pixabay.com/photo/2024/03/04/14/56/pagoda-8612554_1280.jpg",
    isLoaded: false,
  },
];

const DialogForm = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [images, setImages] = useState(ImagesArr);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { organization } = useOrganization();

  if (!organization) {
    return null;
  }

  const onImageLoad = (index: number) => {
    const updatedImages = [...images];
    updatedImages[index].isLoaded = true;
    setImages(updatedImages);
  };

  const onImageSelect = (url: string) => {
    if (selectedImg === url) {
      return setSelectedImg(null);
    }

    setSelectedImg(url);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createBoard({
        orgId: organization.id,
        title,
        imageUrl: selectedImg,
      });

      if (!res.success) {
        return toast.error(res.error.issues[0].message);
      }

      setTitle("");
      setSelectedImg("");
      setIsDialogOpen(false);
      toast.success("New Board created!");
    } catch (error) {
      console.log("An unexpected error occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Board</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {images.map((img, i) => (
              <div
                key={img.src}
                className="relative w-[100px] h-[70px] rounded-lg cursor-pointer"
                onClick={() => onImageSelect(img.src)}
              >
                {!img.isLoaded && (
                  <Skeleton className="w-full h-full rounded-lg" />
                )}
                <Image
                  src={img.src}
                  alt="Board img"
                  fill
                  className={cn(
                    "rounded-lg",
                    selectedImg === img.src && "opacity-50"
                  )}
                  onLoadingComplete={() => onImageLoad(i)}
                />
                {selectedImg === img.src && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Check className="text-black" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <form className="flex flex-col gap-2 w-full" onSubmit={onSubmit}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 rounded-lg w-full border outline-none"
            />
            <Button
              type="submit"
              className="mt-8 flex items-center justify-center"
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Create"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
