import React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import COLORS from '../../../consts/colors'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const ConfirmationField = ({ confirmChecked, setConfirmChecked }) => {
    return (
        <View style={styles.confirmationField}  >
            <BouncyCheckbox
                size={22}
                fillColor={COLORS.grey}
                unfillColor="#FFFFFF"
                text={
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: Dimensions.get('window').width - 50,
                            height: 50,
                            flexWrap: 'wrap',
                        }}
                    >
                        <Text
                            style={[styles.textUnderline,
                            confirmChecked.error && styles.errorText]
                            }
                        >
                            Ön Bilgilendirme formunu
                        </Text>
                        <Text
                            style={{
                                color: confirmChecked.error ? '#ed071e' : 'gray',
                                fontSize: 11,
                            }}
                        >
                            ve
                        </Text>
                        <Text style={[styles.textUnderline,
                        confirmChecked.error && styles.errorText]
                        } >
                            Mesafeli Satış Sözleşmesini
                        </Text>
                        <Text
                            style={{
                                fontSize: 11,
                                marginLeft: 6,
                                marginTop: 5,
                                color: confirmChecked.error ? '#ed071e' : 'gray',
                            }}
                        >
                            onaylıyorum
                        </Text>
                    </View>
                }
                iconStyle={{ borderColor: "black", marginRight: -5, }}
                innerIconStyle={{
                    borderWidth: 2,
                    borderRadius: 5,
                }}
                onPress={() =>
                    setConfirmChecked({
                        value: !confirmChecked.value,
                        error: false,
                    })
                }
                style={{
                    marginBottom: 17,
                }}
                isChecked={confirmChecked.value}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    confirmationField: {
        height: 80,
        padding: 15,
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    textUnderline: {
        textDecorationLine: 'underline',
        color: COLORS.green,
        fontWeight: 'bold',
        marginHorizontal: 6,
        fontSize: 11,
        letterSpacing: 0.3,
    },
    errorText: {
        color: '#ed071e',
    }
})

export default ConfirmationField