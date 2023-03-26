import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import COLORS from '../../../consts/colors'

const ProductBadges = ({ properties }) => {
    return (
        <View style={styles.container}>

            {properties && Object.keys(properties).slice(0, 3).map((key, index) => (
                <View style={styles.badgeItem} key={index} >
                    <Text style={styles.badgeTitle}  >{key} </Text>
                    <Text
                        style={styles.badgeContent}
                    >
                        {properties[key]}
                    </Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1,
        paddingBottom: 15,
    },
    badgeItem: {
        marginRight: 15,
        backgroundColor : 'rgba(0,183,97,0.07)',
        paddingVertical: 4,
        borderRadius    : 5,
        paddingHorizontal: 7,
    },
    badgeTitle : {
        fontSize: 9,
        fontWeight: 'bold',
        color: COLORS.green,
    },
    badgeContent : {
        fontSize: 10,
        fontWeight: 'bold',
        color:'#78787a',
        marginTop: 3.7,
    }
})

export default ProductBadges