import React, { memo } from 'react'
import { ActivityIndicator, View } from 'react-native'

import { styles } from './styles'

export const Loader = memo(() => (
  <View style={styles.container}>
    <ActivityIndicator animating size='large' />
  </View>
))
