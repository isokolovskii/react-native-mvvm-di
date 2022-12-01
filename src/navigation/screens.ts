import { CurrenciesScreen } from '~currencies'

import type { ScreenConfig } from './types'

export const mainStackScreens: ScreenConfig[] = [
  {
    name: CurrenciesScreen.displayName,
    Screen: CurrenciesScreen,
  },
]
