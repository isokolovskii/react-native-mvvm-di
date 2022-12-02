import type { CurrenciesModule } from '~currencies'
import type { NavigationModule } from '~navigation'

export interface Core {
  navigationModule: NavigationModule
  currenciesModule: CurrenciesModule
}

export class CoreImpl {
  readonly navigationModule: NavigationModule
  readonly currenciesModule: CurrenciesModule

  private static _sharedInstance: Core | null

  static get sharedInstance() {
    if (!this._sharedInstance) {
      throw new Error()
    }
    return this._sharedInstance
  }

  static init(config: Core) {
    if (!this._sharedInstance) {
      this._sharedInstance = new CoreImpl(config)
    }
  }
  private constructor({ navigationModule, currenciesModule }: Core) {
    this.navigationModule = navigationModule
    this.currenciesModule = currenciesModule
  }
}
