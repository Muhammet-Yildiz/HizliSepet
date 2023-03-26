import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, FlatList, ScrollView } from 'react-native'
import COLORS from '../../../consts/colors'
import { FavoriteState } from '../../../Context/FavoriteContext'
import RecommendBasketItem from './RecommendBasketItem'
import ProductService from '../../../services/ProductService'
import { StoreState } from '../../../Context/StoreContext'
import { AntDesign } from 'react-native-vector-icons'

const RecommendBasketItems = ({ navigation }) => {
    const [tabs, setTabs] = useState(['Favorilerim', 'Önerilen Ürünler', 'Son Görüntülenenler'])
    const { basketItems } = StoreState()
    const [activeTab, setActiveTab] = useState('Favorilerim')
    const [lastViewedProducts, setLastViewedProducts] = useState([])
    const { favoriteList } = FavoriteState()
    const [similarProducts, setSimilarProducts] = useState([])
    const [activeData, setActiveData] = useState(favoriteList)

    const getLastViewedProducts = async () => {
        try {
            const { data } = await ProductService.lastViewedProducts();
            setLastViewedProducts(data.lastVieweds.products)
        }
        catch (err) {
            setLastViewedProducts([])
        }

    }

    const getRecommendationsForItemsInBasket = async () => {
        try {
            const { data } = await ProductService.getRecommendationsForItemsInBasket();
            setSimilarProducts(data.products)
        }
        catch (err) {
            setSimilarProducts([])
        }

    }

    useEffect(() => {
        getRecommendationsForItemsInBasket()
        if (basketItems.length === 0) {
            const newTabs = tabs.filter((item) => item !== 'Önerilen Ürünler')
            setTabs([...newTabs])
            setActiveData(lastViewedProducts)
            setActiveTab('Son Görüntülenenler')
        }
        else {
            setTabs(['Favorilerim', 'Önerilen Ürünler', 'Son Görüntülenenler'])
        }

    }, [basketItems])

    useEffect(() => {
        if (favoriteList.length == 0) {
            setTabs([...tabs.filter((item) => item !== 'Favorilerim')])
            setActiveData(lastViewedProducts)
            setActiveTab('Son Görüntülenenler')
        }
        else {
            if (!tabs.includes('Favorilerim')) {
                setTabs(['Favorilerim', ...tabs])
            }
        }

    }, [favoriteList])


    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
          
            getLastViewedProducts()
            getRecommendationsForItemsInBasket()
        }
        );

        return unsubscribe;

    }, [])

    return (

        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                flex: 1,
                paddingBottom: 130,
            }}
        >

            <View
                style={styles.container}
            >

                <View
                    style={{
                        height: 55,
                        borderBottomWidth: 1,
                        borderColor: '#f5f5f5',
                    }}
                >

                    <FlatList
                        data={tabs}
                        keyExtractor={(item) => item}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.tabsWrapper}
                        renderItem={({ item }) => (
                            <View
                                style={[styles.tab, {
                                    borderColor: activeTab === item ? COLORS.green : 'rgba(0,0,0,0.3)',
                                }]}
                                onTouchEnd={() => {
                                    setActiveTab(item)
                                    if (item === 'Favorilerim') {
                                        setActiveData(favoriteList)
                                    }
                                    else if (item === 'Önerilen Ürünler') {
                                        setActiveData(similarProducts)
                                    }
                                    else if (item === 'Son Görüntülenenler') {
                                        setActiveData(lastViewedProducts)
                                    }
                                }}
                            >
                                {
                                    item === 'Favorilerim' &&
                                    <AntDesign
                                        name="heart"
                                        size={12}
                                        color={activeTab === item ? COLORS.green : 'rgba(0,0,0,0.3)'}
                                        style={{
                                            marginRight: 6
                                        }}
                                    />
                                }

                                <Text style={[styles.tabText, {
                                    color: activeTab === item ? COLORS.green : '#828282'
                                }]}>
                                    {item}
                                </Text>

                            </View>
                        )}
                    />
                </View>

                <View style={styles.recommendProducts}>
                    {
                        activeData.map((item) => {
                            return (
                                <RecommendBasketItem
                                    key={item._id}
                                    item={item}
                                    navigation={navigation}
                                />
                            )
                        }
                        )
                    }
                </View>

            </View>
        </ScrollView>

    )
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        borderRadius: 7,
        backgroundColor: 'white',
        elevation: 3,
        marginBottom: 25,
        paddingTop: 5
    },
    tabsWrapper: {
        paddingHorizontal: 7,
        paddingVertical: 10,
    },
    tab: {
        borderWidth: 1,
        height: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 6,
    },
    tabText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    recommendProducts: {
        paddingHorizontal: 7,
        paddingVertical: 10,
    },

})


export default RecommendBasketItems