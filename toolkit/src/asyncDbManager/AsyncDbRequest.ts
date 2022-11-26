import AsyncStorage from '@react-native-async-storage/async-storage'
import { noop } from '../helpers'

export class AsyncDbRequest<T = string> {
  public readonly key
  private getMapFn: null | (<U>(value: U) => T | undefined) = null
  private setMapFn: null | (<U>(value: T | undefined) => U | null) = null
  private resetFn: null | (<U>(value: U) => U) = null

  constructor(key: string) {
    this.key = key
  }

  public readonly get = async (): Promise<T | undefined> => {
    const value = await AsyncStorage.getItem(this.key)
    if (!value) return
    try {
      const parsed = JSON.parse(value)
      if (!this.getMapFn) return parsed
      return this.getMapFn(parsed)
    } catch {
      return value as any as T
    }
  }

  public readonly set = (value: T) => {
    if (!this.setMapFn) {
      return AsyncStorage.setItem(this.key, JSON.stringify(value))
    }
    const valueToSave = this.setMapFn(value)
    return AsyncStorage.setItem(this.key, JSON.stringify(valueToSave))
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

  public getMap(mapper: <U>(value: U) => T) {
    this.getMapFn = mapper
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
