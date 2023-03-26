import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Octicons } from 'react-native-vector-icons'
import COLORS from '../../../consts/colors'

const ProductInfo = ({ list }) => {
    const [showMore, setShowMore] = useState(false)
    return (
        <View style={styles.container} >
            <Text style={styles.title}  >
                Ürün Bilgileri
            </Text>
            <View  >
                {list?.slice(0, 4).map((item, index) => (
                    <View style={styles.infoItem} key={index} >
                        <Octicons name="dot-fill" size={15} color={COLORS.green} style={{ marginTop: 1 }} />
                        <Text style={{ marginLeft: 10, fontSize: 12, lineHeight: 18 }}  >{item}</Text>
                    </View>
                ))}

            </View>
            <View style={ {
                display: showMore ? 'flex' : 'none'
            }} >
                {list?.slice(4, list.length).map((item, index) => (

                    <View style={styles.infoItem} key={index} >
                        <Octicons name="dot-fill" size={15} color= {COLORS.green} />
                        <Text style={{ marginLeft: 10, fontSize: 12, lineHeight: 18 }}  >{item}</Text>
                    </View>
                ))}

            </View>
            {list?.length > 4 &&
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
        marginTop: 20,
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
  
    infoItem: {
        flexDirection: 'row',
        paddingVertical: 5,
        marginTop: 3,
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

export default ProductInfo