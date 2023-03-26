import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import COLORS from '../../../consts/colors'
import { NGROK_URL } from '@env'

const ColorOptionsSection = ({colorOptions,navigation,product}) => {
    return (
        <View style={styles.chooseColorSection} >
        <View style={styles.headerColorSec}>
            <Text style={styles.colorTxt}  >
                Renk
            </Text>
            <Text style={[styles.colorTxt, {
                fontSize: 12
            }]} >
                {colorOptions.length} Farklı Renk
            </Text>
        </View>
        <View style={styles.colorOptions} >
            {
                colorOptions.map((item, index) => (

                    <View
                        onTouchStart={() => {
                            navigation.push('Details', { productId: item._id })
                        }}
                       style={[styles.colorOption,
                        {
                            borderWidth: 1,
                            borderColor: item._id === product._id ? COLORS.green : '#dedede'
                        } 

                        ]}
                        key={index}
                    >

                        <Image
                            source={{ uri: `${NGROK_URL}/uploads/${item?.images[0]}` }}
                            style={styles.colorOptionImage}
                        />
                    </View>
                ))
            }
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    chooseColorSection: {
        height: 205,
        backgroundColor: COLORS.white,
        marginTop: 20,
        paddingHorizontal: 12,
        elevation: 2,
    },
    colorOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    colorOption: {
        height: '80%',
        width: 110,
        borderRadius: 8,
        marginRight: 20,
    },
    colorOptionImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    colorTxt: {
        fontSize: 14, fontWeight: '500', paddingVertical: 13, color: '#2C2E43'
    },
    headerColorSec: {
        borderBottomColor: '#eee', borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
   
})

export default ColorOptionsSection