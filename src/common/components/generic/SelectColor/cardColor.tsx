import { FC } from "react";
import { IconEye } from "../../icons/IconEye";
import { useProductStore } from "@/store/productStore";

export const CardColor: FC<{ allColors: any; color: string; colorName: string }> = ({
  allColors,
  color,
  colorName,
}) => {
  const updateColorsSelected = useProductStore(
    (state) => state.updateColorsSelected
  );
  const isSelected = useProductStore((state) => state.colorsSelected[color]);
  const updateColor = useProductStore((state) => state.updateColor);
  return (
    <div className="flex gap-2 items-center justify-center mt-4">
      <div
        className={`flex items-center justify-start gap-3 px-4 py-2 rounded-2xl w-full cursor-pointer ${
          isSelected ? "border border-black" : "border border-white"
        }`}
        onClick={() => {
          if (color !== "white") {
            updateColorsSelected(color);
          }
        }}
      >
        <div
          style={{ backgroundColor: allColors[color] }}
          className="h-8 w-8 rounded-full border border-black"
        />
        <div>{colorName}</div>
      </div>
      <div
        className="grid cursor-pointer"
        onClick={() => {
          updateColor(allColors[color]);
        }}
      >
        <IconEye />
      </div>
    </div>
  );
};
