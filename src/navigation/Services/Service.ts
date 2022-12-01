import { StackActions } from '@react-navigation/native'
import { injectable } from 'inversify'

import { navigation } from '../Container'
import type { Screens } from '../types'

import type { StackNavigationService } from './types'

@injectable()
export class NativeNavigationService implements StackNavigationService {
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
}
