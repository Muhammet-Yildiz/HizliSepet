import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import BottomSheet from 'react-native-gesture-bottom-sheet'
import { Ionicons } from 'react-native-vector-icons'
import COLORS from '../../../consts/colors'
import { AntDesign } from '@expo/vector-icons';

const AddressBottomSheet = ({ bottomSheet, addresses, setSelectedAddress, navigation }) => {
    return (
        <BottomSheet ref={bottomSheet} height={addresses.length * 70 + 109}
            radius={1}
        >
            <View style={styles.bottomSheet}>
                <View style={styles.bottomSheetContent}>
                    <View style={styles.bottomSheetContentHeader}>

                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#434242' }}  >
                            Adres Seçiniz
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

                    <View>
                        <FlatList
                            data={addresses}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={{
                                        paddingVertical: 11,
                                        paddingHorizontal: 20,
                                        borderBottomWidth: 1,
                                        borderBottomColor: 'rgba(0,0,0,0.02)',
                                        height: 70,
                                    }}
                                    onPress={
                                        () => {
                                            setSelectedAddress(item)
                                            bottomSheet.current.close()
                                        }
                                    }
                                >
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#434242' }} >
                                        {item.title}
                                    </Text>
                                    <Text style={{ fontSize: 13, color: '#a7a9ab', marginTop: 5 }}  >
                                        {item.neighborhood} Mah / {item.district} / {item.city}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                        <View style={styles.flex}
                            onTouchEnd={
                                () => {
                                    bottomSheet.current.close()
                                    navigation.navigate('AddAddress', { prevRouteName: 'Checkout' })
                                }
                            }
                        >
                            <AntDesign
                                name="pluscircle"
                                size={14}
                                color={COLORS.green}
                            />
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    color: COLORS.green,
                                    marginLeft: 7
                                }}
                            >
                                Yeni Adres Ekle
                            </Text>

                        </View>
                    </View>
                </View>
            </View>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    bottomSheetContent: {
        backgroundColor: 'white',
        height: '100%',
    },
    bottomSheetContentHeader: {
        backgroundColor: 'rgba(0,0,0,0.06)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 11,
        paddingHorizontal: 20,
    }
})

export default AddressBottomSheet
