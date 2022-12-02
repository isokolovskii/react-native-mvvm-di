import currenciesModuleFactory from '~currencies'
import navigationModuleFactory from '~navigation'

import { type Core, CoreImpl } from './module'

CoreImpl.init({ navigationModuleFactory, currenciesModuleFactory })
const core = CoreImpl

export { type Core, core }
export type { ModuleFactory } from './types'
