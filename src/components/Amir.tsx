import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import './amir.css'

export type Mood = 'wave' | 'happy' | 'think' | 'cheer' | 'point'

const SKIN = '#F6C29C'
const SKIN_DARK = '#E6A47C'
const OLIVE = '#61813C'
const OLIVE_DARK = '#4A6630'
const OLIVE_LIGHT = '#7A9A50'
const INK = '#1E2533'
const BROWN = '#3E2A20'

function Mouth({ mood }: { mood: Mood }): ReactNode {
  if (mood === 'think') return <path d="M93 139 Q100 135 109 140" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
  if (mood === 'cheer')
    return (
      <g>
        <path d="M82 131 Q100 162 118 131 Q100 135 82 131 Z" fill="#7A2335" />
        <path d="M89 146 Q100 156 111 146 Q100 140 89 146 Z" fill="#F07C8C" />
        <path d="M85 132 Q100 136 115 132 L113 137 Q100 140 87 137 Z" fill="#fff" />
      </g>
    )
  return (
    <g>
      <path d="M86 133 Q100 152 114 133 Q100 136 86 133 Z" fill="#7A2335" />
      <path d="M92 143 Q100 149 108 143 Q100 139 92 143 Z" fill="#F07C8C" />
      <path d="M88 134 Q100 137 112 134 L111 137 Q100 139 89 137 Z" fill="#fff" />
    </g>
  )
}

