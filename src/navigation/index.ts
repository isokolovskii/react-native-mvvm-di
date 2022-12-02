import { type NavigationModule, NavigationModuleImpl } from './module'
import { NativeNavigationService } from './services'

NavigationModuleImpl.init({ NavigationService: NativeNavigationService })
const navigationModule = NavigationModuleImpl.sharedInstance

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
export { type NavigationModule, navigationModule }
