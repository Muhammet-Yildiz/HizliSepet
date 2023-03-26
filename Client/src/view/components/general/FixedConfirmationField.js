import React, { useState  } from 'react'
import { StyleSheet, Text, View , TouchableOpacity, Dimensions } from 'react-native'
import { AntDesign } from 'react-native-vector-icons'
import COLORS from '../../../consts/colors'
import { StoreState } from '../../../Context/StoreContext'
import Toast from 'react-native-toast-message'
import { CommonActions } from '@react-navigation/native'
import OrderService from '../../../services/OrderService'

const FixedConfirmationField = ({ navigation, totalPrice, buttonText, selectedCard, setSelectedCard, selectedAddress, setSelectedAddress, confirmChecked, setConfirmChecked, disabled, setDisabled }) => {

    const { setBasketItems, setBasketItemsLength, setTotalPrice } = StoreState()
    const [show, setShow] = useState(false);
    const routes = navigation.getState()?.routes;

    const controlCompleteOrder = async () => {
        setDisabled(true)
        if (!selectedAddress?.title) {
            setSelectedAddress({
                ...selectedAddress,
                isValid: true
            })
            setDisabled(false)
            return;
        }
        if (selectedCard.cardNumber.value === null || selectedCard?.cardNumber?.value.split(' ').join('').length !== 16) {
            setSelectedCard({
                ...selectedCard,
                cardNumber: {
                    ...selectedCard.cardNumber,
                    isValid: true
                }
            })
            setDisabled(false)
            return;
        }
        if (!selectedCard.cardExpiredMonth.value) {
            setSelectedCard({
                ...selectedCard,
                cardExpiredMonth: {
                    ...selectedCard.cardExpiredMonth,
                    isValid: true
                }
            })
            setDisabled(false)
            return;
        }
        if (!selectedCard.cardExpiredYear.value) {
            setSelectedCard({
                ...selectedCard,
                cardExpiredYear: {
                    ...selectedCard.cardExpiredYear,
                    isValid: true
                }
            })
            setDisabled(false)
            return;
        }
        if (!selectedCard.cardCvv.value || selectedCard.cardCvv.value?.length < 3) {
            setSelectedCard({
                ...selectedCard,
                cardCvv: {
                    ...selectedCard.cardCvv,
                    isValid: true
                }
            })
            setDisabled(false)
            return;
        }
        if (!confirmChecked.value) {
          
            setConfirmChecked({
                ...confirmChecked,
                error: true
            })
            setDisabled(false)
            return;
        }
        else {
            try {
                setTimeout(async () => {
                    await OrderService.completeOrder({
                        selectedCard,
                        selectedAddress,
                    })
                    const newRoutes = routes.filter((route) => route.name !== 'Checkout');
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: newRoutes,
                        })
                    );
                    setBasketItems([])
                    setBasketItemsLength(0)
                    setTotalPrice(0)

                    navigation.navigate('Account')
                    Toast.show({
                        type: 'success',
                        position: 'bottom',
                        text1: 'Siparişiniz başarıyla alındı.',
                        visibilityTime: 2500,
                        autoHide: true,
                        bottomOffset: 0,
                    });

                }, 2000)
            }
            catch (error) {
                Toast.show({
                    type: 'customToast',
                    position: 'bottom',
                    text1: 'Siparişiniz alınırken bir sorun oluştu  .Tekrar deneyiniz.',
                    visibilityTime: 3000,
                    autoHide: true,
                    bottomOffset: 0,
                });
                setTimeout(() => {
                    setDisabled(false)
                }, 3000)
            }
        }


    }

    return (
        <>

            <View
                style={{
                    width: Dimensions.get('screen').width,
                    height: Dimensions.get('screen').height,
                    backgroundColor: show ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)',
                    position: 'absolute',
                    bottom: 0,
                    zIndex: show ? 1 : -1,
                }}
                onTouchStart={
                    () => {
                        setShow(false)
                    }
                }
            >
            </View>
            <View
                style={[styles.priceInfoArea, {
                    transform: [{ translateY: show ? 0 : 250 }]
                }]}
            >
                <View style={styles.priceInfoSec} >
                    <View style={styles.flex} >
                        <Text style={{ color: 'gray', fontSize: 13 }}>
                            Ara Toplam
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 13 }}>

                            {parseInt(totalPrice) < 0 ? '0' :
                                parseInt(totalPrice) + "." + totalPrice.toFixed(2).toString().split('.')[1]?.slice(0, 2)

                            } TL
                        </Text>

                    </View>
                    <View style={styles.flex} >
                        <Text style={{ color: 'gray', fontSize: 13 }}>
                            Kargo
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 13, textDecorationColor: 'green', textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: COLORS.green }}>
                            {(parseInt(totalPrice) - 19.22).toFixed(2) < 0 ? 0 : '9.99'} TL
                        </Text>
                    </View>

                    <View style={[styles.flex, {
                        borderTopWidth: 1,
                        borderColor: '#eeeeee',

                    }]}>
                        <Text style={{ color: 'gray', fontSize: 13 }}>
                            Toplam
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>

                            {parseInt(totalPrice) < 0 ? '0' :
                                parseInt(totalPrice) + "." + totalPrice.toFixed(2).toString().split('.')[1]?.slice(0, 2)
                            } TL
                        </Text>
                    </View>

                </View>

            </View>

            <View style={styles.fixedField}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setShow(!show)
                    }}
                >
                    <View style={styles.footerWrap}>
                        <AntDesign name="caretdown" size={13} color={COLORS.green}
                            style={{
                                transform: [{
                                    rotate: show ? '180deg' : '0deg',
                                }],
                                marginRight: 15
                            }}
                        />

                        <View style={styles.totalPrice} >
                            <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 13 }}>
                                Toplam
                            </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>

                                {parseInt(totalPrice) < 0 ? '0' :
                                    parseInt(totalPrice) + "." + totalPrice.toFixed(2).toString().split('.')[1]?.slice(0, 2)

                                } TL
                            </Text>
                        </View>

                    </View>
                </TouchableOpacity>

                {
                    buttonText === 'Sepeti Onayla' ?

                        <TouchableOpacity
                            disabled={parseInt(totalPrice) <= 0 ? true : false}
                            activeOpacity={0.8}
                            onPress={() => {
                                navigation.navigate('Checkout')
                            }}
                        >
                            <Text style={[styles.confirmChart, {
                                backgroundColor: parseInt(totalPrice) <= 0 ? '#dedede' : COLORS.green
                            }]}>
                                {buttonText}
                            </Text>
                        </TouchableOpacity>

                        :
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                controlCompleteOrder()
                            }}
                            disabled={disabled}
                        >
                            <Text style={[styles.completeOrderText, {
                                backgroundColor: disabled ? '#dedede' : COLORS.green
                            }]}>
                                {
                                    disabled ? 'Siparişiniz Alınıyor...' : buttonText
                                }
                            </Text>
                        </TouchableOpacity>
                }

            </View>
        </>
    )
}

const styles = StyleSheet.create({

    fixedField: {
        zIndex: 2,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 30,
        backgroundColor: 'white',
        paddingVertical: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopColor: 'rgb(238,238,238)',
        borderTopWidth: 1,
    },
    footerWrap: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 8,
        height: 45,
        width: Dimensions.get('window').width - 260,
        alignItems: 'center',
    },
    totalPrice: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 45,
    },
    confirmChart: {
        backgroundColor: COLORS.green,
        color: 'white',
        padding: 10,
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        width: Dimensions.get('window').width - 175,
        height: 45,
    },
    completeOrderText: {
        color: 'white',
        padding: 10,
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        width: Dimensions.get('window').width - 175,
        height: 45,
    },
    priceInfoArea: {
        position: 'absolute',
        bottom: 60,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        padding: 10,
        paddingHorizontal: 23,
        borderTopColor: '#dedede',
        borderTopWidth: 1,
        zIndex: 1,
    },
    priceInfoSec: {
        borderWidth: 1,
        borderColor: '#EEEEEE',
        borderRadius: 5,
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        alignItems: 'center',
    }
})
export default FixedConfirmationField