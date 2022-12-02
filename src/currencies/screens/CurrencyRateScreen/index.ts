import type { MainStackScreenConfig } from '~navigation'

export const currencyRateScreenOptions: MainStackScreenConfig['options'] = ({ route: { params } }) => ({
  title: params?.title,
})

export { View as CurrencyRateScreen, type ViewProps as CurrencyRateScreenProps } from './View'
