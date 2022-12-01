import { CurrenciesScreen } from '~currencies'

import { ScreenConfig, Screens } from './types'

export interface MainStackParamList {
  [Screens.Currencies]: undefined
}

export const mainStackScreens: ScreenConfig[] = [
  {
    name: Screens.Currencies,
    Screen: CurrenciesScreen,
  },
]
