"use client";
import * as Slider from "@radix-ui/react-slider";
import "./style.css";
import { useProductStore } from "@/store/productStore";
import { IconRounded } from "../../icons/IconRounded";
import {
  MenuPropertiesLayout,
  MenuPropertiesLayoutTitle,
} from "@/common/layouts/PageLayout/MenuPropertiesLayout";
import { useDropzone } from "react-dropzone";
import { IconUpload } from "../../icons/IconUpload";
import { useState } from "react";
import PreviewImage from "../PreviewImage/PreviewImage";
// import PreviewImage from "../PreviewImage/PreviewImage";

export const DesignProperties = () => {
  const [imgURL, setImgURL] = useState<string>("");

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles[0]);
      // updateImgLogo(URL.createObjectURL(acceptedFiles[0]));
      updateImgBase64Logo(URL.createObjectURL(acceptedFiles[0]));
      setImgURL(URL.createObjectURL(acceptedFiles[0]));
    },
  });
  const updateImgLogo = useProductStore((state) => state.updateImgLogo);
  const updateImgBase64Logo = useProductStore(
    (state) => state.updateImgBase64Logo
  );
  const updateScale = useProductStore((state) => state.updateScale);
  const scale = useProductStore((state) => state.scale);
  const position = useProductStore((state) => {
    return {
      x: state.x,
      y: state.y,
      z: state.z,
    };
  });
  const angle = useProductStore((state) => state.angle);
  const selectModel = useProductStore((state) => state.selectModel);

  return (
    <MenuPropertiesLayout>
      <MenuPropertiesLayoutTitle>Design Properties</MenuPropertiesLayoutTitle>
      <div
        style={{
          padding: "0 8px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateRows: "24px 48px",
            justifyItems: "center",
            alignItems: "center",
            padding: "12px 8px",
          }}
        >
          <div>Position</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr",
                borderRadius: "8px",
                padding: "0 8px",
                backgroundColor: "#f8f9f9",
              }}
            >
              <div>X</div>
              <input
                style={{
                  width: "100%",
                  appearance: "none",
                  backgroundColor: "#f8f9f9",
                }}
                value={position.x}
                type="number"
                step="0.001"
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr",
                borderRadius: "8px",
                padding: "0 8px",
                backgroundColor: "#f8f9f9",
              }}
            >
              <div>Y</div>
              <input
                style={{
                  width: "100%",
                  appearance: "none",
                  backgroundColor: "#f8f9f9",
                }}
                step="0.001"
                value={position.y}
                type="number"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateRows: "24px 48px",
            justifyItems: "center",
            alignItems: "center",
            padding: "12px 24px",
          }}
        >
          <div>Rotation</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr",
                borderRadius: "8px",
                padding: "0 8px",
                backgroundColor: "#f8f9f9",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div>
                <IconRounded />
              </div>
              <input
                style={{
                  width: "100%",
                  appearance: "none",
                  backgroundColor: "#f8f9f9",
                  maxWidth: "96px",
                  height: "32px",
                }}
                value={angle}
                type="number"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateRows: "32px 32px",
            justifyItems: "center",
            alignItems: "center",
            padding: "0 8px",
          }}
        >
          <div>Scale</div>
          <form
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "8px",
            }}
          >
            <Slider.Root
              className="SliderRoot"
              defaultValue={[0.1]}
              max={1}
              step={0.05}
              onValueChange={(e) => {
                updateScale(e[0]);
              }}
            >
              <Slider.Track className="SliderTrack">
                <Slider.Range className="SliderRange" />
              </Slider.Track>
              <Slider.Thumb className="SliderThumb" aria-label="Volume" />
            </Slider.Root>
            <input
              style={{
                width: "100%",
                appearance: "none",
                backgroundColor: "#f8f9f9",
                borderRadius: "8px",
              }}
              value={scale}
              type="number"
            />
          </form>
        </div>

        <div
          style={{
            fontSize: "13px",
            fontWeight: "700",
            padding: "8px 8px",
            display: "grid",
            alignItems: "center",
            justifyItems: "center",
            marginTop: "16px",
            backgroundColor: "#f8f9f9",
            borderRadius: "8px",
            gridTemplateColumns: "1fr 32px",
            cursor: "pointer",
          }}
          {...getRootProps({ className: "dropzone" })}
        >
          <input {...getInputProps()} />
          {acceptedFiles.length > 0 ? (
            <div>{acceptedFiles[0].path}</div>
          ) : (
            <div>Upload logo in PNG</div>
          )}
          <div
            style={{
              border: "1px solid #687373",
              borderRadius: "32px",
              padding: "4px",
              color: "#687373",
            }}
          >
            <IconUpload />
          </div>
        </div>
        <PreviewImage imageFile={imgURL} />
      </div>
    </MenuPropertiesLayout>
  );
};
