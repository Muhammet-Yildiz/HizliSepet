import React  from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthState } from '../../Context/AuthContext'
import { Entypo } from 'react-native-vector-icons'
import COLORS from '../../consts/colors'
import * as Progress from 'react-native-progress';
import { FavoriteState } from '../../Context/FavoriteContext'
import FavoriteCard from '../components/favorite/FavoriteCard'

const FavoriteListScreen = ({ navigation, route }) => {

    const { userInfo } = AuthState()
    const { favoriteList, loading } = FavoriteState();

    return (
        <SafeAreaView>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    height: Dimensions.get('screen').height - 125,
                    backgroundColor: '#fff',
                }}
            >
            {
                favoriteList.length > 0 &&
                <View style={styles.bannerSection}  >
                    <Image
                        source={require('../../assets/heart_img.png')}
                        style={{
                            width: 170,
                            height: 190,
                        }}
                    />
                    <View style={styles.banner_right} >

                        <View
                            style={styles.banner_right_top}
                        >
                            <Entypo
                                name="lock"
                                size={20}
                                color={COLORS.white}
                                style={{ marginRight: 10 }}
                            />
                            <Text style={styles.banner_text} >
                                {userInfo.data.username}
                            </Text>

                        </View>

                        <Text style={styles.banner_title} >Favorilerim</Text>

                        <Text style={styles.banner_text} > {favoriteList.length} ürün </Text>

                    </View>

                </View>
            }

            <Progress.Bar
                progress={0.8}
                width={Dimensions.get('screen').width}
                height={loading ? 4 : 0}
                borderRadius={2}
                color={COLORS.green}
                style={{ borderWidth: 0 }}
                indeterminate={true}
                indeterminateAnimationDuration={950}
                useNativeDriver={true}
            />
                <View style={styles.itemsContainer}>

                    {favoriteList.map((item, index) => {

                        return (
                            <View key={index}  >
                                <FavoriteCard
                                    navigation={navigation}
                                    item={item}
                                />
                            </View>

                        )
                    }) }
                </View>
               
          {
                favoriteList.length === 0 &&
                <View
                    style={styles.emptyFavoritesWrapper}
                >
                    <Image
                        source={require('../../assets/favorite.png')}
                        style={{
                            width: 170,
                            height: 190,
                        }}
                    />

                    <Text style={styles.text}>
                        Favorilerim
                    </Text>
                    <Text style={styles.textLight}>
                        Favorilerinizde ürün bulunmamaktadır.
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
            }
            </ScrollView>

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    bannerSection: {
        height: 190,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    banner_right: {
        backgroundColor: 'rgb(239, 50, 49)',
        height: 190,
        width: Dimensions.get('screen').width - 170,
        paddingLeft: 15,
        paddingTop: 20,
    },
    banner_title: {
        color: COLORS.white,
        fontSize: 29,
        fontWeight: 'bold',
        marginBottom: 28,
        marginTop: 10,
    },
    banner_right_top: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    banner_text: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 13
    },
    itemsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: COLORS.white,
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
    emptyFavoritesWrapper: {
        height: Dimensions.get('screen').height - 125,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textLight: {
        color: '#413F42',
        fontSize: 12,
        color: '#757575',
        marginBottom: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 10,
        color: '#575656',
    }

})

export default FavoriteListScreen