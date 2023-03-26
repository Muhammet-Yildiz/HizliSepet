import React, { useState,   useRef } from 'react'
import { View, StyleSheet, Text,   Image, Dimensions, TouchableOpacity } from 'react-native'
import COLORS from '../../../consts/colors'
import CartBottomSheet from '../general/CartBottomSheet';
import { NGROK_URL } from '@env'

const RecommendBasketItem = ({ item, navigation }) => {
    const bottomSheet = useRef(null);
    const [selectedSize, setSelectedSize] = useState(item?.sizes[0])

    return (
        <>
            <CartBottomSheet
                bottomSheet={bottomSheet}
                product={item}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                navigation={navigation}
            />
            <View style={styles.recommendItem}>
                <View
                    style={styles.imageWrapper}

                >
                    <Image
                            source={{ uri: `${NGROK_URL}/uploads/${item?.images[0]}` }}
                        style={styles.image}
                    />
                </View>


                <View style={styles.productInfoWrapper}>
                    <Text style={styles.productName}>
                        <Text style={{ color: '#666565' }} >{item?.seller}</Text> {item?.name.substring(0, 65)}{item.name.length > 65 && '...'}
                    </Text>

                    <View style={styles.flex}>
                        <Text style={styles.productPrice} >
                            {item?.price} TL
                        </Text>

                        <TouchableOpacity
                        activeOpacity={0.8}
                            onPress={() => {
                                bottomSheet.current.show()
                            }}
                        >
                            <Text style={styles.addBasketText} >
                                Sepete Ekle
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </View>
        </>
    )
}


const styles = StyleSheet.create({
    recommendItem: {
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 7,
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 1,
        paddingBottom: 12,
    },
    imageWrapper: {
        width: 95,
        height: 95,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 75,
        height: 75,
        resizeMode: 'contain',
    },
    productInfoWrapper: {
        width: Dimensions.get('window').width - 130,
        paddingHorizontal: 10,
        height: '100%',
        paddingTop: 10,
        paddingBottom: 5,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    productName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#8c8c8c',
        lineHeight: 16,
        paddingHorizontal: 2,
        marginBottom: 5,
        height: 37,
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    productPrice: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.green,
        paddingLeft: 2,
        alignSelf: 'flex-end',
    },
    addBasketText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: COLORS.green,
        borderWidth: 1,
        borderColor: COLORS.green,
        paddingHorizontal: 14,
        paddingVertical: 4,
        borderRadius: 5,
        elevation: 1,
        backgroundColor: 'white',
        textAlign: 'center',
    },
})


export default RecommendBasketItem