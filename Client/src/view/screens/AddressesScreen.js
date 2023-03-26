import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import AddressService from '../../services/AddressService'
import COLORS from '../../consts/colors'
import { Ionicons, MaterialIcons } from 'react-native-vector-icons'
import { BarIndicator } from 'react-native-indicators'

const AddressesScreen = ({ navigation }) => {

  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(false)
  const routes = navigation.getState()?.routes;
  const prevRouteName = routes[routes.length - 2].name

  const getAllAddresses = async () => {
    setLoading(true)
    try {
      const { data } = await AddressService.getAllAddresses()
      setAddresses(data.addresses)
      setLoading(false)

    } catch (error) {
      setLoading(false)
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Adres Bilgilerim',
      headerStyle: {
        backgroundColor: COLORS.white,
      },
      headerTintColor: '#434242',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 17,
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            if (prevRouteName === 'Checkout') {
              navigation.navigate('AddAddress', { prevRouteName: prevRouteName })
            }
            else {
              navigation.navigate('AddAddress')
            }
          }
          }
        >
          <Text style={{ color: COLORS.green, fontSize: 15, marginRight: 10, fontWeight: 'bold' }}>Adres Ekle</Text>
        </TouchableOpacity>
      ),

    })
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllAddresses()
    }
    )
    return unsubscribe
  }, [])


  return (

    <View
      style={styles.container}
    >
      {
        loading ?
          <View style={{
            justifyContent: 'center', alignItems: 'center', height: '100%',
            backgroundColor: COLORS.white
          }}>
            <BarIndicator
              color={COLORS.grey}
              size={45}
            />
          </View>
          :

          addresses.length === 0 ?
            <View
              style={{
                height: '100%',
                backgroundColor: COLORS.white,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                source={require('../../assets/address.png')}
                style={{
                  width: 170,
                  height: 170,
                  resizeMode: 'contain',
                  marginBottom: 20,
                }}
              />
              <Text style={styles.textExplain} >

                Kayıtlı Adresiniz Bulunmamaktadır

              </Text>

              <Text style={styles.textLight}>
                Siparişleriniz için adres ekleyebilirsiniz.
              </Text>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}
                onPress={() => navigation.navigate('Home')}
              >
                <Text
                  style={styles.btnWrapper}
                >
                  Alışverişe Devam Et
                </Text>
              </TouchableOpacity>
            </View>
            :
           
            <ScrollView  showsVerticalScrollIndicator={false}  >
              {addresses.map((address) => (
                <View
                  key={address._id}
                  style={styles.addressCard}
                  onTouchEnd={() => {
                    navigation.navigate('EditAddress', { address: address, prevRouteName: prevRouteName })
                  }}
                >
                  <View style={styles.flex} >
                    <View style={styles.flex} >
                      <Ionicons
                        name="location-sharp"
                        size={24}
                        color={COLORS.green}
                      />
                      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#434242', marginLeft: 20 }}>
                        {address.title}
                      </Text>
                    </View>
                    <MaterialIcons
                      name="edit"
                      size={21}
                      color={COLORS.grey}
                    />

                  </View>
                  <View style={{ paddingLeft: 45, marginTop: 12 }} >

                    <Text style={styles.text}>
                      {address.name} {address.surname}
                    </Text>
                    <Text style={styles.text}>
                      {address.phone.replace(address.phone.substring(3, 8), '****')}
                    </Text>

                    <Text style={styles.text}>
                      {address.district} / {address.city}
                    </Text>
                    <Text style={styles.text}>
                      {address.detail}
                    </Text>
                  </View>

                </View>
              ))}
            </ScrollView>
      }

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: '#f9f9f9',
  },
  addressCard: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    elevation: 3,
    minHeight: 170,
    marginBottom: 20,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 12.5,
    color: '#7F8487',
    marginRight: 5,
    marginBottom: 5,
  },
  textLight: {
    color: '#413F42',
    fontSize: 12,
    color: '#757575',
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 15,
  },
  textExplain: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 15,
    color: '#575656',
  },
  btnWrapper: {
    backgroundColor: COLORS.green,
    color: 'white',
    paddingVertical: 12,
    borderRadius: 5,
    fontWeight: 'bold',
    marginTop: 10,
    width: '90%',
    textAlign: 'center',
  },
})


export default AddressesScreen