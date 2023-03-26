import React from 'react'
import BottomSheet from 'react-native-gesture-bottom-sheet'
import COLORS from '../../../consts/colors'
import { Ionicons  } from 'react-native-vector-icons'
import { Image, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { StoreState } from '../../../Context/StoreContext'
import {NGROK_URL} from '@env'

const CartBottomSheet = ({ product, bottomSheet, selectedSize, setSelectedSize, navigation}) => {
    const { addToBasket } = StoreState();

    return (
        <BottomSheet ref={bottomSheet} height={selectedSize ? 405 : 285} 
            radius={1}
        >
            <View style={styles.bottomSheet}>
                <View style={styles.bottomSheetHeader}>
                    <View style={styles.bottomSheetHandle}>
                    </View>
                </View>
                <View style={styles.bottomSheetContent}>

                    <View style={styles.productInfoWrapper}>
                        {product.images &&
                            <View style={styles.imgWrapper} >
                                <Image
                                    source={{ uri: `${NGROK_URL}/uploads/${product.images[0]}` }}
                                    style={{
                                        width: '100%', height: '100%',
                                        resizeMode: 'contain'
                                    }}
                                />
                            </View>
                        }
                        <View style={styles.productInfo}>
                            <View style={styles.flex} >
                                <Text
                                    style={styles.productBrand}
                                >
                                    {product.seller}
                                </Text>
                                <Ionicons
                                    name="close"
                                    size={27}
                                    color={COLORS.grey}
                                    onPress={() => bottomSheet.current.close()}
                                    style={{ marginRight: 20 }}
                                />
                            </View>

                            <Text style={styles.productname}  >
                                {
                                    product?.name?.length > 32 ?
                                        product.name.substring(0, 32) + '...' :
                                        product.name
                                }

                            </Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginVertical:6
                                    }} >
                                         <Text
                                style={{
                                    marginRight: 5,
                                    fontSize: 13
                                }}
                            >
                               Satıcı :
                            </Text>
                            <Text
                                style={{
                                    fontWeight: 'bold', color: '#4d8ee1', marginRight: 5,
                                    fontSize: 13
                                }}
                            >
                                {product?.seller}

                            </Text>
                            <Ionicons
                                name="md-checkmark-circle"
                                size={15}
                                style={{
                                    color: '#4d8ee1',
                                }}
                            />
                            </View>
                            <View style={[styles.flex, {
                                justifyContent: 'flex-start',
                                marginVertical: 8
                            }]} >
                                <Text
                                    style={{
                                        color: COLORS.green,
                                        marginRight: 5,
                                        fontSize: 12
                                    }} >
                                    Hızlı Teslimat :
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 'bold',
                                        color: '#41444B'
                                    }}
                                >
                                    2 gün içinde kargoda
                                </Text>
                            </View>

                            <Text style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                marginTop: 10,
                                color: COLORS.green
                            }} >
                                {product.price} TL
                            </Text>

                        </View>

                    </View>

                    {product?.sizes?.length > 0 &&
                        <View style={[styles.chooseSizeSection, {
                            elevation: 0,
                            marginTop: 8,
                            paddingLeft: 17,
                        }]} >
                            <Text style={[styles.sizeTxt, {
                                fontSize: 15,
                            }]}  >
                                Beden
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
                    }
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {

                            addToBasket({ productId: product._id, selectedSize })
                            navigation.navigate('Basket')
                            bottomSheet.current.close()
                        }}
                    >
                        <Text style={styles.addToCart}>
                            Sepete Ekle

                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottomSheetContent: {
        backgroundColor: 'white',
        height: '100%',
    },
    productInfoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 195,
        paddingTop: 15,
    },
    imgWrapper: {
        width: '37%',
        height: '100%',
        padding: 6,
        marginRight: 10,
    },
    productInfo: {
        height: '100%',
        paddingVertical: 10,
        width: '61%',
    },
    productBrand: {
        fontSize: 15,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#343A40',
        fontFamily: 'sans-serif-medium',
        marginBottom: 8,
    },
    productname: {
        marginBottom: 8,
        fontSize: 12,
        color: 'gray',
        fontFamily: 'sans-serif-medium',
    },
  
    addToCart: {
        backgroundColor: COLORS.green,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 5,
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 20,
        marginHorizontal: 17,
    },
    chooseColorSection: {
        height: 205,
        backgroundColor: COLORS.white,
        marginTop: 30,
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
    chooseSizeSection: {
        height: 125,
        backgroundColor: COLORS.white,
        marginTop: 30,
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

export default CartBottomSheet