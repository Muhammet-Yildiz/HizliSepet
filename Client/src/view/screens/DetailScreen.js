import React, { useState, useRef, useEffect } from 'react'
import { View, Image, StyleSheet, Text, ScrollView, Pressable, TouchableOpacity, Dimensions, Animated, StatusBar, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../../consts/colors'
import { MONTHS } from '../../consts/time'
import { NGROK_URL } from '@env'
import { Ionicons, MaterialCommunityIcons, AntDesign, Feather } from 'react-native-vector-icons'
import { AuthState } from '../../Context/AuthContext'
import ProductService from '../../services/ProductService'
import { FavoriteState } from '../../Context/FavoriteContext'
import { StoreState } from '../../Context/StoreContext'
import ImageSlider from '../components/productDetail/ImageSlider'
import { Rating } from 'react-native-ratings'
import ProductInfo from '../components/productDetail/ProductInfo'
import ProductProperties from '../components/productDetail/ProductProperties'
import CartBottomSheet from '../components/general/CartBottomSheet'
import RecommendProducts from '../components/productDetail/RecommendProducts'
import ProductComments from '../components/productDetail/ProductComments'
import ColorOptionsSection from '../components/productDetail/ColorOptionsSection'
import AnimatedHeader from '../components/productDetail/AnimatedHeader'
import SizeOptionsSection from '../components/productDetail/SizeOptionsSection'
import Toast from 'react-native-toast-message'
import ProductBadges from '../components/productDetail/ProductBadges'

const DetailScreen = ({ navigation, route }) => {
    const bottomSheet = useRef()
    const [sheetVisiblity, setSheetVisiblity] = useState(true)
    const { userInfo } = AuthState()
    const { addToBasket } = StoreState();
    const { addItemToFavoriteList, removeItemFromFavoriteList } = FavoriteState();
    const productId = route.params.productId
    const [product, setProduct] = useState({})
    const [likeStatus, setLikeStatus] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const [selectedSize, setSelectedSize] = useState('')
    const [colorOptions, setColorOptions] = useState(null)
    const [loading, setLoading] = useState(false)

    const getDetailProduct = async () => {
        setLoading(true)
        try {
            const { data } = await ProductService.getDetailProduct(productId)
            setProduct(data.product)
            setLikeStatus(data.product.likes.includes(userInfo.data.id))
            setLikeCount(data.product.likes.length)
            setSelectedSize(data.product.sizes[0])
            setColorOptions(data.colorOptions)
            setLoading(false)
        }
        catch (err) {
            Toast.show({
                type: 'customToast',
                position: 'bottom',
                text1: 'İstek iletilirken bir sorun oluştu.Tekrar deneyiniz.',
                visibilityTime: 2000,
                autoHide: true,
                bottomOffset: 0,
            });
            setTimeout(() => {
                navigation.navigate('Home')
            }, 2000)
        }

    }
    useEffect(() => {
        getDetailProduct()
    }, [productId])

    const toggleLikeStatus = () => {
        setLikeStatus(!likeStatus)
        if (!likeStatus) {
            addItemToFavoriteList(product._id)
            setLikeCount(likeCount + 1)
        }
        else {
            removeItemFromFavoriteList(product._id)
            setLikeCount(likeCount - 1)
        }
    }
    const editTimestamp = (timestamp, addDay = 0) => {
        const date = new Date(timestamp);
        date.setTime(date.getTime() + (addDay * 24 * 60 * 60 * 1000))

        const localDate = new Date(date);
        const month = MONTHS[localDate.getMonth()][0].toUpperCase() + MONTHS[localDate.getMonth()].toLowerCase().substring(1);
        return `${localDate.getDate()} - ${localDate.getDate() + 1}  ${month} `
    }

    const offset = useRef(new Animated.Value(0)).current;


    return (
        <SafeAreaView  style={styles.container}  >

            {
                loading &&
                <View style={styles.loadingContainer}>
                    <ActivityIndicator
                        color={COLORS.green}
                        style={{

                            transform: [{ scale: 2.7 }],

                        }}
                    />
                </View>
            }

            <CartBottomSheet
                bottomSheet={bottomSheet}
                product={product}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                navigation={navigation}
            />
            <View style={[styles.header, { opacity: loading ? 0 : 1 }]}>
                <TouchableOpacity
                    style={styles.circle}
                >
                    <Ionicons
                        name="arrow-back"
                        size={22}
                        color={'#87888a'}
                        onPress={() => navigation.goBack()}
                    />
                </TouchableOpacity>
                <View style={styles.headerRight}>

                    <TouchableOpacity
                        style={[styles.circle, {
                            borderColor: likeStatus ? 'rgba(245,42,42,0.2)' : '#EFF5F5'

                        }]}
                        onPress={() => toggleLikeStatus()}
                    >
                        <AntDesign
                            name="heart"
                            size={22}
                            style={{
                                color: likeStatus ? COLORS.red : COLORS.dark
                            }}
                        />
                        
                    </TouchableOpacity>

                </View>

            </View>

            <AnimatedHeader animatedValue={offset}
                likeStatus={likeStatus}
                navigation={navigation}
                product={product}
            />
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{
                    alignItems: 'center',
                }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={
                    (e) => {
                        if (e.nativeEvent.contentOffset.y > 170) {
                            offset.setValue(e.nativeEvent.contentOffset.y - 170)
                        }
                        else {
                            offset.setValue(0)
                        }
                    }
                }
            >
                <View style={styles.ImageContainer}>
                    {product.images && product.images.length === 1 ?
                        <Image
                            source={{ uri: `${NGROK_URL}/uploads/${product?.images[0]}` }}
                            style={styles.Image}
                        />
                        :
                        <ImageSlider
                            images={product.images}
                        />
                    }
                    <Text>

                    </Text>
                </View>

                <View style={styles.detailContainer}   >
                    <View style={styles.detailsHeader}>
                        <Text style={styles.productName}>
                            <Text style={{color:'#343A40'}}>
                            {product?.seller?.toUpperCase()} 
                            </Text>  {product?.name} 
                        </Text>

                        <View style={[styles.flex,{marginTop: 5,}]}>

                            {product?.comments?.length > 0 && product?.averageRating > 0 &&
                                <>
                                    <View style={styles.flex}>
                                        <Text style={{ fontSize: 12, color: '#2B2B2B', marginRight: 5 }} >

                                            {product?.averageRating?.toFixed(1)}

                                        </Text>
                                        <Rating
                                            type='star'
                                            ratingCount={5}
                                            imageSize={16}
                                            startingValue={product.averageRating}
                                            style={{
                                                width: 85,
                                                marginLeft: -3
                                            }}
                                            ratingBackgroundColor='white'
                                            ratingColor={'#ffc000'}
                                            readonly
                                        />
                                        <Text style={{ fontSize: 12, color: '#2B2B2B', marginLeft: 10 }} >{product?.comments?.length} Degerlendirme  </Text>
                                    </View>
                                    <View style={styles.flex}>

                                        <Ionicons
                                            name={likeStatus ? 'md-heart-sharp' : "md-heart-outline"}
                                            size={21}
                                            style={{
                                                color: likeStatus ? COLORS.red : COLORS.dark,
                                                marginTop: 2
                                            }}
                                        />
                                        <Text style={{ marginLeft: 7, fontWeight: '350', fontSize: 16 }} >
                                            {
                                                likeCount
                                            }
                                        </Text>
                                    </View>

                                </>
                            }

                        </View>
                        
                        <ProductBadges
                            properties={product.properties}
                        />
                        <View style={[styles.flex, {
                            opacity: loading ? 0 : 1
                        }]}>
                            <View style={styles.flex}>

                                <Text style={{ fontWeight: 'bold', color: COLORS.grey, marginRight: 5, fontSize: 13 }} >
                                    Seçili Satıcı :
                                </Text>
                                <View style={styles.flex}  >
                                    <Text
                                        style={{
                                            fontWeight: 'bold', color: '#4d8ee1', marginRight: 5,
                                            fontSize: 13
                                        }}
                                    >
                                        {product?.seller}
                                    </Text>
                                    <Ionicons
                                        name="md-checkmark-circle"
                                        size={15}
                                        style={{
                                            color: '#4d8ee1',
                                        }}
                                    />

                                </View>
                            </View>

                        </View>

                        <View style={[styles.flex, {
                            justifyContent: 'flex-start',
                            marginTop: 13,
                            opacity: loading ? 0 : 1
                        }]}>

                            <MaterialCommunityIcons
                                name="truck-fast"
                                size={20}
                                style={{
                                    color: '#4d8ee1',
                                    marginRight: 8
                                }}
                            />
                            <Text style={{ fontSize: 13 }} >

                                Tahmini Teslimat Tarihi :  {editTimestamp(Date.now(), product?.banner?.shippingTime)}
                            </Text>
                        </View>

                    </View>

                    {
                        !loading &&
                        <>
                            {colorOptions &&
                                <ColorOptionsSection
                                    navigation={navigation}
                                    colorOptions={colorOptions}
                                    product={product}
                                />
                            }

                            {product?.sizes?.length > 0 &&
                                <SizeOptionsSection
                                    setSelectedSize={setSelectedSize}
                                    selectedSize={selectedSize}
                                    product={product}
                                />
                            }

                            <ProductInfo
                                list={product.about}
                            />
                            <ProductProperties
                                properties={product.properties}
                            />
                        </>

                    }

                </View>
                {
                    !loading &&
                    <>

                        { product?.comments?.length > 0 &&  <ProductComments product={product} />   }

                        <RecommendProducts
                            productId={product._id}
                            subCategoryId={product?.subCategory?._id}
                            navigation={navigation}
                        />

                    </>
                }


            </ScrollView>


            <View style={[styles.fixedFooter, {
                opacity: loading ? 0 : 1
            }]} >
                <View >
                    <Text style={{
                        marginBottom: 2, fontWeight: 'bold',
                        fontSize: 15,
                    }}>
                        {product?.price} TL
                    </Text>

                    <Text style={{
                        fontSize: 13, fontWeight: 'bold',
                        color: COLORS.green,
                    }} >
                        Kargo Bedava
                    </Text>

                </View>

                <TouchableOpacity style={styles.addToBasketBtn}
                    activeOpacity={0.8}
                    onPress={() => {

                        if (product.sizes.length !== 0 && sheetVisiblity) {
                            bottomSheet.current.show()
                            setSheetVisiblity(false)
                        }
                        else {
                            addToBasket({ productId: product._id, selectedSize })
                             navigation.navigate('Basket')
                        
                        }
                    }
                    }
                >
                    <View style={styles.center}  >
                        <Text style={{
                            color: COLORS.white,
                            fontWeight: 'bold',
                            fontSize: 15
                        }}>
                            Sepete Ekle
                        </Text>

                    </View>
                </TouchableOpacity>

            </View>


        </SafeAreaView>



    )
}
const styles = StyleSheet.create({
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 15,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.08)',
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center'

    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#f9f9f9',
        paddingBottom: 60
    },
    header: {
        paddingHorizontal: 10,
        height: 60,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        width: '100%',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 50,
    },
    ImageContainer: {
        height: 540,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    Image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    detailContainer: {
        position: 'relative',
        width: '100%',
    },
    detailsHeader: {
        backgroundColor: COLORS.white,
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 12,
        elevation: 2,
    },
    productName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#6d6d6e',
        fontFamily: 'sans-serif-medium',
        lineHeight: 21,
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
    },

    fixedFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '100%',
        zIndex: 10,
        backgroundColor: COLORS.white,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    addToBasketBtn: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 2,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.green,
        width: Dimensions.get('window').width - 150,
    },
    circle: {
        borderRadius: 50,
        padding: 10
        , backgroundColor: 'rgba(230, 230, 230,0.5  )',
    },

})


export default DetailScreen