import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

const ProductProperties = ({ properties }) => {
    const [showMore, setShowMore] = useState(false)
    return (
        properties &&
        <View style={styles.container} >
            <Text style={styles.title}  >
                Ürün Özellikleri
            </Text>
            <View >
                {properties && Object.keys(properties).slice(0, 4).map((key, index) => (
                    <View style={styles.propertyItem} key={index} >
                        <Text style={{ fontSize: 13, lineHeight: 18, fontWeight: '450' }}  >{key} : </Text>
                        <Text
                            style={{ width: '40%', fontWeight: '450', color: 'grey', fontSize: 13, }}
                        >
                            {properties[key]}
                        </Text>
                    </View>
                ))}

            </View>
            <View style={{
                display: showMore ? 'flex' : 'none'
            }} >
                {properties && Object.keys(properties).slice(4, properties.length).map((key, index) => (

                    <View style={styles.propertyItem} key={index} >
                        <Text style={{ fontSize: 13, lineHeight: 18, fontWeight: '450' }}  >{key} : </Text>
                        <Text
                            style={{ width: '40%', fontWeight: '450', color: 'grey', fontSize: 13, }}
                        >
                            {properties[key]}
                        </Text>
                    </View>
                ))}

            </View>
            {properties && Object.keys(properties)?.length > 2 &&
                <TouchableOpacity
                    onPress={() => setShowMore(!showMore)}
                    activeOpacity={0.8}
                >
                    <View style={styles.showCloseBtn}  >

                        <Text style={{ fontWeight: 'bold', color: 'grey', fontSize: 12 }}  >

                            {showMore ? 'Daha az göster' : 'Daha fazla göster'}
                        </Text>
                    </View>
                </TouchableOpacity>
            }

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: 0,
        paddingHorizontal: 20,
        paddingBottom: 10,
        elevation: 2,
        marginBottom: 20,
    },
    flex: {
        display: 'flex', flexDirection: 'row', alignItems: 'center'
    },
    title: {
        fontSize: 14, fontWeight: '500', paddingVertical: 15, color: '#2C2E43'
        , borderBottomColor: '#eee', borderBottomWidth: 1
    },
    propertyItem: {
        flexDirection: 'row',
        paddingVertical: 13,
        marginTop: 6,
        justifyContent: 'space-between',
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 1,
    },
    showCloseBtn: {
        paddingVertical: 13,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#F2F2F2',
        marginTop: 10,
    }
})

export default ProductProperties