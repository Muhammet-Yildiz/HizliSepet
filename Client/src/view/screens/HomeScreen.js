import React, { useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import COLORS from '../../consts/colors'
import ProductCard from '../components/general/ProductCard'
import { ProductsState } from '../../Context/ProductContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchSection from '../components/general/SearchSection'

const HomeScreen = ({ navigation }) => {

  const { allProducts, getAllProducts } = ProductsState();

  useEffect(() => {
    const onfocus = navigation.addListener('focus', () => {
      getAllProducts()
    }
    );
    return onfocus;
  }, [navigation]);


  return (
    <SafeAreaView style={styles.container}  >
      <SearchSection
        navigation={navigation}
      />

      <FlatList
        data={allProducts}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
        keyExtractor={(item, index) => index}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <ProductCard product={item} navigation={navigation} />
        )}
      />

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.white,
  },

})

export default HomeScreen