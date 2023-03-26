import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Pressable, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../../consts/colors';
import { Ionicons } from 'react-native-vector-icons'
import Toast from 'react-native-toast-message';
import AuthService from '../../services/AuthService';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState({
        field: null,
        status: false,
    })
    useEffect(() => {
        const onfocus = navigation.addListener('focus', () => {
            setEmail('');
            setPassword('');
            setUsername('');
        }
        );
        return onfocus;
    }, [navigation]);

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validateForm = async () => {
        if (username == '' || username.length < 3) {
            setError({
                field: 'username',
                status: true,
            })
            Toast.show({
                type: 'customToast',
                position: 'bottom',
                text1: username == '' ? 'Kullanıcı adı alanını boş bırakmayınız!' : 'Kullanıcı adı en az 3 karakter olmalıdır! ',
                visibilityTime: 2000,
                autoHide: true,
                bottomOffset: 0,
            });

        }
        else if (email == '' || !validateEmail(email)) {
            setError({
                field: 'email',
                status: true,
            })
            Toast.show({
                type: 'customToast',
                position: 'bottom',
                text1: email == '' ? 'Email alanını boş bırakmayınız!' : 'Lütfen geçerli bir email giriniz !',
                visibilityTime: 2000,
                autoHide: true,
                bottomOffset: 0,
            });
        }
        else if (password == '' || password.length < 6) {
            setError({
                field: 'password',
                status: true,
            })
            Toast.show({
                type: 'customToast',
                position: 'bottom',
                text1: password == '' ? 'Şifre alanını boş bırakmayınız!' : 'Şifreniz en az 6 karakter olmalıdır!',
                visibilityTime: 2000,
                autoHide: true,
                bottomOffset: 0,
            });
        }

        else {
            setDisabled(true);
            try {
                await AuthService.register({ username, email, password });
                setDisabled(false);
                navigation.navigate('Login');
            }
            catch (err) {
                setDisabled(false);
                Toast.show({
                    type: 'customToast',
                    position: 'bottom',
                    text1: 'Bu email kullanılamaz. Lütfen başka bir email deneyiniz.',
                    visibilityTime: 2000,
                    autoHide: true,
                    bottomOffset: 0,
                });
            }
        }

    }

    return (
        <SafeAreaView
            style={styles.container}
        >
            <ScrollView showsVerticalScrollIndicator={false} >

                <View style={styles.header}>
                    <Image
                        source={require('../../assets/logo1.png')}
                        style={styles.logo}
                        resizeMode='contain'
                    />
                </View>

                <View style={styles.loginForm} >
                    <View style={styles.fieldWrapper}
                    >
                        <Text
                            style={[styles.label, error.field == 'username' && styles.labelError]}
                        >Kullanıcı Adı </Text>
                        <TextInput
                            style={[styles.input, error.field == 'username' && styles.inputError]}
                            onChangeText={(text) => setUsername(text)}
                            type="text"
                            value={username}
                            placeholder=""
                            autoCapitalize='none'
                            autoCorrect={false}
                            placeholderTextColor="#B2B2B2"

                            onFocus={() => {
                                setError({
                                    field: null,
                                    status: false,
                                })
                            }
                            }
                        />

                    </View>

                    <View style={styles.fieldWrapper}
                    >
                        <Text
                            style={[styles.label, error.field == 'email' && styles.labelError]}
                        >Email</Text>
                        <TextInput
                            style={[styles.input, error.field == 'email' && styles.inputError]}
                            onChangeText={(text) => setEmail(text)}
                            type="email"
                            value={email}
                            placeholder=""
                            autoCapitalize='none'
                            autoCorrect={false}
                            placeholderTextColor="#B2B2B2"

                            onFocus={() => {
                                setError({
                                    field: null,
                                    status: false,
                                })
                            }
                            }
                        />

                    </View>

                    <View style={styles.fieldWrapper}>
                        <Text
                            style={[styles.label, error.field == 'password' && styles.labelError]}
                        >Şifre </Text>
                        <View >
                            <TextInput
                                style={[styles.input, error.field == 'password' && styles.inputError]}
                                onChangeText={(text) => setPassword(text)}
                                value={password}
                                secureTextEntry={passwordVisibility}
                                placeholder=""
                                autoCapitalize='none'
                                autoCorrect={false}
                                placeholderTextColor="#B2B2B2"
                                onFocus={() => {
                                    setError({
                                        field: null,
                                        status: false,
                                    })
                                }
                                }

                            />
                            <TouchableOpacity
                                onPress={() => setPasswordVisibility(!passwordVisibility)}
                                style={{ position: 'absolute', right: 15, bottom: 12 }}
                            >
                                <Ionicons
                                    name={!passwordVisibility ? 'md-eye-off-outline' :
                                        'md-eye-outline'
                                    }
                                    size={25} color="#bdbdbd"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>


                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => validateForm()}
                        style={{
                            flexDirection: 'row',
                            paddingHorizontal: 15,
                            marginTop: 5,
                        }}
                        disabled={disabled}
                    >

                        <Text style=
                            {[styles.registerBtn, {
                                backgroundColor: disabled ? '#f1f1f1' : COLORS.green,
                            }]}
                        > Üye Ol

                        </Text>
                    </TouchableOpacity>

                    <View style={styles.flex}>
                        <Text style={{
                            fontSize: 13,
                        }}>Üye misin? </Text>
                        <Pressable
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.registerLink}>Giriş Yap</Text>

                        </Pressable>

                    </View>

                </View>


            </ScrollView>

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingTop: 45,
    },
    header: {
        alignItems: 'center',
        marginVertical: 20,
    },
    logo: {
        width: 180,
        height: 120,
        marginRight: 25,
    },
    loginForm: {
        backgroundColor: '#fff',
    },
    fieldWrapper: {
        marginBottom: 16,
        paddingHorizontal: 15,
    },
    input: {
        borderWidth: 2,
        borderColor: '#ebebeb',
        borderRadius: 5,
        backgroundColor: COLORS.white,
        color: 'gray',
        fontSize: 13,
        fontWeight: 'bold',
        width: Dimensions.get('window').width * 0.9,
        paddingVertical: 10,
        paddingLeft: 14,
        marginTop: 3,
    },
    label: {
        alignSelf: 'flex-start',
        marginBottom: 4,
        marginTop: 5,
        fontSize: 13,
        fontFamily: 'Roboto',
        paddingLeft: 2,
        color: '#9a9c9a',
    },
    registerBtn: {
        borderRadius: 5,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        width: Dimensions.get('window').width * 0.9,
        paddingVertical: 12,

    },
    registerLink: {
        fontSize: 13,
        color: COLORS.green,
        marginLeft: 5,
    },
    forgotPassLink: {
        color: '#7F8487',
        fontSize: 11,
        paddingRight: 15,
        color: COLORS.green,
        alignSelf: 'flex-end',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
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

export default RegisterScreen