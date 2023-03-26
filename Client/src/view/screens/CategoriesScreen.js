import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCategories } from '../../Context/CategoryContext'
import { NGROK_URL } from '@env'
import COLORS from '../../consts/colors'
import SearchSection from '../components/general/SearchSection'

const CategoriesScreen = ({ navigation }) => {

    const { allCategories } = useCategories()
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <>
            <SearchSection navigation={navigation} />

            <SafeAreaView style={styles.container}  >
                <View
                    style={styles.categoriesWrapper}
                >
                    <FlatList
                        data={allCategories}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.name}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[styles.categoryItem,
                                index === activeIndex && styles.categoryItemActive
                                ]}
                                onPress={() => setActiveIndex(index)}
                            >
                                <Image
                                    source={{ uri: `${NGROK_URL}/uploads/${item?.image}` }}

                                    style={styles.image}
                                />
                                <Text
                                    style={[styles.categoryText, index === activeIndex && styles.categoryTextActive
                                    ]}
                                >
                                    {item.name}
                                </Text>

                            </TouchableOpacity>
                        )}
                    />

                </View>

                <View style={styles.subCategoryWrapper} >

                    {
                        allCategories[activeIndex].subCategories.map((item, index) => {

                            return (
                                <View
                                    key={index}
                                    style={styles.subCategoryItem}
                                    onTouchEnd={() => navigation.navigate('SearchResults', { queryObj: { type: 'category', name: item.name, categoryName: allCategories[activeIndex].name } })}
                                >
                                    <View style={styles.subCatImageWrapper}>
                                        <Image
                                            source={{ uri: `${NGROK_URL}/uploads/${item.image}` }}
                                            style={styles.subCatImage}
                                        />
                                    </View>

                                    <Text style={styles.subCategoryText} >
                                        {item.name}
                                    </Text>

                                </View>
                            )
                        })

                    }

                </View>
            </SafeAreaView>

        </>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
    },
    categoriesWrapper: {
        width: 85,
        paddingLeft: 5,
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    categoryItem: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 12,
        paddingTop: 10,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 3,
        backgroundColor: 'white',
    },
    categoryItemActive: {
        borderWidth: 2,
        borderColor: COLORS.green
    },
    categoryText: {
        fontSize: 8,
        fontWeight: 'bold',
        color: '#70706f',
        paddingHorizontal: 5,
        lineHeight: 11,
        width: 68,
        textAlign: 'center',
    },
    categoryTextActive: {
        color: '#19a102',
    }
    ,
    subCategoryWrapper: {
        paddingHorizontal: 10,
        width: Dimensions.get('window').width - 100,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    subCategoryItem: {
        width: 80,
        height: 165,
        alignItems: 'center',
    },
    subCatImageWrapper: {
        marginBottom: 14,
        borderWidth: 1,
        padding: 6,
        borderColor: 'rgba(0,0,0,0.002)',
        elevation: 2,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    subCatImage: {
        width: 75,
        height: 105,
        resizeMode: 'contain',
    },
    subCategoryText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#70706f',
        lineHeight: 11,
        textAlign: 'center',
    }

})

export default CategoriesScreen