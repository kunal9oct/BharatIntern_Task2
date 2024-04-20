import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

import CanvasLoader from "./CanvasLoader";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");
  let scale = 2.5;

  function handleScale() {
    if(window.innerWidth < 1000) {
      scale = 2.1;
    }
  }

  handleScale();

  return (
    <primitive object={earth.scene} scale={scale} position-y={0} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        <Earth />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
