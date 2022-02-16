import { useCallback, useEffect, useState } from 'react'

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
    //blockParentScroll(isVisible)
  }, [isVisible])

  return {
    isVisible,
    toggle,
    hide,
    show,
  }
}