/** AMIR — המדריך הדיגיטלי. דמות SVG עם מצבי רוח, עיניים שעוקבות אחרי הסמן ואנימציות. */
export default function Amir({
  mood = 'happy',
  size = 160,
  talking = false,
  className = '',
}: {
  mood?: Mood
  size?: number
  talking?: boolean
  className?: string
}) {
  const ref = useRef<SVGSVGElement>(null)
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  const [quirk, setQuirk] = useState('')

  // העיניים והראש עוקבים אחרי הסמן
  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height * 0.38)
        const d = Math.hypot(dx, dy) || 1
        const k = Math.min(1, d / 240)
        el.style.setProperty('--px', `${((dx / d) * 3.4 * k).toFixed(2)}px`)
        el.style.setProperty('--py', `${((dy / d) * 3 * k).toFixed(2)}px`)
        el.style.setProperty('--tilt', `${Math.max(-7, Math.min(7, dx / 70)).toFixed(2)}deg`)
      })
    }
    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  // תנועות קטנות ואקראיות כשאמיר מחכה — מסתכל מסביב או קופץ
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    const loop = () => {
      t = setTimeout(() => {
        setQuirk(Math.random() < 0.5 ? 'look' : 'hop')
        t = setTimeout(() => {
          setQuirk('')
          loop()
        }, 1400)
      }, 5000 + Math.random() * 5000)
    }
    loop()
    return () => clearTimeout(t)
  }, [])

  const g = (name: string) => `url(#${id}-${name})`

  return (
    <svg
      ref={ref}
      className={`amir amir--${mood} ${talking ? 'amir--talking' : ''} ${quirk ? `amir--q-${quirk}` : ''} ${className}`}
      width={size}
      height={size * 1.3}
      viewBox="0 0 200 260"
      role="img"
      aria-label="אמיר, המדריך הדיגיטלי"
    >
      <defs>
        <radialGradient id={`${id}-skin`} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#FFD9BA" />
          <stop offset="1" stopColor={SKIN} />
        </radialGradient>
        <linearGradient id={`${id}-shirt`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={OLIVE_LIGHT} />
          <stop offset="1" stopColor={OLIVE_DARK} />
        </linearGradient>
        <linearGradient id={`${id}-cap`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor={OLIVE_LIGHT} />
          <stop offset="1" stopColor={OLIVE} />
        </linearGradient>
        <linearGradient id={`${id}-cup`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3A4356" />
          <stop offset="1" stopColor={INK} />
        </linearGradient>
      </defs>

      <ellipse className="amir-shadow" cx="100" cy="252" rx="44" ry="6" fill="rgba(20,30,60,.14)" />

      <g className="amir-all">
        {/* רגליים ונעליים */}
        <g className="amir-legs">
          <rect x="78" y="206" width="20" height="38" rx="8" fill={OLIVE_DARK} />
          <rect x="102" y="206" width="20" height="38" rx="8" fill={OLIVE_DARK} />
          <path d="M100 210 V238" stroke="#3D5527" strokeWidth="2" />
          <rect x="68" y="237" width="32" height="14" rx="7" fill="#3A2E25" />
          <rect x="100" y="237" width="32" height="14" rx="7" fill="#3A2E25" />
          <rect x="68" y="247" width="32" height="5" rx="2.5" fill="#211914" />
          <rect x="100" y="247" width="32" height="5" rx="2.5" fill="#211914" />
          <path d="M76 240 h10 M114 240 h10" stroke="#5A4A3D" strokeWidth="2" strokeLinecap="round" />
        </g>

        <g className="amir-upper">
          {/* גוף */}
          <rect x="92" y="138" width="16" height="26" rx="7" fill={SKIN_DARK} />
          <path d="M60 220 C58 186 72 160 100 160 C128 160 142 186 140 220 Q100 226 60 220 Z" fill={g('shirt')} />
          <path d="M86 161 L100 180 L114 161 Z" fill={SKIN_DARK} />
          <path d="M84 161 L100 181 L92 187 L78 168 Z" fill={OLIVE_LIGHT} />
          <path d="M116 161 L100 181 L108 187 L122 168 Z" fill={OLIVE_LIGHT} />
          <path d="M100 184 V206" stroke={OLIVE_DARK} strokeWidth="2" />
          <circle cx="100" cy="192" r="1.8" fill={OLIVE_DARK} />
          <circle cx="100" cy="201" r="1.8" fill={OLIVE_DARK} />
          {/* כיסים */}
          <rect x="70" y="186" width="21" height="15" rx="3" fill={OLIVE_DARK} opacity=".45" />
          <path d="M69 186 h23 v5 q-11.5 4 -23 0 Z" fill={OLIVE_DARK} opacity=".7" />
          <rect x="109" y="186" width="21" height="15" rx="3" fill={OLIVE_DARK} opacity=".45" />
          <path d="M108 186 h23 v5 q-11.5 4 -23 0 Z" fill={OLIVE_DARK} opacity=".7" />
          {/* תג שם + פאץ' רחפן */}
          <rect x="108" y="176" width="24" height="8" rx="2" fill="#2C3A1F" />
          <text x="120" y="182.2" textAnchor="middle" fontSize="6" fontWeight="700" fill="#EDE6C8" fontFamily="Google Sans, sans-serif">אמיר</text>
          <g transform="translate(70 172)">
            <rect width="20" height="12" rx="4" fill="#2F6BFF" />
            <path d="M5 6 H15 M10 2.5 V9.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="5" cy="3.5" r="1.6" fill="#fff" />
            <circle cx="15" cy="3.5" r="1.6" fill="#fff" />
            <circle cx="5" cy="8.5" r="1.6" fill="#fff" />
            <circle cx="15" cy="8.5" r="1.6" fill="#fff" />
          </g>
          {/* חגורה */}
          <rect x="60" y="206" width="80" height="10" rx="3" fill="#3B3127" />
          <rect x="92" y="204.5" width="16" height="13" rx="2.5" fill="#E9B949" />
          <rect x="96" y="208" width="8" height="6" rx="1" fill="#3B3127" />

          {/* זרוע שמאל — מחזיקה מברג */}
          <g className="amir-arm amir-arm--l">
            <path d="M64 172 L54 198" stroke={OLIVE} strokeWidth="17" strokeLinecap="round" />
            <path d="M55.5 195 L53 202" stroke={OLIVE_DARK} strokeWidth="18" strokeLinecap="round" />
            <g className="amir-fore amir-fore--l">
              <path d="M54 199 L50 221" stroke={SKIN} strokeWidth="13" strokeLinecap="round" />
              <g className="amir-tool">
                <rect x="43" y="231" width="4.5" height="17" rx="1.5" fill="#A3ACBB" transform="rotate(18 46 231)" />
                <rect x="40" y="218" width="12" height="17" rx="4.5" fill="#FFC23C" transform="rotate(18 46 226)" />
                <path d="M44 221 v10 M48 220 v10" stroke="#E0A21E" strokeWidth="1.5" transform="rotate(18 46 226)" />
              </g>
              <circle cx="49" cy="225" r="9.5" fill={SKIN} />
              <path d="M43 222 q3 -3 7 -1" stroke={SKIN_DARK} strokeWidth="2" fill="none" strokeLinecap="round" />
            </g>
          </g>

          {/* זרוע ימין — מנופפת ומצביעה */}
          <g className="amir-arm amir-arm--r">
            <path d="M136 172 L146 198" stroke={OLIVE} strokeWidth="17" strokeLinecap="round" />
            <path d="M144.5 195 L147 202" stroke={OLIVE_DARK} strokeWidth="18" strokeLinecap="round" />
            <g className="amir-fore amir-fore--r">
              <path d="M146 199 L150 221" stroke={SKIN} strokeWidth="13" strokeLinecap="round" />
              <circle cx="151" cy="225" r="9.5" fill={SKIN} />
              <path d="M146 229 q5 3 10 0" stroke={SKIN_DARK} strokeWidth="2" fill="none" strokeLinecap="round" />
            </g>
          </g>

          {/* ראש */}
          <g className="amir-headwrap">
            <g className="amir-head">
              <rect x="50" y="88" width="10" height="22" rx="4" fill={BROWN} />
              <rect x="140" y="88" width="10" height="22" rx="4" fill={BROWN} />
              <circle cx="47" cy="110" r="11" fill={SKIN_DARK} />
              <circle cx="47" cy="110" r="5" fill="#D98E68" />
              <circle cx="153" cy="110" r="11" fill={SKIN_DARK} />
              <circle cx="153" cy="110" r="5" fill="#D98E68" />
              <circle cx="100" cy="104" r="54" fill={g('skin')} />

              <ellipse cx="66" cy="132" rx="9" ry="5.5" fill="#FF8C9E" opacity=".42" />
              <ellipse cx="134" cy="132" rx="9" ry="5.5" fill="#FF8C9E" opacity=".42" />

              {/* כובע */}
              <path d="M52 101 Q100 113 148 101 Q100 108 52 101 Z" fill="rgba(0,0,0,.08)" />
              <path d="M48 94 C46 52 72 36 100 36 C128 36 154 52 152 94 Z" fill={g('cap')} />
              <path d="M100 38 V88 M74 46 Q66 66 66 90 M126 46 Q134 66 134 90" stroke={OLIVE_DARK} strokeWidth="1.6" opacity=".35" fill="none" />
              <circle cx="100" cy="38" r="3.5" fill={OLIVE_DARK} />
              <path d="M42 94 Q100 74 158 94 Q156 104 100 104 Q44 104 42 94 Z" fill={OLIVE_DARK} />
              <path d="M50 92 Q100 79 150 92" stroke={OLIVE_LIGHT} strokeWidth="2" fill="none" opacity=".7" />
              <circle cx="100" cy="64" r="12" fill="#FFC23C" stroke="#E0A21E" strokeWidth="2" />
              <path d="M94 64 H106 M100 58 V70" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="94.5" cy="58.5" r="2" fill={INK} />
              <circle cx="105.5" cy="58.5" r="2" fill={INK} />
              <circle cx="94.5" cy="69.5" r="2" fill={INK} />
              <circle cx="105.5" cy="69.5" r="2" fill={INK} />

              {/* אוזניות + מיקרופון */}
              <path d="M45 98 C40 36 160 36 155 98" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
              <rect x="35" y="94" width="19" height="31" rx="9.5" fill={g('cup')} />
              <rect x="146" y="94" width="19" height="31" rx="9.5" fill={g('cup')} />
              <rect x="39" y="99" width="4" height="12" rx="2" fill="#fff" opacity=".18" />
              <path d="M153 122 C153 140 142 148 127 148" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
              <ellipse cx="124" cy="148" rx="6" ry="4.5" fill={INK} />
              <circle cx="122" cy="146.5" r="1.4" fill="#fff" opacity=".5" />

              {/* גבות */}
              <path className="amir-brow amir-brow--l" d="M67 97 Q79 89 91 95" stroke={BROWN} strokeWidth="5.5" strokeLinecap="round" fill="none" />
              <path className="amir-brow amir-brow--r" d="M109 95 Q121 89 133 97" stroke={BROWN} strokeWidth="5.5" strokeLinecap="round" fill="none" />

              {/* עיניים */}
              <g className="amir-eyes">
                <ellipse cx="80" cy="114" rx="12" ry="13.5" fill="#fff" />
                <ellipse cx="120" cy="114" rx="12" ry="13.5" fill="#fff" />
                <g className="amir-pupils">
                  <circle cx="80.5" cy="115" r="7.5" fill="#5A3B2A" />
                  <circle cx="120.5" cy="115" r="7.5" fill="#5A3B2A" />
                  <circle cx="80.5" cy="115" r="4" fill={INK} />
                  <circle cx="120.5" cy="115" r="4" fill={INK} />
                  <circle cx="83.3" cy="111.8" r="2.6" fill="#fff" />
                  <circle cx="123.3" cy="111.8" r="2.6" fill="#fff" />
                  <circle cx="78" cy="118" r="1.2" fill="#fff" opacity=".8" />
                  <circle cx="118" cy="118" r="1.2" fill="#fff" opacity=".8" />
                </g>
              </g>

              <ellipse cx="100" cy="126" rx="5" ry="3.8" fill="#EBA27B" />
              <ellipse cx="98.5" cy="124.8" rx="1.8" ry="1.1" fill="#fff" opacity=".45" />
              <g className="amir-mouth">
                <Mouth mood={mood} />
              </g>
            </g>
          </g>
        </g>

        {/* ניצוצות בזמן שמחה */}
        <g className="amir-sparkles">
          <path d="M26 64 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 Z" fill="#FFC23C" />
          <path d="M172 40 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 Z" fill="#2F6BFF" />
          <path d="M180 150 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 Z" fill="#FF6B8A" />
          <path d="M18 150 l2.5 6 l6 2.5 l-6 2.5 l-2.5 6 l-2.5 -6 l-6 -2.5 l6 -2.5 Z" fill="#22C55E" />
        </g>
      </g>
    </svg>
  )
}
