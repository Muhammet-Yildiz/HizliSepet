import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import COLORS from '../../consts/colors'
import { TextInput } from 'react-native-element-textinput'
import BankCardService from '../../services/BankCardService'
import Toast  from 'react-native-toast-message'

const EditBankCardScreen = ({ route, navigation }) => {

    const { card } = route.params
    const [disabled, setDisabled] = useState(false)
    const [cardTitle, setCardTitle] = useState({
        value: card?.name,
        error: {
            message: '',
            status: false
        },
        isFocus: false
    })

    const handleUpdate = async () => {
        setDisabled(true)
        if (cardTitle.value === '') {
            setCardTitle({
                ...cardTitle,
                error: {
                    message: 'Kart adı boş bırakılamaz',
                    status: true
                },
            })
            setDisabled(false)
        }
        else {
            try {
                await BankCardService.editBankCard(card._id, { name: cardTitle.value })
                navigation.navigate('BankCards')
            }
            catch (error) {
                Toast.show({
                    type: 'customToast',
                    position: 'bottom',
                    text1: 'İstek iletilirken bir sorun oluştu.Tekrar deneyiniz.',
                    visibilityTime: 2000,
                    autoHide: true,
                    bottomOffset: 0,
                });
                setTimeout(() => {
                    setDisabled(false)
                } , 2000);
            }
        }
    }

    const handleDelete = async () => {
        setDisabled(true)
        try {
            await BankCardService.deleteBankCard(card._id)
            navigation.navigate('BankCards')
        }
        catch (error) {
            Toast.show({
                type: 'customToast',
                position: 'bottom',
                text1: 'İstek iletilirken bir sorun oluştu.Tekrar deneyiniz.',
                visibilityTime: 2000,
                autoHide: true,
                bottomOffset: 0,
            });
            setTimeout(() => {
                setDisabled(false)
            } , 2000);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={styles.container}
                >
                    <View style={styles.flex}>
                        <Entypo
                            name="credit-card"
                            size={24}
                            color={COLORS.green}
                            style={{ marginBottom: 10 }}
                        />

                        <TextInput
                            value={cardTitle?.value}
                            style={[styles.input, {
                                width: Dimensions.get('window').width - 70,
                                borderColor: cardTitle.isFocus ? COLORS.green : '#e3e3e3',
                            },
                            cardTitle.error?.status && { ...styles.inputIsValid }
                            ]}
                            inputStyle={styles.inputStyle}
                            labelStyle={{
                                ...styles.labelStyle,
                                color: cardTitle.isFocus ? COLORS.green : '#878787',
                            }}
                            label="Kart Adı"
                            placeholderTextColor="red"
                            placeholderStyle={{ fontSize: 15 }}
                            onChangeText={text => {
                                setCardTitle({
                                    ...cardTitle,
                                    value: text,
                                    error: {
                                        message: '',
                                        status: false
                                    },
                                })

                            }}
                            onFocus={() => {
                                setCardTitle({
                                    ...cardTitle,
                                    isFocus: true,
                                    error: {
                                        message: '',
                                        status: false
                                    },
                                })

                            }}
                            onBlur={() => {
                                setCardTitle({
                                    ...cardTitle,
                                    isFocus: false,
                                })
                            }}
                        />

                    </View>
                    <Text style={[styles.errorText, {
                        display: cardTitle.error?.status ? 'flex' : 'none',
                    }]}>{cardTitle.error?.message}</Text>
                    <View style={[styles.buttonWrapper, {
                        marginTop: 18,
                        backgroundColor: disabled ? '#f1f1f1' : COLORS.green,
                    }]}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={ handleUpdate}
                            disabled={disabled}
                        >
                            <Text style={styles.buttonText}>Güncelle</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.buttonWrapper, {
                        backgroundColor: disabled ? '#f1f1f1' : '#d4cfcf',
                    }]}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={handleDelete}
                            disabled={disabled}
                        >
                            <Text style={styles.buttonText}>Kartı Sil</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingTop: 40,
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        height: 62,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#e3e3e3',
        position: 'relative',
        borderRadius: 5,
        marginBottom: 12,
    },
    inputIsValid: {
        borderColor: 'rgba(255,0,0,0.28)',
    },
    inputValid: {
        borderColor: COLORS.green,
    },
    inputStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'gray',
        marginTop: 5,
    },
    labelStyle: {
        fontSize: 13,
        position: 'absolute',
        top: -10,
        backgroundColor: 'white',
        paddingHorizontal: 4,
        marginLeft: -4,
        fontWeight: 'bold',
    },
    inputIsValid: {
        borderColor: 'red',
    },
    buttonWrapper: {
        paddingVertical: 12,
        marginBottom: 20,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 11,
        marginLeft: 50,
        marginBottom: 10, marginTop: -5
    }
})


export default EditBankCardScreen