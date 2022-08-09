import { MultiSelectStateProps } from '../types'
import { useConst, useWillComponentUpdate } from 'altek-toolkit'

export class MultiSelectStates {
  public topButtonSelected = false
  public allFieldsSelected = false
  public allUnselected = false
  public someFieldsSelected = false
  public topButtonActive = false
  private updateAllFieldsSelected(value: boolean) {
    this.allFieldsSelected = this.allFieldsSelected && value
  }

  private updateAllUnselected(value: boolean) {
    this.allUnselected = this.allUnselected && value
  }

  private updateSomeFieldsSelected(value: boolean) {
    this.someFieldsSelected = this.someFieldsSelected || value
  }

  public readonly update = ({
    values,
    topButtonBehavior,
  }: MultiSelectStateProps<any, any>) => {
    this.topButtonSelected = values[0].selected
    this.allFieldsSelected = true
    this.allUnselected = true
    this.someFieldsSelected = false
    values.forEach(({ selected }, index) => {
      this.updateAllFieldsSelected(index === 0 || selected)
      this.updateAllUnselected(
        (topButtonBehavior === 'none' && index === 0) || !selected
      )
      this.updateSomeFieldsSelected(index !== 0 && selected)
    })
    this.topButtonActive =
      this.topButtonSelected ||
      (topButtonBehavior === 'all' &&
        (this.allFieldsSelected || this.allUnselected))
  }
}

export function useMultiSelectStates<V extends string, L extends string>({
  values,
  topButtonBehavior,
}: MultiSelectStateProps<V, L>) {
  const states = useConst(() => new MultiSelectStates())

  useWillComponentUpdate(() => {
    states.update({ values, topButtonBehavior })
  }, [values, topButtonBehavior])

  return states
}
