type P = { size?: number }

const base = (size = 20) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

export const IconDrone = ({ size }: P) => (
  <svg {...base(size)}>
    <circle cx="5" cy="5" r="2.5" />
    <circle cx="19" cy="5" r="2.5" />
    <circle cx="5" cy="19" r="2.5" />
    <circle cx="19" cy="19" r="2.5" />
    <path d="M7 7l3 3M17 7l-3 3M7 17l3-3M17 17l-3-3" />
    <rect x="9.5" y="9.5" width="5" height="5" rx="1.5" />
  </svg>
)
export const IconArrow = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
)
export const IconBack = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
export const IconPlay = ({ size }: P) => (
  <svg {...base(size)} fill="currentColor" stroke="none">
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
  </svg>
)
export const IconCheck = ({ size }: P) => (
  <svg {...base(size)} strokeWidth={3}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)
export const IconClock = ({ size }: P) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)
export const IconTool = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3.5 17.3a1.8 1.8 0 0 0 2.6 2.6l5.8-5.8a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.4-.4-2.4z" />
  </svg>
)
export const IconBolt = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M13 3L5 14h6l-1 7 8-11h-6z" />
  </svg>
)
export const IconLayers = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M12 3l9 5-9 5-9-5z" />
    <path d="M3 13l9 5 9-5" />
  </svg>
)
export const IconShield = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)
