import React from 'react'

import { AppNavigationContainer, MainStack, mainStackScreens } from '~navigation'

export const App = () => (
  <AppNavigationContainer>
    <MainStack screens={mainStackScreens} />
  </AppNavigationContainer>
)
