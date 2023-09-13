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

export const Cup = (props: any) => {
  const gl = useThree((state) => state.gl);
  const [pos, setXYZ] = useState([0, 0, 0.1]);
  const [rot, setRot] = useState([0, 0, 0]);
  const { mutate: createProduct } = useProduct();
  // @ts-ignore
  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  const { debug, image, scale, name } = useControls({
    debug: false,
    name: {
      value: "Hola",
    },
    image: { image: "/1200px-Starbucks_Logo_ab_2011.svg.png" },
    scale: { value: 0.2, min: 0.12, max: 0.4 },
    save: button(async () => {
      const link = document.createElement("a");
      link.setAttribute("download", "canvas.png");
      console.log("Nombre", name);
      const imgLogo = await blobUrlToBase64(image);
      //@ts-ignore
      createProduct({
        name,
        imgProduct: gl.domElement.toDataURL("image/png"),
        imgLogo: imgLogo,
      });
    }),
  });

  function blobUrlToBase64(blobUrl: any) {
    return new Promise((resolve, reject) => {
      // Realiza una solicitud para obtener el Blob
      fetch(blobUrl)
        .then((response) => response.blob())
        .then((blob) => {
          // Convierte el Blob en un ArrayBuffer
          console.log(blob);
          var reader = new FileReader();
          reader.readAsArrayBuffer(blob);
          reader.onload = function () {
            // Convierte el ArrayBuffer en una cadena base64
            var base64data = arrayBufferToBase64(reader.result);
            resolve(base64data);
          };
          reader.onerror = function () {
            reject(new Error("Error al leer el Blob como ArrayBuffer"));
          };
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // Función para convertir un ArrayBuffer en una cadena base64
  function arrayBufferToBase64(buffer: any) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    for (var i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  // Ejemplo de uso

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
              const position = new THREE.Vector3();
              const scale = new THREE.Vector3();
              const quaternion = new THREE.Quaternion();
              local.decompose(position, quaternion, scale);
              const rotation = new THREE.Euler().setFromQuaternion(quaternion);

              setXYZ([
                minAndMaxX(position.x),
                minAndMaxY(position.y),
                position.z + 0.1,
              ]);
              setRot([rotation.x, rotation.y, rotation.z]);
            }}
          />
        </group>

        <Decal
          debug={debug}
          position={pos}
          rotation={rot}
          scale={0.6 * scale}
          map={useTexture(image)}
        />
      </mesh>
    </>
  );
};
