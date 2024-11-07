const CategoryDropDown = ({ categoryId, setCategoryId, theme }: { categoryId: any; setCategoryId: any; theme: string }) => {
    return (
        <select
            className={`${theme == "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-700"} w-full h-10 rounded-lg cursor-pointer`}
            value={categoryId}
            onChange={(e) => setCategoryId(parseInt(e.target.value))}
        >
            <option value="0">Select Category</option>
            <option value="2">Politics</option>
            <option value="3">History</option>
            <option value="5">Comics</option>
            <option value="1">Others</option>

            {/* <option value="Social">Social</option>
        <option value="Economics">Economics</option>
        <option value="Environment">Environment</option>
        <option value="Media">Media</option>
        <option value="Culture">Culture</option>
        <option value="Satire">Satire</option>
        */}
        </select>
    )
}

export default CategoryDropDown;