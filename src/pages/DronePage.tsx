import { useEffect, type CSSProperties } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAmir } from '../components/AmirGuide'
import { IconCheck, IconClock, IconPlay } from '../components/Icons'
import { Page, ease, rise, stagger } from '../components/Motion'
import { drones, formatTime, getDrone, iso, taskKey, videoList } from '../data/drones'
import { useProgress } from '../lib/progress'

export default function DronePage() {
  const { droneId } = useParams()
  const drone = getDrone(droneId)
  const done = useProgress()
  const { say } = useAmir()

  const count = drone ? drone.tasks.filter((t) => done.includes(taskKey(drone.id, t.id))).length : 0

  useEffect(() => {
    if (!drone) return
    if (count === drone.tasks.length) say(`סיימתם את כל הפירוקים של ${iso(drone.name)}. אלופים! 🏆`, 'cheer')
    else if (count > 0) say('ממשיכים מאיפה שעצרנו? הפירוקים שסיימתם מסומנים ב-✓.', 'happy')
    else say(`ברוכים הבאים ל-${iso(drone.name)}! מומלץ להתחיל מהפירוק הראשון.`, 'wave')
  }, [drone?.id])

  if (!drone) return <Navigate to="/" replace />

  return (
    <Page>
      <div className="container" style={{ '--accent': drone.accent, '--accent-soft': drone.accentSoft } as CSSProperties}>
        <Link to="/#drones" className="back">כל הרחפנים</Link>

        <section className="drone-hero">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6, ease }}>
            {drone.name}
          </motion.h1>
          <motion.div
            className="drone-hero-img"
            initial={{ opacity: 0, scale: 1.08, clipPath: 'inset(0 0 0 30% round 28px)' }}
            animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0 0% round 28px)' }}
            transition={{ duration: 1, ease }}
          >
            <img src={drone.photo} alt={drone.name} />
          </motion.div>
        </section>

        <section className="section tight">
          <div className="section-head start">
            <h2>הפירוקים של {drone.name}</h2>
            <p>לחצו על פירוק כדי לצפות בסרטון ובשלבי העבודה.</p>
          </div>

          <motion.ol className="task-list" variants={stagger} initial="hidden" animate="show">
            {drone.tasks.map((t, i) => {
              const isDone = done.includes(taskKey(drone.id, t.id))
              return (
                <motion.li key={t.id} variants={rise}>
                  <Link to={`/drone/${drone.id}/${t.id}`} className={`task-row ${isDone ? 'is-done' : ''}`}>
                    <span className="task-num">{isDone ? <IconCheck size={18} /> : i + 1}</span>
                    <div className="task-row-main">
                      <h3>{t.title}</h3>
                      <p className="muted">{t.summary}</p>
                    </div>
                    <div className="task-row-meta">
                      <span className={`level level-${t.difficulty}`}>{t.difficulty}</span>
                      <span className="meta"><IconClock size={15} /> {formatTime(t.minutes, true)}</span>
                      <span className={`meta ${t.video ? '' : 'soon'}`}><IconPlay size={12} /> {t.video ? (videoList(t.video).length > 1 ? `${videoList(t.video).length} סרטונים` : 'סרטון') : 'בקרוב'}</span>
                    </div>
                  </Link>
                </motion.li>
              )
            })}
          </motion.ol>
        </section>

        <section className="section tight">
          <h3 className="other-title">רחפנים נוספים</h3>
          <div className="other-drones">
            {drones.filter((d) => d.id !== drone.id).map((d) => (
              <Link key={d.id} to={`/drone/${d.id}`} className="other-drone">
                <img src={d.photo} alt="" />
                <span>{d.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Page>
  )
}
