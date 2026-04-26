import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";

export default function ThreeDImage() {
  const texture = useTexture("/images/my-photo2.png");

  return (
    <div className="w-full h-full">
      <Canvas className="w-full h-full" camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={1.5} />
        <directionalLight intensity={0.7} position={[2, 2, 5]} />

        <Suspense fallback={null}>
          <Float speed={0.6} rotationIntensity={0.18} floatIntensity={0.15}>
            <mesh>
              <planeGeometry args={[3.2, 4.3]} />
              <meshStandardMaterial map={texture} side={2} />
            </mesh>
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
