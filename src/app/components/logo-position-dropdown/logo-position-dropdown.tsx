const LogoPositionDropdown = ({ logoPosition, setLogoPosition, theme }: { logoPosition: any; setLogoPosition: any; theme: string }) => {
    return (
        <select
            className={`border bg-white text-gray-700 shadow-md w-full h-10 rounded-lg cursor-pointer`}
            value={logoPosition}
            onChange={(e) => setLogoPosition(e.target.value)}
            name="logoPosition"
        >
            <option value="0">Select Positon</option>
            <option value="full front">Full Front</option>
            <option value="left chest">Left Chest</option>
            <option value="right chest">Right Chest</option>
        </select>
    )
}

export default LogoPositionDropdown;