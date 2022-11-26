import AsyncStorage from '@react-native-async-storage/async-storage'
import { noop } from '../helpers'

export class AsyncDbRequest<T = string> {
  public readonly key
  private mapFn: null | (<U>(value: U) => T) = null
  private resetFn: null | (<U>(value: U) => U) = null

  constructor(key: string) {
    this.key = key
  }

  public readonly get = async (): Promise<T | undefined> => {
    const value = await AsyncStorage.getItem(this.key)
    if (!value) return
    try {
      const parsed = JSON.parse(value)
      if (!this.mapFn) return parsed
      return this.mapFn(parsed)
    } catch {
      return value as any as T
    }
  }

  public readonly set = (value: T) => {
    return AsyncStorage.setItem(this.key, JSON.stringify(value))
  }

  public readonly setSync = (value: T) => {
    this.set(value).catch(noop)
  }

  public readonly reset = () => {
    if (!this.resetFn) return AsyncStorage.removeItem(this.key)
    return AsyncStorage.getItem(this.key).then((value) => {
      if (!value) return
      const parsed = JSON.parse(value)
      const newValue = this.resetFn!(parsed)
      return AsyncStorage.setItem(this.key, JSON.stringify(newValue))
    })
  }

  public map(mapper: <U>(value: U) => T) {
    this.mapFn = mapper
    return this
  }

  public resetMap(mapper: <U>(value: U) => U) {
    this.resetFn = mapper
    return this
  }
}

export function createDbRequest<T = string>(key: string) {
  return new AsyncDbRequest<T>(key)
}
