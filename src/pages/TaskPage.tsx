import { useEffect, useState, type CSSProperties } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Amir from '../components/Amir'
import { useAmir } from '../components/AmirGuide'
import { IconArrow, IconBack, IconBolt, IconCheck, IconClock, IconPlay, IconTool } from '../components/Icons'
import { Page, ease, rise, stagger } from '../components/Motion'
import { getDrone, iso, taskKey } from '../data/drones'
import { toggleDone, useProgress } from '../lib/progress'

function Video({ src, poster }: { src?: string; poster: string }) {
  if (src && /youtu\.?be/.test(src)) {
    const id = src.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/)?.[1]
    return <iframe className="video-frame" src={`https://www.youtube.com/embed/${id}?rel=0`} title="סרטון הדרכה" allowFullScreen />
  }
  if (src) return <video className="video-frame" src={src} poster={poster} controls playsInline />
  return (
    <div className="video-placeholder">
      <img src={poster} alt="" aria-hidden />
      <div className="video-placeholder-inner">
        <motion.span className="play" animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2.2 }}>
          <IconPlay size={30} />
        </motion.span>
        <b>הסרטון בעריכה</b>
        <span>יעלה לכאן בקרוב. בינתיים — עברו על שלבי העבודה למטה.</span>
      </div>
    </div>
  )
}

const COLORS = ['#2F6BFF', '#FFC23C', '#FF6B8A', '#22C55E', '#7C5CFF']

function Confetti() {
  return (
    <div className="confetti" aria-hidden>
      {Array.from({ length: 36 }, (_, i) => {
        const angle = (i / 36) * Math.PI * 2
        const dist = 120 + Math.random() * 160
        return (
          <motion.i
            key={i}
            style={{ background: COLORS[i % COLORS.length] }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
            animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist + 80, opacity: 0, rotate: Math.random() * 540, scale: 0.6 }}
            transition={{ duration: 1.4 + Math.random() * 0.6, ease: [0.15, 0.8, 0.3, 1] }}
          />
        )
      })}
    </div>
  )
}

