import { isTimeLeft } from '../date'

type TimeoutSettings = {
  autoUpdate: boolean
  activated: boolean
}

const defaultSettings: TimeoutSettings = {
  autoUpdate: false,
  activated: false,
}

export class Timeout {
  lifeTime: number
  lastUpdate: number = 0
  settings = defaultSettings

  constructor(lifeTime: number, settings: Partial<TimeoutSettings> = {}) {
    this.lifeTime = lifeTime
    this.settings = { ...defaultSettings, ...settings }
    if (settings.activated) this.lastUpdate = new Date().valueOf()
  }

  update() {
    this.lastUpdate = new Date().valueOf()
  }

  check() {
    const isOnTimeout =
      !!this.lastUpdate && isTimeLeft(this.lifeTime, this.lastUpdate)
    if (this.settings.autoUpdate && !isOnTimeout) this.update()
    return isOnTimeout
  }
}
