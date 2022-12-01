import { Container } from 'inversify'

import 'reflect-metadata'
import { currenciesModule } from '~currencies'

const container = new Container()
container.load(currenciesModule)

export { container }
