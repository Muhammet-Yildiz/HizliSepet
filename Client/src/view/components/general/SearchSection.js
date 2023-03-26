import React, { useState, useRef, useEffect } from 'react'
import { Octicons, Ionicons } from 'react-native-vector-icons'
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import COLORS from '../../../consts/colors'
import { ProductsState } from '../../../Context/ProductContext'
import { NGROK_URL } from '@env'

const SearchSection = ({ navigation, placeHolderText }) => {
    const { suggestedList } = ProductsState();
    const [filteredSuggestedList, setFilteredSuggestedList] = useState([]);
    const ref = useRef(null)
    const [searchFocus, setSearchFocus] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    const routes = navigation.getState()?.routes;

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setSearchFocus(false)
            setSearchKey('')
        })
        return unsubscribe
    }, [])

    return (
        <>
            <View style={styles.header}   >
                {
                    searchFocus &&
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                            setSearchFocus(false)
                            ref.current.blur()
                            setSearchKey('')
                        }}
                    >
                        <Octicons
                            name='chevron-left'
                            size={27}
                            color={COLORS.white}
                            style={{ marginRight: 10, }}
                        />
                    </TouchableOpacity>

                }

                <View style={[styles.searchInputWrapper, {
                    width: searchFocus ? Dimensions.get('screen').width - 40 : Dimensions.get('screen').width - 20,
                }]}  >
                    <Image
                        source={require('../../../assets/logo.png')}
                        style={{
                            height: 30, width: 30, resizeMode: 'contain', marginRight: 5,
                        }}
                    />

                    <TextInput
                        ref={ref}
                        placeholder={placeHolderText ?
                            placeHolderText.length > 25 ?
                                placeHolderText.split('|')[0].slice(0, 25) + '...'
                                + ' | ' + placeHolderText.split('|')[1].trim()
                                : placeHolderText
                            : "Ürün , kategori , marka ara"}
                        style={[styles.searchInput, {
                            width: searchFocus ? Dimensions.get('screen').width - 130 : Dimensions.get('screen').width - 110,
                        }]}
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholderTextColor={'#6a6a6b'}
                        onFocus={() => {
                            setSearchKey(
                                placeHolderText ?
                                    placeHolderText.split('|')[0].trim()
                                    : ''
                            )
                            setFilteredSuggestedList([])
                            setSearchFocus(true)
                        }}
                        value={searchKey}
                        onChangeText={(text) => {

                            setSearchKey(text)

                            if (text.length >= 2) {

                                setFilteredSuggestedList(suggestedList.filter(item => item.name.toLowerCase().includes(text.trim().toLowerCase())))

                            }
                            else {
                                setFilteredSuggestedList([])
                            }

                        }}
                        onSubmitEditing={() => {
                            ref.current.blur()
                            setSearchFocus(false)
                            if (navigation.canGoBack()) {
                                routes.forEach((route, index) => {
                                    if (route.name === 'SearchResults') {
                                        routes.splice(index, 1)
                                    }
                                })
                                try {
                                    navigation.push('SearchResults', {
                                        queryObj: {
                                            name: searchKey,
                                            type: 'random'
                                        }
                                    })
                                }
                                catch {
                                    navigation.navigate('SearchResults', {
                                        queryObj: {
                                            name: searchKey,
                                            type: 'random'
                                        }
                                    })
                                }
                            }
                            else {
                                navigation.navigate('SearchResults', {
                                    queryObj: {
                                        name: searchKey,
                                        type: 'random'
                                    }
                                })
                            }
                        }}
                    />
                    <Ionicons
                        name="search"
                        size={20}
                        color={'#838485'}
                        style={{ marginLeft: 5, }}
                    />
                </View>
            </View>
            <View
                style={[styles.searchBoxContainer, {
                    display: searchFocus ? 'flex' : 'none',
                }]}
            >
                <FlatList
                    data={filteredSuggestedList}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => (
                        item.type === 'category' &&
                        <View
                            style={styles.suggestedCategoryItem}
                            onTouchEnd={() => {

                                if (navigation.canGoBack()) {
                                    routes.forEach((route, index) => {
                                        if (route.name === 'SearchResults') {
                                            routes.splice(index, 1)
                                        }
                                    })
                                    try {
                                        navigation.push('SearchResults', { queryObj: item })
                                    }
                                    catch {
                                        navigation.navigate('SearchResults', { queryObj: item })
                                    }
                                }
                                else {
                                    navigation.navigate('SearchResults', { queryObj: item })

                                }
                            }
                            }
                        >
                            <View>
                                <Text
                                    style={{ marginBottom: 5, color: 'black', fontSize: 14 }}
                                >
                                    {item.name}
                                </Text>
                                <Text style={{ fontSize: 11, color: '#8a8888' }}>
                                    {item.categoryName}
                                </Text>
                            </View>
                            <Text style={{
                                color: '#838485',
                                fontSize: 12,
                            }}  >
                                Kategori
                            </Text>

                        </View>
                        || item.type === 'product' &&
                        <View
                            style={styles.suggestedProductItem}
                            onTouchEnd={() => {
                                if (navigation.canGoBack()) {
                                    routes.forEach((route, index) => {
                                        if (route.name === 'SearchResults') {
                                            routes.splice(index, 1)
                                        }
                                    })
                                    try {
                                        navigation.push('SearchResults', { queryObj: item })
                                    }
                                    catch {
                                        navigation.navigate('SearchResults', { queryObj: item })
                                    }
                                }
                                else {
                                    navigation.navigate('SearchResults', { queryObj: item })
                                }
                            }
                            }
                        >
                            <Text
                                style={{ fontSize: 12, width: '80%', lineHeight: 15 }}
                            >
                                {item.name}
                            </Text>
                            <Ionicons
                                name='arrow-back-sharp'
                                size={20}
                                color={COLORS.green}
                                style={{ transform: [{ rotate: '45deg' }] }}
                            />
                        </View>
                        || item.type === 'banner' &&
                        <View
                            style={styles.suggestedProductItem}
                            onTouchEnd={() => {

                                if (navigation.canGoBack()) {
                                    routes.forEach((route, index) => {
                                        if (route.name === 'SearchResults') {
                                            routes.splice(index, 1)
                                        }
                                    })
                                    try {
                                        navigation.push('SearchResults', { queryObj: item })
                                    }
                                    catch {
                                        navigation.navigate('SearchResults', { queryObj: item })
                                    }
                                }
                                else {
                                    navigation.navigate('SearchResults', { queryObj: item })
                                }
                            }
                            }
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={{ uri: `${NGROK_URL}/uploads/${item.bannerImage}` }}
                                    style={styles.image}
                                />
                                <Text
                                    style={{ color: 'black', fontSize: 14 }}
                                >
                                    {item.name}
                                </Text>

                            </View>
                            <Text style={{
                                color: '#838485',
                                fontSize: 12,
                            }}  >
                                Magaza
                            </Text>

                        </View>
                    )}
                />

            </View>
        </>
    )
}
const styles = StyleSheet.create({
    searchBoxContainer: {
        height: Dimensions.get('screen').height - 175,
        backgroundColor: 'white',
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        zIndex: 1,
        paddingTop: 10,
    } ,
    header: {
        paddingHorizontal: 10,
        backgroundColor: COLORS.green,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 18,
        height: 41,
        paddingLeft: 15,
    },
    searchInput: {
        fontSize: 14,
        letterSpacing: 0.4,
        height: 42,
        paddingLeft: 10,
        paddingTop: 2,
    },
    suggestedCategoryItem: {
        height: 55,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 1,
    },
    suggestedProductItem: {
        height: 50,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 1,
    },
    image: {
        width: 30,
        height: 30,
        resizeMode: 'cover',
        marginRight: 14,
    }
})


export default SearchSection