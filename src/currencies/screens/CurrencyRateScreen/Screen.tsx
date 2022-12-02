import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { type FC } from 'react'

import type { Currency } from '~currencies/api'
import type { MainStackParamList, MainStackScreenConfig, Screens } from '~navigation'

const View = React.lazy(() => import('./View'))

export const CurrencyRateScreen: FC<NativeStackScreenProps<MainStackParamList, Screens.CurrencyRate>> = ({
  route: { params },
}) => (
  <React.Suspense>
    <View {...params} />
  </React.Suspense>
)

export interface CurrencyRateScreenProps {
  currency: Currency
  title: string
  fetchCurrencyName: (currency: Currency) => string
}

export const currencyRateScreenOptions: MainStackScreenConfig['options'] = ({ route: { params } }) => ({
  title: params?.title,
})
