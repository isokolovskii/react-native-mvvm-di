import type { Screens } from '~navigation/types'

export interface StackNavigationService {
  push: (screen: Screens) => void
  pop: () => void
  popToRoot: () => void
  replace: (screen: Screens) => void
}

export interface TabNavigationService {
  jumpToTab: (screen: Screens) => void
}

export interface DrawerNavigationService {
  jumpTo: (screen: Screens) => void
  toggleDrawer: () => void
  openDrawer: () => void
  closeDrawer: () => void
}
