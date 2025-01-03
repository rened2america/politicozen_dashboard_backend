import CategoryDropDown from "@/app/components/category-dropdown/category-dropdown";
import { useState } from "react";
import Image from "next/image";
import axios from "@/service/axiosInstance";
const EditArtForm = ({ art, onClose, handleSuccess, handleError }) => {
    const [formData, setFormData] = useState({
        artId: art.id,
        name: art.name,
        categoryId: art.categoryId
    });

    const setCategoryId = (id) => {
        setFormData({ ...formData, categoryId: id })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`product/updateArt`, formData);
            onClose();
            handleSuccess("Art updated")
        } catch (error) {
            handleError("Error updating art")
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className=" flex flex-col gap-3">
                <div>
                    <Image
                        src={art.urlImage}
                        // layout="fill"
                        objectFit="contain"
                        alt={art.name}
                        width={200}
                        height={200}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Art Name
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="w-full">
                    <CategoryDropDown categoryId={art.categoryId} setCategoryId={setCategoryId} theme={"light"} />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EditArtForm;