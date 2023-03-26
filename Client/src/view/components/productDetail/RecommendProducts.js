import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import COLORS from '../../../consts/colors'
import ProductService from '../../../services/ProductService'
import RecommendProductItem from './RecommendProductItem'

const RecommendProducts = ({ productId, subCategoryId ,navigation}) => {

    const [products, setProducts] = useState([])
    const [similarProducts, setSimilarProducts] = useState([])

    const getProductsInSameSubCategory = async () => {
        try {
            const { data } = await ProductService.getProductsInSameSubCategory(subCategoryId);
            setSimilarProducts(data.products)
        }
        catch (err) {
            console.log("error :", err)
            setSimilarProducts([])
        }

    }


    const getLastViewedProducts = async () => {
        try {
            const { data } = await ProductService.lastViewedProducts();

            setProducts(data.lastVieweds.products)

        }
        catch (err) {
            console.log(" error :", err)
            setProducts([])
        }

    }

    useEffect(() => {
        getLastViewedProducts()
        getProductsInSameSubCategory()
    }, [subCategoryId])



    return (
        <>
            {similarProducts.length >= 2 && <View style={[styles.container, { marginBottom: 20 }]}>

                <Text style={styles.title}>
                    Benzer Ürünler
                </Text>

                <FlatList
                    data={similarProducts}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (
                        <RecommendProductItem item={item} productId={productId} navigation ={navigation}  />
                    )}
                />

            </View>
            }
            {products.length >= 3 &&
                <View style={styles.container}>
                    <Text style={styles.title}>
                        Son Baktıgınız Ürünler
                    </Text>
                    <FlatList
                        data={products}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => (
                            <RecommendProductItem item={item} productId={productId }  navigation ={navigation} />

                        )}
                    />

                </View>
            }
        </>

    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        marginTop: 5,
        paddingHorizontal: 12,
        elevation: 2,
        width: '100%',
        marginBottom: 55,
    },
    title: {
        fontSize: 14, fontWeight: '500', paddingVertical: 17, color: '#2C2E43',
        paddingBottom:10,
        marginBottom: 10,
    },

})


export default RecommendProducts 