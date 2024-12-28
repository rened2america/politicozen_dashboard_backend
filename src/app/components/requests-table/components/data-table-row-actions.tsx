"use client";

import {
  DotsVerticalIcon,
  Pencil2Icon,
  TrashIcon,
  DownloadIcon
} from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { labels } from "../data/data";
import { taskSchema } from "../data/schema";
import { useRouter } from "next/navigation";
import { useDeleteRequest } from "@/app/dashboard2/requests/useRequests";
import { useEffect, useState } from "react";
import axios from "@/service/axiosInstance";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BeatLoader from "react-spinners/BeatLoader";
interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
  onDeleteSuccess,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { mutate, isSuccess, isLoading: deleteLoading } = useDeleteRequest({
    onSuccess: (response) => {
      if (response.status === 200) {
        onDeleteSuccess(row.original.id);
        toast.success("Request deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    },
    onError: (error) => {
      toast.error("Failed to delete the request", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  });

  const handleDelete = async (requestID) => {
    const confirmed = window.confirm('Delete this request? \nNOTE: This action is not reversible!');
    if (confirmed) {
      mutate(requestID);
    }
  }

  const downloadImages = async (productId: number) => {
    setLoading(true)
    const res = await axios.get(`product/allImages/${productId}`)

    let imageUrls = res.data.images.images;

    const zip = new JSZip();
    const remoteZips = imageUrls.map(async (imageUrl: any, index: number) => {
      const response = await fetch(imageUrl.url);
      const data = await response.blob();
      zip.file(`${index + 1}.webp`, data);

      Promise.all(remoteZips)
        .then(() => {
          zip.generateAsync({ type: "blob" }).then((content) => {
            // give the zip file a name
            saveAs(content, "mockups.zip");
          });
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    });

  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          {loading ? <BeatLoader /> :
            <DotsVerticalIcon className="h-4 w-4" />
          }
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            router.push(`/dashboard2/product/edit/${row.original.id}`);
          }}
        >
          Edit
          <DropdownMenuShortcut>
            <Pencil2Icon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleDelete(row.original.id);
          }}
        >
          Delete
          <DropdownMenuShortcut>
            <TrashIcon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            downloadImages(row.original.id);
          }}
        >
          Download
          <DropdownMenuShortcut>
            <DownloadIcon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <ToastContainer />
    </DropdownMenu>
  );
}