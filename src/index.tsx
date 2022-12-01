import { Provider } from 'inversify-react'
import React from 'react'

import { container } from '~ioc'
import { AppNavigationContainer, MainStack, mainStackScreens } from '~navigation'

export const App = () => (
  <Provider container={container}>
    <AppNavigationContainer>
      <MainStack screens={mainStackScreens} />
    </AppNavigationContainer>
  </Provider>
)
