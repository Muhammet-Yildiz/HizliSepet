import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import OrderService from '../../services/OrderService'
import { NGROK_URL } from '@env'
import { Rating } from 'react-native-ratings'
import COLORS from '../../consts/colors'
import EvaluationMenu from '../components/evaluation/EvaluationMenu'
import { BarIndicator } from 'react-native-indicators'

const MyEvaluationsScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState([])
    const [approvedItems, setApprovedItems] = useState([])
    const [activeTab, setActiveTab] = useState(0)

    const getAllEvaluatableItems = async () => {
        setLoading(true)
        const { data } = await OrderService.getAllEvaluatableItems()
        setResults(data.items)
    }
    const getAllApprovedEvaluatableItems = async () => {
        const { data } = await OrderService.getAllApprovedEvaluatableItems()
        setApprovedItems(data.approvedItems)
        setLoading(false)
    }


    const editDate = (timestamp, addDay = 0) => {
        const date = new Date(timestamp);
        date.setTime(date.getTime() + (addDay * 24 * 60 * 60 * 1000))
        const localDate = new Date(date);
        return ` ${localDate.getDate() < 10 ? `0${localDate.getDate()}` : localDate.getDate()}.${localDate.getMonth() < 10 ? `0${localDate.getMonth()}` : localDate.getMonth()}.${localDate.getFullYear()} `
    }

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            getAllEvaluatableItems()
            getAllApprovedEvaluatableItems()
        }
        )
        return unsubscribe
    }, [])

    const getAllData = () => {
        getAllEvaluatableItems()
        getAllApprovedEvaluatableItems()
    }

    return (
        <View style={styles.container} >
            {loading ?
                <View style={{
                    justifyContent: 'center', alignItems: 'center', height: '100%',
                    backgroundColor: COLORS.white
                }}>
                    <BarIndicator
                        color={COLORS.grey}
                        size={45}
                    />
                </View>
                :

                results.length === 0 && approvedItems.length === 0 ?

                    <View
                        style={{
                            height: '100%',
                            backgroundColor: COLORS.white,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Image
                            source={require('../../assets/feedback.png')}
                            style={{
                                width: 220,
                                height: 220,
                                resizeMode: 'contain',
                                marginBottom: 20,
                            }}
                        />
                        <Text style={styles.text} >
                            Degerlendirilecek bir ürün bulunmamaktadır
                        </Text>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                flexDirection: 'row',
                            }}
                            onPress={() => navigation.navigate('Home')}
                        >
                            <Text
                                style={styles.btnWrapper}
                            >
                                Alışverişe Devam Et
                            </Text>
                        </TouchableOpacity>
                    </View>


                    :

                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={styles.tabsWrapper} >
                            <TouchableOpacity activeOpacity={0.8} onPress={() => setActiveTab(0)} >
                                <Text style={[styles.tab,
                                activeTab == 0 && styles.active
                                ]}>
                                    Degerlendir ({results.length})
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.8} onPress={() => setActiveTab(1)} >
                                <Text style={[styles.tab,
                                activeTab == 1 && styles.active
                                ]}   >
                                    Onaylanan ({approvedItems.length})
                                </Text>
                            </TouchableOpacity>

                        </View>

                        {
                            activeTab == 0 && results.length > 0 ?

                                results.map((item, index) => {
                                    return (

                                        <View key={index} style={styles.cardWrapper}>

                                            <View style={styles.imageWrapper}>
                                                <Image
                                                    source={{ uri: `${NGROK_URL}/uploads/${item.product.images[0]}` }}
                                                    style={styles.image}
                                                />

                                            </View>
                                            <View style={styles.contentWrapper}>
                                                <Text style={styles.bannerName}>{item.product.banner.name}
                                                </Text>
                                                <Text style={styles.title}>

                                                    {
                                                        item.product.name.length > 37 ?
                                                            item.product.name.substring(0, 37) + '...' :
                                                            item.product.name
                                                    }

                                                </Text>
                                                <View style={[styles.flex, {
                                                    marginTop: 1
                                                }]}>
                                                    <Text style={{ fontSize: 11, fontWeight: 'bold ' }} >{item.product.averageRating.toFixed(1)}
                                                    </Text>
                                                    <Rating
                                                        type='star'
                                                        ratingCount={5}
                                                        imageSize={12}
                                                        startingValue={item.product.averageRating}
                                                        style={{
                                                            width: 85,
                                                            marginLeft: -5
                                                        }}
                                                        ratingBackgroundColor='white'
                                                        ratingColor={'#ffc000'}
                                                        readonly
                                                    />

                                                </View>
                                                <View style={styles.flex}>
                                                    <Text
                                                        style={{
                                                            fontSize: 11,
                                                            fontWeight: 'bold',
                                                            color: '#8c8c8c',
                                                            marginRight: 5
                                                        }}
                                                    >
                                                        Teslim Tarihi:
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 11,
                                                            fontWeight: 'bold',
                                                            color: '#adadad',
                                                            marginRight: 5
                                                        }}
                                                    >
                                                        {editDate(item.orderItem.date_added, item.product.banner.deliveryTime)}

                                                    </Text>
                                                </View>
                                                <View style={styles.btnWrapper}
                                                    onTouchEnd={() => navigation.navigate('AddComment', {
                                                        item: item
                                                    })}
                                                >
                                                    <Text style={styles.btnText}>
                                                        Ürünü Değerlendir
                                                    </Text>
                                                </View>
                                            </View>

                                        </View>
                                    )
                                }
                                )
                                :

                                activeTab == 0 && <View
                                    style={{
                                        height: 650,
                                        backgroundColor: COLORS.white,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Image
                                        source={require('../../assets/evaluationComplete.png')}
                                        style={{
                                            width: 220,
                                            height: 220,
                                            resizeMode: 'contain',
                                            marginBottom: 5,
                                        }}
                                    />
                                    <Text style={[styles.text, {
                                        fontSize: 13,
                                        color: COLORS.grey,
                                    }]} >

                                        Degerlendirilecek bir ürün bulunmamaktadır

                                    </Text>

                                </View>

                        }
                        {
                            activeTab == 1 && approvedItems.map((item, index) => {
                                return (

                                    <View key={index} style={[styles.cardWrapper, {
                                        paddingVertical: 20
                                    }]}>
                                        <EvaluationMenu
                                            item={item}
                                            navigation={navigation}
                                            getAllData={getAllData}

                                        />

                                        <View style={styles.imageWrapper}>

                                            <Image
                                                source={{ uri: `${NGROK_URL}/uploads/${item.product.images[0]}` }}
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                    resizeMode: 'contain',
                                                    marginRight: 10,
                                                }}
                                            />

                                        </View>
                                        <View style={styles.contentWrapper}>
                                            <Text style={styles.bannerName}>{item.product.banner.name}
                                            </Text>
                                            <Text style={styles.title}>

                                                {
                                                    item.product.name.length > 37 ?
                                                        item.product.name.substring(0, 37) + '...' :
                                                        item.product.name
                                                }

                                            </Text>
                                            <View style={[styles.flex, {
                                                marginTop: 1
                                            }]}>
                                                <Rating
                                                    type='star'
                                                    ratingCount={5}
                                                    imageSize={12}
                                                    startingValue={item?.comment?.rating}
                                                    style={{
                                                        width: 85,
                                                        marginLeft: -12,
                                                        marginTop: 4
                                                    }}
                                                    ratingBackgroundColor='white'
                                                    ratingColor={'#ffc000'}
                                                    readonly
                                                />

                                            </View>
                                            <View style={styles.flex}>
                                                <Text
                                                    style={{
                                                        fontSize: 13,
                                                        marginTop: 6,
                                                        paddingRight: 10,
                                                        lineHeight: 17,
                                                    }}
                                                >
                                                    {item.comment.content}

                                                </Text>
                                            </View>
                                        </View>

                                    </View>
                                )
                            }
                            )
                        }
                    </ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f9f9f9'
    },
    tabsWrapper: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 20,
        marginBottom: 5,

    },
    tab: {
        fontSize: 12.5,
        marginRight: 10,
        paddingVertical: 10,
        color: 'gray',
        borderWidth: 1,
        borderColor: '#e3e6e4',
        paddingHorizontal: 15,
        borderRadius: 4,
        elevation: 1,
        fontWeight: 'bold',
        backgroundColor: 'white',
    },
    active: {
        borderWidth: 1,
        borderColor: COLORS.green,
        color: COLORS.green,
    },
    cardWrapper: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: 75,
        height: 75,
        resizeMode: 'contain',
    },
    contentWrapper: {
        width: Dimensions.get('window').width - 160
    },
    bannerName: {
        fontSize: 13,
        color: '#2B2B2B',
        fontWeight: 'bold',
        marginBottom: 1,
        textTransform: 'uppercase',
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2
    },
    title: {
        fontSize: 11,
        color: '#8f8d8d',
    },

    btnText: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 15,
        color: '#575656',
    },
    btnWrapper: {
        backgroundColor: COLORS.green,
        color: 'white',
        paddingVertical: 12,
        borderRadius: 5,
        fontWeight: 'bold',
        marginTop: 10,
        width: '90%',
        textAlign: 'center',
    },
})

export default MyEvaluationsScreen