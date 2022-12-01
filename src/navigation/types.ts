import type { ComponentType } from 'react'

export enum Screens {
  Currencies = 'CurrenciesScreen',
  CurrencyRate = 'CurrencyRateScreen',
}

export interface ScreenConfig {
  name: Screens
  Screen: ComponentType
}
