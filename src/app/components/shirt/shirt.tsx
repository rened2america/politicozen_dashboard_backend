"use client";

import * as THREE from "three";
import { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  OrbitControls,
  PivotControls,
  AccumulativeShadows,
  RandomizedLight,
  Decal,
} from "@react-three/drei";
import { useControls, button } from "leva";
import { useProduct } from "./useProduct";
import AWS from "aws-sdk";
import { useProductStore } from "@/store/productStore";

export const Cup = (props: any) => {
  const gl = useThree((state) => state.gl);
  const [pos, setXYZ] = useState([0, 0, 0.1]);
  const [rot, setRot] = useState([0, 0, 0]);
  const position = useProductStore((state) => {
    return { x: state.x, y: state.y, z: state.z };
  });
  const angle = useProductStore((state) => state.angle);
  const updatePosition = useProductStore((state) => state.updatePosition);
  const updateAngle = useProductStore((state) => state.updateAngle);
  const image = useProductStore((state) => state.imgLogo);

  console.log("position:", position);
  const { mutate: createProduct } = useProduct();
  // @ts-ignore
  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  // const { debug, scale, name } = useControls({
  //   debug: false,
  //   name: {
  //     value: "",
  //   },
  //   image: { image: "/1200px-Starbucks_Logo_ab_2011.svg.png" },
  //   scale: { value: 0.2, min: 0.12, max: 0.4 },
  //   save: button(async () => {
  //     const link = document.createElement("a");
  //     link.setAttribute("download", "canvas.png");
  //     console.log("Nombre", name);
  //     console.log(image);
  //     const imgLogo = await blobUrlToBase64(image);
  //     console.log(imgLogo);
  //     //@ts-ignore
  //     // createProduct({
  //     //   name,
  //     //   imgProduct: gl.domElement.toDataURL("image/png"),
  //     //   imgLogo: imgLogo,
  //     // });
  //   }),
  // });
  console.log(image);

  // Ejemplo de uso
  console.log(rot);
  return (
    <>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials["lambert1"]}
        {...props}
        material-aoMapIntensity={1}
        dispose={null}
      >
        <group position={[0, 0, 0.5]}>
          <PivotControls
            scale={0.55}
            activeAxes={[true, true, false]}
            onDrag={(local) => {
              const minAndMaxX = (x: number) => {
                if (x > 0.1123051291365908) return 0.08958316665788457;
                if (x < -0.0955177962853023) return -0.0955177962853023;
                return x;
              };

              const minAndMaxY = (y: number) => {
                if (y > 0.12393409500680214) return 0.12393409500680214;
                if (y < -0.2649047726189107) return -0.2649047726189107;
                return y;
              };
              const newposition = new THREE.Vector3();
              const scale = new THREE.Vector3();
              const quaternion = new THREE.Quaternion();
              local.decompose(newposition, quaternion, scale);
              const rotation = new THREE.Euler().setFromQuaternion(quaternion);

              updatePosition({
                x: minAndMaxX(newposition.x),
                y: minAndMaxY(newposition.y),
                z: newposition.z + 0.1,
              });
              updateAngle(rotation.z);
            }}
          />
        </group>

        <Decal
          position={[position.x, position.y, position.z]}
          rotation={[0, 0, angle]}
          scale={0.15}
          map={useTexture(image)}
        />
      </mesh>
    </>
  );
};
