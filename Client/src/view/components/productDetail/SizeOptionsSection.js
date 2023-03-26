import React from 'react'
import { View,  StyleSheet, Text, ScrollView,TouchableOpacity } from 'react-native'
import COLORS from '../../../consts/colors'

const SizeOptionsSection = ({product,selectedSize,setSelectedSize}) => {
    return (
        <View style={styles.chooseSizeSection} >
            <Text style={styles.sizeTxt}  >
                {product.subCategory.name === 'Ayakkabı' && 'Ayakkabı Numarası' ||
                    product.subCategory.name === 'Telefon' && 'Dahili Hafıza'  ||
                    product.subCategory.name === 'Tablet' && 'Kapasite' ||
                    'Beden' 
            }
            </Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                    marginTop: 10,
                    borderRadius: 5
                }}
            >
                {product?.sizes?.map((size, index) => (
                    <TouchableOpacity style={size === selectedSize ? [styles.sizeBtn, styles.activeSizeBtn] : styles.sizeBtn} key={index}
                        activeOpacity={0.8}
                        onPress={() => setSelectedSize(size)}
                    >
                        <Text style={{ fontSize: 13, color: 'gray', fontWeight: '500' }} >
                            {size}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    chooseSizeSection: {
        height: 125,
        backgroundColor: COLORS.white,
        marginTop: 20,
        marginBottom: 0,
        paddingHorizontal: 12,
        elevation: 2,

    },
    sizeTxt: {
        fontSize: 14, fontWeight: '500', paddingVertical: 13, color: '#2C2E43'
        , borderBottomColor: '#eee', borderBottomWidth: 1
    },
    sizeBtn: {
        paddingHorizontal: 10,
        borderRadius: 5,
        marginVertical: 10,
        marginRight: 14,
        borderWidth: 1,
        borderColor: 'gray',
        height: 39,
        width: 'auto',
        minWidth: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeSizeBtn: {
        backgroundColor: 'rgba(16, 176, 2,0.1  )',
        borderColor: COLORS.green,
    },

})

export default SizeOptionsSection
