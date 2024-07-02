import vertexColor from "./shader/vertexBig.glsl"
import fragmentShader from './shader/fragmentBig.glsl'

import { MathUtils } from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";



function SmallSphere() {
    const materialRef = useRef();
    const meshRef = useRef();
    const hover = useRef(false);


    useFrame((state) => {
        const { clock } = state;
        if (materialRef.current) {
            materialRef.current.uniforms.time.value = .6 * clock.getElapsedTime();

            // meshRef.current.material.uniforms.intensity.value = MathUtils.lerp(
            //     meshRef.current.material.uniforms.intensity.value,
            //     hover.current ? 0.85 : 0.15,
            //     0.02
            // );
        }
    });
    const uniforms = useMemo(() => ({
        intensity: { value: 2 },
        time: { value: 0.0 },
        tCube: { value: 0.0 },
        opacity: { value: 0.6 },
    }), []);

    return (
        <>
            <mesh
                ref={meshRef}
                scale={2}
                position={[0.267, .15, 0]}
                onPointerOver={() => hover.current = true}
                onPointerOut={() => hover.current = false}
            >
                <sphereGeometry args={[.2, 32, 32]} />
                <shaderMaterial
                    ref={materialRef}
                    fragmentShader={fragmentShader}
                    vertexShader={vertexColor}
                    uniforms={uniforms}
                    wireframe={false}
                    transparent={true}
                    thickness={1}
                />
            </mesh>
        </>
    )
}

export default SmallSphere;
