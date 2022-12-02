import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native'
import React, { FC, type ReactNode } from 'react'

import type { MainStackParamList } from './MainStack'

interface NavigationContainerProps {
  children: ReactNode
}

export const navigation = createNavigationContainerRef<MainStackParamList>()

export const AppNavigationContainer: FC<NavigationContainerProps> = ({ children }) => (
  <NavigationContainer ref={navigation}>{children}</NavigationContainer>
)
