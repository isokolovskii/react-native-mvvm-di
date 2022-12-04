import type { CurrenciesModule } from '~currencies'
import type { NavigationModule } from '~navigation'

import type { ModuleFactory } from './types'

interface CoreInit {
  navigationModuleFactory: ModuleFactory<NavigationModule>
  currenciesModuleFactory: ModuleFactory<CurrenciesModule>
}
export interface Core {
  navigationModule: NavigationModule
  currenciesModule: CurrenciesModule
  init: (config: CoreInit) => void
}

export class CoreImpl implements Core {
  private navigationModuleFactory!: CoreInit['navigationModuleFactory']
  private _navigationModule: NavigationModule | null = null

  get navigationModule() {
    if (!this._navigationModule) {
      this._navigationModule = this.navigationModuleFactory()
    }

    return this._navigationModule
  }

  private currenciesModuleFactory!: CoreInit['currenciesModuleFactory']
  private _currenciesModule: CurrenciesModule | null = null

  get currenciesModule() {
    if (!this._currenciesModule) {
      this._currenciesModule = this.currenciesModuleFactory()
    }

    return this._currenciesModule
  }

  init = ({ navigationModuleFactory, currenciesModuleFactory }: CoreInit) => {
    this._navigationModule = null
    this.navigationModuleFactory = navigationModuleFactory

    this._currenciesModule = null
    this.currenciesModuleFactory = currenciesModuleFactory
  }

  private static _sharedInstance: Core | null = null

  static get sharedInstance() {
    if (!CoreImpl._sharedInstance) {
      CoreImpl._sharedInstance = new CoreImpl()
    }
    return CoreImpl._sharedInstance
  }
}
