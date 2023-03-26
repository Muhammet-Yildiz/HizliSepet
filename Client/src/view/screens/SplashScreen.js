import React from 'react'
import { View,ActivityIndicator } from 'react-native'
import COLORS from '../../consts/colors'

const SplashScreen = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: COLORS.green}}>
        <ActivityIndicator size="large" color={COLORS.white} />
    </View>
  )
}

export default SplashScreen
