import React, { useState } from "react";

const ProductTypeCheckboxes = ({
    templates,
    setProductType,
    theme,
}: {
    templates: string;
    setProductType: any;
    theme: string;
}) => {
    const [selectedItems, setSelectedItems] = useState<string[]>(templates.split(",").filter(Boolean));

    const handleCheckboxChange = (item: string) => {
        const updatedSelection = selectedItems.includes(item)
            ? selectedItems.filter((i) => i !== item)
            : [...selectedItems, item];

        setSelectedItems(updatedSelection);
        setProductType(updatedSelection.join(","));
    };

    const options = ["mug", "hoodie", "t-shirt", "sweatshirt"];

    return (
        <div className={`border shadow-md p-4 rounded-lg`}>

            <label className="block text-gray-700 text-sm font-bold mb-2">
                Product Types
            </label>
            {options.map((option) => (
                <label key={option} className="block cursor-pointer mb-2">
                    <input
                        type="checkbox"
                        value={option}
                        checked={selectedItems.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        className="mr-2"
                        id="productTypes"
                        name="productType"
                    />
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                </label>
            ))}
        </div>
    );
};

export default ProductTypeCheckboxes;