"use client";
import CanvasModel from "@/app/components/Model/Model";
import { Model } from "@/common/components/generic/3DModel/3DModel";
import { DesignProperties } from "@/common/components/generic/DesignProperties/DesignProperties";
import { SelectColor } from "@/common/components/generic/SelectColor/SelectColor";
import { SelectProduct } from "@/common/components/generic/SelectProduct/SelectProduct";
import { Icon3DProduct } from "@/common/components/icons/Icon3DProduct";
import { IconCheckmark } from "@/common/components/icons/IconCheckmark";
import { IconColor } from "@/common/components/icons/IconColor";
import { IconDesign } from "@/common/components/icons/IconDesign";
import { IconNotification } from "@/common/components/icons/IconNotification";
import { useProductStore } from "@/store/productStore";
import * as Toast from "@radix-ui/react-toast";

const NewProdut = () => {
  const menu = useProductStore((state) => state.menuDesign);
  const updateMenuDesign = useProductStore((state) => state.updateMenuDesign);
  const updateSave = useProductStore((state) => state.updateSave);
  const openToast = useProductStore((state) => state.openToast);
  const transitionProduct = useProductStore((state) => state.transitionProduct);

  return (
    <div
      style={{
        backgroundColor: "#f2f4f7",
        height: "100%",
      }}
    >
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "196px 1fr 296px",
          alignItems: "start",
          justifyItems: "center",
          height: "100%",
          padding: "24px 12px",
        }}
      >
        <div
          style={{
            height: "100%",
          }}
        >
          <div
            style={{
              height: "200px",
              alignItems: "center",
              justifyItems: "center",
              backgroundColor: "white",
              display: "grid",
              width: "160px",
              fontSize: "16px",
              borderRadius: "16px",
              fontWeight: "500",
            }}
          >
            <div
              style={
                menu === "Product"
                  ? {
                      display: "grid",
                      gridTemplateColumns: "24px 1fr",
                      alignItems: "center",
                      fontWeight: "700",
                    }
                  : {
                      display: "grid",
                      gridTemplateColumns: "24px 1fr",
                      alignItems: "center",
                    }
              }
              onClick={() => {
                updateMenuDesign("Product");
              }}
            >
              <Icon3DProduct /> Product
            </div>
            <div
              style={
                menu === "Design"
                  ? {
                      display: "grid",
                      gridTemplateColumns: "24px 1fr",
                      alignItems: "center",
                      fontWeight: "700",
                    }
                  : {
                      display: "grid",
                      gridTemplateColumns: "24px 1fr",
                      alignItems: "center",
                    }
              }
              onClick={() => {
                updateMenuDesign("Design");
              }}
            >
              <IconDesign /> Design
            </div>
            <div
              style={
                menu === "Colors"
                  ? {
                      display: "grid",
                      gridTemplateColumns: "24px 1fr",
                      alignItems: "center",
                      fontWeight: "700",
                    }
                  : {
                      display: "grid",
                      gridTemplateColumns: "24px 1fr",
                      alignItems: "center",
                    }
              }
              onClick={() => {
                updateMenuDesign("Colors");
              }}
            >
              <IconColor />
              Colors
            </div>
          </div>

          <div
            style={{
              height: "55%",
              display: "grid",
              alignItems: "end",
              justifyItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "black",
                height: "48px",
                color: "white",
                display: "grid",
                justifyItems: "center",
                alignItems: "center",
                fontSize: "14px",
                fontWeight: "700",
              }}
              onClick={() => {
                updateSave(true);
              }}
            >
              Save and publish
            </div>
          </div>
        </div>
        <div
          style={{
            height: "90%",
            width: "100%",
          }}
        >
          <Model />
        </div>
        <div
          style={{
            height: "90%",
            width: "100%",
            padding: "0 24px",
          }}
        >
          <Toast.Provider swipeDirection="right">
            <Toast.Root
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "16px 32px",
              }}
              open={openToast}
            >
              <Toast.Title
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Creating product
              </Toast.Title>
              <Toast.Description
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  display: "grid",
                  gridTemplateColumns: "1fr 40px",
                }}
              >
                <div>{transitionProduct}</div>
                <div
                  style={{
                    borderRadius: "32px",
                    border:
                      transitionProduct === "saved"
                        ? "1px solid #3DD68C"
                        : "1px solid #FFC53D",
                    display: "grid",
                    alignItems: "center",
                    justifyItems: "center",
                    width: "32px",
                    height: "32px",
                    color:
                      transitionProduct === "saved" ? "#3DD68C" : "#FFC53D",
                  }}
                >
                  {transitionProduct === "saved" ? (
                    <IconCheckmark />
                  ) : (
                    <IconNotification />
                  )}
                </div>
              </Toast.Description>
            </Toast.Root>
            <Toast.Viewport
              style={{
                position: "fixed",
                bottom: "40px",
                right: "300px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "250px",
                maxWidth: "100vw",
                margin: "0",
                listStyle: "none",
                zIndex: "2147483647",
                outline: "none",
              }}
            />
          </Toast.Provider>
          {menu === "Product" ? (
            <SelectProduct />
          ) : menu === "Colors" ? (
            <SelectColor />
          ) : (
            <DesignProperties />
          )}
        </div>
      </section>
    </div>
  );
};

export default NewProdut;
