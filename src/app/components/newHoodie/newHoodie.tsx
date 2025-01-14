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
import { useProductStore } from "@/store/productStore";
import { easing } from "maath";
import { useProduct } from "../shirt/useProduct";
import { getAvailableColors } from "@/common/constants/allColors";
//@ts-nocheck

const DEFAULT_COLORS = getAvailableColors("hoodie");
console.log("DEFAULT_COLORS: ", DEFAULT_COLORS)
// Color sequence for processing
const COLOR_SEQUENCE = Object.entries(DEFAULT_COLORS).map(([key]) => key);
console.log("COLOR_SEQUENCE: ", DEFAULT_COLORS)
type ColorKey = keyof typeof DEFAULT_COLORS;

export const NewHoodie = (props: any) => {
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
        type: "Hoodie",
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
        materials.mat0.color,
        new THREE.Color(colorHex),
        0.2,
        delta
      );
      easing.dampC(
        materials.mat0.color,
        new THREE.Color(colorHex),
        0.2,
        delta
      );
  
      // Check if color transition is complete
      if (
        colorsMatch(materials.mat0.color, colorHex)
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
      processColorStep(saveStep, delta);
    } else{
      // Apply the current color
      easing.dampC(materials.mat0.color, color, 0.2, delta);
    }  
  });

  // @ts-ignore
  const { nodes, materials } = useGLTF("/newhoodie.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.imagetostl_mesh0.geometry}
        material={materials.mat0}
        scale={[0.01, 0.01, 0.01]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -1.2, 0]}
      >
        {save ? null : (
          <group position={[0, 20, -120]} rotation={[0, 0, 0]}>
            <PivotControls
              scale={10}
              activeAxes={[true, false, true]}
              onDrag={(local) => {
                const minAndMaxX = (x: number) => {
                  if (x > 8.237275144301767) return 8.237275144301767;
                  if (x < -9.64203076768904) return -9.64203076768904;
                  return x;
                };

                const minAndMaxY = (y: number) => {
                  if (y > 4.89091315687232) return 4.89091315687232;
                  if (y < -16.820017173725528) return -16.820017173725528;
                  return y;
                };
                const newposition = new THREE.Vector3();
                const scale = new THREE.Vector3();
                const quaternion = new THREE.Quaternion();
                local.decompose(newposition, quaternion, scale);
                const rotation = new THREE.Euler().setFromQuaternion(
                  quaternion
                );
                console.log("new position", newposition);
                updatePosition({
                  x: minAndMaxX(newposition.x),
                  y: minAndMaxY(newposition.z),
                  z: newposition.y,
                });
                updateAngle(rotation.y);
              }}
            />
          </group>
        )}

        <Decal
          position={[position.x, position.z + 9, position.y - 120]}
          rotation={[-Math.PI / 2, 0, angle]}
          scale={scale * 55}
          map={useTexture(image)}
        />
      </mesh>
    </group>
  );
};
