import React from 'react'

import { core } from '~core'
import currenciesModuleFactory from '~currencies'
import navigationModuleFactory from '~navigation'
import { AppNavigationContainer, MainStack, mainStackScreens } from '~navigation'

core.sharedInstance.init({ navigationModuleFactory, currenciesModuleFactory })

export const App = () => (
  <AppNavigationContainer>
    <MainStack screens={mainStackScreens} />
  </AppNavigationContainer>
)
