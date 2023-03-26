import React, { useState } from 'react'
import AddressPostForm from '../components/address/AddressPostForm'
import AddressService from '../../services/AddressService'
import  Toast  from 'react-native-toast-message'

const AddAddressScreen = ({ navigation ,route}) => {

    const fields = ["title", "name", "surname", "phone", "detail", "neighborhood", "city", "district"]
    const [address, setAddress] = useState(
        fields.reduce((acc, field) => {
            acc[field] = {
                value: '',
                error: {
                    message: '',
                    status: false
                },
                isFocus: false
            }
            return acc
        }, {})
    )
    const [disabled , setDisabled] = useState(false)

    const onSubmit = async (address) => {
        setDisabled(true)
        let newAddress = {
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
            await AddressService.addAddress( {address:newAddress})
            
            if(route?.params?.prevRouteName === "Checkout"){
                navigation.navigate('Checkout', { address: newAddress })
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
            } , 2000);
        }
    }

    return (
        <AddressPostForm
            address={address}
            setAddress={setAddress}
            onSubmit={onSubmit}
            prevRouteName={route?.params?.prevRouteName}
            disabled={disabled}
        />
    )
}

export default AddAddressScreen
