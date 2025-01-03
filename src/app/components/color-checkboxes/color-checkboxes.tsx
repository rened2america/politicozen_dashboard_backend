import React, { useState } from "react";

const ColorCheckboxes = ({
    colors,
    setColors,
    theme,
}: {
    colors: string;
    setColors: any;
    theme: string;
}) => {
    const [selectedItems, setSelectedItems] = useState<string[]>(colors.split(",").filter(Boolean));

    const handleCheckboxChange = (item: string) => {
        const updatedSelection = selectedItems.includes(item)
            ? selectedItems.filter((i) => i !== item)
            : [...selectedItems, item];

        setSelectedItems(updatedSelection);
        setColors(updatedSelection.join(","));
    };

    const options = ["white", "black", "blue", "red", "beige"];

    return (
        <div className={`border shadow-md p-4 rounded-lg`}>

            <label className="block text-gray-700 text-sm font-bold mb-2">
                Colors
            </label>
            {options.map((option) => (
                <label key={option} className="block cursor-pointer mb-2">
                    <input
                        type="checkbox"
                        value={option}
                        checked={selectedItems.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        className="mr-2"
                        id="colors"
                        name="colors"
                    />
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                </label>
            ))}
        </div>
    );
};

export default ColorCheckboxes;