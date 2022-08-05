import { useCallback, useEffect, useState } from 'react'
import { $blockScroll } from './blockScroll'

export function useModal() {
  const [isVisible, setVisible] = useState(false)
  const toggle = () => {
    setVisible((state) => !state)
  }

  const show = () => {
    setVisible(true)
  }

  const hide = useCallback(() => {
    setVisible(false)
  }, [])

  useEffect(() => {
    $blockScroll.set(isVisible)
  }, [isVisible])

  return {
    isVisible,
    toggle,
    hide,
    show,
    setVisible,
  }
}
