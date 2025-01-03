"use client";
import { useState, useEffect } from "react";
import { PageTitle } from "@/common/components/generic/PageTitle/PageTitle";
import { PageLayout } from "@/common/layouts/PageLayout/PageLayout";
import { useGetAllRequests, useUploadArt } from "./useRequests";
import { useDropzone } from "react-dropzone";
import { IconUpload } from "@/common/components/icons/IconUpload";
import Image from "next/image";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import BeatLoader from "react-spinners/BeatLoader";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import Modal from "./Modal";
import CreateEditRequestForm from "./CreateEditRequestForm";
import CategoryDropDown from "@/app/components/category-dropdown/category-dropdown";
import axios from "@/service/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataTable } from "@/app/components/requests-table/components/data-table";
import { columns } from "@/app/components/requests-table/components/columns";

const Requests = () => {
  
  const { data: requestData, isLoading, refetch } = useGetAllRequests();
  const [tableData, setTableData] = useState([]);
  const [imageName, setImageName] = useState("");

  const [openMenuId, setOpenMenuId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);
  const [isEdit, setIsEdit] = useState(false)

  // Update tableData when API data changes
  useEffect(() => {
    if (requestData?.data) {
      setTableData(requestData.data);
    }
  }, [requestData]);

  // Handle data changes from the DataTable
  const handleDataChange = (newData: any) => {
    setTableData(newData);
  };






  // const handleSubmit = (imageCrop: any) => {
  //   if (selectedFile && imageName) {
  //     const formData = new FormData();
  //     formData.append("art", selectedFile);
  //     formData.append("artistName", setArti);
  //     formData.append("urlImage", imageCrop);
  //     formData.append("imageCrop", imageCrop);
  //     formData.append("imageCrop", imageCrop);

  //     // mutate(formData);
  //   } else {
  //     // Manejar el caso en que no se haya seleccionado una imagen o no se haya ingresado un nombre
  //   }
  // };

  // useEffect(() => {
  //   if (!isLoadingArt) {
  //     refetch();
  //   }
  // }, [isLoadingArt]);


  const handleEdit = (img) => {
    setSelectedArt(img);
    setIsEdit(true)
    setIsModalOpen(true);
    setOpenMenuId(null); // Close the menu
  };

  const onOpenCreate = () => {
    setSelectedArt(null);
    setIsEdit(false)
    setIsModalOpen(true);
    setOpenMenuId(null);
  }


  const handleSuccess = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    refetch();
  }

  const handleError = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <PageLayout>
      <PageTitle>Requests</PageTitle>
      <div className="mb-10">
        {isLoading ? (
          <div className="w-full h-[50vh] text-base grid place-items-center rounded-lg border border-gray-300 font-bold">
            <div>Loading Products...</div>
          </div>
        ) : (
          <DataTable
            data={tableData}
            columns={columns}
            isLoading={isLoading}
            onDataChange={handleDataChange}
            handleEdit={handleEdit}
            onOpenCreate={onOpenCreate}
          />
        )}
      </div>


      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CreateEditRequestForm
            isEdit={isEdit}
            request={selectedArt}
            onClose={() => setIsModalOpen(false)}
            handleSuccess={handleSuccess}
            handleError={handleError}
          />

        </Modal>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </PageLayout>
  );
};

export default Requests;