import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native'
import BottomSheet from 'react-native-gesture-bottom-sheet'
import { Ionicons } from 'react-native-vector-icons'
import COLORS from '../../../consts/colors'

const PaymentBottomSheet = ({ bottomSheet, options , selectedCard,setSelectedCard ,headText,height}) => {
  
    return (
        <BottomSheet ref={bottomSheet} height={height}
            radius={6}
        >
            <View style={styles.bottomSheet}>
             
                <View style={styles.bottomSheetContent}>

                    <View style={styles.bottomSheetContentHeader}>
                        <Text
                            style={{ fontSize: 14, fontWeight: 'bold', color: '#434242' }}
                        >
                            {headText}
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
                        data={options}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                              activeOpacity={0.7}
                                style={{
                                    paddingVertical: 11,
                                    paddingHorizontal: 20,
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'rgba(0,0,0,0.01)'
                                }}
                                onPress={
                                    () => {
                                        headText === "Ay Seçiniz" ? 
                                        setSelectedCard({
                                            ...selectedCard,
                                            cardExpiredMonth : {
                                                isValid :false,
                                                value : item
                                            }
                                        }) 
                                        :
                                        setSelectedCard({
                                            ...selectedCard,
                                            cardExpiredYear :  {
                                                isValid :false,
                                                value : item
                                            }
                                        })
                                        
                                        bottomSheet.current.close()
                                    }
                                }
                            >
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.grey }}  >
                                    {item}
                                </Text>
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
    },
    bottomSheetContentHeader: {
        backgroundColor: 'rgba(0,0,0,0.09)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    }
})

export default PaymentBottomSheet