import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { MaterialIcons, Entypo, MaterialCommunityIcons } from 'react-native-vector-icons'
import COLORS from '../../../consts/colors';
import CommentService from '../../../services/CommentService';

const EvaluationMenu = ({ item, navigation, getAllData }) => {

    const deleteEvaluation = async () => {
        try {
            await CommentService.deleteComment({
                commentId: item.comment._id,
                productId: item.product._id
            })
            getAllData()

        }
        catch (error) {
            console.log("error", error)
        }

    }


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
                    size={18}
                    style={{
                        padding: 7,
                        borderRadius: 50,
                        color: COLORS.grey
                    }}
                />
            </MenuTrigger>
            <MenuOptions
                customStyles={{
                    'optionsContainer': {
                        width: 145,
                        height: 93,
                        marginTop: 30,
                        marginLeft: -10,
                    },
                    'optionText': {
                        paddingVertical: 25,
                        paddingHorizontal: 15,
                    },
                }}
            >
                <MenuOption
                    style={styles.menuOption}
                    onSelect={() => {
                        navigation.navigate('EditComment', { item })

                    }}
                >
                    <MaterialIcons
                        name='edit'
                        size={18}
                        style={styles.menuIcon}
                    />
                    <Text
                        style={{ fontWeight: 'bold' }}
                    >
                        Düzenle
                    </Text>
                </MenuOption>
                <MenuOption
                    style={styles.menuOption}
                    onSelect={() => {
                        deleteEvaluation()
                    }}
                >
                    <MaterialCommunityIcons
                        name='delete'
                        size={18}
                        style={styles.menuIcon}
                    />
                    <Text style={{ fontWeight: 'bold' }}>
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
        top: 15,
        right: 5,
    },
    menuOption: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        marginRight: 10
    }
})

export default EvaluationMenu