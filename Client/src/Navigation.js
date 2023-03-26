import React from 'react'
import {  View } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeScreen from './view/screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from './view/screens/DetailScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterScreen from './view/screens/RegisterScreen';
import LoginScreen from './view/screens/LoginScreen';
import FavoriteListScreen from './view/screens/FavoriteListScreen';
import BasketScreen from './view/screens/BasketScreen';
import AccountScreen from './view/screens/AccountScreen';
import { MaterialCommunityIcons, Octicons, FontAwesome5 } from 'react-native-vector-icons';
import COLORS from './consts/colors';
import { AuthState } from './Context/AuthContext';
import SplashScreen from './view/screens/SplashScreen';
import CheckoutScreen from './view/screens/CheckoutScreen';
import { StoreState } from './Context/StoreContext';
import MyOrdersScreen from './view/screens/MyOrdersScreen';
import OrderDetailScreen from './view/screens/OrderDetailScreen';
import AddressesScreen from './view/screens/AddressesScreen';
import AddAddressScreen from './view/screens/AddAddressScreen';
import EditAddressScreen from './view/screens/EditAddressScreen';
import BankCardsScreen from './view/screens/BankCardsScreen';
import EditBankCardScreen from './view/screens/EditBankCardScreen';
import MyEvaluationsScreen from './view/screens/MyEvaluationsScreen';
import AddCommentScreen from './view/screens/AddCommentScreen';
import EditCommentScreen from './view/screens/EditCommentScreen';
import CategoriesScreen from './view/screens/CategoriesScreen';
import SearchResultsScreen from './view/screens/SearchResultsScreen';
import ChangeEmailScreen from './view/screens/ChangeEmailScreen';
import ChangePasswordScreen from './view/screens/ChangePasswordScreen';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                statusBarStyle: 'dark',
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details"
                component={DetailScreen}
            />
            <Stack.Screen name="SearchResults"
                component={SearchResultsScreen}
            />
        </Stack.Navigator>
    )
}

const StoreStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Basket'
            screenOptions={{
                headerShown: false,
                statusBarStyle: 'dark',
            }}
        >
            <Stack.Screen name="Basket" component={BasketScreen} />
            <Stack.Screen name="Checkout"
                component={CheckoutScreen}
            />
           
            <Stack.Screen name="MyAddresses" component={AddressesScreen} />
            <Stack.Screen name="EditAddress"
                component={EditAddressScreen}
                options={{
                    headerShown: true,
                    title: 'Adres Düzenle',
                    headerStyle: {
                        backgroundColor: COLORS.white,
                    },
                    headerTintColor: '#434242',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 16,
                    },
                }}
            />

            <Stack.Screen name="AddAddress"
                component={AddAddressScreen}
                options={{
                    headerShown: true,
                    title: 'Yeni Adres Ekle',
                    headerStyle: {
                        backgroundColor: COLORS.white,
                    },
                    headerTintColor: '#434242',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 16,
                    },
                }}
            />
        </Stack.Navigator>
    )
}


const AccountStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Account'
            screenOptions={{
                headerShown: false,
                statusBarStyle: 'dark',
            }}
        >
            <Stack.Screen name="Account" component={AccountScreen}
                options={{
                    title: 'Hesabım',
                }}
            />
            <Stack.Screen name="MyOrders"
                component={MyOrdersScreen}
                options={{
                    headerShown: true,
                    title: 'Siparişlerim',
                    headerStyle: {
                        backgroundColor: COLORS.white,
                    },
                    headerTintColor: '#434242',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 16,
                    },
                }}
            />
            <Stack.Screen name="MyAddresses" component={AddressesScreen}  />
            <Stack.Screen name="AddAddress"
                component={AddAddressScreen}
                options={{
                    headerShown: true,
                    title: 'Yeni Adres Ekle',
                    headerStyle: {
                        backgroundColor: COLORS.white,
                    },
                    headerTintColor: '#434242',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 16,
                    },
                }}
            />

            <Stack.Screen name="EditAddress"
                component={EditAddressScreen}
                options={{
                    headerShown: true,
                    title: 'Adres Düzenle',
                    headerStyle: {
                        backgroundColor: COLORS.white,
                    },
                    headerTintColor: '#434242',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 16,
                    },
                }}
            />
            <Stack.Screen name="OrderDetail"
                component={OrderDetailScreen}
                options={{
                    headerShown: true,
                    title: 'Sipariş Detayı',
                    headerStyle: {
                        backgroundColor: COLORS.white,
                    },
                    headerTintColor: '#434242',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 16,
                    },
                }}
            />
            <Stack.Screen name="BankCards"
                component={BankCardsScreen}
                options={{
                    headerShown: true,
                    title: 'Kayıtlı Kartlarım',
                    headerStyle: {
                        backgroundColor: COLORS.white,
                    },
                    headerTintColor: '#434242',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 16,
                    },
                }}
            />
            <Stack.Screen name="EditBankCard"
                component={EditBankCardScreen}
                options={{
                    headerShown: true,
                    title: 'Kayıtlı Kartı Düzenle',
                    headerStyle: {
                        backgroundColor: COLORS.white,
                    },
                    headerTintColor: '#434242',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 16,
                    },
                }}
            />
            <Stack.Screen name="MyEvaluations"
                component={MyEvaluationsScreen}
                options={{
                    headerShown: true,
                    title: 'Değerlendirmelerim',
                    headerStyle: {
                        backgroundColor: COLORS.white,
                    },
                    headerTintColor: '#434242',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 16,
                    },
                }}
            />
            <Stack.Screen name="AddComment"
                component={AddCommentScreen}
                options={{
                    headerShown: true,
                    title: 'Ürün Değerlendirmeleri',
                    headerStyle: {
                        backgroundColor: COLORS.white,
                    },
                    headerTintColor: '#434242',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 16,
                    },
                }}
            />
            <Stack.Screen name="EditComment"
                component={EditCommentScreen}
                options={{
                    headerShown: true,
                    title: 'Ürün Değerlendirmeleri',
                    headerStyle: {
                        backgroundColor: COLORS.white,
                    },
                    headerTintColor: '#434242',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 16,
                    },
                }}
            />
            <Stack.Screen name="ChangeEmail"
                component={ChangeEmailScreen}
                options={{
                    headerShown: true,
                    title: 'E-Mail Degişikligi',
                    headerStyle: {
                        backgroundColor: COLORS.white,
                    },
                    headerTintColor: '#434242',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 16,
                    },
                }}
            />
            <Stack.Screen name="ChangePassword"
                component={ChangePasswordScreen}
                options={{
                    headerShown: true,
                    title: 'Şifre Degişikligi',
                    headerStyle: {
                        backgroundColor: COLORS.white,
                    },
                    headerTintColor: '#434242',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 16,
                    },
                }}
            />
        </Stack.Navigator>
    )
}


