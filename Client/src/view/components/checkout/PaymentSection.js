import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import COLORS from '../../../consts/colors'
import { Feather, AntDesign } from 'react-native-vector-icons'
import PaymentBottomSheet from './PaymentBottomSheet'
import BankCardBottomSheet from './BankCardBottomSheet'
const PaymentSection = ({ selectedCard, setSelectedCard, bankCards }) => {

    const bottomSheet = useRef(null)
    const bottomSheet2 = useRef(null)
    const bottomSheet3 = useRef(null)
    const [isCardAvaliable, setIsCardAvaliable] = useState(false)
    useEffect(() => {
        if (bankCards?.length > 0) {
            setIsCardAvaliable(true)
            setSelectedCard({
                cardNumber: {
                    value: bankCards[0].number,
                    isValid: true
                },
                cardName: {
                    value: bankCards[0].name,
                    isValid: true
                },
                cardExpiredYear: {
                    value: bankCards[0].expiredYear,
                    isValid: true
                },
                cardExpiredMonth: {
                    value: bankCards[0].expiredMonth,
                    isValid: true
                },
                cardCvv: {
                    value: bankCards[0].cvv,
                    isValid: true
                }
            })
        }
        else {
            setIsCardAvaliable(false)
        }
    }, [bankCards])

    return (
        <>
            <PaymentBottomSheet
                bottomSheet={bottomSheet}
                options={["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
                headText="Ay Seçiniz"
                height={585}
            />
            <PaymentBottomSheet
                bottomSheet={bottomSheet2}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
                options={["2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037"]}
                headText="Yıl Seçiniz"
                height={750}
            />
            <BankCardBottomSheet
                bottomSheet={bottomSheet3}
                setSelectedCard={setSelectedCard}
                bankCards={bankCards}
            />
            <View style={styles.container}
            >
                <Text style={styles.headText} >Kart Bilgileri
                </Text>
             
                    <View style={styles.paymentField} >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                            {!isCardAvaliable ?
                                <>
                                    <Text style={styles.paymentFieldText} >Kart Numarası</Text>
                                    <TouchableOpacity
                                        onPress={
                                            () => {
                                                setIsCardAvaliable(true)
                                                setSelectedCard({
                                                    cardNumber: {
                                                        value: bankCards[0].number,
                                                        isValid: true
                                                    },
                                                    cardName: {
                                                        value: bankCards[0].name,
                                                        isValid: true
                                                    },
                                                    cardExpiredYear: {
                                                        value: bankCards[0].expiredYear,
                                                        isValid: true
                                                    },
                                                    cardExpiredMonth: {
                                                        value: bankCards[0].expiredMonth,
                                                        isValid: true
                                                    },
                                                    cardCvv: {
                                                        value: bankCards[0].cvv,
                                                        isValid: true
                                                    }
                                                })
                                            }
                                        }
                                    >

                                        <Text style={[styles.paymentFieldText, {
                                            textDecorationLine: 'underline',
                                            fontWeight: 'normal',
                                            fontSize: 11,
                                            display: bankCards?.length > 0 ? 'flex' : 'none'
                                        }]} >Kayıtlı Kartımla Öde</Text>

                                    </TouchableOpacity>
                                </>
                                :
                                <>
                                    <Text style={styles.paymentFieldText} >Kayıtlı Kartlarım </Text>
                                    <TouchableOpacity
                                        onPress={
                                            () => {
                                                setIsCardAvaliable(false)
                                                setSelectedCard({
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
                                                    }
                                                })

                                            }
                                        }
                                    >

                                        <Text style={[styles.paymentFieldText, {
                                            textDecorationLine: 'underline',
                                            fontWeight: 'normal',
                                            fontSize: 11,
                                        }]} >Başka Kartla Öde</Text>
                                    </TouchableOpacity>

                                </>
                            }

                        </View>
                        {
                            !isCardAvaliable ?
                                <>

                                    <TextInput
                                        keyboardType="numeric"
                                        maxLength={19}
                                        style={{
                                            fontSize: 13, fontWeight: 'bold', color: COLORS.grey,
                                            borderWidth: 1,
                                            borderColor: !selectedCard.cardNumber.isValid ? 'rgba(0,0,0,0.15)' : '#fcc9c5',
                                            backgroundColor: !selectedCard.cardNumber.isValid ? 'rgba(0,0,0,0.03)' : '#fcc9c5',
                                            paddingHorizontal: 10,
                                            paddingVertical: 7,
                                            marginTop: 10,
                                            borderRadius: 5,
                                        }}
                                        value={selectedCard.cardNumber.value}
                                        onChange={(e) => {
                                            let value = e.nativeEvent.text
                                            value = value.replace(/[^0-9]/g, '')
                                            if (value.length > 4) {
                                                value = value.slice(0, 4) + ' ' + value.slice(4)
                                            }
                                            if (value.length > 9) {
                                                value = value.slice(0, 9) + ' ' + value.slice(9)
                                            }
                                            if (value.length > 14) {
                                                value = value.slice(0, 14) + ' ' + value.slice(14)
                                            }
                                            setSelectedCard({
                                                ...selectedCard,
                                                cardNumber: {
                                                    isValid: false,
                                                    value: value,
                                                }
                                            })
                                        }}

                                    />
                                    <View style={styles.cardInfoWrapper}  >
                                        <View
                                            style={{
                                                width: '52%',
                                            }}
                                        >
                                            <Text style={[styles.paymentFieldText, {
                                                marginTop: 20,
                                                marginBottom: 10
                                            }]} >Son Kullanma Tarihi</Text>

                                            <View style={{

                                                flexDirection: 'row',
                                            }} >
                                                <View style={[styles.flex, {
                                                    width: '37%',
                                                    borderColor: selectedCard?.cardExpiredMonth?.isValid ? '#fcc9c5' : 'rgba(0,0,0,0.15)',
                                                    backgroundColor: selectedCard?.cardExpiredMonth?.isValid ? '#fcc9c5' : 'rgba(0,0,0,0.03)',
                                                }]}
                                                    onTouchStart={
                                                        () => {
                                                            bottomSheet.current.show()
                                                        }
                                                    }
                                                >
                                                    <Text
                                                        style={{
                                                            color: COLORS.grey, fontSize: 13, fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {
                                                            selectedCard.cardExpiredMonth.value
                                                            ?? 'Ay'}
                                                    </Text>
                                                    <Feather
                                                        name="chevron-down"
                                                        size={20}
                                                        color={COLORS.grey}
                                                        style={{ marginLeft: 15 }}
                                                    />
                                                </View>
                                                <View style={[styles.flex, {
                                                    width: '43%',
                                                    marginLeft: 15,
                                                    borderColor: selectedCard?.cardExpiredYear?.isValid ? '#fcc9c5' : 'rgba(0,0,0,0.15)',
                                                    backgroundColor: selectedCard?.cardExpiredYear?.isValid ? '#fcc9c5' : 'rgba(0,0,0,0.03)',
                                                }]}
                                                    onTouchStart={
                                                        () => {
                                                            bottomSheet2.current.show()
                                                        }
                                                    }
                                                >
                                                    <Text style={{ color: COLORS.grey, fontSize: 13, fontWeight: 'bold' }} >
                                                        {selectedCard.cardExpiredYear.value ?? 'Yıl'}
                                                    </Text>
                                                    <Feather
                                                        name="chevron-down"
                                                        size={20}
                                                        color={COLORS.grey}
                                                        style={{ marginLeft: 13 }}
                                                    />
                                                </View>
                                            </View>

                                        </View>
                                        <View
                                            style={{
                                                width: '30%',
                                                flexDirection: 'row',
                                            }}
                                        >
                                            <View>
                                                <Text style={[styles.paymentFieldText, {
                                                    marginTop: 20,
                                                    marginBottom: 10
                                                }]} >CVV</Text>

                                                <View style={{
                                                    flexDirection: 'row'
                                                }} >
                                                    <TextInput
                                                        maxLength={3}
                                                        keyboardType="numeric"

                                                        style={[styles.cardCvvInput, {
                                                            borderColor: selectedCard?.cardCvv?.isValid ? '#fcc9c5' : 'rgba(0,0,0,0.15)',
                                                            backgroundColor: selectedCard?.cardCvv?.isValid ? '#fcc9c5' : 'rgba(0,0,0,0.03)',
                                                        }]}
                                                        value={selectedCard.cardCvv.value}
                                                        onChangeText={(val) => {
                                                            setSelectedCard({
                                                                ...selectedCard,
                                                                cardCvv: {
                                                                    isValid: false,
                                                                    value: val,
                                                                }
                                                            })
                                                        }}
                                                    />
                                                </View>
                                            </View>

                                            <View
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: 'rgba(0,0,0,0.15)',
                                                    width: 35,
                                                    height: 35,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 50,
                                                    alignSelf: 'flex-end'
                                                }}
                                                onTouchStart={
                                                    () => {
                                                        alert('Kartınızın arka yüzündeki 3 rakamı yazınız (American Express kartlar için ön yüzdeki  4 rakam)')
                                                    }
                                                }
                                            >
                                                <AntDesign
                                                    name="question"
                                                    size={18}
                                                    color={COLORS.green}
                                                />
                                            </View>

                                        </View>

                                    </View>
                                </>
                                :
                                <View
                                    style={styles.chooseCardWrapper}
                                    onTouchStart={
                                        () => {
                                            bottomSheet3.current.show()
                                        }
                                    }
                                >
                                    <Text
                                        style={{
                                            fontSize: 13,
                                            fontWeight: 'bold',
                                            color: 'gray',
                                            marginRight: 10,
                                        }}
                                    >
                                        {
                                            selectedCard.cardName.value ?? bankCards[0].name ?? 'Herhangi bir kart seçilmedi'
                                        }
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {
                                            String(selectedCard.cardNumber.name ?? bankCards[0].number).substring(0, 1) === '4' &&
                                            <Image
                                                source={require('../../../assets/visa.png')}
                                                style={{ width: 35, height: 35, resizeMode: 'contain' }}
                                            />
                                            ||
                                            String(selectedCard.cardNumber.value ?? bankCards[0].number).substring(0, 1) === '5' &&

                                            <Image
                                                source={require('../../../assets/mastercard.png')}
                                                style={{ width: 35, height: 35, resizeMode: 'contain' }}
                                            />
                                            ||
                                            <Image
                                                source={require('../../../assets/maestro.png')}
                                                style={{ width: 65, height: 55, resizeMode: 'contain' }}
                                            />
                                        }

                                        <Feather
                                            name="chevron-down"
                                            size={25}
                                            color={COLORS.grey}
                                            style={{ marginLeft: 5 }}
                                        />

                                    </View>

                                </View>
                        }

                    </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 25,
        marginTop: 20,
        elevation: 3
    },
    headText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.green,
        marginBottom: 5,
        paddingBottom: 15,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        borderBottomWidth: 1,
    },
    paymentFieldText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'gray',
        marginTop: 15,
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 9,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.15)',
        backgroundColor: 'rgba(0,0,0,0.03)',
        borderRadius: 5,
    },
    cardInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cardCvvInput: {
        fontSize: 13, fontWeight: 'bold', color: COLORS.grey,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.15)',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.03)',
        width: '68%',
    },

    chooseCardWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.15)',
        paddingHorizontal: 10,
        paddingLeft: 15,
        paddingVertical: 12,
        marginTop: 15,
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.03)',
        maxHeight: 50,
    }

})

export default PaymentSection