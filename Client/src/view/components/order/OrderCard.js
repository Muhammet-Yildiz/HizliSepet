import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import COLORS from '../../../consts/colors'
import { AntDesign, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { NGROK_URL } from '@env'
import { MONTHS } from '../../../consts/time';

const OrderCard = ({ order, navigation }) => {
    const [orderStatus, setOrderStatus] = useState('Siparişiniz Hazırlanıyor')
    const [shippingTime, setShippingTime] = useState(0)
    const [deliveryTime, setDeliveryTime] = useState(0)
    const [deliveryCount, setDeliveryCount] = useState(0)
    const [shippingCount, setShippingCount] = useState(0)

    const editOrderDate = (timestamp, addDay = 0) => {
        const date = new Date(timestamp);
        date.setTime(date.getTime() + (addDay * 24 * 60 * 60 * 1000))
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();

        return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year} ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
    }

    const editTimestamp = (timestamp) => {
        return timestamp.split('T')[0].split('-').reverse().join(' ').replace(
            timestamp.split('T')[0].split('-').reverse().join(' ').split(' ')[1],
            MONTHS[timestamp.split('T')[0].split('-').reverse().join(' ').split(' ')[1] - 1]
        )
    }
    useEffect(() => {
        order?.orderItems.map(item => {

            if (item.product.banner.shippingTime > shippingTime) {
                setShippingTime(item.product.banner.shippingTime)
            }
            if (item.product.banner.deliveryTime > deliveryTime) {
                setDeliveryTime(item.product.banner.deliveryTime)
            }
        })

    }, [order])

    useEffect(() => {

        order?.orderItems.map(item => {
            if (
                order?.order.dateOrdered && editOrderDate(Date.now()) > editOrderDate(order?.order.dateOrdered, item.product.banner.deliveryTime)
            ) {
                setOrderStatus('Teslim edildi')
                setDeliveryCount((deliveryCount) => (deliveryCount + 1))
            }
            else if (
                editOrderDate(Date.now()) > editOrderDate(order.order.dateOrdered, item.product.banner.shippingTime)
            ) {
             
                setShippingCount((shippingCount) => (shippingCount + 1))
                setOrderStatus('Kargoya verildi')
            }
            else {
                setOrderStatus('Siparişiniz Hazırlanıyor')
            }

        })

    }, [])


    return (
        <View style={styles.orderContainer}  >
            <View style={styles.orderHeader}   >
                <View>
                    <Text
                        style={styles.orderDate}
                    >
                        { order.order.dateOrdered && editTimestamp(order.order.dateOrdered)  }
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Text
                            style={{ marginRight: 10, fontSize: 12, fontWeight: 'bold', color: 'gray' }}
                        >
                            Toplam :
                        </Text>
                        <Text
                            style={{ fontSize: 12, color: '#4d8ee1', fontWeight: 'bold' }}
                        >
                            {order?.totalPrice?.toFixed(2)} TL
                        </Text>
                    </View>
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center' }}

                    onTouchStart={
                        () => {
                            navigation.navigate('OrderDetail', {
                                orderId: order.order._id
                            })
                        }
                    }
                >

                    <Text style={{ fontSize: 12, color: COLORS.green, fontWeight: 'bold', marginRight: 8 }} >
                        Detaylar
                    </Text>
                    <AntDesign
                        name="caretright"
                        size={9}
                        color={COLORS.green}
                    />

                </View>

            </View>

            <View style={styles.orderBody} >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    {
                        orderStatus === 'Siparişiniz Hazırlanıyor' &&
                        <MaterialCommunityIcons
                            name="clipboard-clock"
                            size={16}
                            color={COLORS.green}
                        />
                        ||
                        orderStatus === 'Kargoya verildi' &&
                        <MaterialCommunityIcons

                            name="truck-outline"
                            size={13}
                            color={COLORS.green}
                        />
                        ||
                        orderStatus === 'Teslim edildi' &&
                        <FontAwesome5

                            name="check"
                            size={12}
                            color={COLORS.green}
                        />
                    }
                    <Text
                        style={styles.orderStatus}
                    >
                        {orderStatus}
                    </Text>

                </View>
                <View
                    style={styles.imagesWrapper}
                >
                    {
                        order.orderItems.map((item, index) => {
                            return (
                                <View key={index} style={styles.imageContainer}

                                    onTouchStart={
                                        () => {
                                            navigation.navigate('Details', { productId: item.product._id })
                                        }
                                    }
                                >
                                    <Image
                                        source={{ uri: `${NGROK_URL}/uploads/${item.product?.images[0]}` }}
                                        style={styles.image}
                                    />
                                </View>
                            )
                        })
                    }
                </View>

                <Text style={{ fontSize: 12, color: COLORS.grey }}>

                    {
                        order.orderItems.length === deliveryCount ? `${order.orderItems.length} ürün teslim edildi ` :
                            `${order.orderItems.length} ` + 'üründen'
                    }
                    {
                        order.orderItems.length - deliveryCount - shippingCount !== 0 &&
                        ` ${order.orderItems.length - deliveryCount - shippingCount} ürün siparişi hazırlanıyor,`
                    }
                    {
                        shippingCount !== 0 &&
                        ` ${shippingCount} ürün kargoya verildi,`
                    }
                    {
                        order.orderItems.length !== deliveryCount && deliveryCount !== 0 &&
                        ` ${deliveryCount} ürün teslim edildi.`
                    }
                </Text>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    orderContainer: {
        backgroundColor: "#fff",
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: "#000",
        height: 240,
        padding: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    orderHeader: {
        borderBottomColor: 'rgba(0,0,0,0.05)',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 15,
    },
    orderDate: {
        fontWeight: "bold",
        fontSize: 12,
        marginBottom: 8,
        color: '#383838'
    },
    orderStatus: {
        marginLeft: 8,
        fontSize: 11,
        color: COLORS.green,
        letterSpacing: 0.4,
        fontWeight: 'bold'
    },
    imagesWrapper: {
        flexDirection: 'row',
        marginVertical: 20,
        alignItems: 'center',
        height: 47,
    },
    imageContainer: {
        width: 42,
        height: 42,
        marginRight: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    textLight: {
        color: '#413F42',
        fontSize: 12,
        color: '#757575',
        marginBottom: 10,
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 15,
    },
    textExplain: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 15,
        color: '#575656',
    },
    btnWrapper: {
        backgroundColor: COLORS.green,
        color: 'white',
        paddingVertical: 12,
        borderRadius: 5,
        fontWeight: 'bold',
        width: '90%',
        textAlign: 'center',
    },
})

export default OrderCard