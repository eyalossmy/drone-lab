import { useSyncExternalStore } from 'react'

const KEY = 'drone-lab:done'
const listeners = new Set<() => void>()

function read(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

let done = read()

function write(next: string[]) {
  done = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // אין גישה לאחסון — ההתקדמות תישמר רק עד רענון הדף
  }
  listeners.forEach((l) => l())
}

export function toggleDone(key: string, value: boolean) {
  const has = done.includes(key)
  if (value && !has) write([...done, key])
  if (!value && has) write(done.filter((k) => k !== key))
}

export function useProgress() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => done,
  )
}
