import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image,  ScrollView,  Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from 'react-native-vector-icons'
import StoreService from '../../services/StoreService'
import FixedConfirmationField from '../components/general/FixedConfirmationField'
import PaymentSection from '../components/checkout/PaymentSection'
import SelectAddressSection from '../components/checkout/SelectAddressSection'
import AddressService from '../../services/AddressService'
import BankCardService from '../../services/BankCardService'
import DeliveryOptions from '../components/checkout/DeliveryOptions'
import ConfirmationField from '../components/checkout/ConfirmationField'
import ContractForms from '../components/checkout/ContractForms'

const CheckoutScreen = ({ navigation, route }) => {
    const [confirmChecked, setConfirmChecked] = useState({
        value: false,
        error: null
    })
    const [deliveryItems, setDeliveryItems] = useState({})
    const [totalPrice, setTotalPrice] = useState(0)
    const [addresses, setAddresses] = useState([])
    const [bankCards, setBankCards] = useState([])
    const [selectedCard, setSelectedCard] = useState({
        cardNumber: {
            value: null,
            isValid: false
        },
        cardName: {
            value: null,
            isValid: false
        },
        cardExpiredYear: {
            value: null,
            isValid: false
        },
        cardExpiredMonth: {
            value: null,
            isValid: false
        },
        cardCvv: {
            value: null,
            isValid: false
        },
    })
    const [selectedAddress, setSelectedAddress] = useState({
        title: null,
        detail: null,
        city: null,
        district: null,
        neighborhood: null,
        name: null,
        surname: null,
        phone: null,
        isValid: false
    })
    const [keyboardVisible, setKeyboardVisible] = useState(false)
    const [disabled, setDisabled] = useState(false)

    const getAllDeliveryItems = async () => {
        const { data } = await StoreService.getAllDeliveryItems();
        setDeliveryItems(data.productGroupSeller)
        setTotalPrice(data.totalPrice)
    }

    const getAllAddresses = async (status = false) => {
        try {
            const { data } = await AddressService.getAllAddresses()
            setAddresses(data.addresses)
            if (!status) {
                setSelectedAddress(data.addresses[0])
            }

        } catch (error) {
            setAddresses([])
            setSelectedAddress({})
        }
    }

    const getAllBankCards = async () => {
        try {
            const { data } = await BankCardService.getAllBankCards()
            setBankCards(data.bankCards)
        } 
        catch (error) {
            setBankCards([])
        }
    }

    useEffect(() => {
        getAllDeliveryItems()
        getAllAddresses()
        getAllBankCards()

    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (route?.params?.address) {
                getAllAddresses(true)
                setSelectedAddress(route?.params?.address)
            }
        } )

        return unsubscribe

    }, [route.params])

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true)
        })
        Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false)
        })
    }, [])

    return (

        <SafeAreaView
            style={{
                height: '100%',
                backgroundColor: '#f3f3f3',
            }}
        >

            <View style={styles.headerSection} >
                <TouchableOpacity>
                    <Ionicons
                        name="ios-close"
                        size={28}
                        color={'gray'}
                        onPress={() => navigation.goBack()}
                    />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 17, fontWeight: 'bold',
                    marginLeft: 20,
                    color: 'gray'
                }}>Güvenli Ödeme</Text>
                <Image
                    source={require('../../assets/ssl.png')}
                    style={{
                        width: 58,
                        resizeMode: 'contain',
                    }}
                />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1,
                }}
            >
                <SelectAddressSection
                    addresses={addresses}
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                    navigation={navigation}
                />

                <PaymentSection
                    bankCards={bankCards}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                />

                <ConfirmationField
                    confirmChecked={confirmChecked}
                    setConfirmChecked={setConfirmChecked}
                />

                <DeliveryOptions
                    deliveryItems={deliveryItems}
                />

                <ContractForms  />

            </ScrollView>


            {!keyboardVisible && <FixedConfirmationField
                navigation={navigation}
                totalPrice={totalPrice}
                buttonText={'Siparişi Tamamla'}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                confirmChecked={confirmChecked}
                setConfirmChecked={setConfirmChecked}
                disabled={disabled}
                setDisabled={setDisabled}
            />
            }

        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    headerSection: {
        height: 60,
        padding: 18,
        backgroundColor: 'white',
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1,
    },

})


export default CheckoutScreen