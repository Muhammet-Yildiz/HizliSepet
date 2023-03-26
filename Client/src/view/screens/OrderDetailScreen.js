import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import {  Ionicons, FontAwesome } from '@expo/vector-icons';
import COLORS from '../../consts/colors';
import StepIndicator from 'react-native-step-indicator';
import { UIActivityIndicator } from 'react-native-indicators';
import { NGROK_URL } from '@env'
import { MONTHS, DAYS, LOWERMONTHS } from '../../consts/time';
import OrderService from '../../services/OrderService';

const labels = ["Siparişiniz Alındı", "Siparişiniz Hazırlanıyor", "Kargoya Verildi", "Teslim Edildi"];
const customStyles = {
    stepIndicatorSize: 16,
    currentStepIndicatorSize: 16,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: '#ffffff',
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: '#ffffff',
    stepStrokeUnFinishedColor: '#ffffff',
    separatorFinishedColor: COLORS.green,
    separatorUnFinishedColor: '#d4d4d4',
    stepIndicatorFinishedColor: COLORS.green,
    stepIndicatorUnFinishedColor: '#d4d4d4',
    stepIndicatorCurrentColor: COLORS.green,
    stepIndicatorLabelFontSize: 11,
    currentStepIndicatorLabelFontSize: 11,
    stepIndicatorLabelCurrentColor: COLORS.green,
    stepIndicatorLabelFinishedColor: COLORS.green,
    stepIndicatorLabelUnFinishedColor: '#d4d4d4',
    labelSize: 10,
    currentStepLabelColor: COLORS.green,
}