export default function TaskPage() {
  const { droneId, taskId } = useParams()
  const drone = getDrone(droneId)
  const index = drone?.tasks.findIndex((t) => t.id === taskId) ?? -1
  const task = drone?.tasks[index]
  const done = useProgress()
  const { say } = useAmir()
  const [checked, setChecked] = useState<number[]>([])
  const [party, setParty] = useState(0)

  useEffect(() => {
    if (!task) return
    setChecked([])
    say(task.tip ?? `ב"${task.title}" יש ${task.steps.length} שלבים. צפו בסרטון ואז בצעו אחד-אחד.`, task.tip ? 'point' : 'happy')
  }, [task, say])

  const stepCount = task?.steps.length ?? 0
  const alreadyDone = !!drone && !!task && done.includes(taskKey(drone.id, task.id))
  useEffect(() => {
    if (stepCount && checked.length === stepCount && !alreadyDone) say('כל השלבים מסומנים! לחצו על "סיימתי" כדי לשמור.', 'point')
  }, [checked.length, stepCount, alreadyDone, say])

  if (!drone || !task) return <Navigate to={drone ? `/drone/${drone.id}` : '/'} replace />

  const key = taskKey(drone.id, task.id)
  const isDone = done.includes(key)
  const prev = drone.tasks[index - 1]
  const next = drone.tasks[index + 1]
  const allChecked = checked.length === task.steps.length

  const toggleStep = (i: number) => {
    setChecked((prev) => (prev.includes(i) ? prev.filter((n) => n !== i) : [...prev, i]))
  }

  const complete = () => {
    if (isDone) {
      toggleDone(key, false)
      return
    }
    toggleDone(key, true)
    setParty((n) => n + 1)
    say(next ? `כל הכבוד! ${task.title} — בוצע. הבא בתור: ${next.title}.` : `סיימתם את כל הפירוקים של ${iso(drone.name)}! 🏆`, 'cheer')
  }

  return (
    <Page>
      <div className="container" style={{ '--accent': drone.accent, '--accent-soft': drone.accentSoft } as CSSProperties}>
        <div className="crumbs">
          <Link to="/#drones">רחפנים</Link>
          <span>/</span>
          <Link to={`/drone/${drone.id}`}>{drone.name}</Link>
          <span>/</span>
          <b>{task.title}</b>
        </div>

        <div className="task-head">
          <div>
            <span className="tag">פירוק {index + 1} מתוך {drone.tasks.length}</span>
            <h1>{task.title}</h1>
            <p className="lead">{task.summary}</p>
          </div>
          <div className="task-chips">
            <span className={`level level-${task.difficulty}`}><IconBolt size={14} /> {task.difficulty}</span>
            <span className="meta"><IconClock size={15} /> {task.minutes} דקות</span>
          </div>
        </div>

        <div className="task-grid">
          <div className="task-main">
            <motion.div className="video-card" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease }}>
              <Video src={task.video} poster={drone.photo} />
            </motion.div>

            <div className="card steps-card">
              <div className="steps-head">
                <h2>שלבי העבודה</h2>
                <span className="muted">{checked.length}/{task.steps.length}</span>
              </div>
              <div className="bar"><motion.i animate={{ width: `${(checked.length / task.steps.length) * 100}%` }} transition={{ type: 'spring', stiffness: 140, damping: 20 }} /></div>
              <motion.ol className="steps" variants={stagger} initial="hidden" animate="show">
                {task.steps.map((s, i) => {
                  const on = checked.includes(i)
                  return (
                    <motion.li key={i} variants={rise}>
                      <button className={`step ${on ? 'on' : ''}`} onClick={() => toggleStep(i)}>
                        <motion.span className="step-box" animate={on ? { scale: [1, 1.25, 1] } : {}} transition={{ duration: 0.3 }}>
                          {on ? <IconCheck size={14} /> : i + 1}
                        </motion.span>
                        <span>{s}</span>
                      </button>
                    </motion.li>
                  )
                })}
              </motion.ol>

              <div className="complete-wrap">
                <motion.button
                  className={`btn ${isDone ? 'btn-done' : allChecked ? 'btn-primary pulse' : 'btn-primary'}`}
                  onClick={complete}
                  whileTap={{ scale: 0.95 }}
                >
                  {isDone ? <><IconCheck size={18} /> הושלם · לחצו לביטול</> : 'סיימתי את הפירוק'}
                </motion.button>
                <AnimatePresence>{party > 0 && <Confetti key={party} />}</AnimatePresence>
              </div>
            </div>
          </div>

          <aside className="task-side">
            <div className="card">
              <h3 className="side-title"><IconTool size={18} /> כלים נדרשים</h3>
              {task.tools.length ? (
                <ul className="tools">{task.tools.map((t) => <li key={t}>{t}</li>)}</ul>
              ) : (
                <p className="muted">לא צריך כלים — רק ידיים נקיות.</p>
              )}
            </div>
            <div className="card safety">
              <h3 className="side-title">⚠️ לפני שמתחילים</h3>
              <ul className="tools">
                <li>רחפן כבוי, סוללה בחוץ</li>
                <li>משטח עבודה נקי ומואר</li>
                <li>קופסה לברגים</li>
              </ul>
            </div>
            {task.tip && (
              <div className="card amir-tip">
                <Amir mood="point" size={64} />
                <div>
                  <b>הטיפ של אמיר</b>
                  <p>{task.tip}</p>
                </div>
              </div>
            )}
          </aside>
        </div>

        <nav className="task-nav">
          {prev ? (
            <Link to={`/drone/${drone.id}/${prev.id}`} className="task-nav-link">
              <IconBack size={18} />
              <span><small>הקודם</small>{prev.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/drone/${drone.id}/${next.id}`} className="task-nav-link end">
              <span><small>הבא</small>{next.title}</span>
              <IconArrow size={18} />
            </Link>
          ) : (
            <Link to={`/drone/${drone.id}`} className="task-nav-link end">
              <span><small>סיום</small>חזרה ל-{drone.name}</span>
              <IconArrow size={18} />
            </Link>
          )}
        </nav>
      </div>
    </Page>
  )
}
