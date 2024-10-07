import * as THREE from "three"
import { useTexture , useGLTF } from "@react-three/drei"
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import grass from "./assets/grass.jpg"
import makuhariUrl from "./assets/MakuhariMesse.glb"
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export function Ground(props) {
  const makuhariMap = useLoader(GLTFLoader, makuhariUrl)
  return (
    <RigidBody {...props} type="fixed" colliders="trimesh">
      <primitive object={makuhariMap.scene} position={[0, -5, 0]} />
      <CuboidCollider args={[1000, 2, 1000]} position={[0, -20, 0]} />
    </RigidBody>
  )
}
