"use client";
import { Cup } from "@/app/components/shirt/shirt";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  Center,
  useGLTF,
  useTexture,
  Decal,
} from "@react-three/drei";
import { useRef } from "react";
import { easing } from "maath";

export default function New() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "300px 1fr",
        height: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "black",
        }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, 2.5], fov: 25 }}
          gl={{ preserveDrawingBuffer: true }}
          eventPrefix="client"
        >
          <ambientLight intensity={0.5} />
          <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
          <CameraRig>
            <Backdrop />
            <Center>
              <Shirt />
            </Center>
          </CameraRig>
        </Canvas>
      </div>
      <div>
        <Canvas
          gl={{ preserveDrawingBuffer: true }}
          shadows
          orthographic
          camera={{ position: [0, 0, 2.5], fov: 25, zoom: 300 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.5} position={[10, 10, 10]} />
          <Cup scale={2} position={[0, 0, 0]} />
          <AccumulativeShadows
            temporal
            frames={100}
            alphaTest={0.95}
            opacity={1}
            scale={25}
            position={[0, -1, 0]}
          >
            <RandomizedLight
              amount={8}
              radius={10}
              ambient={0.7}
              intensity={1}
              position={[10, 10, -5]}
              bias={0.01}
              size={10}
            />
          </AccumulativeShadows>
          <OrbitControls makeDefault />
        </Canvas>
      </div>
    </div>
  );
}

function Backdrop() {
  const shadows = useRef();
  useFrame((state, delta) => {
    easing.dampC(
      shadows.current.getMesh().material.color,
      "#80C670",
      0.25,
      delta
    );
  });
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
}

function CameraRig({ children }) {
  const group = useRef();
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 0, 2], 0.25, delta);
  });
  return <group ref={group}>{children}</group>;
}

function Shirt(props) {
  const texture = useTexture(`/1200px-Starbucks_Logo_ab_2011.svg.png`);
  // @ts-ignore
  const { nodes, materials } = useGLTF("/shirt_baked.glb");
  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, "#80C670", 0.25, delta)
  );
  return (
    <mesh
      castShadow
      geometry={nodes.T_Shirt_male.geometry}
      material={materials.lambert1}
      material-roughness={1}
      {...props}
      dispose={null}
      scale={0.5}
    >
      <Decal
        position={[0, 0.04, 0.15]}
        rotation={[0, 0, 0]}
        scale={0.15}
        map={texture}
      />
    </mesh>
  );
}
