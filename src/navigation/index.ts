import type { ModuleFactory } from '~core'

import type { NavigationModule } from './module'

const moduleFactory: ModuleFactory<NavigationModule> = () => {
  const { NavigationModuleImpl } = require('./module')
  const { NativeNavigationService } = require('./services')

  NavigationModuleImpl.sharedInstance.init({ NavigationService: NativeNavigationService })

  return NavigationModuleImpl.sharedInstance
}

export default moduleFactory

export {
  MainStack,
  mainStackScreens,
  MainStackId,
  type MainStackParamList,
  type MainStackScreenConfig,
  AppNavigationContainer,
  Screens,
} from './containers'
export { type StackNavigationService, type TabNavigationService, type DrawerNavigationService } from './services'
export { type NavigationModule }
