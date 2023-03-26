import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { MONTHS } from '../../../consts/time';
import COLORS from '../../../consts/colors';
import { NGROK_URL } from '@env'

const ProductComments = ({ product }) => {

    const editDate = (timestamp) => {
        const date = new Date(timestamp);

        return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()} | ${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`
    }

    return (
        product.name &&
        <View style={styles.container} >
            <Text style={styles.title}  >
                Ürün Degerlendirmeleri
            </Text>
            <View style={styles.productWrapper}>

                <View style={styles.imageWrapper}>

                    <Image
                        source={{ uri: `${NGROK_URL}/uploads/${product.images[0]}` }}
                        style={styles.image}
                    />

                </View>
                <View style={styles.contentWrapper}>
                    <Text style={styles.bannerName}>{product.banner.name}
                    </Text>
                    <Text style={styles.productName}>
                        { product.name}
                    </Text>
                    <View style={[styles.flex, {
                        marginTop: 1
                    }]}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }} >{product?.averageRating?.toFixed(1)}
                        </Text>
                        <FontAwesome
                            name="star"
                            size={16}
                            color="#ffc000"
                            style={{ marginLeft: 7, marginRight: 20, }}
                        />

                        <Text style={{ fontSize: 12, fontWeight: 'bold', marginLeft: 5 }}>({product.comments.length}) Yorum  </Text>

                    </View>

                </View>

            </View>

            <View  >

                {
                    product.comments.map((comment, index) => (
                        <View key={index} style={styles.commentItem} >

                            <Rating
                                type='star'
                                ratingCount={5}
                                imageSize={14}
                                startingValue={comment.rating}
                                style={{
                                    width: 85,
                                    marginLeft: -10
                                }}
                                ratingBackgroundColor='white'
                                ratingColor={'#ffc000'}
                                readonly
                            />
                            <View style={styles.flex} >
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#b5b1b1' }} >

                                    {!comment.nameVisible ? 
                                    // comment.user.username 

                                    comment?.user?.username?.split(' ')[0]?.substring(0, 1) + '*** '
                                    
                                    + ' ' + comment?.user?.username?.split(' ')[1]?.substring(0, 1) + '***'

                                    :
                                    '*** ***'}
                                </Text>
                                <Text style={styles.commentDate} >

                                    {editDate(comment.created_at)}
                                </Text>
                            </View>
                            <Text style={styles.commentContent} >{comment.content}
                            </Text>

                            <View style={[styles.flex, {
                                marginTop: 12
                            }]}>
                                {comment?.orderItem?.selectedSize &&
                                    <>
                                        <MaterialCommunityIcons
                                            name="blender-software"
                                            size={18}
                                            color="#b5b1b1"
                                            style={{ marginRight: 5 }}
                                        />
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: '#696969',
                                                marginRight: 7,
                                            }}
                                        >Beden</Text>
                                        <Text style={{
                                            fontSize: 12, fontWeight: 'bold',
                                            color: '#545454',
                                            marginRight: 5,
                                        }} >{comment?.orderItem?.selectedSize}   ·
                                        </Text>
                                    </>
                                }

                                <Text
                                    style={{
                                        fontSize: 12, fontWeight: 'bold',
                                        color: COLORS.green,
                                        marginRight: 5,
                                        marginLeft: comment?.orderItem?.selectedSize ? 7 : 0
                                    }}
                                >
                                    {product.banner.name}
                                </Text>
                                <Text style={{
                                    fontSize: 12,

                                    color: '#949191',
                                    marginRight: 5,

                                }}>
                                    satıcısından alındı.
                                </Text>
                            </View>

                        </View>

                    ))
                }

            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        elevation: 1,
        marginBottom: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 14, fontWeight: '500', paddingVertical: 15, color: '#2C2E43'
        , borderBottomColor: '#eee', borderBottomWidth: 1
    },
    productWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 20,
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 1,
    },
    imageWrapper: {
        borderwidth: 1,
        borderColor: 'red',
        position: 'relative',
        width: 100,
        height: 100,
        backgroundColor: '#f5f5f5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    image: {
        width: 95,
        height: 95,
        resizeMode: 'contain',
        borderwidth: 1,
        borderColor: 'red',
    },
    contentWrapper: {
        width: Dimensions.get('window').width - 160
    },
    bannerName: {
        fontSize: 14,
        color: '#2B2B2B',
        fontWeight: 'bold',
        marginBottom: 1,
        textTransform: 'uppercase',
        marginBottom: 5,
    },
    productName: {
        fontSize: 13,
        lineHeight: 18,
        color: '#2B2B2B',
        marginBottom: 5,
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7,
    },
    commentDate: {
        fontSize: 10,
        marginLeft: 12,
        paddingTop: 2,
        color: '#545353',
    },
    commentContent: {
        fontSize: 12,
        color: '#545353',
        marginTop: 11,
        fontWeight: 'bold',
    },
    commentItem: {
        marginTop: 10,
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 20,
    },

})

export default ProductComments