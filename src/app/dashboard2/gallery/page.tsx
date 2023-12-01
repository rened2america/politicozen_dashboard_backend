"use client";
import { useState, useEffect } from "react";
import { PageTitle } from "@/common/components/generic/PageTitle/PageTitle";
import { PageLayout } from "@/common/layouts/PageLayout/PageLayout";
import { useGetGallery, useUploadArt } from "./useGallery";
import { useDropzone } from "react-dropzone";
import { IconUpload } from "@/common/components/icons/IconUpload";
import Image from "next/image";

const Gallery = () => {
  const { mutate, isLoading: isLoadingArt } = useUploadArt();
  const { data, isLoading, refetch } = useGetGallery();
  const [imageName, setImageName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const { getInputProps, acceptedFiles, getRootProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      console.log("acceptedFiles", acceptedFiles[0]);
      setSelectedFile(acceptedFiles[0]); // Guardar la imagen seleccionada
    },
  });

  const handleSubmit = () => {
    if (selectedFile && imageName) {
      const formData = new FormData();
      formData.append("art", selectedFile);
      formData.append("name", imageName);
      mutate(formData);
    } else {
      // Manejar el caso en que no se haya seleccionado una imagen o no se haya ingresado un nombre
    }
  };

  useEffect(() => {
    if (!isLoadingArt) {
      refetch();
    }
  }, [isLoadingArt]);

  console.log(data);

  return (
    <PageLayout>
      <PageTitle>Gallery</PageTitle>
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "200px 250px 100px",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <input
            type="text"
            placeholder="Enter image name"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            style={{
              backgroundColor: "rgb(248, 249, 249)",
              height: "40px",
              borderRadius: "8px",
            }}
          />
          <div
            {...getRootProps({ className: "dropzone" })}
            style={{
              fontSize: "13px",
              fontWeight: "700",
              padding: "8px 8px",
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
              backgroundColor: "#f8f9f9",
              borderRadius: "8px",
              gridTemplateColumns: "1fr 32px",
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            {acceptedFiles.length > 0 ? (
              <div>{acceptedFiles[0].path}</div>
            ) : (
              <div>Upload logo in PNG</div>
            )}
            <div
              style={{
                border: "1px solid #687373",
                borderRadius: "32px",
                padding: "4px",
                color: "#687373",
              }}
            >
              <IconUpload />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            style={{
              display: "grid",
              placeItems: "center",
              fontSize: "14px",
              fontWeight: "700",
              backgroundColor: "black",
              height: "40px",
              borderRadius: "8px",
              color: "white",
            }}
          >
            Upload logo
          </button>
        </div>
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: "16px",
            margin: "16px 0",
          }}
        >
          {data &&
            data.data.gallery.map((img: any) => {
              return (
                <div key={img.id}>
                  <div
                    style={{
                      width: "120px",
                      height: "180px",
                      position: "relative",
                      backgroundColor: "rgb(248, 249, 249)",
                      display: "grid",
                      gridTemplateRows: "1fr 100px",
                    }}
                  >
                    <Image
                      key={img.id}
                      src={img.urlImage}
                      layout="fill"
                      objectFit="contain"
                      alt={img.name}
                    />
                  </div>
                  <h2
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    {img.name}
                  </h2>
                </div>
              );
            })}
        </div>
      </div>
    </PageLayout>
  );
};

export default Gallery;
