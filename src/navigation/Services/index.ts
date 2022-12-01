import { NativeNavigationService } from './Service'

export const navigationService = Symbol.for(NativeNavigationService.name)
export type { StackNavigationService, DrawerNavigationService, TabNavigationService } from './types'
