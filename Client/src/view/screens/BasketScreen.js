import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BasketItem from '../components/basket/BasketItem'
import { StoreState } from '../../Context/StoreContext'
import COLORS from '../../consts/colors'
import * as Progress from 'react-native-progress';
import FixedStoreField from '../components/general/FixedConfirmationField'
import RecommendBasketItems from '../components/basket/RecommendBasketItems'

const BasketScreen = ({ navigation }) => {

  const { basketItems, totalPrice, loading, basketItemsLength } = StoreState()

  return (
    <>
      <SafeAreaView
        style={{
          height: Dimensions.get('screen').height,
          backgroundColor: '#f9f9f9'
        }}
      >
        <View style={styles.headerInfo} >

          <View style={styles.headerTxtWrap} >

            <Text style={{ fontWeight: 'bold', color: '#413F42' }} >
              Sepetim
            </Text>
            {basketItemsLength > 0 &&
              <>
                <Text style={{ marginHorizontal: 10, fontWeight: 'bold' }}>
                  -
                </Text>

                <Text style={{ fontWeight: 'bold', color: '#B2B2B2' }}>
                  {basketItemsLength} ürün
                </Text>

              </>
            }
          </View>

        </View>
        <Progress.Bar
          progress={0.8}
          width={Dimensions.get('screen').width}
          height={loading ? 4 : 0}
          borderRadius={2}
          color={COLORS.green}
          style={{ borderWidth: 0 }}
          indeterminate={true}
          indeterminateAnimationDuration={950}
          useNativeDriver={true}

        />


        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: 52,
          }}
        >

          <View
            style={styles.basketItems}
          >

            {basketItemsLength > 0 ?
              (
                basketItems.map((item, index) => (

                  <View  key={index}  >
                    <BasketItem
                      item={item}
                      navigation={navigation}
                    />
                  </View>
                ))

              )
              :
              <View
                style={{
                  height: 380,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                }}
              >
                <Image
                  source={require('../../assets/emptyChart.png')}
                  style={{
                    width: 150,
                    height: 150,
                    marginBottom: 20,
                  }}
                />

                <Text
                  style={styles.text}
                > Sepetim  </Text>
                <Text
                  style={styles.textLight}
                >
                  Sepetinizde ürün bulunmamaktadır.
                </Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('Home')}
                  style={{
                    width: '90%',
                  }}
                >
                  <Text
                    style={styles.btnWrapper}
                  >
                    Alışverişe Devam Et
                  </Text>
                </TouchableOpacity>

              </View>

            }


          </View>

          <RecommendBasketItems 
            navigation={navigation}
          />

        </ScrollView>


      </SafeAreaView>

      <FixedStoreField
        totalPrice={totalPrice}
        navigation={navigation}
        buttonText='Sepeti Onayla'
      />
    </>
  )
}

const styles = StyleSheet.create({
  headerInfo: {
    paddingHorizontal: 18,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 5,
  },
  headerTxtWrap: {
    display: 'flex',
    flexDirection: 'row',

  },
  basketItems: {
    borderRadius: 5,
    display: 'flex',
    marginBottom: 15,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    alignItems: 'center',
  },
  btnWrapper: {
    backgroundColor: COLORS.green,
    color: 'white',
    paddingVertical: 12,
    borderRadius: 5,
    fontWeight: 'bold',
    marginTop: 10,
    width: '100%',
    textAlign: 'center',
  },
  textLight: {
    color: '#413F42',
    fontSize: 12,
    color: '#757575',
    marginBottom: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
    color: '#575656',
  },

})

export default BasketScreen