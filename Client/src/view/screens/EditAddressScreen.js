import React, { useState, useEffect } from 'react'
import AddressPostForm from '../components/address/AddressPostForm'
import AddressService from '../../services/AddressService'
import Toast from 'react-native-toast-message'

const EditAddressScreen = ({ route, navigation }) => {

    const fields = ["title", "name", "surname", "phone", "detail", "neighborhood", "city", "district"]
    const [address, setAddress] = useState({})
    const { prevRouteName } = route.params
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        setAddress(
            fields.reduce((acc, field) => {
                acc[field] = {
                    value: route.params.address[field],
                    error: {
                        message: '',
                        status: false
                    },
                    isFocus: false
                }
                return acc
            }, {})
        )
    }, [route.params.address])

    const onSubmit = async (address) => {
        setDisabled(true)
        let editAddress = {
            title: address.title.value,
            name: address.name.value,
            surname: address.surname.value,
            phone: address.phone.value,
            detail: address.detail.value,
            neighborhood: address.neighborhood.value,
            city: address.city.value,
            district: address.district.value
        }
        try {
            await AddressService.editAddress({ address: editAddress, id: route.params.address._id })

            if (prevRouteName === "Checkout") {
                navigation.navigate('Checkout', { address: editAddress, id: route.params.address._id })
            }
            else {
                navigation.navigate('MyAddresses')
            }

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
            }, 2000);

        }

    }

    const deleteAddress = async () => {
        await AddressService.deleteAddress(route.params.address._id)
        navigation.navigate('MyAddresses')
    }

    return (
        <AddressPostForm
            address={address}
            setAddress={setAddress}
            onSubmit={onSubmit}
            deleteAddress={deleteAddress}
            prevRouteName={prevRouteName}
            disabled={disabled}
        />
    )
}

export default EditAddressScreen