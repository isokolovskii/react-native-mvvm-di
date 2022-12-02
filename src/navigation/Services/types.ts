import type { Screens } from '~navigation/containers/types'

export interface StackNavigationService {
  push: <T extends object | undefined>(screen: Screens, props?: T) => void
  pop: () => void
  popToRoot: () => void
  replace: <T extends object | undefined>(screen: Screens, props?: T) => void
}

export interface TabNavigationService {
  jumpToTab: <T extends object | undefined>(screen: Screens, props?: T) => void
}

export interface DrawerNavigationService {
  jumpTo: <T extends object | undefined>(screen: Screens, props?: T) => void
  toggleDrawer: () => void
  openDrawer: () => void
  closeDrawer: () => void
}
