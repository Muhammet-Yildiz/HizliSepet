import React, { useState, useEffect } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../../../consts/colors';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { AuthState } from '../../../Context/AuthContext';
import { Rating } from 'react-native-ratings';
import { FavoriteState } from '../../../Context/FavoriteContext';
import CardImageSlider from './CardImageSlider';
import { NGROK_URL } from '@env'

const ProductCard = ({ product, navigation }) => {
    const { userInfo } = AuthState()
    const userId = userInfo.data.id
    const { addItemToFavoriteList, removeItemFromFavoriteList } = FavoriteState()
    const [likeStatus, setLikeStatus] = useState(false)
    const toggleLikeStatus = () => {
        setLikeStatus(!likeStatus)
        if (!likeStatus) {
            addItemToFavoriteList(product._id)
        }
        else {
            removeItemFromFavoriteList(product._id)
        }
    }

    useEffect(() => {
        setLikeStatus(product.likes.includes(userId))

    }, [product])

    return (
        <>

            <View style={styles.card} >
                <View style={{
                    zIndex: 5,
                }} >
                    <TouchableOpacity
                        activeOpacity={0.4}
                        onPress={() => {
                            toggleLikeStatus()
                        }}
                    >
                        <MaterialCommunityIcons
                            name="cards-heart" size={17} style={[styles.heartIcon,
                            {
                                backgroundColor: likeStatus ? 'rgba(245,42,42,0.2)' : 'rgba(0,0,0,0.2)',
                                color: likeStatus ? COLORS.red : COLORS.dark,
                            }
                            ]} />

                    </TouchableOpacity>
                </View>


                <View style={styles.cardImgContainer}
                    onTouchEnd={() => {
                        navigation.navigate('Details', { productId: product._id })
                    }}
                >
                    {product.images.length == 1 ?
                        <Image
                            source={{ uri: `${NGROK_URL}/uploads/${product.images[0]}` }}
                            resizeMode="cover"
                            style={styles.cardImg}
                        />
                        :
                        <CardImageSlider
                            images={product.images}
                        />
                    }

                </View>

                <View style={styles.cardDetails}
                    onTouchEnd={() => {
                        navigation.navigate('Details', { productId: product._id })
                    }}

                >
                    <Text style={styles.cardTitle} >
                        <Text style={{ color: '#666565' }} >{product?.seller}</Text> {product.name.length > 36 ? product.name.substring(0, 36) + '...' : product.name}

                    </Text>

                    <View style={styles.flex}>
                        <Rating
                            type='custom'
                            ratingCount={5}
                            imageSize={15}
                            startingValue={product.averageRating}
                            style={{
                                marginTop: 10,
                                width: 85,
                                marginLeft: -5,
                            }}
                            ratingBackgroundColor='white'
                            ratingColor={'orange'}
                            ratingTextColor='orange'
                            ratingContainerStyle={{ marginRight: 2 }}
                            readonly
                        />
                        <Text style={{ fontSize: 12, color: COLORS.grey, marginTop: 9, marginLeft: 10 }} >({product.comments.length})</Text>
                    </View>
                    <Text style={styles.price} >
                        {product.price} TL
                    </Text>

                </View>

            </View>
        </>

    )
}
const styles = StyleSheet.create({

    card: {
        height: 322,
        backgroundColor: 'white',
        width: Dimensions.get('screen').width / 2 - 20,
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
        marginHorizontal: 2,
        elevation: 3,
    },
    cardImgContainer: {
        height: 185,
        overflow: 'hidden',
        marginBottom: 7,
        marginTop: 8,
    },
    cardImg: {
        height: 150,
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
    cardDetails: {
        marginLeft: 4,
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.dark,
        marginTop: 2,
        color: 'gray',
        lineHeight: 17,
        // borderWidth :1,
        // borderColor: 'red',
        height: 39,
    },
    heartIcon: {
        position: 'absolute',
        top: -2,
        borderRadius: 50,
        padding: 5,
        right: -5,
        zIndex: 5,
    },
    price: {
        fontSize: 13,
        fontWeight: 'bold',
        color: COLORS.green,
        marginTop: 13,
        marginLeft: 2
    },
    flex: {
        display: 'flex', flexDirection: 'row', alignItems: 'center'
    }
})

export default ProductCard; 