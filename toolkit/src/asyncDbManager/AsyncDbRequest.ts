import AsyncStorage from '@react-native-async-storage/async-storage'
import { noop } from '../helpers'

export class AsyncDbRequest<T = string> {
  public readonly key

  constructor(key: string) {
    this.key = key
  }

  public readonly get = async (): Promise<T | undefined> => {
    const value = await AsyncStorage.getItem(this.key)
    if (!value) return
    try {
      return JSON.parse(value)
    } catch {
      return (value as any) as T
    }
  }

  public readonly set = (value: T) => {
    return AsyncStorage.setItem(this.key, JSON.stringify(value))
  }

  public readonly setSync = (value: T) => {
    this.set(value).catch(noop)
  }

  public readonly reset = () => AsyncStorage.setItem(this.key, '')
}

export function createDbRequest<T = string>(key: string) {
  return new AsyncDbRequest<T>(key)
}
