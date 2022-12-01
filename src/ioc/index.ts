import { Container } from 'inversify'

import 'reflect-metadata'
import { currenciesModule } from '~currencies'
import { navigationModule } from '~navigation'

const container = new Container()
container.load(currenciesModule)
container.load(navigationModule)

export { container }
