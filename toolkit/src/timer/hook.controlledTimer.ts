import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

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
  useEffect(() => {
    if (condition) {
      const timer = setInterval(() => {
        onTick()
      }, interval)
      return () => clearInterval(timer)
    }
  }, [onTick, interval, condition])
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
    if (iteratorMode === 'dec') {
      setControlledIterator(time)
      return
    }
    setControlledIterator(0)
  }, [time, controlled, iteratorMode])

  const generatorCounter = useCallback(() => {
    if (uncontrolledIterator.current > 0) {
      if (onTick) onTick()
      uncontrolledIterator.current = uncontrolledIterator.current - tick
      if (controlled) {
        if (iteratorMode === 'dec') {
          setControlledIterator((current) => current - tick)
          return
        }
        setControlledIterator((current) => current + tick)
      }
      return
    }

    if (onGenerate) onGenerate()
    if (!cycle) {
      setCycleCondition(false)
      return
    }
    reloadTimer()
  }, [onGenerate, tick, onTick, controlled, cycle, reloadTimer, iteratorMode])

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
    if (!cycleCondition) {
      reloadTimer()
      setCycleCondition(true)
    }
  }, [reloadTimer, cycleCondition])

  const timerInterface = useMemo(() => {
    return {
      startAgain,
    }
  }, [startAgain])

  return {
    current: controlledIterator,
    timerInterface,
  }
}
