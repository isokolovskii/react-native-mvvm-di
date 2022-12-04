import type { DrawerNavigationService, StackNavigationService, TabNavigationService } from './services'

interface NavigationModuleInit {
  NavigationService: {
    new (): NavigationModule['navigationService']
  }
}
export interface NavigationModule {
  navigationService: StackNavigationService & DrawerNavigationService & TabNavigationService
  init: (config: NavigationModuleInit) => void
}

export class NavigationModuleImpl implements NavigationModule {
  private NavigationService!: NavigationModuleInit['NavigationService']
  private _navigationService: (StackNavigationService & DrawerNavigationService & TabNavigationService) | null = null

  get navigationService() {
    if (!this._navigationService) {
      this._navigationService = new this.NavigationService()
    }

    return this._navigationService
  }

  init = ({ NavigationService }: NavigationModuleInit) => {
    this._navigationService = null
    this.NavigationService = NavigationService
  }

  private static _sharedInstance: NavigationModule | null = null

  static get sharedInstance() {
    if (!NavigationModuleImpl._sharedInstance) {
      NavigationModuleImpl._sharedInstance = new NavigationModuleImpl()
    }

    return NavigationModuleImpl._sharedInstance
  }
}
