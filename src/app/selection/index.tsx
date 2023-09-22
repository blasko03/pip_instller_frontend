'use client'
import { useEffect, type ReactElement, useState } from 'react'
import Phases from './phases'
import { type IKeyEvent } from '@/types/i_key_event'
export default function Selection (): ReactElement {
  const [event, setEvent] = useState<IKeyEvent>({ action: 'none' })

  const keyEvents = [
    { action: 'up', keys: ['ArrowUp', 'a'] },
    { action: 'down', keys: ['ArrowDown', 'c'] },
    { action: 'enter', keys: ['Enter', 'b'] }
  ]

  function handleKeyDown (this: Document, ev: KeyboardEvent): void {
    const event = keyEvents.filter(e => e.keys.includes(ev.key))[0]
    if (event != null) { setEvent({ action: event.action }) }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return function cleanup () {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  return <Phases event = {event} />
}
