import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import FavoritesMenu from './FavoritesMenu'
import COLORS from '../../../consts/colors';
import { Ionicons } from 'react-native-vector-icons'
import { StoreState } from '../../../Context/StoreContext';
import { Rating } from 'react-native-ratings';
import CartBottomSheet from '../general/CartBottomSheet';
import { NGROK_URL } from '@env'

const FavoriteCard = ({ item, navigation }) => {
    
    const [selectedSize, setSelectedSize] = useState(null);
    const { addToBasket } = StoreState();
    const bottomSheet = useRef()

    return (
        <>
            <CartBottomSheet
                bottomSheet={bottomSheet}
                product={item}
                selectedSize={selectedSize ? selectedSize : item?.sizes[0]}
                setSelectedSize={setSelectedSize}
                navigation={navigation}
            />
            <View style={styles.wishesItem} >

                <View style={styles.imageContainer}
                    onTouchEnd={() => navigation.navigate('Details', { productId: item._id })}
                >
                    <Image
                        source={{ uri: `${NGROK_URL}/uploads/${item?.images[0]}` }}
                        style={styles.Image}
                    />
                </View>

                <FavoritesMenu productId={item._id} />

                <View style={styles.infoContainer} >

                    <Text style={styles.itemPrice} >
                        {item.price} TL
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Details', { productId: item._id })}
                    >
                        <Text style={styles.itemName} >
                            {
                                item.name.length > 31 ?
                                    item.name.substring(0, 31 - 3) + '...' :
                                    item.name
                            }

                        </Text>
                    </TouchableOpacity>

                    <View style={styles.reviewsInfo} >
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text style={{
                                marginRight: 7, fontWeight: 'bold', fontSize: 11,
                                color: 'gray'
                            }} >
                                {item.averageRating.toFixed(1)}
                            </Text>
                            <Rating
                                type='custom'
                                ratingCount={5}
                                imageSize={13}
                                startingValue={item.averageRating}
                                ratingBackgroundColor='white'
                                ratingColor={'#ffc000'}
                                readonly
                            />
                            {
                                item?.comments?.length > 0 &&

                                <Text style={{ marginLeft: 8, color: 'gray', fontWeight: 'bold', fontSize: 11 }} >
                                    ({item?.comments?.length} yorum)
                                </Text>
                            }
                        </TouchableOpacity>

                    </View>

                    <View style={styles.buttonsWrap} >
                        <View style={styles.sizeChooseSection} >
                            {
                                item.sizes.length > 0 ?
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => bottomSheet.current.show()}
                                    >
                                        <View
                                            style={{
                                                justifyContent: 'space-between',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                width: '100%',
                                                height: 30,
                                                paddingRight: 10,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: selectedSize?.length > 4 || item?.sizes[0].length > 4 ? 10 : 12 ,
                                                    fontSize: 12,
                                                    color: '#666666' ,
                                                    marginLeft: selectedSize?.length > 3 || item?.sizes[0].length > 3 ? 5 :15,
                                                }}
                                            >
                                                {selectedSize ? selectedSize :  item?.sizes[0] }

                                            </Text>

                                            <Ionicons
                                                name="md-chevron-down"
                                                size={16}
                                                color="#666666"
                                            />
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: '#666666',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Tek Ebat
                                    </Text>
                            }

                        </View>

                        <View style={styles.addToCartBtn} >
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => {
                                    addToBasket({ productId: item._id, selectedSize: selectedSize ?? item?.sizes[0] })
                                    navigation.navigate('Basket')
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        color: COLORS.green,
                                        fontSize: 12,
                                    }}
                                >
                                    Sepete Ekle
                                </Text>

                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    wishesItem: {
        margin: 10,
        width: '92%',
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        paddingVertical: 10,
        borderRadius: 5,
        elevation: 3,
        paddingHorizontal: 5,
        paddingBottom: 15,
    },
    imageContainer: {
        height: 134,
        width: '34%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    infoContainer: {
        width: '62%',
    },
    itemPrice: {
        fontWeight: 'bold',
        fontSize: 13,
    },
    itemName: {
        marginTop: 8,
        fontFamily: 'sans-serif',
        fontWeight: '500',
        color: '#383838',
        fontSize: 12,
    },
    reviewsInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    buttonsWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 21,
        height: 40,
    },
    sizeChooseSection: {
        width: '34%',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 4,
        borderRadius: 5,
        height: '100%',
        justifyContent: 'center',
    },
    addToCartBtn: {
        borderWidth: 1,
        borderColor: COLORS.green,
        paddingVertical: 4,
        borderRadius: 5,
        width: '61%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
export default FavoriteCard