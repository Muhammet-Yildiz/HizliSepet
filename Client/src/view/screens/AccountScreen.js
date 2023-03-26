import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthState } from '../../Context/AuthContext'
import { Ionicons, Entypo, AntDesign, MaterialCommunityIcons, FontAwesome5, MaterialIcons, Feather } from 'react-native-vector-icons'
import COLORS from '../../consts/colors';
const options = [
  {
    title: 'Siparişlerim',
    icon: 'package',
    packageName: 'Feather',
    href: 'MyOrders'
  },
  {
    title: 'Adreslerim',
    packageName: 'Ionicons',
    icon: 'location-outline',
    href: 'MyAddresses'
  },
  {
    title: 'Kayıtlı Kartlarım',
    packageName: 'AntDesign',
    icon: 'creditcard',
    href: 'BankCards'
  },
  {
    title: 'Değerlendirmelerim',
    packageName: 'MaterialCommunityIcons',
    icon: 'comment-processing-outline',
    href: 'MyEvaluations'
  },
  {
    title: 'E-Mail Degişikligi',
    packageName: 'FontAwesome5',
    icon: 'envelope',
    href: 'ChangeEmail'
  },
  {
    title: 'Şifre Degişikligi',
    packageName: 'MaterialIcons',
    icon: 'lock-outline',
    href: 'ChangePassword'
  },
  , {
    title: 'Çıkış Yap',
    packageName: 'MaterialCommunityIcons',
    icon: 'logout',
    href: 'Login'
  }

]
const AccountScreen = ({ navigation }) => {

  const { logout } = AuthState()

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.white }}
    >
      <View style={styles.headerSection}>
        <View style={styles.headerInfo}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}
          >
            <Entypo name="chevron-small-left" size={28} color="white" />
          </TouchableOpacity>

          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 15 }}>
            Hesabım
          </Text>
          <Ionicons name="notifications-outline" size={25} color="white" />

        </View>


      </View>
      <View style={styles.mainSection}>

        {options.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (item.title === 'Çıkış Yap') {
                  logout()
                }
                else {
                  navigation.navigate(item.href)
                }
              }}
            >

              <View style={styles.mainSectionItem} >
                {item.packageName === 'Ionicons' && <Ionicons name={item.icon} size={25} color='#333' /> ||
                  item.packageName === 'MaterialCommunityIcons' && <MaterialCommunityIcons name={item.icon} size={25} color='#333' /> ||
                  item.packageName === 'AntDesign' && <AntDesign name={item.icon} size={25} color='#333' /> ||
                  item.packageName === 'FontAwesome5' && <FontAwesome5 name={item.icon} size={22} color='#333' /> ||
                  item.packageName === 'MaterialIcons' && <MaterialIcons name={item.icon} size={25} color='#333' /> ||
                  item.packageName === 'Feather' && <Feather name={item.icon} size={25} color='#333' />
                }
                <Text
                  style={{ fontWeight: 'bold', color: 'grey', fontSize: 13 }}
                >
                  {item.title}
                </Text>
                <Entypo name="chevron-small-right" size={27} color="black" />

              </View>
            </TouchableOpacity>

          )

        })}


      </View>

    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  headerSection: {
    padding: 18,
    backgroundColor: COLORS.grey,
  },
  headerInfo: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutBtn: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    margin: 50,
    width: 100,
  },

  text: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
  },
  mainSection: {
    backgroundColor: 'white',
    height: 550,
    padding: 15,
    paddingTop: 20,

  },
  mainSectionItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  }

})

export default AccountScreen