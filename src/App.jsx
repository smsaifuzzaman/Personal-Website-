import { useCallback, useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import menuVideo from './assets/Mainn.mp4'
import main1 from './assets/main1.mp4'
import main2 from './assets/main2.mp4'
import main3 from './assets/main3.mp4'
import bgmTrack from './assets/bgm.mp3'
import P3Menu from './P3Menu'
import VideoPage from './VideoPage'
import ResumePage from './ResumePage'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import './App.css'

function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline />
      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition><ResumePage src={main2} /></PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const audioRef = useRef(null)
  const [isMuted, setIsMuted] = useState(false)

  const attemptPlay = useCallback(async () => {
    const audioEl = audioRef.current
    if (!audioEl) return false
    try {
      await audioEl.play()
      return true
    } catch {
      return false
    }
  }, [])

  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl) return
    audioEl.volume = 0.38
    audioEl.muted = isMuted
  }, [isMuted])

  useEffect(() => {
    let listenersActive = true

    const removeUnlockListeners = () => {
      if (!listenersActive) return
      listenersActive = false
      window.removeEventListener('pointerdown', onFirstInteraction)
      window.removeEventListener('keydown', onFirstInteraction)
    }

    const tryStartAudio = async () => {
      const started = await attemptPlay()
      if (started) removeUnlockListeners()
    }

    const onFirstInteraction = () => {
      void tryStartAudio()
    }

    window.addEventListener('pointerdown', onFirstInteraction)
    window.addEventListener('keydown', onFirstInteraction)
    void tryStartAudio()

    return () => {
      removeUnlockListeners()
    }
  }, [attemptPlay])

  const onToggleMute = () => {
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    if (!nextMuted) {
      void attemptPlay()
    }
  }

  return (
    <>
      <audio ref={audioRef} src={bgmTrack} loop preload="auto" />
      <button
        type="button"
        className={`bgm-toggle ${isMuted ? 'is-muted' : 'is-live'}`}
        onClick={onToggleMute}
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      >
        <span className="bgm-toggle-kicker">BGM</span>
        <span className="bgm-toggle-state">{isMuted ? 'OFF' : 'ON'}</span>
      </button>
      <AnimatedRoutes />
    </>
  )
}
