import React, { useState } from "react";

const IsCreatedToggle = ({
    isCreated,
    setIsCreated
}: {
    isCreated: boolean,
    setIsCreated: any,
}) => {

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
                Is Created
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isCreated}
                    onChange={(e) =>
                        setIsCreated(e.target.checked)
                    }
                />
                <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none
                     peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer
                     dark:bg-gray-700 peer-checked:after:translate-x-full
                     peer-checked:after:border-white after:content-['']
                     after:absolute after:top-0.5 after:left-[2px]
                     after:bg-white after:border-gray-300 after:border
                     after:rounded-full after:h-5 after:w-5 after:transition-all
                     dark:border-gray-600 peer-checked:bg-yellow-400"
                ></div>
            </label>
        </div>
    );
};

export default IsCreatedToggle;