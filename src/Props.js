import * as THREE from "three"
import { useTexture , useGLTF } from "@react-three/drei"
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import grass from "./assets/grass.jpg"
import washerLUrl from "./assets/WashersL.glb"
import washerRUrl from "./assets/WashersR.glb"
import fridgeLUrl from "./assets/FridgesL.glb"
import fridgeRUrl from "./assets/FridgesR.glb"

import washerCollideLUrl from "./assets/WasherCollideL.glb"
import washerCollideRUrl from "./assets/WasherCollideR.glb"
import fridgeCollideLUrl from "./assets/FridgeCollideL.glb"
import fridgeCollideRUrl from "./assets/FridgeCollideR.glb"

import TVUrl from "./assets/TVs.glb"
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export function Props({setPointerText}) {

  const washerLMesh = useLoader(GLTFLoader, washerLUrl)
  const washerRMesh = useLoader(GLTFLoader, washerRUrl)
  
  const fridgeLMesh = useLoader(GLTFLoader, fridgeLUrl)
  const fridgeRMesh = useLoader(GLTFLoader, fridgeRUrl)
  
  const washerCollideLMesh = useLoader(GLTFLoader, washerCollideLUrl)
  const washerCollideRMesh = useLoader(GLTFLoader, washerCollideRUrl)
  
  const fridgeCollideLMesh = useLoader(GLTFLoader, fridgeCollideLUrl)
  const fridgeCollideRMesh = useLoader(GLTFLoader, fridgeCollideRUrl)
  
  const TVMesh = useLoader(GLTFLoader, TVUrl)

  const hoverEvent = (event , item) => {
    if(event.distance > 12)
    {
      setPointerText("")
      return
    }
    setPointerText(`Add ${item} to Cart`)
    console.log(event, item)
  }

  const clearHover = () => {
    setPointerText("")
  }

  return (
    <RigidBody type="fixed" colliders="hull">

      <primitive object={washerLMesh.scene} position={[0, -5, 0]} />
      <primitive object={washerRMesh.scene} position={[0, -5, 0]} />
      <primitive object={fridgeLMesh.scene} position={[0, -5, 0]} />
      <primitive object={fridgeRMesh.scene} position={[0, -5, 0]} />

      <primitive onPointerLeave={clearHover} onPointerMove={ (e) => { hoverEvent(e,"TV") } } object={TVMesh.scene} position={[0, -5, 0]} />

      <primitive onPointerLeave={clearHover} onPointerMove={ (e) => { hoverEvent(e,"Washer") } } object={washerCollideLMesh.scene} position={[0, -5, 0]} />
      <primitive onPointerLeave={clearHover} onPointerMove={ (e) => { hoverEvent(e,"Washer")} } object={washerCollideRMesh.scene} position={[0, -5, 0]} />
      <primitive onPointerLeave={clearHover} onPointerMove={ (e) => { hoverEvent(e,"Fridge") } } object={fridgeCollideLMesh.scene} position={[0, -5, 0]} />
      <primitive onPointerLeave={clearHover} onPointerMove={ (e) => { hoverEvent(e,"Fridge") } } object={fridgeCollideRMesh.scene} position={[0, -5, 0]} />

    </RigidBody>
  )
}
