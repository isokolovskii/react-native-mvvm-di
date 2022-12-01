import type { Screens } from '~navigation/types'

export interface StackNavigationService {
  push: (screen: Screens) => void
  pop: () => void
  popToRoot: () => void
}
