import { CurrenciesScreen, CurrencyRateScreen } from '~currencies'

import { ScreenConfig, Screens } from './types'

export interface MainStackParamList {
  [Screens.Currencies]: undefined
  [Screens.CurrencyRate]: undefined
}

export const mainStackScreens: ScreenConfig[] = [
  {
    name: Screens.Currencies,
    Screen: CurrenciesScreen,
  },
  {
    name: Screens.CurrencyRate,
    Screen: CurrencyRateScreen,
  },
]
