import { DoubleSide, Vector4 } from "three";
import vertexColor from "./shader/vertexBig.glsl"
import fragmentShader from './shader/fragmentBig.glsl'

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

function BigSphere() {

    const materialRef = useRef();
    const hover = useRef(false)


    useFrame((state) => {
        const { clock } = state;

        if (materialRef.current) {
            materialRef.current.uniforms.time.value = clock.getElapsedTime();
        }
        // console.log(hover);
        // console.log(materialRef.current.uniforms.progress.value);
    });
    const uniforms = useMemo(() => ({
        intensity: { value: 1, },
        time: { value: 0.0, },
        resolution: { value: new Vector4() },
        progress: { value: 0 },
        opacity: { value: 1 },
    }), []);

    return (
        <>
            <mesh
                onPointerOver={() => hover.current = true}
                onPointerLeave={() => hover.current = false}
            >
                <sphereGeometry args={[1.5, 32, 32]} />
                <shaderMaterial
                    ref={materialRef}
                    extensions={{
                        derivatives: "#extension GL_OES_standard_derivatives : enable"
                    }}
                    // wireframe={true}
                    transparent={true}

                    side={DoubleSide}
                    vertexShader={vertexColor}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                />
            </mesh>
        </>
    )
}

export default BigSphere;