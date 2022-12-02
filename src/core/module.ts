import type { CurrenciesModule } from '~currencies'
import type { NavigationModule } from '~navigation'

import type { ModuleFactory } from './types'

export interface Core {
  navigationModule: NavigationModule
  currenciesModule: CurrenciesModule
}

interface CoreInit {
  navigationModuleFactory: ModuleFactory<NavigationModule>
  currenciesModuleFactory: ModuleFactory<CurrenciesModule>
}

export class CoreImpl implements Core {
  private navigationModuleFactory: CoreInit['navigationModuleFactory']
  private _navigationModule: NavigationModule | null = null

  get navigationModule() {
    if (!this._navigationModule) {
      this._navigationModule = this.navigationModuleFactory()
    }

    return this._navigationModule
  }

  private currenciesModuleFactory: CoreInit['currenciesModuleFactory']
  private _currenciesModule: CurrenciesModule | null = null

  get currenciesModule() {
    if (!this._currenciesModule) {
      this._currenciesModule = this.currenciesModuleFactory()
    }

    return this._currenciesModule
  }

  private static _sharedInstance: Core | null = null
  private static initConfig: CoreInit | null = null

  static get sharedInstance() {
    if (!this.initConfig) {
      throw new Error()
    }

    if (!this._sharedInstance) {
      this._sharedInstance = new CoreImpl(this.initConfig)
    }
    return this._sharedInstance
  }

  static init = (config: CoreInit) => {
    this.shutdown()
    this.initConfig = config
  }

  static shutdown = () => {
    if (this._sharedInstance) {
      this._sharedInstance = null
    }
  }

  private constructor({ navigationModuleFactory, currenciesModuleFactory }: CoreInit) {
    this.navigationModuleFactory = navigationModuleFactory
    this.currenciesModuleFactory = currenciesModuleFactory
  }
}
