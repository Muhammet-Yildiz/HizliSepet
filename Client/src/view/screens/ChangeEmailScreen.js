import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { TextInput } from 'react-native-element-textinput';
import COLORS from '../../consts/colors';
import { AuthState } from '../../Context/AuthContext';
import { Ionicons } from 'react-native-vector-icons';
import Toast from 'react-native-toast-message'
import UserService from '../../services/UserService';

const ChangeEmailScreen = () => {

    const { userInfo, logout } = AuthState();
    const [focusInputText, setFocusInputText] = useState('')
    const [newEmail, setNewEmail] = useState('');
    const [validateNewEmail, setValidateNewEmail] = useState('');
    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(false)
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validateForm = async () => {
        if (newEmail === '' || !validateEmail(newEmail)) {
            setError('newEmail')
            Toast.show({
                type: 'customToast',
                position: 'bottom',
                text1: newEmail === '' ? 'Lütfen yeni e-mail adresinizi giriniz.' : 'Lütfen geçerli bir e-mail adresi giriniz.',
                visibilityTime: 2000,
                autoHide: true,
                bottomOffset: 0,
            });
        }
        else if (validateNewEmail === '' || validateNewEmail !== newEmail) {
            Toast.show({
                type: 'customToast',
                position: 'bottom',
                text1: 'Yeni E-mail alanındaki degeri girmelisiniz.',
                visibilityTime: 2000,
                autoHide: true,
                bottomOffset: 0,
            });
            setError('validateNewEmail')
        }
        else {
            setDisabled(true)

            try {
                const res = await UserService.changeEmail({ newEmail })
                setDisabled(false)
                logout();
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Başarıyla e-mail adresiniz değiştirildi.Lütfen yeni e-mail adresinizle giriş yapınız.',
                    visibilityTime: 2000,
                    autoHide: true,
                    bottomOffset: 0,
                });
            }
            catch (err) {
                if (err.status == 400) {
                    Toast.show({
                        type: 'customToast',
                        position: 'bottom',
                        text1: 'Bu e-mail adresi daha önce kullanılmış.',
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
                <View style={styles.header}>
                    <Ionicons
                        name="information-circle"
                        size={22}
                        color={COLORS.green}
                    />
                    <Text style={styles.infoText}>
                        E-mail degişikligi sonrası hesabınızdan otomatik olarak çıkış yapılacaktır. Mevcut hesabınıza ait şifre ve yeni e-mail adresinizle yeniden giriş yapmalısınız .
                    </Text>

                </View>

                <TextInput
                    value={userInfo?.data.email}
                    style={[styles.input, focusInputText === 'email' ? { borderColor: COLORS.green } : { borderColor: '#e3e3e3' }]}
                    inputStyle={styles.inputStyle}
                    labelStyle={{
                        ...styles.labelStyle,
                        color: focusInputText === 'email' ? COLORS.green : '#878787',
                    }}
                    placeholderStyle={styles.placeholderStyle}
                    label="Mevcut E-Mail"
                    placeholderTextColor="gray"
                    focusColor={COLORS.green}
                    editable={false}
                    showIcon={false}
                />

                <TextInput
                    value={newEmail}
                    style={[styles.input, focusInputText === 'newEmail' ? { borderColor: COLORS.green } : { borderColor: '#e3e3e3' },
                    error == 'newEmail' && styles.inputError
                    ]}
                    inputStyle={styles.inputStyle}
                    labelStyle={
                        error == 'newEmail' ? { ...styles.labelStyle, ...styles.labelError } :
                            {
                                ...styles.labelStyle,
                                color: focusInputText === 'newEmail' ? COLORS.green : '#878787',
                            }}
                    placeholderStyle={styles.placeholderStyle}
                    label="Yeni E-Mail"
                    placeholderTextColor="gray"
                    focusColor={COLORS.green}
                    onChangeText={text => {
                        setNewEmail(text);
                    }}
                    onFocus={() => {
                        setFocusInputText('newEmail')
                        setError('')
                    }}
                    onBlur={() => {
                        setFocusInputText('')
                    }}
                />

                <TextInput
                    value={validateNewEmail}
                    inputStyle={styles.inputStyle}
                    style={[styles.input, focusInputText === 'validateNewEmail' ? { borderColor: COLORS.green } : { borderColor: '#e3e3e3' },
                    error == 'validateNewEmail' && styles.inputError
                    ]}
                    labelStyle={
                        error == 'validateNewEmail' ? { ...styles.labelStyle, ...styles.labelError } : {
                            ...styles.labelStyle,
                            color: focusInputText === 'validateNewEmail' ? COLORS.green : '#878787',
                    }}
                    placeholderStyle={styles.placeholderStyle}
                    label="Tekrar Yeni E-Mail"
                    placeholderTextColor="gray"
                    focusColor={COLORS.green}
                    onChangeText={text => {
                        setValidateNewEmail(text);
                    }}
                    onFocus={() => {
                        setFocusInputText('validateNewEmail')
                        setError('')
                    }}
                    onBlur={() => {
                        setFocusInputText('')
                    }}
                />

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
    },
    header: {
        borderWidth: 2,
        borderColor: "transparent",
        marginBottom: 22,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoText: {
        fontSize: 11,
        color: COLORS.green,
        marginLeft: 4,
        borderWidth: 5,
        borderColor: "transparent",
        fontWeight: 'bold',
        lineHeight: 16,
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
    }

})


export default ChangeEmailScreen