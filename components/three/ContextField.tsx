"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Points, PointMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
function Field(){const g=useRef<THREE.Group>(null);useFrame(({clock})=>{if(g.current){g.current.rotation.z=clock.getElapsedTime()*.035;g.current.rotation.y=Math.sin(clock.getElapsedTime()*.15)*.12}});const pts=new Float32Array([-2,1,0,-.8,1.5,-.3,1.7,.4,.2,.2,-1.45,-.1,1.25,-1.2,.4,-1.8,-.4,0]);return <group ref={g}><Points positions={pts} stride={3}><PointMaterial transparent color="#a5884e" size={.06} sizeAttenuation depthWrite={false} opacity={.65}/></Points><Line points={[[-2,1,0],[-.8,1.5,-.3],[.2,-1.45,-.1],[1.7,.4,.2]]} color="#a5884e" transparent opacity={.34} lineWidth={1}/></group>}
export function ContextField(){return <div className="context-field" aria-hidden="true"><Canvas camera={{position:[0,0,5],fov:45}} dpr={[1,1.5]}><Field/></Canvas></div>}
