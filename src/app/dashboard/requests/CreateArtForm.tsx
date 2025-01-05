import { useState } from "react";
import Image from "next/image";
import { useCreateArtFromRequest } from "./useRequests";
import BeatLoader from "react-spinners/BeatLoader";
import CategoryDropDown from "@/app/components/category-dropdown/category-dropdown";

const CreateArtForm = ({
    request,
    onClose,
    handleSuccess,
    handleError,

}) => {

    const { mutate: createArtFromRequest, isSuccess: isCreateSuccess, isLoading } = useCreateArtFromRequest({
        onSuccess: (response: any) => {
            if (response.status === 200) {
                handleSuccess("Art created successfully!");
                onClose()
            }
        },
        onError: (error: any) => {
            if (error?.response?.status === 400) {
                // If the server returns a custom message, you can use that:
                handleError(error?.response?.data?.message || "There was a bad request!");
            } else {
                handleError("Failed to create the art!\nPlease contact tech.");
            }
        }
    });


    const [formData, setFormData] = useState({
        requestID: request.id,
        categoryId: "",
        name: "",
    });

    const setName = (name) => {
        setFormData({ ...formData, name: name })
    }

    const setCategoryId = (categoryId) => {
        setFormData({ ...formData, categoryId: categoryId })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        createArtFromRequest(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
                <h1 className="text-2xl font-bold flex justify-start mb-2">Create Art</h1>
                <span className="text-sm">NOTE: This will also create Poster and Canvas for this request</span>
                <div>
                    <div className="flex gap-3 justify-center ">
                        <div className="flex flex-col gap-3">
                            <Image src={request.urlImage} width={200} height={200} alt={"error"} className="border shadow-lg" />
                            <div >
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="w-full">
                                <CategoryDropDown categoryId={formData.categoryId} setCategoryId={setCategoryId} theme={"light"} />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md"
                    >
                        {isLoading ? <BeatLoader loading={isLoading} /> : "Save"}
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

export default CreateArtForm;