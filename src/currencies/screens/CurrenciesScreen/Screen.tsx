import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { type FC } from 'react'

import type { MainStackParamList, MainStackScreenConfig, Screens } from '~navigation'
import { Loader } from '~shared'

const View = React.lazy(() => import('./View'))

export const CurrenciesScreen: FC<NativeStackScreenProps<MainStackParamList, Screens.Currencies>> = () => (
  <React.Suspense fallback={<Loader />}>
    <View />
  </React.Suspense>
)

export type CurrenciesScreenProps = undefined

export const currenciesScreenOptions: MainStackScreenConfig['options'] = {
  title: 'Currencies',
}
