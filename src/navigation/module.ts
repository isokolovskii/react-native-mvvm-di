import type { DrawerNavigationService, StackNavigationService, TabNavigationService } from './services'

export interface NavigationModule {
  navigationService: StackNavigationService & DrawerNavigationService & TabNavigationService
}

interface NavigationModuleInit {
  NavigationService: {
    new (): NavigationModule['navigationService']
  }
}

export class NavigationModuleImpl implements NavigationModule {
  private NavigationService: NavigationModuleInit['NavigationService']
  private _navigationService: (StackNavigationService & DrawerNavigationService & TabNavigationService) | null = null

  get navigationService() {
    if (!this._navigationService) {
      this._navigationService = new this.NavigationService()
    }

    return this._navigationService
  }

  private static _sharedInstance: NavigationModule | null = null
  private static initConfig: NavigationModuleInit | null = null

  static get sharedInstance() {
    if (!this.initConfig) {
      throw new Error()
    }

    if (!this._sharedInstance) {
      this._sharedInstance = new NavigationModuleImpl(this.initConfig)
    }

    return this._sharedInstance
  }

  static init = (config: NavigationModuleInit) => {
    this.shutdown()
    this.initConfig = config
  }

  static shutdown = () => {
    if (this._sharedInstance) {
      this._sharedInstance = null
    }
  }

  private constructor({ NavigationService }: NavigationModuleInit) {
    this.NavigationService = NavigationService
  }
}
