import * as THREE from "three"
import * as RAPIER from "@dimforge/rapier3d-compat"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier"
import Axe from "./Axe"

var SPEED = 20
var jump_timeout = 0
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const rotation = new THREE.Vector3()

export function Player({ lerp = THREE.MathUtils.lerp, gameState }) {
  const axe = useRef()
  const ref = useRef()
  const rapier = useRapier()
  const [, get] = useKeyboardControls()
  useFrame((state) => {
    const { forward, backward, left, right, jump, sprint } = get()
    const velocity = ref.current.linvel()
    // update camera
    state.camera.position.set(...ref.current.translation())
    // update axe
    //axe.current.children[0].rotation.x = lerp(axe.current.children[0].rotation.x, Math.sin((velocity.length() > 1) * state.clock.elapsedTime * 10) / 6, 0.1)
    //axe.current.rotation.copy(state.camera.rotation)
    //axe.current.position.copy(state.camera.position).add(state.camera.getWorldDirection(rotation).multiplyScalar(1))
    // movement
    frontVector.set(0, 0, backward - forward)
    sideVector.set(left - right, 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(state.camera.rotation)
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })
    // jumping
    const world = rapier.world.raw()
    const ray = world.castRay(new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 }))
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 5
    SPEED = gameState.includes("PLAYING") ? (sprint ? 39 : 20) : 50
    if (jump && (jump_timeout == 0)) { 
      ref.current.setLinvel({ x: 0, y: 15, z: 0 }) 
      jump_timeout = 50
    }
    if(jump_timeout > 0)
    {
      jump_timeout -= 1
    }
  })
  return (
    <>
      <RigidBody ref={ref} colliders={false} mass={1} type="dynamic" position={[0, 20, 0]} enabledRotations={[false, false, false]}>
        <CapsuleCollider args={[5, 0.5]} />
      </RigidBody>
      {/* <group ref={axe} onPointerMissed={(e) => (axe.current.children[0].rotation.x = -0.5)}> */}
        {/* <Axe position={[0.3, -0.35, 0.5]} /> */}
      {/* </group> */}
    </>
  )
}
