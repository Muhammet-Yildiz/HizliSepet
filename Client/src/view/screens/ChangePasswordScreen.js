import React, { useState } from 'react'
import { View, StyleSheet, Text,TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { TextInput } from 'react-native-element-textinput';
import COLORS from '../../consts/colors';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Toast from 'react-native-toast-message'
import UserService from '../../services/UserService';

const ChangePasswordScreen = ({ navigation }) => {
    const [focusInputText, setFocusInputText] = useState('')
    const [currentPass, setCurrentPass] = useState({
        value: '',
        visible: false
    });
    const [newPass, setNewPass] = useState({
        value: '',
        visible: false
    });
    const [validateNewPass, setValidateNewPass] = useState({
        value: '',
        visible: false
    });
    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(false)

    const validateForm = async () => {
        if (currentPass.value === '' || currentPass.value.length < 6) {
            setError('currentPass')
            Toast.show({
                type: 'customToast',
                position: 'bottom',
                text1: currentPass.value === '' ? 'Mevcut şifrenizi girmelisiniz.' : 'Şifreniz 6 ile 32 karakter arasında olmalıdır.',
                visibilityTime: 2000,
                autoHide: true,
                bottomOffset: 0,
            });
        }
        else if (newPass.value === '' || newPass.value.length < 6) {
            setError('newPass')
            Toast.show({
                type: 'customToast',
                position: 'bottom',
                text1: newPass.value === '' ? 'Yeni şifrenizi girmelisiniz.' : 'Yeni şifreniz 6 ile 32 karakter arasında olmalıdır.',
                visibilityTime: 2000,
                autoHide: true,
                bottomOffset: 0,
            });
        }
        else if (validateNewPass.value === '' || validateNewPass.value !== newPass.value) {
            Toast.show({
                type: 'customToast',
                position: 'bottom',
                text1: 'Yeni şifre alanındaki degeri girmelisiniz.Şifreler uyuşmuyor.',
                visibilityTime: 2000,
                autoHide: true,
                bottomOffset: 0,
            });
            setError('validateNewPass')
        }
        else {
            setDisabled(true)
            try {
                const res = await UserService.changePassword({ newPass, currentPass })
                setDisabled(false)
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Şifreniz başarıyla degiştirilmiştir.',
                    visibilityTime: 2000,
                    autoHide: true,
                    bottomOffset: 0,
                });
                navigation.navigate('Account')
            }
            catch (err) {
                if (err.status == 400) {
                    Toast.show({
                        type: 'customToast',
                        position: 'bottom',
                        text1: 'Mevcut şifrenizi yanlış girdiniz.',
                        visibilityTime: 2000,
                        autoHide: true,
                        bottomOffset: 0,
                    });
                }
                else {
                    Toast.show({
                        type: 'customToast',
                        position: 'bottom',
                        text1: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.',
                        visibilityTime: 2000,
                        autoHide: true,
                        bottomOffset: 0,
                    });
                }
                setDisabled(false)
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

            <View style={styles.container}  >

                <TextInput
                    secureTextEntry={!currentPass.visible}
                    value={currentPass.value}
                    inputStyle={styles.inputStyle}
                    style={[styles.input, focusInputText === 'currentPass' ? { borderColor: COLORS.green } : { borderColor: '#e3e3e3' },
                    error == 'currentPass' && styles.inputError
                    ]}
                    labelStyle={
                        error == 'currentPass' ? { ...styles.labelStyle, ...styles.labelError } :
                            {
                                ...styles.labelStyle,
                                color: focusInputText === 'currentPass' ? COLORS.green : '#878787',
                            }}
                    placeholderStyle={styles.placeholderStyle}
                    label="Mevcut Şifre"
                    placeholderTextColor="gray"
                    focusColor={COLORS.green}
                    onChangeText={text => {
                        setCurrentPass({
                            ...currentPass,
                            value: text
                        });
                    }}
                    onFocus={() => {
                        setFocusInputText('currentPass')
                        setError('')
                    }}
                    onBlur={() => {
                        setFocusInputText('')
                    }}
                    renderRightIcon={() => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    setCurrentPass({
                                        ...currentPass,
                                        visible: !currentPass.visible
                                    })
                                }}
                            >
                                {
                                    currentPass.visible ?
                                        <MaterialCommunityIcons name="eye-outline" size={26} color="gray" />
                                        :
                                        <MaterialCommunityIcons name="eye-off-outline" size={26} color="gray" />
                                }

                            </TouchableOpacity>
                        )
                    }
                    }
                />

                <TextInput
                    secureTextEntry={!newPass.visible}
                    value={newPass.value}
                    style={[styles.input, focusInputText === 'newPass' ? { borderColor: COLORS.green } : { borderColor: '#e3e3e3' },
                    error == 'newPass' && styles.inputError
                    ]}
                    inputStyle={styles.inputStyle}
                    labelStyle={
                        error == 'newPass' ? { ...styles.labelStyle, ...styles.labelError } :
                            {
                                ...styles.labelStyle,
                                color: focusInputText === 'newPass' ? COLORS.green : '#878787',
                            }}
                    placeholderStyle={styles.placeholderStyle}
                    label="Yeni Şifre"
                    placeholderTextColor="gray"
                    focusColor={COLORS.green}
                    onChangeText={text => {
                        setNewPass({
                            ...newPass,
                            value: text
                        });
                    }}
                    onFocus={() => {
                        setFocusInputText('newPass')
                        setError('')
                    }}
                    onBlur={() => {
                        setFocusInputText('')
                    }}
                    renderRightIcon={() => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    setNewPass({
                                        ...newPass,
                                        visible: !newPass.visible
                                    })
                                }}
                            >
                                {
                                    newPass.visible ?
                                        <MaterialCommunityIcons name="eye-outline" size={26} color="gray" />
                                        :
                                        <MaterialCommunityIcons name="eye-off-outline" size={26} color="gray" />
                                }

                            </TouchableOpacity>
                        )
                    }
                    }
                />

                <TextInput
                    secureTextEntry={!validateNewPass.visible}
                    value={validateNewPass.value}
                    inputStyle={styles.inputStyle}
                    style={[styles.input, focusInputText === 'validateNewPass' ? { borderColor: COLORS.green } : { borderColor: '#e3e3e3' },
                    error == 'validateNewPass' && styles.inputError
                    ]}
                    labelStyle={
                        error == 'validateNewPass' ? { ...styles.labelStyle, ...styles.labelError } : {
                            ...styles.labelStyle,
                            color: focusInputText === 'validateNewPass' ? COLORS.green : '#878787',
                        }}
                    placeholderStyle={styles.placeholderStyle}
                    label="Tekrar Yeni Şifre"
                    placeholderTextColor="gray"
                    focusColor={COLORS.green}
                    onChangeText={text => {
                        setValidateNewPass({
                            ...validateNewPass,
                            value: text
                        });
                    }}
                    onFocus={() => {
                        setFocusInputText('validateNewPass')
                        setError('')
                    }}
                    onBlur={() => {
                        setFocusInputText('')
                    }}
                    renderRightIcon={() => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    setValidateNewPass({
                                        ...validateNewPass,
                                        visible: !validateNewPass.visible
                                    })
                                }}
                            >
                                {
                                    validateNewPass.visible ?
                                        <MaterialCommunityIcons name="eye-outline" size={26} color="gray" />
                                        :
                                        <MaterialCommunityIcons name="eye-off-outline" size={26} color="gray" />
                                }

                            </TouchableOpacity>
                        )
                    }
                    }
                />
                <Text
                    style={styles.infoTextWrapper}
                >
                    Şifreniz <Text style={styles.textBold}>
                        en az 6 karakter
                    </Text> ve  <Text style={styles.textBold}>
                        en fazla 32 karakter
                    </Text> olmalıdır.
                </Text>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => validateForm()}
                    disabled={disabled}
                >
                    <Text style={[styles.updateBtn, {
                        backgroundColor: disabled ? '#f1f1f1' : COLORS.green,
                    }]}>Güncelle</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 20,
        paddingTop: 30
    },

    input: {
        height: 57,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 2,
        marginBottom: 25,
    },
    inputStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingTop: 5,
    },
    labelStyle: {
        fontSize: 12,
        position: 'absolute',
        top: -10,
        left: -4,
        backgroundColor: 'white',
        paddingHorizontal: 4,
        fontWeight: 'bold',
    },
    placeholderStyle: { fontSize: 14 },
    updateBtn: {
        color: COLORS.white, fontSize: 15, fontWeight: 'bold', textAlign: 'center', paddingVertical: 13, borderRadius: 6
    },
    inputError: {
        borderWidth: 1,
        borderColor: '#eb0202',
        backgroundColor: '#fde8e8',
    },
    labelError: {
        color: '#cf0202',
    },
    infoTextWrapper: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 14,
        marginBottom: 15,
        paddingHorizontal: 10,
        fontSize: 11.5,
    },
    textBold: {
        fontWeight: 'bold',
    }
})


export default ChangePasswordScreen