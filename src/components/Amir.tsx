import type { ReactNode } from 'react'
import './amir.css'

export type Mood = 'wave' | 'happy' | 'think' | 'cheer' | 'point'

const SKIN = '#F6C19A'
const SKIN_DARK = '#E8A57C'
const OLIVE = '#5E7D3A'
const OLIVE_DARK = '#4A6530'
const INK = '#1E2533'

const mouths: Record<Mood, ReactNode> = {
  wave: <SmileOpen />,
  happy: <SmileOpen />,
  cheer: <SmileBig />,
  point: <SmileOpen />,
  think: <path d="M92 134 Q100 130 110 135" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />,
}

function SmileOpen() {
  return (
    <g>
      <path d="M85 128 Q100 146 115 128 Z" fill="#7A2335" />
      <path d="M92 137 Q100 142 108 137 Q100 133 92 137 Z" fill="#F07C8C" />
    </g>
  )
}

function SmileBig() {
  return (
    <g>
      <path d="M82 126 Q100 156 118 126 Z" fill="#7A2335" />
      <path d="M90 140 Q100 148 110 140 Q100 135 90 140 Z" fill="#F07C8C" />
      <path d="M84 127 L116 127 L114 131 L86 131 Z" fill="#fff" />
    </g>
  )
}

/** AMIR — המדריך הדיגיטלי. דמות SVG עם מצבי רוח ואנימציות. */
export default function Amir({ mood = 'happy', size = 160, className = '' }: { mood?: Mood; size?: number; className?: string }) {
  return (
    <svg
      className={`amir amir--${mood} ${className}`}
      width={size}
      height={size * 1.2}
      viewBox="0 0 200 240"
      role="img"
      aria-label="אמיר, המדריך הדיגיטלי"
    >
      <ellipse className="amir-shadow" cx="100" cy="233" rx="48" ry="6" fill="rgba(20,30,60,.12)" />

      <g className="amir-body">
        {/* זרוע שמאל (מחזיקה מברג) */}
        <g className="amir-arm amir-arm--l">
          <path d="M66 178 L52 214" stroke={OLIVE} strokeWidth="19" strokeLinecap="round" />
          <g className="amir-tool">
            <rect x="46" y="222" width="5" height="16" rx="1.5" fill="#9AA3B2" transform="rotate(20 48 222)" />
            <rect x="41" y="208" width="11" height="17" rx="4" fill="#FFC23C" transform="rotate(20 48 216)" />
          </g>
          <circle cx="51" cy="218" r="10" fill={SKIN} />
        </g>

        {/* גוף */}
        <path d="M56 232 C54 190 70 162 100 162 C130 162 146 190 144 232 Z" fill={OLIVE} />
        <path d="M86 163 L100 182 L114 163 Z" fill={OLIVE_DARK} />
        <rect x="93" y="140" width="14" height="26" rx="7" fill={SKIN_DARK} />
        <path d="M74 200 L74 232 M126 200 L126 232" stroke={OLIVE_DARK} strokeWidth="3" strokeLinecap="round" opacity=".5" />
        {/* תג על החזה */}
        <g transform="translate(108 192)">
          <rect width="24" height="16" rx="5" fill="#2F6BFF" />
          <path d="M6 8 H18 M12 4 V12" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="6" cy="4.5" r="2" fill="#fff" />
          <circle cx="18" cy="4.5" r="2" fill="#fff" />
          <circle cx="6" cy="11.5" r="2" fill="#fff" />
          <circle cx="18" cy="11.5" r="2" fill="#fff" />
        </g>

        {/* זרוע ימין (מנופפת) */}
        <g className="amir-arm amir-arm--r">
          <path d="M134 178 L148 214" stroke={OLIVE} strokeWidth="19" strokeLinecap="round" />
          <circle cx="149" cy="218" r="10" fill={SKIN} />
        </g>

        {/* ראש */}
        <g className="amir-head">
          <circle cx="49" cy="108" r="10" fill={SKIN_DARK} />
          <circle cx="151" cy="108" r="10" fill={SKIN_DARK} />
          <circle cx="100" cy="102" r="52" fill={SKIN} />

          {/* אוזניות + מיקרופון */}
          <rect x="38" y="94" width="16" height="28" rx="8" fill={INK} />
          <rect x="146" y="94" width="16" height="28" rx="8" fill={INK} />
          <path d="M152 120 C152 138 140 146 124 146" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="122" cy="146" r="5" fill={INK} />

          {/* כובע */}
          <path d="M50 90 C50 54 74 40 100 40 C126 40 150 54 150 90 Z" fill={OLIVE} />
          <path d="M46 92 Q100 74 154 92 Q100 106 46 92 Z" fill={OLIVE_DARK} />
          <path d="M100 42 L100 86" stroke={OLIVE_DARK} strokeWidth="2" opacity=".35" />
          <circle cx="100" cy="66" r="11" fill="#FFC23C" />
          <path d="M94 66 H106 M100 60 V72" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />

          {/* גבות */}
          <path className="amir-brow amir-brow--l" d="M70 98 Q80 92 90 97" stroke="#4A2F22" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path className="amir-brow amir-brow--r" d="M110 97 Q120 92 130 98" stroke="#4A2F22" strokeWidth="5" strokeLinecap="round" fill="none" />

          {/* עיניים */}
          <g className="amir-eyes">
            <ellipse cx="80" cy="112" rx="11" ry="12.5" fill="#fff" />
            <ellipse cx="120" cy="112" rx="11" ry="12.5" fill="#fff" />
            <g className="amir-pupils">
              <circle cx="81" cy="113" r="6.5" fill={INK} />
              <circle cx="121" cy="113" r="6.5" fill={INK} />
              <circle cx="83.5" cy="110" r="2.3" fill="#fff" />
              <circle cx="123.5" cy="110" r="2.3" fill="#fff" />
            </g>
          </g>

          <ellipse cx="66" cy="130" rx="8" ry="5" fill="#FF8C9E" opacity=".45" />
          <ellipse cx="134" cy="130" rx="8" ry="5" fill="#FF8C9E" opacity=".45" />
          <ellipse cx="100" cy="124" rx="4.5" ry="3.2" fill={SKIN_DARK} />
          {mouths[mood]}
        </g>

        {/* ניצוצות בזמן שמחה */}
        <g className="amir-sparkles">
          <path d="M28 60 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 Z" fill="#FFC23C" />
          <path d="M170 40 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 Z" fill="#2F6BFF" />
          <path d="M176 150 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 Z" fill="#FF6B8A" />
        </g>
      </g>
    </svg>
  )
}
