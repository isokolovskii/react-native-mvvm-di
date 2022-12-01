import type { ComponentType } from 'react'

export enum Screens {
  Currencies = 'CurrenciesScreen',
}

export interface ScreenConfig {
  name: Screens
  Screen: ComponentType
}
