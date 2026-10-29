import { useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AmirProvider } from './components/AmirGuide'
import { IconDrone } from './components/Icons'
import { totalTasks } from './data/drones'
import { useProgress } from './lib/progress'
import Home from './pages/Home'
import DronePage from './pages/DronePage'
import TaskPage from './pages/TaskPage'
import Credits from './pages/Credits'

function Header() {
  const done = useProgress()
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <span className="logo-mark"><IconDrone size={22} /></span>
          <span>
            <b>סדנת הרחפנים</b>
            <small>פירוק והרכבה</small>
          </span>
        </Link>
        <nav className="nav">
          <Link to="/#drones">רחפנים</Link>
          <Link to="/#how">איך זה עובד</Link>
        </nav>
        <div className="progress-pill" title="פירוקים שהושלמו">
          <span className="progress-pill-bar">
            <motion.i animate={{ width: `${(done.length / totalTasks) * 100}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
          </span>
          <b>{done.length}/{totalTasks}</b>
        </div>
      </div>
    </header>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.pathname, location.hash])

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/drone/:droneId" element={<DronePage />} />
        <Route path="/drone/:droneId/:taskId" element={<TaskPage />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AmirProvider>
        <Header />
        <AnimatedRoutes />
        <footer className="footer">
          <div className="container footer-inner">
            <span>סדנת הרחפנים · חומר לימוד פנימי. בכל מקרה של ספק — עובדים לפי הוראות היצרן.</span>
            <Link to="/credits">קרדיט לתמונות</Link>
          </div>
        </footer>
      </AmirProvider>
    </BrowserRouter>
  )
}
