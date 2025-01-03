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
//@ts-nocheck

const DEFAULT_COLORS = {
  white: "#f0f8ff",
  beige: "#F3E5AB",
  red: "#FF0000",
  blue: "#4169e1",
  black: "#313131",
};

export const Sweatshirt = (props: any) => {
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
  const price = useProductStore((state) => state.price);
  const resetProductColor = useProductStore((state) => state.resetProductColor);
  const saveStep = useProductStore((state) => state.saveStep);
  const updateSaveStep = useProductStore((state) => state.updateSaveStep);

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
    if (
      imagesProduct.white.length > 0 &&
      imagesProduct.beige.length > 0 &&
      imagesProduct.red.length > 0 &&
      imagesProduct.blue.length > 0 &&
      imagesProduct.black.length > 0
    ) {
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
        type: "Sweatshirt",
        tags,
        groupId,
      });
      updateTransitionProduct("saving");

      // Reset imagesProduct
      addImageProduct({
        white: "",
        beige: "",
        red: "",
        blue: "",
        black: "",
      });
    }
  }, [
    imagesProduct.white,
    imagesProduct.beige,
    imagesProduct.red,
    imagesProduct.blue,
    imagesProduct.black,
  ]);

  useFrame((state, delta) => {
    if (save) {
      switch (saveStep) {
        case 0:
          // Reset to white color
          updateColor(DEFAULT_COLORS.white);
          easing.dampC(
            materials.Knit_Cotton_Jersey_FRONT_2709.color,
            new THREE.Color(DEFAULT_COLORS.white),
            0.2,
            delta
          );
          easing.dampC(
            materials.Rib_2X2_468gsm_FRONT_2720.color,
            new THREE.Color(DEFAULT_COLORS.white),
            0.2,
            delta
          );
          if (
            colorsMatch(
              materials.Knit_Cotton_Jersey_FRONT_2709.color,
              DEFAULT_COLORS.white
            ) &&
            colorsMatch(
              materials.Rib_2X2_468gsm_FRONT_2720.color,
              DEFAULT_COLORS.white
            )
          ) {
            updateOpenToast(true);
            updateTransitionProduct("snapshots");
            const base64 = gl.domElement.toDataURL("image/webp");
            addImageProduct({ white: base64 });
            updateSaveStep(1); // Proceed to next step
          }
          break;
        case 1:
          // Change to beige color
          updateColor(DEFAULT_COLORS.beige);
          easing.dampC(
            materials.Knit_Cotton_Jersey_FRONT_2709.color,
            new THREE.Color(DEFAULT_COLORS.beige),
            0.2,
            delta
          );
          easing.dampC(
            materials.Rib_2X2_468gsm_FRONT_2720.color,
            new THREE.Color(DEFAULT_COLORS.beige),
            0.2,
            delta
          );
          if (
            colorsMatch(
              materials.Knit_Cotton_Jersey_FRONT_2709.color,
              DEFAULT_COLORS.beige
            ) &&
            colorsMatch(
              materials.Rib_2X2_468gsm_FRONT_2720.color,
              DEFAULT_COLORS.beige
            )
          ) {
            const base64 = gl.domElement.toDataURL("image/webp");
            addImageProduct({ beige: base64 });
            updateSaveStep(2);
          }
          break;
        case 2:
          // Change to red color
          updateColor(DEFAULT_COLORS.red);
          easing.dampC(
            materials.Knit_Cotton_Jersey_FRONT_2709.color,
            new THREE.Color(DEFAULT_COLORS.red),
            0.2,
            delta
          );
          easing.dampC(
            materials.Rib_2X2_468gsm_FRONT_2720.color,
            new THREE.Color(DEFAULT_COLORS.red),
            0.2,
            delta
          );
          if (
            colorsMatch(
              materials.Knit_Cotton_Jersey_FRONT_2709.color,
              DEFAULT_COLORS.red
            ) &&
            colorsMatch(
              materials.Rib_2X2_468gsm_FRONT_2720.color,
              DEFAULT_COLORS.red
            )
          ) {
            const base64 = gl.domElement.toDataURL("image/webp");
            addImageProduct({ red: base64 });
            updateSaveStep(3);
          }
          break;
        case 3:
          // Change to blue color
          updateColor(DEFAULT_COLORS.blue);
          easing.dampC(
            materials.Knit_Cotton_Jersey_FRONT_2709.color,
            new THREE.Color(DEFAULT_COLORS.blue),
            0.2,
            delta
          );
          easing.dampC(
            materials.Rib_2X2_468gsm_FRONT_2720.color,
            new THREE.Color(DEFAULT_COLORS.blue),
            0.2,
            delta
          );
          if (
            colorsMatch(
              materials.Knit_Cotton_Jersey_FRONT_2709.color,
              DEFAULT_COLORS.blue
            ) &&
            colorsMatch(
              materials.Rib_2X2_468gsm_FRONT_2720.color,
              DEFAULT_COLORS.blue
            )
          ) {
            const base64 = gl.domElement.toDataURL("image/webp");
            addImageProduct({ blue: base64 });
            updateSaveStep(4);
          }
          break;
        case 4:
          // Change to black color
          updateColor(DEFAULT_COLORS.black);
          easing.dampC(
            materials.Knit_Cotton_Jersey_FRONT_2709.color,
            new THREE.Color(DEFAULT_COLORS.black),
            0.2,
            delta
          );
          easing.dampC(
            materials.Rib_2X2_468gsm_FRONT_2720.color,
            new THREE.Color(DEFAULT_COLORS.black),
            0.2,
            delta
          );
          if (
            colorsMatch(
              materials.Knit_Cotton_Jersey_FRONT_2709.color,
              DEFAULT_COLORS.black
            ) &&
            colorsMatch(
              materials.Rib_2X2_468gsm_FRONT_2720.color,
              DEFAULT_COLORS.black
            )
          ) {
            const base64 = gl.domElement.toDataURL("image/webp");
            addImageProduct({ black: base64 });
            updateSaveStep(5);
          }
          break;
        case 5:
          // All steps completed
          updateSave(false);
          updateResetProductColor(true);
          updateSaveStep(0); // Reset for next save
          // Reset to user-selected color
          updateColor(userSelectedColor);
          break;
        default:
          break;
      }
    } else {
      // Apply the user's selected color when not saving
      easing.dampC(
        materials.Knit_Cotton_Jersey_FRONT_2709.color,
        new THREE.Color(color),
        0.2,
        delta
      );
      easing.dampC(
        materials.Rib_2X2_468gsm_FRONT_2720.color,
        new THREE.Color(color),
        0.2,
        delta
      );
    }
  });

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

  // Define the area boundaries
  const AREA_X_MIN = -0.14;
  const AREA_X_MAX = 0.14;
  const AREA_Y_MIN = -0.3;
  const AREA_Y_MAX = 0.12;

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
  const { nodes, materials } = useGLTF("/Crew-neck Sweatshirt v1_0.glb");
  console.log("nodes: ", nodes);
  console.log("material: ", materials);
  console.log("logo ss", image)
  return (
    <group position={[0, -1.3, 0]} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_258637.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_258637_1.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_258637_2.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_258638.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_258638_1.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_258638_2.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_220259.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      >
        {save ? null : (
          <group position={[0, 1.4, 0.1]}>
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
          position={[position.x, position.y + 1.4, position.z - 0.045]}
          rotation={[0, 0, angle]}
          scale={scale}
          map={useTexture(image)}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_220259_1.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_220259_2.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_220260.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_220260_1.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_220260_2.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_264068.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_264068_1.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_264068_2.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_264069.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_264069_1.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_264069_2.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14631.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14631_1.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14631_2.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14632.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14632_1.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14632_2.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14633.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14633_1.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14633_2.geometry}
        material={materials.Rib_2X2_468gsm_FRONT_2720}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14634.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14634_1.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pattern2D_14634_2.geometry}
        material={materials.Knit_Cotton_Jersey_FRONT_2709}
      />
    </group>
  );
};