const OrderDetailScreen = ({ route }) => {

    const { orderId } = route.params;
    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState({
        no: null,
        date: null,
        totalPrice: null,
        detail: null,
        totalItemCount: null,
        address: null,
        payment : null,
    })

    useEffect(() => {
        getOrderDetail()
    }, [orderId])


    const getOrderDetail = async () => {
        setLoading(true)
        try {
            const { data } = await OrderService.getOrderDetail(orderId)
            setOrder({
                no: data.order.transaction_id.slice(0, 13),
                date: data.order.dateOrdered,
                totalPrice: data.totalPrice,
                detail: data.orderItems,
                totalItemCount: data.totalItemCount,
                address: data.order.orderAddress,
                payment : data.order.orderPayment
            })
            setLoading(false)
        }

        catch (err) {
            setLoading(false)
        }
    }

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

    const editTimestamp = (timestamp, addDay = 0, format = null) => {
        const date = new Date(timestamp);
        date.setTime(date.getTime() + (addDay * 24 * 60 * 60 * 1000))
        const localDate = new Date(date);
        if (format === 'day') {
            return `${localDate.getDate()} ${LOWERMONTHS[localDate.getMonth()]} ${DAYS[localDate.getDay() - 1]} `
        }
        return `${localDate.getDate()} ${MONTHS[localDate.getMonth()]} ${localDate.getFullYear()}`
    }



    return (
        <View style={styles.container} >
            {
                loading ?
                    <UIActivityIndicator
                        color={COLORS.green}
                        size={45}
                        animating={true}
                    />
                    :
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                            paddingBottom: 15,
                        }}
                    >

                        <View
                            style={styles.orderDetailContainer}
                        >

                            <View
                                style={[styles.orderDetailHeader, {
                                    elevation: 3,
                                }]}
                            >
                                <View style={styles.flex}>
                                    <Text style={styles.text}>
                                        Sipariş No :
                                    </Text>
                                    <Text
                                        style={[styles.text, {
                                            color: '#000',
                                        }]}
                                    >
                                        {order.no}
                                    </Text>
                                </View>
                                <View style={styles.flex}>
                                    <Text style={styles.text}>
                                        Sipariş Tarihi :
                                    </Text>
                                    <Text
                                        style={[styles.text, {
                                            color: '#000',
                                        }]}
                                    >
                                        {order.date && editTimestamp(order.date)}
                                    </Text>
                                </View>
                                <View style={styles.flex}>
                                    <Text style={styles.text}>
                                        Sipariş Özeti  :
                                    </Text>
                                    <Text
                                        style={[styles.text, {
                                            color: COLORS.green
                                        }]}
                                    >
                                        {order.detail && Object.keys(order.detail).length} Teslimat ,
                                    </Text>
                                    <Text
                                        style={[styles.text, {
                                            color: '#000',
                                        }]}
                                    >
                                        {order.totalItemCount} Ürün
                                    </Text>
                                </View>
                                <View style={[styles.flex, {
                                }]}>
                                    <Text style={styles.text}>
                                        Toplam :
                                    </Text>
                                    <Text
                                        style={[styles.text, {
                                            color: '#4d8ee1'
                                        }]}
                                    >
                                        {order.totalPrice?.toFixed(2)}  TL
                                    </Text>
                                </View>
                            </View>

                            <View
                                style={styles.orderDetailBodyWrapper}
                            >
                                {
                                    order.detail && Object.keys(order.detail).map((item, index) => (

                                        <View
                                            key={index}
                                            style={styles.orderDetailWrapper}
                                        >

                                            <View
                                                style={[styles.orderDetailHeader, {
                                                    borderBottomColor: 'rgba(0,0,0,0.08)',
                                                    borderBottomWidth: 1,
                                                }]}
                                            >
                                                <View
                                                    style={styles.flex}
                                                >
                                                    <Text
                                                        style={styles.text}
                                                    >
                                                        Tahmini Teslimat :
                                                    </Text>
                                                    <Text
                                                        style={[styles.text, {
                                                            color: '#000',
                                                        }]}
                                                    >
                                                        {order.date && editTimestamp(order.date, order.detail[item].banner.deliveryTime)}
                                                    </Text>
                                                </View>
                                                <View
                                                    style={styles.flex}
                                                >
                                                    <Text
                                                        style={styles.text}
                                                    >
                                                        Teslimat No :
                                                    </Text>
                                                    <Text
                                                        style={[styles.text, {
                                                            color: '#000',
                                                        }]}
                                                    >
                                                        156161658
                                                    </Text>
                                                </View>
                                                <View
                                                    style={styles.flex}
                                                >
                                                    <Text
                                                        style={styles.text}
                                                    >
                                                        Satıcı :
                                                    </Text>
                                                    <Text
                                                        style={[styles.text, {
                                                            color: '#4d8ee1',
                                                            marginLeft: 2,
                                                            fontSize: 12,
                                                        }]}
                                                    >
                                                        {item}
                                                     
                                                    </Text>
                                                    <Ionicons
                                                        name="md-checkmark-circle"
                                                        size={15}
                                                        style={{
                                                            color: '#4d8ee1',
                                                        }}
                                                    />
                                                </View>

                                            </View>

                                            <View
                                                style={styles.orderDetailBody}
                                            >
                                                <View
                                                    style={styles.orderStatusWrapper}
                                                >
                                                    <StepIndicator
                                                        customStyles={customStyles}
                                                        currentPosition={
                                                            order.date && editOrderDate(Date.now()) > editOrderDate(order.date, order.detail[item].banner.deliveryTime) ? 3 :
                                                                (order.date && editOrderDate(Date.now()) > editOrderDate(order.date, order.detail[item].banner.shippingTime) ? 2 : 1)
                                                        }
                                                        labels={labels}
                                                        stepCount={4}

                                                        renderLabel={({ position, stepStatus, label, currentPosition }) => {
                                                            return (
                                                                <View
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            color: currentPosition >= position ? COLORS.green : '#d4d4d4',
                                                                            fontSize: 10,
                                                                            fontWeight: 'bold',
                                                                            textAlign: 'center',
                                                                            marginTop: 5,
                                                                        }}
                                                                    >
                                                                        {label}
                                                                    </Text>
                                                                </View>

                                                            )
                                                        }}

                                                    />

                                                </View>
                                                {
                                                    editOrderDate(Date.now()) > editOrderDate(order.date, order.detail[item].banner.shippingTime) &&
                                                    <>
                                                        <View style={[styles.flex, {
                                                            marginBottom: 12,
                                                        }]}>
                                                            <Ionicons
                                                                name="md-information-circle-outline"
                                                                size={20}
                                                                color={COLORS.green}
                                                            />
                                                            <Text style={[styles.text, {
                                                                marginLeft: 5, lineHeight: 17,
                                                                fontSize: 11.5,
                                                                marginBottom: 2,
                                                            }]}>
                                                                Aşagıdaki  {Object.keys(order.detail).length} ürün <Text
                                                                    style={{ color: '#000' }}
                                                                >
                                                                    {editOrderDate(Date.now()) > editOrderDate(order.date, order.detail[item].banner.deliveryTime) ?
                                                                        editTimestamp(order.date, order.detail[item].banner.deliveryTime, 'day')
                                                                        : editTimestamp(order.date, order.detail[item].banner.shippingTime, 'day')}
                                                                </Text> günü {
                                                                    editOrderDate(Date.now()) > editOrderDate(order.date, order.detail[item].banner.deliveryTime) ? 'teslim edilmiştir.' : 'kargoya verilmiştir.'
                                                                }
                                                            </Text>

                                                        </View>
                                                        <View
                                                            style={{
                                                                borderWidth: 1,
                                                                borderColor: 'rgba(0,0,0,0.1)',
                                                                paddingVertical: 6,
                                                                borderRadius: 5,
                                                                flexDirection: 'row',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center',
                                                                marginBottom: 20,
                                                                paddingHorizontal: 10,
                                                            }}
                                                        >
                                                            <View style={[styles.flex, {
                                                                marginBottom: 0
                                                            }]} >
                                                                <Text
                                                                    style={styles.text}
                                                                >
                                                                    Kargo Firması:
                                                                </Text>
                                                                <Text style={[styles.text, {
                                                                    color: '#4d8ee1',
                                                                    marginLeft: 2,
                                                                }]} >
                                                                    Hızlı Jet
                                                                </Text>
                                                            </View>
                                                            <Text style={[styles.text, {
                                                                fontSize: 11.5,
                                                            }]}>
                                                                {
                                                                    editOrderDate(Date.now()) > editOrderDate(order.date, order.detail[item].banner.deliveryTime) ? 'Teslimat Detay' : 'Kargom Nerede?'
                                                                }

                                                            </Text>



                                                        </View>
                                                    </>

                                                }

                                                {order.detail[item].products.map((orderItem, index) => (
                                                    <View
                                                        key={index}
                                                        style={styles.productWrapper}
                                                    >
                                                        <View>
                                                            <Image
                                                                source={{ uri: `${NGROK_URL}/uploads/${orderItem.product?.images[0]}` }}
                                                                style={styles.productImage}
                                                            />
                                                        </View>
                                                        <View
                                                            style={styles.productDetail}
                                                        >
                                                            <Text
                                                                style={styles.productName}
                                                            >
                                                                {
                                                                    orderItem.product.name.length > 38 ?
                                                                        orderItem.product.name.substring(0, 38) + '...' :
                                                                        orderItem.product.name
                                                                }
                                                            </Text>
                                                            <View style={styles.flex}>
                                                                <Text
                                                                    style={[styles.text, {
                                                                        fontSize: 12,
                                                                    }]}
                                                                >
                                                                    Beden :
                                                                </Text>
                                                                <Text style={[styles.text, {
                                                                    fontSize: 12,
                                                                    color: '#000'
                                                                }]}
                                                                >
                                                                    {orderItem.selectedSize ?? 'Tek Ebat'} ,
                                                                </Text>
                                                                <Text style={[styles.text, {
                                                                    fontSize: 12,
                                                                    color: '#000'
                                                                }]}
                                                                >
                                                                    {orderItem.quantity} Adet
                                                                </Text>
                                                            </View>

                                                            <Text
                                                                style={[styles.text, {
                                                                    color: COLORS.green,
                                                                    fontSize: 12,
                                                                }]}
                                                            >
                                                                {orderItem.product.price} TL
                                                            </Text>

                                                        </View>
                                                    </View>

                                                ))
                                                }

                                            </View>

                                        </View>


                                    ))
                                }

                            </View>
                            <View
                                style={styles.orderDetailFooter}
                            >
                                <View style={styles.deliveryAddressWrapper}  >
                                    <View style={styles.deliveryAddressHeader}  >
                                        <Ionicons
                                            name="location-sharp"
                                            size={17}
                                            style={{
                                                color: COLORS.green,
                                            }}
                                        />

                                        <Text
                                            style={[styles.text, {
                                                marginLeft: 10,
                                                fontSize: 13,
                                                color: '#000',
                                            }]}
                                        >
                                            Teslimat Adresi
                                        </Text>
                                    </View>

                                    <View
                                        style={{ marginLeft: 30 }}
                                    >

                                        <View
                                            style={styles.flex}
                                        >
                                            <Text style={[styles.text, {
                                                color: '#000',
                                            }]}>
                                                Alıcı :
                                            </Text>
                                            <Text style={[styles.text, {
                                                fontSize: 11,
                                            }]}>
                                               { order?.address?.name } { order?.address?.surname }
                                            </Text>

                                        </View>
                                        <View
                                            style={styles.flex}
                                        >
                                            <Text
                                                style={[styles.text, {
                                                    fontSize: 11,
                                                    lineHeight: 18,
                                                }]} >
                                                { order?.address?.detail }
                                            </Text>

                                        </View>
                                        <View style={styles.flex}>
                                            <Text
                                                style={[styles.text, {
                                                    fontSize: 11,
                                                }]}
                                            >
                                                   { order?.address?.neighborhood } Mah /  { order?.address?.district }  / { order?.address?.city }
                                            </Text>

                                        </View>
                                        <View style={styles.flex}>
                                            <Text
                                                style={[styles.text, {
                                                    fontSize: 12,
                                                }]}
                                            >
                                                {String(order?.address?.phone).replace('0','').replace(String(order?.address?.phone).substring(4, 12), '*****')}
                                            </Text>
                                        </View>
                                    </View>


                                </View>
                                <View
                                    style={styles.orderPaymentWrapper}
                                >
                                    <View style={styles.between} >
                                        <View style={styles.between} >
                                            <FontAwesome
                                                name="file-text-o"
                                                size={15}
                                                style={{
                                                    color: COLORS.green,
                                                    marginRight: 10,
                                                }}
                                            />

                                            <Text style={[styles.text, {
                                                fontSize: 13,
                                                color: '#000',
                                            }]}>
                                                Ödeme Bilgileri
                                            </Text>
                                        </View>
                                        <View style={styles.between}>
                                            <Text
                                                style={[styles.text, {
                                                    fontSize: 11,
                                                }]}
                                            >

                                                {String(order?.payment?.number).replace(String(order?.payment?.number).substring(0, 12), '**** **** ')} -
                                            </Text>
                                            <Text
                                                style={[styles.text, {
                                                    fontSize: 11,
                                                }]}
                                            >
                                                Tek Çekim
                                            </Text>
                                        </View>

                                    </View>

                                    <View style={[styles.between, {
                                        paddingLeft: 26,
                                        marginVertical: 10,
                                    }]}>
                                        <Text
                                            style={[styles.text, {
                                                fontSize: 12,
                                            }]}
                                        >
                                            Ara Toplam
                                        </Text>
                                        <Text style={[styles.text, {
                                            fontSize: 12,
                                        }]}>
                                            {order.totalPrice?.toFixed(2)}  TL
                                        </Text>
                                    </View>
                                    <View style={[styles.between, {
                                        paddingLeft: 26,
                                    }]}>
                                        <Text style={[styles.text, {
                                            fontSize: 12,
                                        }]}>
                                            Kargo Ücreti
                                        </Text>
                                        <Text style={[styles.text, {
                                            fontSize: 12,
                                        }]}>
                                            19.99 TL
                                        </Text>
                                    </View>
                                    <View style={[styles.between, {
                                        marginLeft: 26,
                                        marginVertical: 10,
                                        borderBottomColor: 'rgba(0,0,0,0.05)',
                                        borderBottomWidth: 1,
                                        paddingBottom: 12,
                                    }]}>
                                        <Text style={[styles.text, {
                                            fontSize: 12,
                                        }]}>
                                            50 TL ve Üzeri  Kargo Bedava
                                        </Text>
                                        <Text style={[styles.text, {
                                            fontSize: 12,
                                        }]}>
                                            -19.99 TL
                                        </Text>
                                    </View>
                                    <View style={[styles.between, {
                                        paddingLeft: 26,
                                    }]} >
                                        <Text style={[styles.text, {
                                            fontSize: 12,
                                        }]}>
                                            Toplam
                                        </Text>
                                        <Text style={[styles.text, {
                                            color: '#4d8ee1',
                                            fontSize: 12,
                                        }]}>
                                            {order.totalPrice?.toFixed(2)}  TL
                                        </Text>
                                    </View>

                                </View>


                            </View>
                        </View>
                    </ScrollView>


            }

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        paddingTop: 7 
    },
    headerText: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#383838",
        marginLeft: 20,
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 9,
    },
    orderDetailContainer: {
        flex: 1,
        paddingHorizontal: 7,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 12,
        color: 'gray',
        marginRight: 5,
    },
    orderDetailBodyWrapper: {
        marginTop: 10,
    },
    orderDetailWrapper: {
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 3,
        paddingBottom: 10,
    },
    orderDetailHeader: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingTop: 12,
        paddingBottom: 4,
        borderRadius: 5,
        marginBottom: 15,
    },
    orderDetailBody: {
        paddingHorizontal: 10,
    },
    productWrapper: {
        flexDirection: 'row',
        marginBottom: 15,
        paddingLeft: 10,
    },
    productImage: {
        width: 72,
        height: 72,
        marginRight: 15,
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.08)',
    },
    productName: {
        marginBottom: 8,
        fontSize: 12,
        color: 'gray',
        fontFamily: 'sans-serif-medium',
    },
    orderStatusWrapper: {
        marginVertical: 15,
        marginBottom: 30,
    },
    orderDetailFooter: {
        marginBottom: 25,
        borderRadius: 5,
    },
    deliveryAddressWrapper: {
        marginBottom: 15,
        elevation: 3,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 5,
    },
    deliveryAddressHeader: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    between: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderPaymentWrapper: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 12,
        elevation: 3,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 5,
    }
})

export default OrderDetailScreen