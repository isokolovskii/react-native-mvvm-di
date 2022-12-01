import { StackActions, DrawerActions, TabActions } from '@react-navigation/native'
import { injectable } from 'inversify'

import { navigation } from '../Container'
import type { Screens } from '../types'

import type { DrawerNavigationService, StackNavigationService, TabNavigationService } from './types'

@injectable()
export class NativeNavigationService implements StackNavigationService, DrawerNavigationService, TabNavigationService {
  private get navigation() {
    if (navigation.isReady()) {
      return navigation
    } else {
      throw new Error()
    }
  }

  push = (screen: Screens) => {
    this.navigation.dispatch(StackActions.push(screen))
  }

  pop = () => {
    this.navigation.dispatch(StackActions.pop())
  }

  popToRoot = () => {
    this.navigation.dispatch(StackActions.popToTop())
  }

  replace = (screen: Screens) => {
    this.navigation.dispatch(StackActions.replace(screen))
  }

  jumpToTab = (screen: Screens) => {
    this.navigation.dispatch(TabActions.jumpTo(screen))
  }

  jumpTo = (screen: Screens) => {
    this.navigation.dispatch(DrawerActions.jumpTo(screen))
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
