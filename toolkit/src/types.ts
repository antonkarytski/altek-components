export type Fn<R = void> = () => R
export type FnExt<P, R = void> = (props: P) => R
export type OrArray<T> = T | T[]
export type Size = {
  width: number
  height: number
}
