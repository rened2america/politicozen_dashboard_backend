import { useState } from "react";
import Image from "next/image";
import ProductTypeCheckboxes from "@/app/components/productType-checkboxes/productType-checkboxes";
import LogoPositionDropdown from "@/app/components/logo-position-dropdown/logo-position-dropdown";
import CroppingSection from "./CroppingSection";
import getCroppedImg from "./cropImage";
import { useUpdateRequest, useUploadRequest } from "./useRequests";
import ColorCheckboxes from "@/app/components/color-checkboxes/color-checkboxes";
import BeatLoader from "react-spinners/BeatLoader";
import IsCreatedToggle from "@/app/components/iscCreated-toggle/isCreated-toggle";

const CreateEditRequestForm = ({
    isEdit,
    request,
    onClose,
    handleSuccess,
    handleError,

}) => {

    const { mutate: createRequestMutate, isSuccess: isCreateSuccess, isLoading: uploadLoading } = useUploadRequest({
        onSuccess: (response: any) => {
            if (response.status === 200) {
                handleSuccess("Request created successfully!");
                onClose()
            }
        },
        onError: (error: any) => {
            if (error?.response?.status === 400) {
                // If the server returns a custom message, you can use that:
                handleError(error?.response?.data?.message || "There was a bad request!");
            } else {
                handleError("Failed to create the request!\nPlease contact tech.");
            }

        }
    });

    const { mutate: updateRequestMutate, isSuccess: isUpdateSuccess, isLoading: updateLoading } = useUpdateRequest({
        onSuccess: (response: any) => {
            if (response.status === 200) {
                handleSuccess("Request updated successfully!");
                onClose()
            }
        },
        onError: (error: any) => {
            if (error?.response?.status === 400) {
                // If the server returns a custom message, you can use that:
                handleError(error?.response?.data?.message || "There was a bad request!");
            } else {
                handleError("Failed to update the request!\nPlease contact tech.");
            }
        }
    });

    const isSaving = uploadLoading || updateLoading;

    const [formData, setFormData] = useState({
        requestID: isEdit ? request.id : 0,
        urlImage: isEdit ? request.urlImage : null,
        artistName: isEdit ? request.artistName : '',
        templates: isEdit ? request.templates : '',
        position: isEdit ? request.position : '',
        colors: isEdit ? request.color : '',
        isCreated: isEdit ? request.isCreated : false
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(0.5);
    const [urlImage, setUrlImage] = useState(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);    

    const setProductType = (productType) => {
        setFormData({ ...formData, templates: productType })
    }

    const setColors = (colors) => {
        setFormData({ ...formData, colors: colors })
    }

    const setLogoPosition = (logoPosition) => {
        setFormData({ ...formData, position: logoPosition })
    }

    const setIsCreated = (isCreated: boolean) => {
        setFormData({ ...formData, isCreated: isCreated })
    }

    const handleSubmit = async (updatedFormData: any) => {
        if (isEdit) {
            console.log("Here is the update event: ", updatedFormData)
            updateRequestMutate(updatedFormData);
            return;
        }
        if (selectedFile) {
            console.log("Here is the create event: ", updatedFormData)

            createRequestMutate(updatedFormData);
        }
    };
    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        console.log(croppedArea, croppedAreaPixels);
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const showCroppedImage = async (event: any) => {
        event.preventDefault();
        if (isEdit) {
            handleSubmit(formData)
            return;
        }
        try {
            const croppedImage: any = await getCroppedImg(urlImage, croppedAreaPixels);
            fetch(croppedImage)
                .then((res) => res.blob())
                .then((blob) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = function () {
                        const base64data = reader.result;
                        const updatedFormData = { ...formData, urlImage: base64data };
                        handleSubmit(updatedFormData)
                        setFormData(updatedFormData);
                    };
                });
            setUrlImage(croppedImage);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <form onSubmit={showCroppedImage}>
            <div className="flex flex-col gap-3">
                <h1 className="text-2xl font-bold flex justify-start mb-2">{isEdit ? "Update" : "Create"}Request</h1>
                <div className="flex gap-10">
                    <div>
                        {
                            isEdit ?
                                <Image src={formData.urlImage} width={400} height={400} alt={"error"} className="border shadow-lg" />
                                :
                                <CroppingSection
                                    urlImage={isEdit ? formData.urlImage : urlImage}
                                    crop={crop}
                                    zoom={zoom}
                                    setCrop={setCrop}
                                    setZoom={setZoom}
                                    onCropComplete={onCropComplete}
                                    setUrlImage={setUrlImage}
                                    setSelectedFile={setSelectedFile}
                                />
                        }

                    </div>
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-3">
                            <div >
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Artist Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.artistName}
                                    onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="w-full">
                                <ProductTypeCheckboxes templates={formData.templates} setProductType={setProductType} theme={"light"} />
                            </div>
                            <div className="w-full">
                                <LogoPositionDropdown logoPosition={formData.position} setLogoPosition={setLogoPosition} theme={"light"} />
                            </div>
                            <div className="w-full">
                                <ColorCheckboxes colors={formData.colors} setColors={setColors} theme={"light"} />
                            </div>
                            <div className="w-full">
                                <IsCreatedToggle isCreated={formData.isCreated} setIsCreated={setIsCreated} />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md"
                    >
                        {isSaving ? <BeatLoader loading={isSaving} /> : "Save"}
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 rounded border shadow-md py-2 px-4"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CreateEditRequestForm;