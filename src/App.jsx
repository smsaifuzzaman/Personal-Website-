import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import menuVideo from './assets/Mainn.mp4'
import bgmTrack from './assets/bgm.mp3'
import P3Menu from './P3Menu'
import PageTransition from './PageTransition'
import './App.css'

const AboutMe = lazy(() => import('./AboutMe'))
const ResumePage = lazy(() => import('./ResumePage'))
const Socials = lazy(() => import('./Socials'))

function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline preload="metadata" />
      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}

function LazyPage({ children }) {
  return <Suspense fallback={null}>{children}</Suspense>
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
          <PageTransition variant="about"><LazyPage><AboutMe /></LazyPage></PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition variant="resume"><LazyPage><ResumePage /></LazyPage></PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition variant="socials"><LazyPage><Socials /></LazyPage></PageTransition>
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
      <audio ref={audioRef} src={bgmTrack} loop preload="none" />
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
      <Analytics />
    </>
  )
}
