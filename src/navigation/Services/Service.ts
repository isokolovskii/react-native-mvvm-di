import { StackActions, DrawerActions, TabActions } from '@react-navigation/native'

import { navigation, type Screens } from '../containers'

import type { DrawerNavigationService, StackNavigationService, TabNavigationService } from './types'

export class NativeNavigationService implements StackNavigationService, DrawerNavigationService, TabNavigationService {
  private get navigation() {
    if (navigation.isReady()) {
      return navigation
    } else {
      throw new Error()
    }
  }

  push = <ScreenProps extends object | undefined = undefined>(screen: Screens, props?: ScreenProps) => {
    this.navigation.dispatch(StackActions.push(screen, props))
  }

  pop = () => {
    this.navigation.dispatch(StackActions.pop())
  }

  popToRoot = () => {
    this.navigation.dispatch(StackActions.popToTop())
  }

  replace = <ScreenProps extends object | undefined = undefined>(screen: Screens, props?: ScreenProps) => {
    this.navigation.dispatch(StackActions.replace(screen, props))
  }

  jumpToTab = <ScreenProps extends object | undefined = undefined>(screen: Screens, props?: ScreenProps) => {
    this.navigation.dispatch(TabActions.jumpTo(screen, props))
  }

  jumpTo = <ScreenProps extends object | undefined = undefined>(screen: Screens, props?: ScreenProps) => {
    this.navigation.dispatch(DrawerActions.jumpTo(screen, props))
  }

  toggleDrawer = () => {
    this.navigation.dispatch(DrawerActions.toggleDrawer())
  }

  openDrawer = () => {
    this.navigation.dispatch(DrawerActions.openDrawer())
  }

  closeDrawer = () => {
    this.navigation.dispatch(DrawerActions.closeDrawer())
  }
}
