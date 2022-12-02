import { currenciesModule } from '~currencies'
import { navigationModule } from '~navigation'

import { type Core, CoreImpl } from './core'

CoreImpl.init({ navigationModule, currenciesModule })
const core = CoreImpl.sharedInstance

export { type Core, core }
