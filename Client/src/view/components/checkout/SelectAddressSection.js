import React, { useRef } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import COLORS from '../../../consts/colors'
import {  Feather } from '@expo/vector-icons';
import AddressBottomSheet from '../address/AddressBottomSheet';

const SelectAddressSection = ({ addresses, selectedAddress, setSelectedAddress, navigation }) => {

    const bottomSheet = useRef(null)

    return (
        <>
            <AddressBottomSheet
                bottomSheet={bottomSheet}
                addresses={addresses}
                setSelectedAddress={setSelectedAddress}
                navigation={navigation}
            />
            <View style={styles.container} >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottomColor: 'rgba(0,0,0,0.05)',
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                    }}
                >
                    <Text style={styles.headText} > Teslimat Adresi </Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={
                            () => {
                                navigation.navigate('MyAddresses')
                            }
                        }
                    >
                        <Text style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: 'grey'
                        }}
                        > Ekle / Düzenle </Text>
                    </TouchableOpacity>

                </View>


                <View style={[styles.selectAddressWrapper, {
                    backgroundColor: selectedAddress?.isValid ? '#fcc9c5' : 'rgba(0,0,0,0.03)',
                }]}
                    onTouchStart={
                        () => { bottomSheet.current.show()  }
                    }
                >
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        width: Dimensions.get('window').width - 90,
                        overflow: 'hidden',
                        justifyContent: 'space-between'
                    }}>

                        <Text
                            style={{
                                fontSize: selectedAddress?.title ? 13 : 12,
                                fontWeight: 'bold',
                                marginRight: 11,
                                color: selectedAddress?.title ? 'gray' : '#bfbaba'
                            }}
                        >
                            {selectedAddress?.title ?? 'Siparişiniz için adres ekleyiniz '}
                        </Text>
                        {selectedAddress?.title && <Text
                            style={{
                                fontSize: 13,
                                color: COLORS.grey,
                                width: Dimensions.get('window').width - 90 - String(selectedAddress.title).length * 7,
                                textAlign: 'center'
                            }}
                        >
                            {
                                String('(' + selectedAddress.neighborhood + ' Mah. / ' + selectedAddress.district + ' / ' + selectedAddress.city + ')').substring(0, (Dimensions.get('window').width - 112 - String(selectedAddress.title).length * 7) / 7)
                                +
                                (String(selectedAddress.neighborhood + 'Mah. / ' + selectedAddress.district + ' / ' + selectedAddress.city).length * 7 > Dimensions.get('window').width - 112 - String(selectedAddress.title).length * 7 ? '...' : '')
                            }

                        </Text>
                        }
                    </View>
                    {selectedAddress?.title &&
                        <Feather
                            name="chevron-down"
                            size={27}
                            color={COLORS.grey}
                        />
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
        marginTop: 10,
        elevation: 3
    },
    headText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.green,
        marginBottom: 5,
        marginLeft: -5
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectAddressWrapper: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.15)',
        paddingHorizontal: 10,
        height: 50,
        paddingLeft: 15,
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.03)',
    }
})

export default SelectAddressSection