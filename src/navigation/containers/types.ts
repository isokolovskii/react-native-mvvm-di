import type { RouteProp, ParamListBase } from '@react-navigation/native'
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import type { ComponentType } from 'react'

export enum Screens {
  Currencies = 'CurrenciesScreen',
  CurrencyRate = 'CurrencyRateScreen',
}

export interface ScreenConfig {
  name: Screens
  Screen: ComponentType<any>
}

export interface StackScreenOptions<ParamList extends ParamListBase, Screens extends keyof ParamList> {
  options?:
    | NativeStackNavigationOptions
    | ((props: { route: RouteProp<ParamList, Screens> }) => NativeStackNavigationOptions)
}
