import { ContainerModule } from 'inversify'

import {
  type StackNavigationService,
  type TabNavigationService,
  type DrawerNavigationService,
  navigationService,
} from './Services'
import { NativeNavigationService } from './Services/Service'

export { AppNavigationContainer } from './Container'
export { MainStack } from './MainStack'
export { mainStackScreens } from './screens'
export { Screens } from './types'

const NAVIGATION_MODULE = {
  navigationService,
}

const navigationModule = new ContainerModule((bind) => {
  bind<StackNavigationService & DrawerNavigationService & TabNavigationService>(navigationService)
    .to(NativeNavigationService)
    .inSingletonScope()
})

export { navigationModule, NAVIGATION_MODULE, type StackNavigationService }
