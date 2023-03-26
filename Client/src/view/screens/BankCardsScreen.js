import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import BankCardService from '../../services/BankCardService'
import { MaterialIcons } from 'react-native-vector-icons'
import { BarIndicator } from 'react-native-indicators'
import COLORS from '../../consts/colors'

const BankCardsScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(false)
    const [cards, setCards] = useState([])

    const getAllBankCards = async () => {
        setLoading(true)
        try {
            const { data } = await BankCardService.getAllBankCards();
            setCards(data.bankCards)
            setLoading(false)
        }
        catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAllBankCards()
        }
        )
        return unsubscribe
    }, [])

    return (
        <View
            style={styles.container}
        >
            {
                loading ?
                    <View style={{
                        justifyContent: 'center', alignItems: 'center', height: '100%',
                        backgroundColor: COLORS.white
                    }}>
                        <BarIndicator
                            color={COLORS.grey}
                            size={45}
                        />
                    </View>
                    :

                    cards.length === 0 ?
                        <View
                            style={{
                                height: '100%',
                                backgroundColor: COLORS.white,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                source={require('../../assets/credit_card.png')}
                                style={{
                                    width: 130,
                                    height: 130,
                                    resizeMode: 'contain',
                                    marginBottom: 20,
                                }}
                            />
                            <Text style={styles.text} >
                                Kayıtlı Kartınız Bulunmamaktadır
                            </Text>

                            <Text style={styles.textLight}>
                                Kart kaydedilme işlemi sadece alışveriş yaptıktan sonra otomatik olarak gerçekleşmektedir.
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                }}
                                onPress={() => navigation.navigate('Home')}
                            >
                                <Text style={styles.btnWrapper}  >
                                    Alışverişe Devam Et
                                </Text>
                            </TouchableOpacity>
                        </View>
                        :

                        cards.map((card) => (
                            <View key={card._id}
                                style={styles.cardWrapper}
                                onTouchEnd={() => {
                                    navigation.navigate('EditBankCard', { card: card })
                                }
                                }
                            >
                                <View style={styles.between}>
                                    <View style={styles.between}>
                                        {
                                            String(card.number).substring(0, 1) === '4' &&
                                            <Image
                                                source={require('../../assets/visa.png')}
                                                style={{ width: 35, height: 35, resizeMode: 'contain' }}
                                            />
                                            ||
                                            String(card.number).substring(0, 1) === '5' &&
                                            <Image
                                                source={require('../../assets/mastercard.png')}
                                                style={{ width: 35, height: 35, resizeMode: 'contain' }}
                                            />
                                        }
                                        <Text
                                            style={{
                                                marginLeft: 10,
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                                color: '#434242',
                                            }}
                                        >{card.name}
                                        </Text>

                                    </View>
                                    <MaterialIcons
                                        name="edit"
                                        size={21}
                                        color={'#999696'}
                                    />

                                </View>

                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: '#6e6d6a',
                                        marginTop: 5,
                                        marginLeft: 5,
                                        letterSpacing: 0.3
                                    }}

                                >
                                    {
                                        String(card.number).replace(
                                            String(card.number).substring(6, 12),
                                            '****'
                                        )
                                    }

                                </Text>

                            </View>
                        ))
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        backgroundColor: '#f9f9f9',
    },
    cardWrapper: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        paddingBottom: 18,
        borderRadius: 5,
        elevation: 3,
    },
    between: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
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
    text: {
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
        marginTop: 10,
        width: '90%',
        textAlign: 'center',
    },

})


export default BankCardsScreen