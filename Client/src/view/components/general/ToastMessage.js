import React from 'react'
import { View, Text } from 'react-native'
const ToastMessage = ({ text1 ,bgColor}) => {
    return (
        <View style={{
            height: 50, width: '100%', backgroundColor: bgColor,
            bottom: -10,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 20,
        }}
        >
            <Text
                style={{ color: 'white', fontSize: 14 }}
            >
                {text1}
            </Text>
        </View>
    )
}

export default ToastMessage
