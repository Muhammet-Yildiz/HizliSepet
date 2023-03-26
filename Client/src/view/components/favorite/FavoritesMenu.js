import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Entypo, AntDesign, MaterialCommunityIcons } from 'react-native-vector-icons'
import { FavoriteState } from '../../../Context/FavoriteContext';

const FavoritesMenu = ({ productId }) => {
    const { removeItemFromFavoriteList } = FavoriteState();

    return (
        <Menu
            style={styles.menu}
        >
            <MenuTrigger
                customStyles={{
                    TriggerTouchableComponent: TouchableOpacity,
                    triggerTouchable: {
                        underlayColor: 'transparent',
                        activeOpacity: 0.6,
                    },
                }}
            >
                <Entypo
                    name="dots-three-vertical"
                    size={16}
                    style={{
                        backgroundColor: '#F2F2F2',
                        padding: 7,
                        borderRadius: 50,
                    }}
                />
            </MenuTrigger>
            <MenuOptions
                customStyles={{
                    'optionsContainer': {
                        width: 200,
                        height: 110,
                        marginTop: 30,
                        marginLeft: -10,
                    },
                    'optionText': {
                        paddingVertical: 25,
                        paddingHorizontal: 15,
                    },
                }}

            >
                <MenuOption style={styles.menuOption}  >
                    <AntDesign
                        name='eyeo'
                        size={18}
                        style={styles.menuIcon}
                    />
                    <Text >Benzer Ürünleri Gör
                    </Text>
                </MenuOption>
                <MenuOption
                    style={styles.menuOption}
                    onSelect={() => removeItemFromFavoriteList(productId)}
                >
                    <MaterialCommunityIcons
                        name='delete-outline'
                        size={18}
                        style={styles.menuIcon}
                    />
                    <Text>
                        Delete
                    </Text>
                </MenuOption>
            </MenuOptions>
        </Menu>
    )
}

const styles = StyleSheet.create({
    menu: {
        width: 31,
        borderRadius: 50,
        marginLeft: 300,
        height: 33,
        position: 'absolute',
        zIndex: 5,
        top: 10,
        right: 10,
    },
    menuOption: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        marginRight: 10
    }
})
export default FavoritesMenu