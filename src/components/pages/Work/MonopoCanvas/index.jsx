import { useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { DotScreen, EffectComposer, Vignette, ToneMapping, HueSaturation, Noise, Scanline, LensFlare, Grid, Glitch, BrightnessContrast, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction, GlitchMode } from 'postprocessing'
import BigSphere from './bigsphere'
import SmallSphere from './smallsphere';

import * as THREE from "three";
import './index.scss'

function Effect() {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    const { gl } = useThree();

    const handleMouseMove = (event) => {
        const rect = gl.domElement.getBoundingClientRect();
        setMouse({
            x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
            y: -((event.clientY - rect.top) / rect.height) * 2 + 1,
        });
    };

    useEffect(() => {
        gl.domElement.addEventListener('mousemove', handleMouseMove);
        return () => {
            gl.domElement.removeEventListener('mousemove', handleMouseMove);
        };
    }, [gl.domElement]);

    return (
        <>
            <EffectComposer>
                <HueSaturation
                    blendFunction={BlendFunction.NORMAL}
                    hue={2 * Math.PI * Math.sqrt(Math.pow(mouse.x, 2) + Math.pow(mouse.y, 2))}
                    saturation={0}
                />
                {/* <DotScreen
                    blendFunction={BlendFunction.NORMAL}
                    angle={Math.PI}
                    scale={1}
                /> */}
                {/* <Grid
                    blendFunction={BlendFunction.OVERLAY} // blend mode
                    scale={1} // grid pattern scale
                    lineWidth={2} // grid pattern line width
                    size={[1, 1]} // overrides the default pass width and height
                /> */}
                {/* <Glitch
                    delay={[.5, .5]} // min and max glitch delay
                    duration={[0.5, .5]} // min and max glitch duration
                    strength={[0.3, 1.0]} // min and max glitch strength
                    mode={GlitchMode.SPORADIC} // glitch mode
                    active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
                    ratio={.2} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
                /> */}
                {/* <DepthOfField
                    focusDistance={.5} // where to focus
                    focalLength={.05} // focal length
                    bokehScale={.2} // bokeh size
                /> */}
                {/* <ChromaticAberration
                    blendFunction={BlendFunction.NORMAL} // blend mode
                    offset={[0.01, 0.002]} // color offset
                /> */}
                {/* <BrightnessContrast
                    brightness={0} // brightness. min: -1, max: 1
                    contrast={-.1} // contrast: min -1, max: 1
                /> */}
                {/* <Noise
                    premultiply // enables or disables noise premultiplication
                    blendFunction={BlendFunction.ADD} // blend mode
                // inputColorSpace
                /> */}
                {/* <ToneMapping
                    blendFunction={BlendFunction.NORMAL} // blend mode
                    adaptive={true} // toggle adaptive luminance map usage
                    resolution={256} // texture resolution of the luminance map
                    middleGrey={.6} // middle grey factor
                    maxLuminance={16.0} // maximum luminance
                    averageLuminance={1.0} // average luminance
                    adaptationRate={1.0} // luminance adaptation rate
                /> */}
                {/* <Vignette
                    offset={0.5} // vignette offset
                    darkness={0.5} // vignette darkness
                    eskil={false} // Eskil's vignette technique
                    blendFunction={BlendFunction.NORMAL} // blend mode
                /> */}
            </EffectComposer>
        </>
    )
}


function MonopoCanvas() {

    return (
        <>
            <section className='monopocanvas'>
                <Canvas
                    camera={{ position: [0, 0, 1], fov: 50 }}
                    gl={{
                        powerPreference: "high-performance",
                        alpha: true,
                        antialias: true,
                        stencil: false,
                        // depth: false
                    }}
                >
                    {/* <OrbitControls /> */}
                    {/* <OrthographicCamera
                        makeDefault
                        zoom={1}
                        top={200}
                        bottom={-200}
                        left={200}
                        right={-200}
                        near={1}
                        far={2000}
                        position={[0, 0, 200]}
                    /> */}
                    {/* <pointLight position={[1, 1, 1]} /> */}
                    <BigSphere ></BigSphere>
                    <SmallSphere></SmallSphere>
                    {/* <Effect></Effect> */}
                    {/* <ambientLight></ambientLight> */}
                </Canvas>
            </section>

        </>
    )
}

export default MonopoCanvas


// vec3 baseSecond= vec3(162.0 / 255.0, 201.0 / 255.0, 237.0 / 255.0);
// vec3 accent= vec3(0, 0, 0);
// vec3 baseFirst= vec3(249.0 / 255.0, 122.0 / 255.0, 96.0 / 255.0);
// vec3 baseThird= vec3(235.0 / 255.0, 216.0 / 255.0, 189.0 / 255.0);

// vec2 baseUV = rotate2D(0.4 + n) * vPosition.xy * 0.35;
// float basePattern = lines(baseUV, 0.6);
// float secondPattern = lines(baseUV, 0.1);

// vec3 baseColor = mix(baseSecond, baseFirst, basePattern);
// vec3 secondBaseColor = mix(baseColor, baseThird, n);

// vec3 finalBaseColor = mix(baseColor, secondBaseColor, n);

// gl_FragColor = vec4(vec3(finalBaseColor), 1.0 * opacity);