import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { type FC } from 'react'

import {
  CurrenciesScreen,
  currenciesScreenOptions,
  CurrencyRateScreen,
  currencyRateScreenOptions,
  type CurrencyRateScreenProps,
} from '~currencies'

import { ScreenConfig, Screens, StackScreenOptions } from './types'

export type MainStackParamList = {
  [Screens.Currencies]: undefined
  [Screens.CurrencyRate]: CurrencyRateScreenProps
}

export type MainStackScreenConfig = ScreenConfig &
  StackScreenOptions<MainStackParamList, Screens.Currencies | Screens.CurrencyRate>

export const mainStackScreens: MainStackScreenConfig[] = [
  {
    name: Screens.Currencies,
    Screen: CurrenciesScreen,
    options: currenciesScreenOptions,
  },
  {
    name: Screens.CurrencyRate,
    Screen: CurrencyRateScreen,
    options: currencyRateScreenOptions,
  },
]

const Stack = createNativeStackNavigator<MainStackParamList>()

interface MainStackProps {
  screens: MainStackScreenConfig[]
}

export const MainStackId = 'MainStack'

export const MainStack: FC<MainStackProps> = ({ screens }) => (
  <Stack.Navigator id='MainStack'>
    {screens.map(({ name, Screen, options }) => (
      <Stack.Screen key={name} navigationKey={name} name={name} component={Screen} options={options} />
    ))}
  </Stack.Navigator>
)
