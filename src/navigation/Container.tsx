import { NavigationContainer } from '@react-navigation/native'
import React, { FC, type ReactNode } from 'react'

interface NavigationContainerProps {
  children: ReactNode
}

export const AppNavigationContainer: FC<NavigationContainerProps> = ({ children }) => (
  <NavigationContainer>{children}</NavigationContainer>
)
