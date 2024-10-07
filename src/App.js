import { Canvas } from "@react-three/fiber"
import { Sky, PointerLockControls, KeyboardControls } from "@react-three/drei"
import { Physics } from "@react-three/rapier"
import { Ground } from "./Ground"
import { Player } from "./Player"
import { Cube, Cubes } from "./Cube"
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import { Props } from "./Props"

// The original was made by Maksim Ivanow: https://www.youtube.com/watch?v=Lc2JvBXMesY&t=124s
// This demo needs pointer-lock, that works only if you open it in a new window
// Controls: WASD + left click

export default function App({gameState, setPointerText}) {
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "w", "W"] },
        { name: "backward", keys: ["ArrowDown", "s", "S"] },
        { name: "left", keys: ["ArrowLeft", "a", "A"] },
        { name: "right", keys: ["ArrowRight", "d", "D"] },
        { name: "jump", keys: ["Space"] },
        { name: "sprint", keys: ["Shift"] },
      ]}>
      <Canvas shadows camera={{ fov: 70 , far : 39000 }}>
        <Sky castShadow sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.7} />
        {/* <pointLight castShadow intensity={0.8} position={[100, 100, 100]} /> */}
        <Physics gravity={[0, -30, 0]}>
          <Ground />
          <Props setPointerText={setPointerText}/>
          <Player gameState={gameState}/>
          <Cube position={[0, 0.5, -10]} />
          <Cubes />
        </Physics>
        <PointerLockControls/>
      </Canvas>
    </KeyboardControls>
  )
}
