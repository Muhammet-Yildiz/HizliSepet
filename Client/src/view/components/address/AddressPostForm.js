import React  from 'react'
import { Text, StyleSheet, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-element-textinput';
import { FontAwesome5, FontAwesome, Ionicons } from '@expo/vector-icons';
import COLORS from '../../../consts/colors';

const AddressPostForm = ({ address, setAddress, onSubmit, deleteAddress, prevRouteName, disabled }) => {

    const validateForm = () => {
        if (address?.name.value === '') {
            setAddress({
                ...address,
                name: {
                    ...address.name,
                    error: {
                        message: 'Ad alanı boş bırakılamaz',
                        status: true
                    }
                }
            })
            return;
        }
        if (address.surname.value === '') {
            setAddress({
                ...address,
                surname: {
                    ...address.surname,
                    error: {
                        message: 'Soyad alanı boş bırakılamaz',
                        status: true
                    }
                }
            })
            return;
        }
        if (address.phone.value === '' || address.phone.value.length !== 14) {
            setAddress({
                ...address,
                phone: {
                    ...address.phone,
                    error: {
                        message: address.phone.value.length == 1 ? 'Telefon alanı boş bırakılamaz' : 'Telefon numarası 11 haneli olmalıdır',
                        status: true
                    }
                }
            })
            return;

        }
        if (address.city.value === '') {
            setAddress({
                ...address,
                city: {
                    ...address.city,
                    error: {
                        message: 'İl alanı boş bırakılamaz',
                        status: true
                    }
                }
            })
            return;
        }
        if (address.district.value === '') {
            setAddress({
                ...address,
                district: {
                    ...address.district,
                    error: {
                        message: 'İlçe alanı boş bırakılamaz',
                        status: true
                    }
                }
            })
            return;
        }
        if (address.neighborhood.value === '') {
            setAddress({
                ...address,
                neighborhood: {
                    ...address.neighborhood,
                    error: {
                        message: 'Mahalle alanı boş bırakılamaz',
                        status: true
                    }
                }
            })
            return;
        }
        if (address.detail.value === '') {
            setAddress({
                ...address,
                detail: {
                    ...address.detail,
                    error: {
                        message: 'Adres alanı boş bırakılamaz',
                        status: true
                    }
                }
            })
            return;
        }
        if (address.title.value === '') {
            setAddress({
                ...address,
                title: {
                    ...address.title,
                    error: {
                        message: 'Adres Başlıgı alanı boş bırakılamaz',
                        status: true
                    }
                }
            })
            return;
        }
        else {
            onSubmit(address)
        }
    }

    return (
        <View style={styles.container}>
            {address.name &&
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 15 }}
                >
                    <View
                        style={styles.contactInfoWrapper}
                    >
                        <Text style={styles.contactInfoText}>İletişim Bilgileri</Text>

                        <View style={styles.flex}>
                            <FontAwesome5
                                name="user-alt"
                                size={21}
                                color={COLORS.green}
                                style={{ marginBottom: 20 }}
                            />

                            <TextInput
                                value={address?.name?.value}
                                style={[styles.input, {
                                    width: Dimensions.get('window').width - 70,
                                    borderColor: address.name.isFocus ? COLORS.green : '#e3e3e3',
                                },
                                address?.name?.error?.status && { ...styles.inputIsValid }
                                ]}
                                inputStyle={styles.inputStyle}
                                labelStyle={{
                                    ...styles.labelStyle,
                                    color: address.name.isFocus ? COLORS.green : '#878787',
                                }}
                                label="Ad"
                                placeholderTextColor="red"
                                placeholderStyle={{ fontSize: 15 }}
                                onChangeText={text => {
                                    setAddress({
                                        ...address,
                                        name: {
                                            ...address.name, value: text, error: { ...address.name.error, status: false, message: '' }
                                        }
                                    })
                                }}
                                onFocus={() => {
                                    setAddress({
                                        ...address, name: {
                                            ...address.name,
                                            isFocus: true,
                                            error: { ...address.name.error, status: false, message: '' }
                                        }
                                    })
                                }}
                                onBlur={() => {
                                    setAddress({ ...address, name: { ...address.name, isFocus: false } })
                                }}
                            />

                        </View>
                        <Text style={[styles.errorText, {
                            display: address?.name?.error?.status ? 'flex' : 'none'
                        }]}>{address?.name?.error?.message}</Text>
                        <TextInput
                            value={address.surname.value}
                            style={[styles.input, {
                                width: Dimensions.get('window').width - 70,
                                borderColor: address.surname.isFocus ? COLORS.green : '#e3e3e3',
                                alignSelf: 'flex-end'
                            },
                            address?.surname?.error?.status && { ...styles.inputIsValid }
                            ]}
                            inputStyle={styles.inputStyle}
                            labelStyle={{
                                ...styles.labelStyle,
                                color: address.surname.isFocus ? COLORS.green : '#878787',
                            }}
                            label="Soyad"
                            placeholderTextColor="red"
                            placeholderStyle={{ fontSize: 15 }}
                            onChangeText={text => {
                                setAddress({
                                    ...address,
                                    surname: {
                                        ...address.surname, value: text, error: { ...address.surname.error, status: false, message: '' }
                                    }
                                })
                            }}
                            onFocus={() => {
                                setAddress({
                                    ...address, surname: {
                                        ...address.surname,
                                        isFocus: true,
                                        error: { ...address.surname.error, status: false, message: '' }
                                    }
                                })
                            }}
                            onBlur={() => {
                                setAddress({ ...address, surname: { ...address.surname, isFocus: false } })
                            }}
                        />
                        <Text style={[styles.errorText, {
                            display: address?.surname?.error?.status ? 'flex' : 'none'
                        }]}>{address?.surname?.error?.message}</Text>

                        <View style={styles.flex}>
                            <FontAwesome
                                name="phone"
                                size={25}
                                color={COLORS.green}
                                style={{ marginBottom: 20 }}
                            />

                            <TextInput
                                value={address.phone.value}
                                style={[styles.input, {
                                    width: Dimensions.get('window').width - 70,
                                    borderColor: address.phone.isFocus ? COLORS.green : '#e3e3e3',
                                },
                                address?.phone?.error?.status && { ...styles.inputIsValid }
                                ]}


                                inputStyle={styles.inputStyle}
                                labelStyle={{
                                    ...styles.labelStyle,
                                    color: address.phone.isFocus ? COLORS.green : '#878787',
                                }}
                                label="Cep Telefonu"
                                placeholderTextColor="gray"
                                placeholderStyle={{ fontSize: 15 }}
                                onChangeText={text => {
                                    text = text.replace(/[^0-9]/g, '')
                                    if (text.length > 4) {
                                        text = text.slice(0, 4) + ' ' + text.slice(4)
                                    }
                                    if (text.length > 8) {
                                        text = text.slice(0, 8) + ' ' + text.slice(8)
                                    }
                                    if (text.length > 11) {
                                        text = text.slice(0, 11) + ' ' + text.slice(11)
                                    }
                                    setAddress({
                                        ...address, phone: {
                                            ...address.phone, value: text.indexOf('0') === 0 ? text : '0' + text,
                                        }
                                    })

                                }}
                                onFocus={() => {
                                    if (address.phone.value == 0) {
                                        setAddress({
                                            ...address, phone: {
                                                ...address.phone, value: '0', isFocus: true,
                                                error: { ...address.phone.error, status: false, message: '' }
                                            }
                                        })
                                    }
                                    else {
                                        setAddress({
                                            ...address, phone: { ...address.phone, isFocus: true, error: { ...address.phone.error, status: false, message: '' } },

                                        })
                                    }
                                }
                                }
                                keyboardType="phone-pad"
                                maxLength={14}
                                onBlur={() => {
                                    if (address.phone.value.length === 1) {
                                        setAddress({ ...address, phone: { ...address.phone, value: '', isFocus: false } })
                                    }
                                    else {
                                        setAddress({ ...address, phone: { ...address.phone, isFocus: false } })
                                    }
                                }
                                }
                            />
                        </View>
                        <Text style={[styles.errorText, {
                            display: address?.phone?.error?.status ? 'flex' : 'none'
                        }]}>{address?.phone?.error?.message}</Text>

                    </View>

                    <View
                        style={styles.addressInfoWrapper}
                    >
                        <Text style={styles.addressInfoText}>Adres Bilgileri </Text>

                        <View style={styles.flex}>

                            <Ionicons
                                name="ios-location"
                                size={27}
                                color={COLORS.green}
                                style={{ marginBottom: 20 }}
                            />
                            <View style={[styles.flex, {
                                justifyContent: 'space-between',
                                width: Dimensions.get('window').width - 70,
                            }]}>
                                <View
                                    style={{
                                        width: Dimensions.get('window').width / 2 - 50,
                                    }}
                                >

                                    <TextInput
                                        value={address.city.value}
                                        style={[styles.input, {
                                            borderColor: address.city.isFocus ? COLORS.green : '#e3e3e3',
                                        },
                                        address?.city?.error?.status && { ...styles.inputIsValid }
                                        ]}
                                        inputStyle={styles.inputStyle}
                                        labelStyle={{
                                            ...styles.labelStyle,
                                            color: address.city.isFocus ? COLORS.green : '#878787',
                                        }}
                                        label="İl"
                                        placeholderTextColor="red"
                                        placeholderStyle={{ fontSize: 15 }}
                                        onChangeText={text => {
                                            setAddress({
                                                ...address,
                                                city: {
                                                    ...address.city, value: text, error: { ...address.city.error, status: false, message: '' }
                                                }
                                            })
                                        }}
                                        onFocus={() => {
                                            setAddress({
                                                ...address, city: {
                                                    ...address.city,
                                                    isFocus: true,
                                                    error: { ...address.city.error, status: false, message: '' }
                                                }
                                            })
                                        }}
                                        onBlur={() => {
                                            setAddress({ ...address, city: { ...address.city, isFocus: false } })
                                        }}
                                    />
                                    <Text style={[styles.errorText, {
                                        display: address?.city?.error?.status ? 'flex' : 'none',
                                        marginLeft: 10
                                    }]}>{address?.city?.error?.message}</Text>

                                </View>

                                <View style={{
                                    width: Dimensions.get('window').width / 2 - 50,
                                }}>
                                    <TextInput
                                        value={address.district.value}
                                        style={[styles.input, {
                                            borderColor: address.district.isFocus ? COLORS.green : '#e3e3e3',
                                            width: Dimensions.get('window').width / 2 - 50
                                        },
                                        address?.district?.error?.status && { ...styles.inputIsValid }
                                        ]}
                                        inputStyle={styles.inputStyle}
                                        labelStyle={{
                                            ...styles.labelStyle,
                                            color: address.district.isFocus ? COLORS.green : '#878787',
                                        }}
                                        label="İlçe"
                                        placeholderTextColor="red"
                                        placeholderStyle={{ fontSize: 15 }}
                                        onChangeText={text => {
                                            setAddress({
                                                ...address,
                                                district: {
                                                    ...address.district, value: text, error: { ...address.district.error, status: false, message: '' }
                                                }
                                            })
                                        }}
                                        onFocus={() => {
                                            setAddress({
                                                ...address, district: {
                                                    ...address.district,
                                                    isFocus: true,
                                                    error: { ...address.district.error, status: false, message: '' }
                                                }
                                            })
                                        }}
                                        onBlur={() => {
                                            setAddress({ ...address, district: { ...address.district, isFocus: false } })
                                        }}
                                    />
                                    <Text style={[styles.errorText, {
                                        display: address?.district?.error?.status ? 'flex' : 'none',
                                        marginLeft: 10
                                    }]}>{address?.district?.error?.message}</Text>
                                </View>


                            </View>
                        </View>

                        <TextInput
                            value={address.neighborhood.value}
                            style={[styles.input, {
                                borderColor: address.neighborhood.isFocus ? COLORS.green : '#e3e3e3',
                                width: Dimensions.get('window').width - 70,
                                alignSelf: 'flex-end'
                            },
                            address?.neighborhood?.error?.status && { ...styles.inputIsValid }
                            ]}
                            inputStyle={styles.inputStyle}
                            labelStyle={{
                                ...styles.labelStyle,
                                color: address.neighborhood.isFocus ? COLORS.green : '#878787',
                            }}
                            label="Mahalle"
                            placeholderTextColor="red"
                            placeholderStyle={{ fontSize: 15 }}
                            onChangeText={text => {
                                setAddress({
                                    ...address,
                                    neighborhood: {
                                        ...address.neighborhood, value: text, error: { ...address.neighborhood.error, status: false, message: '' }
                                    }
                                })
                            }}
                            onFocus={() => {
                                setAddress({
                                    ...address, neighborhood: {
                                        ...address.neighborhood,
                                        isFocus: true,
                                        error: { ...address.neighborhood.error, status: false, message: '' }
                                    }
                                })
                            }}
                            onBlur={() => {
                                setAddress({ ...address, neighborhood: { ...address.neighborhood, isFocus: false } })
                            }}
                        />
                        <Text style={[styles.errorText, {
                            display: address?.neighborhood?.error?.status ? 'flex' : 'none',
                        }]}>{address?.neighborhood?.error?.message}</Text>

                        <TextInput
                            value={address.detail.value}
                            style={[styles.input, {
                                borderColor: address.detail.isFocus ? COLORS.green : '#e3e3e3',
                                width: Dimensions.get('window').width - 70,
                                alignSelf: 'flex-end'
                            },
                            address?.detail?.error?.status && { ...styles.inputIsValid }
                            ]}
                            inputStyle={styles.inputStyle}
                            labelStyle={{
                                ...styles.labelStyle,
                                color: address.detail.isFocus ? COLORS.green : '#878787',
                            }}
                            label="Adres"
                            placeholderTextColor="red"
                            placeholderStyle={{ fontSize: 15 }}
                            onChangeText={text => {
                                setAddress({
                                    ...address,
                                    detail: {
                                        ...address.detail, value: text, error: { ...address.detail.error, status: false, message: '' }
                                    }
                                })
                            }}
                            onFocus={() => {
                                setAddress({
                                    ...address, detail: {
                                        ...address.detail,
                                        isFocus: true,
                                        error: { ...address.detail.error, status: false, message: '' }
                                    }
                                })
                            }}
                            onBlur={() => {
                                setAddress({ ...address, detail: { ...address.detail, isFocus: false } })
                            }}
                            multiline={true}
                            numberOfLines={2}
                        />
                        <Text style={[styles.errorText, {
                            display: address?.detail?.error?.status ? 'flex' : 'none',
                        }]}>{address?.detail?.error?.message}</Text>

                        <View style={styles.flex}>
                            <FontAwesome
                                name="building"
                                size={22}
                                color={COLORS.green}
                                style={{ marginBottom: 20 }}
                            />

                            <View
                                style={{
                                    width: Dimensions.get('window').width - 70,
                                }}
                            >
                                <TextInput
                                    value={address.title.value}
                                    style={[styles.input, {
                                        borderColor: address.title.isFocus ? COLORS.green : '#e3e3e3',
                                    },
                                    address?.title?.error?.status && { ...styles.inputIsValid }
                                    ]}
                                    inputStyle={styles.inputStyle}
                                    labelStyle={{
                                        ...styles.labelStyle,
                                        color: address.title.isFocus ? COLORS.green : '#878787',
                                    }}
                                    label="Adres Başlıgı"
                                    placeholderTextColor="red"
                                    placeholderStyle={{ fontSize: 15 }}
                                    onChangeText={text => {
                                        setAddress({
                                            ...address,
                                            title: {
                                                ...address.title, value: text, error: { ...address.title.error, status: false, message: '' }
                                            }
                                        })
                                    }}
                                    onFocus={() => {
                                        setAddress({
                                            ...address, title: {
                                                ...address.title,
                                                isFocus: true,
                                                error: { ...address.title.error, status: false, message: '' }
                                            }
                                        })
                                    }}
                                    onBlur={() => {
                                        setAddress({ ...address, title: { ...address.title, isFocus: false } })
                                    }}

                                />
                                <Text style={[styles.errorText, {
                                    display: address?.title?.error?.status ? 'flex' : 'none',
                                    marginLeft: 10
                                }]}>{address?.title?.error?.message}</Text>

                            </View>

                        </View>
                    </View>

                    <View style={[styles.buttonWrapper, {
                        backgroundColor: disabled ? '#f1f1f1' : COLORS.green
                    }]}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={validateForm}
                            disabled={disabled}
                        >
                            <Text style={styles.buttonText}>Kaydet</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        prevRouteName !== 'Checkout' &&
                        (
                            deleteAddress &&
                            <View style={[styles.buttonWrapper, {
                                backgroundColor: disabled ? '#f1f1f1' : '#d4cfcf'
                            }]}>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={deleteAddress}
                                    disabled={disabled}
                                >
                                    <Text style={styles.buttonText}>Adresi Sil</Text>
                                </TouchableOpacity>
                            </View>)
                    }

                </ScrollView>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f9',
        flex: 1,
    },
    input: {
        height: 57,
        paddingHorizontal: 12,
        borderWidth: 2,
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

    contactInfoWrapper: {
        elevation: 5,
        marginBottom: 20,
        backgroundColor: 'white',
        padding: 15,
    },
    addressInfoWrapper: {
        elevation: 5,
        marginBottom: 20,
        backgroundColor: 'white',
        padding: 15,
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contactInfoText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 20,
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 1,
        paddingBottom: 15,
        color: '#434242'
    },
    addressInfoText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 20,
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 1,
        paddingBottom: 15,
        color: '#434242'
    },
    buttonWrapper: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 20,
        marginHorizontal: 15,
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
});
export default AddressPostForm
