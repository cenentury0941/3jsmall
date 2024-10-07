import { useDebugValue, useEffect, useState } from "react"
import { createRoot } from "react-dom/client"
import { Footer } from "@pmndrs/branding"
import "./styles.css"
import App from "./App"
import { useProgress } from "@react-three/drei"
import audio from './assets/music.mp3';
import PointerText from "./PointerText"
import Cart from "./Cart"
import Timer from "./Timer"

function Overlay() {
  const [ready, set] = useState(false)
  const [gameState, updateGameState] = useState("IDLE")
  const loaded = useProgress(( (state) => state.progress ))
  const [ pointerText, setPointerText ] = useState("")
  const [ startTime , setStartTime ] = useState(null)
  const [ runningTime , setRunningTime ] = useState(null) 
  const targetCart = [ "TV" , "Fridge" ]
  const currentCart = useState([])
  
  const updateClock = (curTime) => {
    if(startTime == null)
    {
      return
    }
    if(curTime >= 168000+startTime)
    {
      setRunningTime(168000)
      return
    }
    setRunningTime( curTime - startTime )
  }

  useEffect( () => {
    if(startTime == null)
    {
      return
    }
    const interval = setInterval(() => updateClock(Date.now()), 100);
    return () => clearInterval(interval);
  } , [startTime] )

  useEffect( () => {
    console.log(gameState)
    if( gameState.includes("ENDED") )
    {
      setTimeout( () => {
        window.location.reload()
        updateGameState("IDLE")
      } , 12000 )
    }
  } , [gameState] )

  var onStart = () => {
    if(loaded != 100 || ready)
    {
      return
    }
    new Audio(audio).play();

    setTimeout( () => {
        updateGameState( gameState => gameState.includes("PLAYING") ? "ENDED_TIMEOUT" : gameState)
    } , 188500 )

    setTimeout( () => {
      console.log("Starting Speedrun..." , gameState)
      updateGameState( gameState => gameState.includes("STARTING_SPEEDRUN") ? "PLAYING_SPEEDRUN_COLLECT" : gameState)
      setStartTime(Date.now())
    } , 20500 )

    updateGameState("STARTING_SPEEDRUN")
    set(true)
  }

  return (
    <>
      <App gameState={gameState} setPointerText={setPointerText}/>
      <PointerText text={pointerText}/>
      <Cart gameState={gameState} targetCart={targetCart} currentCart={currentCart}/>
      <Timer curTime={runningTime}/>
      <div className="dot" />
      <div className={`fullscreen bg ${(loaded == 100) ? "ready" : "notready"} ${ready && "clicked"}`}>
        <div className="stack">
          <button onClick={onStart}>{ (loaded == 100) ? "Start" : "Loading" }</button>
        </div>
      </div>
    </>
  )
}

createRoot(document.getElementById("root")).render(<Overlay />)
