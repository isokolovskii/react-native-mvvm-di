import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { type FC } from 'react'

import type { ScreenConfig } from './types'

const Stack = createNativeStackNavigator()

interface MainStackProps {
  screens: ScreenConfig[]
}

export const MainStack: FC<MainStackProps> = ({ screens }) => (
  <Stack.Navigator>
    {screens.map(({ name, Screen }) => (
      <Stack.Screen key={name} navigationKey={name} name={name} component={Screen} />
    ))}
  </Stack.Navigator>
)
