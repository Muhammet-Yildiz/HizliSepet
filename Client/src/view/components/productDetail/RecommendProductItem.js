import React  from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import COLORS from '../../../consts/colors'
import { Rating } from 'react-native-ratings'
import { NGROK_URL } from '@env'

const RecommendProductItem = ({ item, productId, navigation }) => {
    return (
        <View
            style={[styles.productItem, {
                display: item._id === productId ? 'none' : 'flex'
            }]}
        >
            <View
                style={styles.imageWrapper}
                onTouchEnd={() => navigation.push('Details', { productId: item._id })}
            >
                <Image
                    source={{ uri: `${NGROK_URL}/uploads/${item?.images[0]}` }}
                    style={styles.image}
                />
            </View>

            <Text style={styles.productName}>
                <Text style={{ color: '#666565' }} >{item.seller}</Text> {item.name.substring(0, 35)}{item.name.length > 35 && '...'}

            </Text>
            <View style={styles.flex}>

                <Rating
                    type='star'
                    ratingCount={5}
                    imageSize={16}
                    startingValue={item.averageRating}
                    style={{
                        width: 85,
                        marginLeft: -3
                    }}
                    ratingBackgroundColor='white'
                    ratingColor={'#ffc000'}
                    readonly
                />
                <Text style={{ fontSize: 11, color: '#7a7a7a', marginLeft: 9 }} >
                    ({item?.comments?.length})
                </Text>

            </View>

            <Text style={styles.productPrice} >
                {item.price} TL
            </Text>

        </View>
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
    productItem: {
        width: 130,
        marginRight: 14,
        height: 300,
    },
    title: {
        fontSize: 14, fontWeight: '500', paddingVertical: 17, color: '#2C2E43'
    },
    imageWrapper: {
        height: 170,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.09)',
        marginBottom: 10,
        borderRadius: 6,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    productName: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#8c8c8c',
        lineHeight: 15,
        paddingHorizontal: 2,
        marginBottom: 5,
        height: 37,
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 2,
    },
    productPrice: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.green,
        paddingLeft: 2,
        marginTop: 12,
    }

})


export default RecommendProductItem