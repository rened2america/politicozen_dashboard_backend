import {
  MenuPropertiesLayout,
  MenuPropertiesLayoutTitle,
} from "@/common/layouts/PageLayout/MenuPropertiesLayout";
import { useProductStore } from "@/store/productStore";
import { CardColor } from "./cardColor";
import { getAvailableColors } from "../../../constants/allColors";

export const SelectColor = () => {
  const colorsSelected = useProductStore((state) => state.colorsSelected);
  const selectedModel = useProductStore((state) => state.selectModel);
  
  // Get colors for the current product type
  const availableColors = getAvailableColors(selectedModel);

  // Check if all colors are selected
  const areAllColorsSelected = Object.entries(colorsSelected).every(
    ([key, value]) => value === true
  );

  return (
    <MenuPropertiesLayout>
      <MenuPropertiesLayoutTitle>Select Colors</MenuPropertiesLayoutTitle>
      <div className="px-2 max-h-[calc(100vh-13rem)] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
        {Object.entries(availableColors).map(([colorKey, hexValue]) => (
          <CardColor
            key={colorKey}
            allColors={availableColors}
            color={colorKey}
            colorName={colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}
          />
        ))}
      </div>
      {areAllColorsSelected && (
        <div className="mt-2 text-sm font-bold text-center">
          All colors selected
        </div>
      )}
    </MenuPropertiesLayout>
  );
};