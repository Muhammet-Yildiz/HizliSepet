import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import COLORS from '../../consts/colors';
import { UIActivityIndicator } from 'react-native-indicators';
import OrderCard from '../components/order/OrderCard';
import OrderService from '../../services/OrderService';

const MyOrdersScreen = ({ navigation }) => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    const getAllMyOrders = async () => {
        setLoading(true)
        try {
            const { data } = await OrderService.getAllMyOrders()
            setOrders(data.orderContent)
            setLoading(false)
        }
        catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllMyOrders()
    }, [])

    return (
        <View
            style={styles.container}
        >
            {
                loading ?
                    <UIActivityIndicator
                        color={COLORS.green}
                        size={45}
                        animating={true}
                    />
                    :

                    orders.length === 0 ?
                        <View
                            style={{
                                height: '100%',
                                backgroundColor: COLORS.white,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                source={require('../../assets/order.png')}
                                style={{
                                    width: 210,
                                    height: 210,
                                    resizeMode: 'contain',
                                    marginBottom: 10,
                                }}
                            />
                            <Text style={styles.textExplain} >
                                Siparişiniz Bulunamadı
                            </Text>

                            <Text style={styles.textLight}>
                                Şu anda vermiş oldugunuz sipariş bulunmamaktadır.
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    marginTop: 15,

                                }}
                                onPress={() => navigation.navigate('Home')}
                            >
                                <Text style={styles.btnWrapper} >
                                    Alışverişe Devam Et
                                </Text>
                            </TouchableOpacity>

                        </View>

                        :

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            {
                                orders.map((order, index) => {
                                    return (
                                        <OrderCard
                                            order={order}
                                            navigation={navigation}
                                            key={index}
                                        />
                                    )
                                }
                                )
                            }
                        </ScrollView>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    textLight: {
        color: '#413F42',
        fontSize: 12,
        color: '#757575',
        marginTop: 10,
    },
    btnWrapper: {
        backgroundColor: COLORS.green,
        color: 'white',
        paddingVertical: 12,
        borderRadius: 5,
        fontWeight: 'bold',
        marginTop: 10,
        width: '90%',
        textAlign: 'center',
    },

})

export default MyOrdersScreen