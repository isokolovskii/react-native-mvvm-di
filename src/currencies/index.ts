import type { ModuleFactory } from '~core'

import type { CurrenciesModule } from './module'

const moduleFactory: ModuleFactory<CurrenciesModule> = () => {
  const { CurrenciesModuleImpl } = require('./module')
  const { CurrenciesDataSourceImpl } = require('./data')
  const { CurrenciesApiClientImpl } = require('./api')

  CurrenciesModuleImpl.sharedInstance.init({ ApiClient: CurrenciesApiClientImpl, DataSource: CurrenciesDataSourceImpl })

  return CurrenciesModuleImpl.sharedInstance
}

export default moduleFactory

export { type CurrenciesModule }
export * from './screens'
