import React from 'react'
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native'
import { Octicons, Entypo } from 'react-native-vector-icons'
import COLORS from '../../../consts/colors'
import { ProductsState } from '../../../Context/ProductContext'
import { NGROK_URL } from '@env'

const DeliveryOptions = ({ deliveryItems }) => {
    const { editTimestamp } = ProductsState()

    return (

        <View style={styles.deliveryOptions}
        >
            <Text style={[styles.headText, {
                fontSize: 14,
                fontWeight: 'bold',
                color: COLORS.green,
                marginBottom: 20,
                paddingBottom: 15,
                borderBottomColor: 'rgba(0,0,0,0.05)',
                borderBottomWidth: 1,
            }]} >Teslimat Seçenekleri
            </Text>
            {
                Object.keys(deliveryItems).map((item, index) => (

                    <View style={styles.deliveryProductWrap} key={index} >

                        <View style={styles.sellerInfo}  >
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    color: '#434242',
                                    marginRight: 6,
                                    fontSize: 12,
                                }}
                            >
                                {item}

                            </Text>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    color: 'gray',
                                    fontSize: 12,
                                }}
                            >
                                tarafından gönderilecek ürünler
                            </Text>
                        </View>
                        {deliveryItems[item].products.map((obj, index) => (

                            <View style={styles.deliveryProduct} key={index} >
                                <View style={styles.productImage}  >
                                    {
                                        obj.quantity > 1 &&
                                        <Text style={styles.productQuantity}>
                                            x{obj.quantity}
                                        </Text>
                                    }

                                    <Image
                                        source={{ uri: `${NGROK_URL}/uploads/${obj?.product?.images[0]}` }}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            resizeMode: 'contain',
                                        }}
                                    />
                                </View>

                                <View style={styles.productInfoWrap}  >
                                    <Text style={styles.productName} >
                                        {obj.product.name}
                                    </Text>

                                    <View style={styles.productInfo} >
                                        {obj.selectedSize && <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    marginRight: 6,
                                                }}
                                            >
                                                Beden :
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                    color: '#4d8ee1'
                                                }}
                                            >
                                                {obj.selectedSize}
                                            </Text>

                                        </View>}

                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 5,
                                        }} >
                                            <Text
                                                style={{
                                                    fontSize: 11,
                                                    marginRight: 8,
                                                }}
                                            >
                                                Tahmini kargoya verilme tarihi :
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    fontWeight: 'bold',
                                                    textDecorationLine: 'underline',
                                                    color: COLORS.green,
                                                    letterSpacing: 0.3,
                                                }}
                                            >
                                                {
                                                    editTimestamp(Date.now(), obj?.product?.banner?.shippingTime, "exactDate")
                                                }
                                            </Text>
                                        </View>
                                    </View>

                                </View>

                            </View>

                        ))}


                        <View style={styles.deliveryInfoWrap} >

                            <Octicons
                                name="check-circle-fill"
                                size={25}
                                color={COLORS.green}
                                style={{
                                    marginRight: 20,
                                }}
                            />
                            <View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginRight: 10,
                                            fontSize: 13,
                                            fontWeight: 'bold',
                                            color: 'gray',
                                        }}
                                    >
                                        Standart Teslimat
                                    </Text>
                                    <Entypo
                                        name="info-with-circle"
                                        size={14}
                                        color={'gray'}
                                    />
                                </View>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 6,
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginRight: 6,
                                            fontSize: 11,
                                        }}
                                    >
                                        Tahmin teslim :
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            fontWeight: 'bold',
                                            textDecorationLine: 'underline',
                                            color: COLORS.green,
                                            letterSpacing: 0.3,
                                        }}
                                    >
                                        {
                                            editTimestamp(Date.now(), deliveryItems[deliveryItems[item]?.seller]?.products[0]?.product?.banner?.deliveryTime, "exactDate")
                                        }
                                    </Text>
                                </View>

                            </View>
                        </View>

                    </View>
                ))}

        </View>
    )
}


const styles = StyleSheet.create({
    deliveryOptions: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingTop: 25,
    },
    headText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'gray',
        marginBottom: 15,
    },
    deliveryProductWrap: {
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 10,
        marginBottom: 25,
    },
    sellerInfo: {
        backgroundColor: 'rgba(238, 238, 238,0.7)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 11,
        paddingHorizontal: 15,
    },
    deliveryProduct: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 5,
        paddingHorizontal: 15,
    },

    productImage: {
        borderWidth: 1,
        borderColor: 'rgb(225, 225, 225)',
        height: 65,
        width: 68,
        borderRadius: 10,
        marginRight: 20,

    },

    productInfoWrap: {
        width: Dimensions.get('window').width - 150,
    },
    productName: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#434242',
        marginBottom: 6,
    },
    deliveryInfoWrap: {
        backgroundColor: 'rgba(238, 238, 238,0.7)',
        paddingHorizontal: 25,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15,
        borderRadius: 10,
    },
    productQuantity: {
        position: 'absolute',
        top: -8,
        left: -12,
        backgroundColor: 'red',
        borderRadius: 50,
        textAlign: 'center',
        zIndex: 1,
        width: 22,
        height: 22,
        padding: 2,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 10,
    },
})

export default DeliveryOptions