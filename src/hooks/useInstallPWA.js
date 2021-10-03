import { useEffect, useState } from 'react'

export function useInstallPWA() {
  const [supportsPWA, setSupportsPWA] = useState(false)
  const [promptInstall, setPromptInstall] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      console.log('we are being triggered :D')
      setSupportsPWA(true)
      setPromptInstall(e)
    }
    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('transitionend', handler)
  }, [])

  const installPWA = (evt) => {
    evt.preventDefault()
    if (!promptInstall) {
      return
    }
    promptInstall.prompt()
  }

  return [supportsPWA, installPWA]
}
