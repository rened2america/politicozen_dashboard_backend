"use client";

import * as THREE from "three";
import { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  PivotControls,
  Decal,
} from "@react-three/drei";
import { useProduct } from "./useProduct";
import { useProductStore } from "@/store/productStore";
import { easing } from "maath";
import { getAvailableColors } from "@/common/constants/allColors";
//@ts-nocheck

const DEFAULT_COLORS = getAvailableColors("sweatshirt");
console.log("DEFAULT_COLORS: ", DEFAULT_COLORS)
// Color sequence for processing
const COLOR_SEQUENCE = Object.entries(DEFAULT_COLORS).map(([key]) => key);
console.log("COLOR_SEQUENCE: ", DEFAULT_COLORS)
type ColorKey = keyof typeof DEFAULT_COLORS;

export const Object3D = (props: any) => {
  const gl = useThree((state) => state.gl);
  const position = useProductStore((state) => {
    return { x: state.x, y: state.y, z: state.z };
  });
  const scale = useProductStore((state) => state.scale);
  const angle = useProductStore((state) => state.angle);
  const updatePosition = useProductStore((state) => state.updatePosition);
  const updateAngle = useProductStore((state) => state.updateAngle);
  const image = useProductStore((state) => state.imgLogo);
  const image64base = useProductStore((state) => state.imgBase64Logo);
  const color = useProductStore((state) => state.color);
  const updateColor = useProductStore((state) => state.updateColor);
  const { mutate: createProduct, isLoading, isSuccess } = useProduct();
  const save = useProductStore((state) => state.save);
  const updateSave = useProductStore((state) => state.updateSave);
  const saveStep = useProductStore((state) => state.saveStep);
  const updateSaveStep = useProductStore((state) => state.updateSaveStep);
  const addImageProduct = useProductStore((state) => state.addNewImgProduct);
  const imagesProduct = useProductStore((state) => state.imgProduct);
  const colorsSelected = useProductStore((state) => state.colorsSelected);
  const subtitle = useProductStore((state) => state.subtitle);
  const description = useProductStore((state) => state.description);
  const groupId = useProductStore((state) => state.groupId);

  const updateOpenToast = useProductStore((state) => state.updateOpenToast);
  const openToast = useProductStore((state) => state.openToast);
  const tags = useProductStore((state) => state.tags);

  const transitionProduct = useProductStore((state) => state.transitionProduct);

  const updateTransitionProduct = useProductStore(
    (state) => state.updateTransitionProduct
  );

  const updateResetProductColor = useProductStore(
    (state) => state.updateResetProductColor
  );
  const name = useProductStore((state) => state.name);
  const price = useProductStore((state) => state.price)
  const resetProductColor = useProductStore((state) => state.resetProductColor);

  const [userSelectedColor, setUserSelectedColor] = useState(color);

  // Update userSelectedColor when color changes via eye button
  useEffect(() => {
    if (!save) {
      setUserSelectedColor(color);
    }
  }, [color, save]);

  useEffect(() => {
    if (isSuccess) {
      updateTransitionProduct("saved");
      const closeToast = setTimeout(() => {
        updateOpenToast(false);
      }, 5000);

      return () => {
        clearTimeout(closeToast);
      };
    }
  }, [isSuccess]);

  useEffect(() => {
    const allImagesComplete = COLOR_SEQUENCE.every(
      (colorKey) => imagesProduct[colorKey]?.length > 0
    );
    if (allImagesComplete) {
      console.log("Creating Product");
      console.log(imagesProduct);
      //@ts-ignore
      createProduct({
        imgLogo: image64base,
        imgListProduct: imagesProduct,
        colorsSelected,
        angle,
        x: position.x,
        y: position.y,
        scale,
        name,
        subtitle,
        price,
        description,
        type: "T-Shirt",
        tags,
        groupId,
      });
      updateTransitionProduct("saving");
      // Reset imagesProduct
      addImageProduct(
        Object.fromEntries(COLOR_SEQUENCE.map(color => [color, ""])) as Record<ColorKey, string>
      );
    }
  }, [imagesProduct]);

  // Utility function to compare colors with tolerance
  const colorsMatch = (color1: THREE.Color, color2Hex: string) => {
    const color2 = new THREE.Color(color2Hex);
    const tolerance = 0.01;
    return (
      Math.abs(color1.r - color2.r) < tolerance &&
      Math.abs(color1.g - color2.g) < tolerance &&
      Math.abs(color1.b - color2.b) < tolerance
    );
  };
  // Function to process current color step
  const processColorStep = (currentStep: number, delta: number) => {
    if (currentStep >= COLOR_SEQUENCE.length) {
      // All steps completed
      updateSave(false);
      updateResetProductColor(true);
      updateSaveStep(0);
      updateColor(userSelectedColor);
      return;
    }

    const currentColor = COLOR_SEQUENCE[currentStep];
    const colorHex = DEFAULT_COLORS[currentColor];

    // Update color
    updateColor(colorHex);
    easing.dampC(
      materials.lambert1.color,
      new THREE.Color(colorHex),
      0.2,
      delta
    );
    easing.dampC(
      materials.lambert1.color,
      new THREE.Color(colorHex),
      0.2,
      delta
    );

    // Check if color transition is complete
    if (
      colorsMatch(materials.lambert1.color, colorHex)
    ) {
      // Capture image for first color
      if (currentStep === 0) {
        updateOpenToast(true);
        updateTransitionProduct("snapshots");
      }

      const base64 = gl.domElement.toDataURL("image/webp");
      addImageProduct({ [currentColor]: base64 });
      updateSaveStep(currentStep + 1);
    }
  };

  useFrame((state, delta) => {
    if (save) {
      setTimeout(() => {
        //  WAIITNG FOR PIVOT CONTROLS TO HIDE
        processColorStep(saveStep, delta);
      }, 100);
    } else {
      // Apply the current color
      easing.dampC(materials.lambert1.color, color, 0.2, delta);
    }
  });

  // Define the area boundaries
  const AREA_X_MIN = -0.14;
  const AREA_X_MAX = 0.14;
  const AREA_Y_MIN = -0.3;
  const AREA_Y_MAX = 0.15;

  // Adjusted functions
  const minAndMaxX = (x: number, scale: number) => {
    const halfImageWidth = scale / 2;
    const xMin = AREA_X_MIN + halfImageWidth;
    const xMax = AREA_X_MAX - halfImageWidth;

    if (x > xMax) return xMax;
    if (x < xMin) return xMin;
    return x;
  };

  const minAndMaxY = (y: number, scale: number) => {
    const halfImageHeight = scale / 2;
    const yMin = AREA_Y_MIN + halfImageHeight;
    const yMax = AREA_Y_MAX - halfImageHeight;

    if (y > yMax) return yMax;
    if (y < yMin) return yMin;
    return y;
  };

  // @ts-ignore
  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  return (
    <>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        // geometry={nodes.Cloth_mesh_4.geometry}
        material={materials["lambert1"]}
        // material={materials["Knit_Fleece_Terry_FRONT_2650"]}
        position={[0, 0.04, 0]}
        {...props}
        material-aoMapIntensity={1}
        dispose={null}
        scale={1.22}
      >
        {save ? null : (
          <group position={[0, 0, 0.5]}>
            <PivotControls
              scale={0.2}
              activeAxes={[true, true, false]}
              onDrag={(local) => {
                const newposition = new THREE.Vector3();
                const tempScale = new THREE.Vector3();
                const quaternion = new THREE.Quaternion();
                local.decompose(newposition, quaternion, tempScale);
                const rotation = new THREE.Euler().setFromQuaternion(quaternion);

                const currentScale = useProductStore.getState().scale;

                updatePosition({
                  x: minAndMaxX(newposition.x, currentScale),
                  y: minAndMaxY(newposition.y, currentScale),
                  z: newposition.z + 0.1,
                });
                updateAngle(rotation.z);
              }}
            />
          </group>
        )}

        <Decal
          position={[position.x, position.y, position.z]}
          rotation={[0, 0, angle]}
          scale={scale}
          map={useTexture(image)}
        />
      </mesh>
    </>
  );
};
