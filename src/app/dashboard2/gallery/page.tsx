"use client";
import { useState, useEffect } from "react";
import { PageTitle } from "@/common/components/generic/PageTitle/PageTitle";
import { PageLayout } from "@/common/layouts/PageLayout/PageLayout";
import { useGetGallery, useUploadArt } from "./useGallery";
import { useDropzone } from "react-dropzone";
import { IconUpload } from "@/common/components/icons/IconUpload";
import Image from "next/image";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import BeatLoader from "react-spinners/BeatLoader";
const Gallery = () => {
  const { mutate, isLoading: isLoadingArt } = useUploadArt();
  const { data, isLoading, refetch } = useGetGallery();
  const [imageName, setImageName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.5);
  const [urlImage, setUrlImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageCrop, setImageCrop] = useState(null);
  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const showCroppedImage = async () => {
    try {
      const croppedImage: any = await getCroppedImg(urlImage, croppedAreaPixels);
      console.log("croppedImage", croppedImage);
      fetch(croppedImage)
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function () {
            const base64data = reader.result;
            handleSubmit(base64data);
          };
        });
      setUrlImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const { getInputProps, acceptedFiles, getRootProps, fileRejections } =
    useDropzone({
      multiple: false,
      maxFiles: 1,
      maxSize: 31457280,
      accept: {
        "image/*": [],
      },
      onDrop: (acceptedFiles) => {
        console.log("acceptedFiles", acceptedFiles[0]);
        if (acceptedFiles[0]) {
          setUrlImage(URL.createObjectURL(acceptedFiles[0]));
          setSelectedFile(acceptedFiles[0]);
        } // Guardar la imagen seleccionada
      },
    });

  const handleSubmit = (imageCrop: any) => {
    if (selectedFile && imageName) {
      const formData = new FormData();
      formData.append("art", selectedFile);
      formData.append("name", imageName);
      formData.append("imageCrop", imageCrop);
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

  console.log("selectedFile", fileRejections);

  return (
    <PageLayout>
      <PageTitle>Gallery</PageTitle>
      <div className="grid md:grid-cols-1 lg:grid-cols-[1fr,300px] gap-12">
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4 my-4">
          {data &&
            data.data.gallery.map((img: any) => {
              return (
                <div key={img.id}>
                  <div className="w-[120px] h-[180px] relative bg-[#F8F9F9] grid grid-rows-[1fr_100px] border rounded-sm">
                    <Image
                      key={img.id}
                      src={img.urlImage}
                      layout="fill"
                      objectFit="contain"
                      alt={img.name}
                    />
                  </div>
                  <h2 className="text-lg font-semibold mt-2">  {img.name}
                  </h2>
                </div>
              );
            })}
        </div>

        {/* <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 250px",
        }}
      > */}
        {/* <div
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
            
        </div> */}


        <div className="grid gap-4 bg-gray-900 p-6 rounded-lg">
            <>
              <input
                type="text"
                placeholder="Enter image name"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
                className="p-2 w-full text-sm bg-gray-800 text-white rounded border border-gray-700"
              />
              <div className="text-white">Aspect Ratio 1/1</div>
              <div className="relative h-64">
                {urlImage && (
                  <Cropper
                    image={urlImage}
                    crop={crop}
                    zoom={zoom}
                    aspect={1 / 1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    minZoom={0.5}
                    restrictPosition={false}
                    style={{
                      containerStyle: {
                        background: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                      mediaStyle: { background: 'transparent' },
                    }}
                  />
                )}
              </div>
              <input
                type="range"
                value={zoom}
                min={0.5}
                max={3}
                step={0.05}                
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full mt-2"
              />
              <div
                {...getRootProps({ className: "dropzone" })}
                className="flex items-center justify-center p-2 bg-gray-700 rounded border border-gray-600 cursor-pointer"
              >
                <input {...getInputProps()} />
                {acceptedFiles.length > 0 ? (
                  <div className="text-white">{acceptedFiles[0].path}</div>
                ) : fileRejections.length > 0 &&
                  fileRejections[0].errors[0].code === "file-too-large" ? (
                  <div className="text-red-600 font-bold">
                    File is larger than 30 Mb
                  </div>
                ) : (
                  <div className="text-white">Upload logo in PNG</div>
                )}
                <div className="text-white ml-2 p-1 border border-gray-500 rounded-full">
                  <IconUpload />
                </div>
              </div>
              <button
                onClick={showCroppedImage}
                className="mt-4 p-2 text-sm font-medium text-white bg-blue-600 rounded border border-blue-600 hover:bg-blue-700"
              >
                {isLoadingArt ? (
                  <BeatLoader loading={isLoadingArt} color="white" size={16} />
                ) : (
                  "Upload logo"
                )}
              </button>
            </>
          
        </div>
      </div>
    </PageLayout>
  );
};

export default Gallery;