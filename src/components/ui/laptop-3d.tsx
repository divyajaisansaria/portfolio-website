"use client"

import * as THREE from "three"
import React, { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { 
  ContactShadows, 
  Environment, 
  Float, 
  PresentationControls,
  Html
} from "@react-three/drei"

// Silence THREE.Clock deprecation warning from library internals
if (typeof window !== "undefined") {
  const warn = console.warn;
  console.warn = (...args) => {
    if (args[0]?.includes?.("THREE.Clock")) return;
    warn(...args);
  };
}

function ProceduralLaptop({ open }: { open: boolean }) {
  const group = useRef<THREE.Group>(null!)
  const lid = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    // Use performance.now() to avoid THREE.Clock deprecation warnings and R3F state issues
    // performance.now() returns milliseconds, we convert to seconds for animation timing
    const t = performance.now() / 1000
    
    if (lid.current) {
      // Opening animation for the lid
      const targetRotation = open ? -0.2 : -Math.PI / 2 - 0.5
      lid.current.rotation.x = THREE.MathUtils.lerp(lid.current.rotation.x, targetRotation, 0.1)
    }
    
    if (group.current) {
      // Floating animation
      group.current.position.y = Math.sin(t) * 0.1
    }
  })

  return (
    <group ref={group} dispose={null}>
      {/* Base of the laptop */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[4, 0.15, 3]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Trackpad area detail */}
      <mesh position={[0, 0, 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1, 0.6]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Keyboard area detail */}
      <mesh position={[0, 0, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.4, 1.4]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Hinge and Lid */}
      <group ref={lid} position={[0, 0, -1.5]}>
        {/* Lid Body */}
        <mesh position={[0, 1.5, -0.05]}>
          <boxGeometry args={[4, 3, 0.1]} />
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Screen */}
        <mesh position={[0, 1.5, 0.01]}>
          <planeGeometry args={[3.8, 2.8]} />
          <meshStandardMaterial color="#000" metalness={0} roughness={1} />
          <Html
            transform
            occlude
            className="w-[380px] h-[280px] bg-black overflow-hidden pointer-events-none rounded-lg"
            distanceFactor={3}
            position={[0, 0, 0.01]}
          >
            <div className="w-full h-full bg-linear-to-br from-indigo-900 via-purple-900 to-black flex flex-col items-center justify-center p-8 text-white text-center">
               <div className="relative w-full h-full flex flex-col items-center justify-center border border-white/10 rounded-xl bg-black/40 backdrop-blur-3xl overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-primary animate-gradient-x" />
                  <div className="text-3xl font-black mb-4 tracking-tighter">PROJECT_ALPHA</div>
                  <div className="text-xs opacity-50 uppercase tracking-[0.2em] mb-8">System Deployment Initialized</div>
                  
                  <div className="grid grid-cols-3 gap-4 w-full px-8">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-16 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <div className="w-8 h-1 bg-white/20 rounded-full" />
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Live Terminal Connected</span>
                  </div>
               </div>
            </div>
          </Html>
        </mesh>
      </group>
    </group>
  )
}

export function Laptop3D({ isOpen = true }: { isOpen?: boolean }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="w-full h-[500px] bg-muted/10 animate-pulse rounded-3xl" />

  return (
    <div className="w-full h-[500px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 3, 10], fov: 35 }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        
        <Suspense fallback={null}>
          <PresentationControls
            global
            snap
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
              <ProceduralLaptop open={isOpen} />
            </Float>
          </PresentationControls>
        </Suspense>
        <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
        
        {/* Enhanced local lighting to replace external Environment HDR */}
        <mesh scale={20}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial side={THREE.BackSide} color="#050505" />
        </mesh>
      </Canvas>
    </div>
  )
}
