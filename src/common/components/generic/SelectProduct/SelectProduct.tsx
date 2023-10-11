import {
  MenuPropertiesLayout,
  MenuPropertiesLayoutTitle,
} from "@/common/layouts/PageLayout/MenuPropertiesLayout";
import { useProductStore } from "@/store/productStore";
import { useEffect } from "react";

export const SelectProduct = () => {
  const updateName = useProductStore((state) => state.updateName);
  const updateSubtitle = useProductStore((state) => state.updateSubtitle);
  const name = useProductStore((state) => state.name);
  const subtitle = useProductStore((state) => state.subtitle);
  const updateSelectModel = useProductStore((state) => state.updateSelectModel);

  return (
    <MenuPropertiesLayout>
      <MenuPropertiesLayoutTitle>Product</MenuPropertiesLayoutTitle>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "144px 1fr",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateRows: "32px 40px 40px",
            justifyItems: "center",
            alignItems: "center",
            padding: "8px 16px",
          }}
        >
          <div>Properties</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
            }}
          >
            <div
              style={{
                display: "grid",
                alignItems: "center",
                fontWeight: "700",
                fontSize: "13px",
              }}
            >
              Name
            </div>
            <input
              style={{
                width: "100%",
                backgroundColor: "rgb(248, 249, 249)",
                padding: "0 8px",
                borderRadius: "8px",
                height: "32px",
              }}
              value={name}
              onChange={(e) => {
                updateName(e.target.value);
              }}
              type="text"
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
            }}
          >
            <div
              style={{
                display: "grid",
                alignItems: "center",
                fontWeight: "700",
                fontSize: "13px",
              }}
            >
              Subtitle
            </div>
            <input
              value={subtitle}
              style={{
                width: "100%",
                backgroundColor: "rgb(248, 249, 249)",
                padding: "0 8px",
                borderRadius: "8px",
                height: "32px",
              }}
              onChange={(e) => {
                updateSubtitle(e.target.value);
              }}
              type="text"
            />
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateRows: "50px 1fr",
            justifyItems: "center",
            alignItems: "start",
          }}
        >
          <div>Select Product</div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "100px 100px",
              height: "100px",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <div
              style={{
                border: "1px solid black",
                width: "90%",
                height: "90%",
                display: "grid",
                alignItems: "center",
                justifyItems: "center",
                borderRadius: "999px",
              }}
              onClick={() => {
                updateSelectModel("Shirt");
              }}
            >
              <img width="80px" src="/shirtModel.png" alt="" />
            </div>
            <div
              style={{
                border: "1px solid black",
                width: "90%",
                height: "90%",
                display: "grid",
                alignItems: "center",
                justifyItems: "center",
                borderRadius: "999px",
              }}
              onClick={() => {
                updateSelectModel("Hoodie");
              }}
            >
              <img width="80px" src="/hoodieModel.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </MenuPropertiesLayout>
  );
};
