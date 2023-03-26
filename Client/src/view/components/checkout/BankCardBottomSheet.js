import React  from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import BottomSheet from 'react-native-gesture-bottom-sheet'
import { Ionicons } from 'react-native-vector-icons'
import COLORS from '../../../consts/colors'

const BankCardBottomSheet = ({ bottomSheet, bankCards, setSelectedCard }) => {
    return (
        <BottomSheet ref={bottomSheet} height={bankCards.length * 75 + 70}
            radius={1}
        >
            <View style={styles.bottomSheet}>
                <View style={styles.bottomSheetContent}>

                    <View style={styles.bottomSheetContentHeader}>

                        <Text
                            style={{ fontSize: 14, fontWeight: 'bold', color: '#434242' }}
                        >
                            Kart Seçiniz
                        </Text>
                        <TouchableOpacity
                            onPress={() => { bottomSheet.current.close() }}
                        >
                            <Ionicons
                                name="close"
                                size={29}
                                color={COLORS.grey}
                            />
                        </TouchableOpacity>

                    </View>

                    <FlatList
                        data={bankCards}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={{
                                    paddingHorizontal: 20,
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'rgba(0,0,0,0.02)',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    height: 75
                                }}
                                onPress={
                                    () => {
                                        setSelectedCard({
                                            cardNumber: {
                                                value: item.number,
                                                isValid: true
                                            },
                                            cardName: {
                                                value: item.name,
                                                isValid: true
                                            },
                                            cardExpiredYear: {
                                                value: item.expiredYear,
                                                isValid: true
                                            },
                                            cardExpiredMonth: {
                                                value: item.expiredMonth,
                                                isValid: true
                                            },
                                            cardCvv: {
                                                value: item.cvv,
                                                isValid: true
                                            },
                                        })

                                        bottomSheet.current.close()
                                    }
                                }
                            >
                                <View>

                                    <Text
                                        style={{ fontSize: 14, fontWeight: 'bold', color: '#434242' }}
                                    >
                                        {item.name}
                                    </Text>
                                    <Text
                                        style={{ fontSize: 13, color: '#949492', marginTop: 5 }}
                                    >
                                        {
                                            String(item.number).replace(
                                                String(item.number).substring(6, 12),
                                                '****'
                                            )
                                        }

                                    </Text>

                                </View>

                                {
                                    String(item.number).substring(0, 1) === '4' &&
                                    <Image
                                        source={require('../../../assets/visa.png')}
                                        style={{ width: 35, height: 35, resizeMode: 'contain' }}
                                    />
                                    ||
                                    String(item.number).substring(0, 1) === '5' &&
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

                            </TouchableOpacity>
                        )}
                    />

                </View>

            </View>

        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    bottomSheetContent: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: COLORS.grey,
        height: 395,
    },
    bottomSheetContentHeader: {
        backgroundColor: 'rgba(0,0,0,0.06)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    }
})

export default BankCardBottomSheet