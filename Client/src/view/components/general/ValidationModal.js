import React from 'react'
import { ConfirmDialog } from 'react-native-simple-dialogs'

const ValidationModal = ({message,visibility ,close}) => {
    return (
        <ConfirmDialog
            message={message}
            messageStyle={{ fontSize: 15 ,lineHeight: 25 ,color :'#adacac'}}
            visible={visibility}
            onTouchOutside={close}
            animationType='fade'
            positiveButton={{
                title: "TAMAM",
                onPress: () => {
                    close()
                },
                titleStyle: { color: 'green' },
            }}
        />
    )
}

export default ValidationModal