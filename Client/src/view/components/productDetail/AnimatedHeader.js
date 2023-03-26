import React from 'react'
import { View, Text, Animated } from 'react-native'
import COLORS from '../../../consts/colors'
import { Ionicons, AntDesign, Feather } from 'react-native-vector-icons'
import {useSafeAreaInsets } from 'react-native-safe-area-context'
import { StoreState } from '../../../Context/StoreContext'

const HEADER_HEIGHT = 0;

const AnimatedHeader = ({ animatedValue,likeStatus,navigation,product }) => {
    const { basketItemsLength } = StoreState();
    const insets = useSafeAreaInsets();

    const headerHeight = animatedValue.interpolate({
        inputRange: [0, HEADER_HEIGHT + insets.top],
        outputRange: [HEADER_HEIGHT + insets.top, 55],
        extrapolate: 'clamp'
    });

    return (
        <Animated.View
            style={{
                position: 'absolute',
                top: -2,
                left: 0,
                right: 0,
                zIndex: 10,
                height: headerHeight,
                backgroundColor: 'white',
                borderBottomColor: '#dedede',
                borderBottomWidth:1,
            }}
        >
            <View
                style={{
                    height: '100%',
                }}
            >
                <Ionicons
                    name="ios-arrow-back-sharp"
                    size={27}
                    color={'#87888a'}
                    onPress={() => navigation.goBack()}
                    style={{
                        position: 'absolute',
                        bottom: 12,
                        left: 12
                    }}
                />
                <View
                    style={{
                        position: 'absolute',
                        bottom: 15,
                        right: 65,
                        width: 30,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            backgroundColor: COLORS.green,
                            color: COLORS.white,
                            borderRadius: 10,
                            textAlign: 'center',
                            padding: 2,
                            width: 18,
                            height: 18,
                            position: 'absolute',
                            top: -6,
                            left: -2,
                            zIndex: 10,
                            display: basketItemsLength > 0 ? 'flex' : 'none'
                        }}
                    >
                        {
                            basketItemsLength 
                        }
                    </Text>

                    <Feather
                        name="shopping-cart"
                        size={24}
                        style={{
                            transform: [{ scaleX: -1 }]
                        }}
                    />
                </View>

                <AntDesign
                    name={ likeStatus ? "heart" : "hearto"}
                    size={24}
                    style={{
                        color: likeStatus ? COLORS.red : COLORS.dark,
                        position: 'absolute',
                        bottom: 15,
                        right: 15,
                    }}
                />


                <Text style={{
                    color: likeStatus ? COLORS.red : COLORS.dark,
                    position: 'absolute',
                    bottom: 17,
                    left: 47,
                    fontSize: 13,
                    fontWeight: 'bold',
                    color: COLORS.grey
                }}>
                    {
                        product?.name?.length > 35 ? product?.name.substring(0, 35) + '...' : product?.name
                    }

                </Text>

            </View>

        </Animated.View>
    );
};

export default AnimatedHeader;