const authSuccessTabs = (basketItemsLength) => {

    return (
        <Tabs.Navigator

            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    color = focused ? COLORS.green : '#9c9c9c';
                    if (route.name === 'HomePage') {
                        return <MaterialCommunityIcons
                            name={'home'}
                            size={25}
                            color={color} />;

                    }
                    else if (route.name === 'WishList') {
                        return <Octicons
                            name={'heart-fill'}
                            size={20}
                            color={color} />;

                    }
                    else if (route.name === 'Categories') {
                        // iconName = focused ? 'heart-fill' : 'heart';
                        return <View
                            style={{
                                alignItems: 'flex-start',
                                alignItems: 'center',
                                flexDirection: 'row',
                                height: 25,
                                marginBottom: 3,
                            }}
                        >
                            {
                                [...Array(2)].map((e, i) => (
                                    <View key={i}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: 'transparent',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: 14,
                                        }}
                                    >
                                        <Octicons
                                            name={'square-fill'}
                                            size={16}
                                            color={color} />
                                        <Octicons
                                            name={'square-fill'}
                                            size={16}
                                            color={color} />
                                    </View>

                                ))
                            }



                        </View>


                    }
                    else if (route.name === 'Store') {
                        return <FontAwesome5
                            name={'shopping-cart'}
                            size={19}
                            color={color} />;
                    }
                    else if (route.name === 'AccountStack') {
                        return <MaterialCommunityIcons
                            name={'account'}
                            size={28}
                            color={color} />;

                    }
                },
                headerShown: false,
                tabBarActiveTintColor: COLORS.green,
                tabBarInactiveTintColor: 'gray',
                tabBarHideOnKeyboard: true,
            })}
        >
            <Tabs.Screen name="HomePage" component={HomeStack}

                options={({ route }) => ({
                    title: 'Anasayfa',
                    tabBarStyle: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                        if (routeName === 'Details') {
                            return { display: "none" }
                        }
                        else {
                            return { display: "flex" }
                        }
                    })(route),
                })}

            />
            <Tabs.Screen name="Categories" component={CategoriesScreen}
                options={{
                    title: 'Kategorilerim',
                }}
            />
            <Tabs.Screen name="WishList" component={FavoriteListScreen}
                options={{
                    title: 'Favorilerim',
                }}
            />
            <Tabs.Screen name="Store" component={StoreStack}
                options={({ route }) => ({
                    title: 'Sepetim',
                    tabBarBadge: basketItemsLength && `${basketItemsLength}`,
                    tabBarBadgeStyle: {
                        fontSize: 11,
                        fontWeight: 'bold',
                        color: COLORS.white,
                        backgroundColor: COLORS.green,
                        display: basketItemsLength && basketItemsLength > 0 ? 'flex' : 'none',
                        top: -1,
                    },
                    tabBarStyle: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                        if (routeName === 'Checkout') {
                            return { display: "none" }
                        }
                        else {
                            return { display: "flex" }
                        }
                    })(route),
                })}

            />
            <Tabs.Screen name="AccountStack" component={AccountStack}
                options={({ route }) => ({
                    title: 'Hesabım',
                    tabBarStyle: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                        if (routeName === 'AddAddress' || routeName === 'AddComment' || routeName === 'EditComment') {
                            return { display: "none" }
                        }
                        else if (routeName === 'EditAddress') {
                            return { display: "none" }
                        }
                        else {
                            return { display: "flex" }
                        }
                    })(route),
                })}

            />

        </Tabs.Navigator>
    )
}

const authControlStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                statusBarStyle: 'dark',
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    )
}


const Navigation = () => {
    const { userInfo, splashLoading } = AuthState()
    const { basketItemsLength } = StoreState()

    return (

        <NavigationContainer  >
            {
                splashLoading ?
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false
                        }}       >
                        <Stack.Screen name="Splash" component={SplashScreen}
                        />
                    </Stack.Navigator>
                    :
                    userInfo?.access_token ?
                        authSuccessTabs(basketItemsLength) : authControlStack()
            }

        </NavigationContainer>
    )
}

export default Navigation