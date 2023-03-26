import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import COLORS from '../../../consts/colors';
import { StoreState } from '../../../Context/StoreContext';
import { MaterialCommunityIcons, AntDesign, Ionicons } from 'react-native-vector-icons'
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { NGROK_URL } from '@env'
import { ProductsState } from '../../../Context/ProductContext';

const BasketItem = ({ item, navigation }) => {
    const { editTimestamp } = ProductsState()
    const bottomSheet = useRef(null);
    const { increaseQuantity, decreaseQuantity, setTotalPrice, setBasketItemsLength, deleteBasketItem } = StoreState()
    const [quantity, setQuantity] = useState(item.quantity)
    const [itemVisiblity, setItemVisiblity] = useState(true)

    useEffect(() => {
        setQuantity(item.quantity)
        setItemVisiblity(item.quantity > 0 ? true : false)
    }, [item])

    return (
        <>
            <BottomSheet ref={bottomSheet} height={220}
                radius={1}
            >
                <View style={styles.bottomSheet}>
                    <View style={styles.bottomSheetContent}>
                        <Text style={styles.bottomSheetTitle}>

                            {
                                item.product.name.length > 55 ?
                                    item.product.name.substring(0, 55) + '...' :
                                    item.product.name
                            }

                        </Text>

                        <View >

                            <TouchableOpacity >
                                <View style={styles.bottomSheetButton}>
                                    <AntDesign name="heart" size={24} color="gray"
                                        style={{ marginRight: 27 }}
                                    />


                                    <Text style={styles.bottomSheetButtonText}> Sil ve Favorilere Ekle </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity

                                onPress={() => {
                                    deleteBasketItem(item._id)
                                    bottomSheet.current.close()
                                }}
                            >
                                <View style={styles.bottomSheetButton}>
                                    <MaterialCommunityIcons name="delete" size={30} color="gray"
                                        style={{ marginRight: 25 }}
                                    />

                                    <Text style={styles.bottomSheetButtonText}>
                                        Sil
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    bottomSheet.current.close()
                                }}
                            >
                                <View >
                                    <Text style={styles.bottomSheetCancelBtn}>

                                        Vazgeç
                                    </Text>
                                </View>

                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </BottomSheet>
            {itemVisiblity &&
                <View style={styles.cardItem}>
                    <View style={styles.itemImageWrap}>
                        <Image
                            source={{ uri: `${NGROK_URL}/uploads/${item?.product?.images[0]}` }}
                            style={styles.itemImage}
                        />
                    </View>
                    <View style={styles.itemInfoWrap}>
                        <View style={[styles.flex, {
                            height: 30,
                        }
                        ]} >
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    navigation.navigate('Details', { productId: item.product._id })

                                }}
                            >
                                <Text style={{ fontWeight: 'bold', color: '#6d6d6e', fontSize: 12 }}  >
                                    <Text style={{ color: '#343A40' }}>
                                        {item?.product?.banner.name}
                                    </Text> {
                                        item.product.name.length > 29 ?
                                            item.product.name.substring(0, 29) + "..."
                                            :
                                            item.product.name
                                    }
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => bottomSheet.current.show()}
                            >
                                <Ionicons
                                    name="trash-sharp"
                                    size={19}
                                />

                            </TouchableOpacity>

                        </View>
                        <View  >
                            {item.selectedSize && <Text style={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                color: '#898B8A',
                            }} >
                                {
                                    item?.product.subCategory?.name === 'Telefon' && 'Dahili Hafıza' ||
                                    item?.product.subCategory?.name === 'Tablet' && 'Kapasite' ||
                                    'Beden'
                                } : {item.selectedSize}
                            </Text>}

                            <View style={[styles.flex, {
                                justifyContent: 'flex-start',
                                marginTop: 4,
                                height: 25
                            }]}>

                                <Text style={{ fontSize: 11, color: '#898B8A' }} >

                                    Tahmini Teslimat Tarihi :  {editTimestamp(Date.now(), item?.product?.banner?.shippingTime)}
                                </Text>
                            </View>

                        </View>

                        <View style={styles.flex} >

                            <View style={styles.incrDecrButton} >
                                <TouchableOpacity
                                    onPress={() => {
                                        decreaseQuantity(item._id)
                                        setTotalPrice((prev) => prev - item.product.price)
                                        setQuantity(quantity - 1)
                                        if (quantity <= 1) {
                                            setItemVisiblity(false)
                                            setBasketItemsLength((prev) => prev - 1)
                                        }
                                    }}
                                    disabled={quantity <= 1 ? true : false}

                                >
                                    <View
                                        style={styles.btn}
                                    >
                                        <FontAwesome5
                                            name="minus"
                                            size={11}
                                            color={
                                                quantity <= 1 ?
                                                    '#D3D3D3'
                                                    :
                                                    COLORS.green
                                            }
                                        />
                                    </View>
                                </TouchableOpacity>

                                <Text style={styles.itemQuantity}>
                                    {quantity}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        increaseQuantity(item._id)
                                        setQuantity(quantity + 1)
                                        setTotalPrice((prev) => prev + item.product.price)
                                    }}
                                >
                                    <View style={styles.btn}

                                    >
                                        <FontAwesome5
                                            name="plus"
                                            size={11}
                                            color={COLORS.green}

                                        />
                                    </View>
                                </TouchableOpacity>

                            </View>
                            <Text style={{
                                fontWeight: 'bold', color: COLORS.green,
                                marginTop: 8,
                                fontSize: 13,
                            }}>
                                {(item.product.price * quantity).toFixed(2)}  TL
                            </Text>
                        </View>

                    </View>

                </View>}
        </>
    )
}

const styles = StyleSheet.create({
    cardItem: {
        padding: 4,
        margin: 10,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        height: 154,
        marginBottom: 8,
        backgroundColor: '#fdfdfd',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    itemInfoWrap: {
        display: 'flex',
        flexDirection: 'column',
        width: 265,
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    itemImageWrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    itemImage: {
        width: 98,
        height: '100%',
        marginRight: 12,
        resizeMode: 'contain',
        height: 115,
    },
    incrDecrButton: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: 100,
        paddingVertical: 0,
        paddingHorizontal: 7,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#dedede',
        alignItems: 'center',
        height: 37,
    },
    itemQuantity: {
        fontWeight: 'bold',
        color: COLORS.green,
        backgroundColor: '	rgba(0,128,0,0.1)',
        padding: 7,
        borderRadius: 20,
        width: 30,
        height: 30,
        fontSize: 12,
        textAlign: 'center',
        alignSelf: 'center',
    },
    btn: {
        height: '100%',
        width: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 41,
        width: Dimensions.get('window').width - 150
    },

    bottomSheetContent: {
        height: '100%',
    },
    bottomSheetTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        paddingLeft: 15,
        marginBottom: 10,
        paddingVertical: 15,
        backgroundColor: '#EEEEEE',
        color: '#7F7C82',
    },
    bottomSheetButton: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomSheetButtonText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#7F7C82',
    },
    bottomSheetCancelBtn: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        textAlign: 'center',
        borderTopColor: '#EEEEEE',
        borderTopWidth: 1,
    }

})

export default BasketItem