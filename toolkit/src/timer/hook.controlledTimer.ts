import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useFnRef } from '../hooks'

type IntervalProps = {
  onTick: () => unknown
  interval: number
  condition: boolean
}

export const useInterval = ({
  onTick,
  interval,
  condition = true,
}: IntervalProps) => {
  const onTickRef = useFnRef(onTick)

  useEffect(() => {
    if (!condition) return
    const timer = setInterval(() => {
      onTickRef.current()
    }, interval)
    return () => clearInterval(timer)
  }, [onTickRef, interval, condition])
}

type ControlledTimerProps = {
  time: number
  condition?: boolean
  onGenerate?: () => void
  onTick?: () => void
  tick?: number
  controlled?: boolean
  cycle?: boolean
  iteratorMode?: 'inc' | 'dec'
}

export const useControlledTimer = ({
  onGenerate,
  onTick,
  time,
  condition = true,
  tick = 150,
  controlled,
  cycle = true,
  iteratorMode = 'dec',
}: ControlledTimerProps) => {
  const uncontrolledIterator = useRef(time)
  const [controlledIterator, setControlledIterator] = useState(time)
  const [cycleCondition, setCycleCondition] = useState(true)

  const reloadTimer = useCallback(() => {
    uncontrolledIterator.current = time
    if (!controlled) return
    if (iteratorMode === 'dec') return setControlledIterator(time)
    setControlledIterator(0)
  }, [time, controlled, iteratorMode])

  function generatorCounter() {
    if (uncontrolledIterator.current > 0) {
      if (onTick) onTick()
      uncontrolledIterator.current -= tick
      if (!controlled) return
      if (iteratorMode === 'dec') {
        return setControlledIterator((current) => current - tick)
      }
      return setControlledIterator((current) => current + tick)
    }

    if (onGenerate) onGenerate()
    if (!cycle) return setCycleCondition(false)
    reloadTimer()
  }

  useEffect(() => {
    uncontrolledIterator.current = time
    setControlledIterator(time)
  }, [time])

  useInterval({
    onTick: generatorCounter,
    interval: tick,
    condition: condition && cycleCondition,
  })

  const startAgain = useCallback(() => {
    if (cycleCondition) return
    reloadTimer()
    setCycleCondition(true)
  }, [reloadTimer, cycleCondition])

  const timerInterface = useMemo(() => {
    return { startAgain }
  }, [startAgain])

  return {
    current: controlledIterator,
    timerInterface,
  }
}
