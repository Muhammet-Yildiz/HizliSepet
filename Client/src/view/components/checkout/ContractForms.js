import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import COLORS from '../../../consts/colors'
import TEXTS from '../../../consts/text'

const ContractForms = () => {
    return (
        <View style={styles.contractForms}  >
            <Text style={[styles.headText, {
                fontSize: 14,
                fontWeight: 'bold',
                color: COLORS.green,
                marginBottom: 15,
                paddingBottom: 15,
                borderBottomColor: 'rgba(0,0,0,0.05)',
                borderBottomWidth: 1,
            }]} >
                Sözleşme ve Formlar
            </Text>

            <View>
                <Text style={[styles.headText, {
                    fontSize: 11,
                    marginTop: 10,
                }]} >
                    Ön Bilgilendirme Koşulları
                </Text>
                <ScrollView
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                    persistentScrollbar={true}
                    style={styles.formWrap}
                >
                    <Text style={styles.contractText} >
                        {TEXTS.contractText}
                    </Text>
                </ScrollView>
                <Text style={[styles.headText, {
                    fontSize: 11,
                    marginTop: 20,
                }]} >
                    Mesafeli Satış Sözleşmesi
                </Text>
                <ScrollView
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                    persistentScrollbar={true}
                    style={styles.formWrap}
                >
                    <Text style={styles.sellingContract} >
                        {TEXTS.sellingContract}
                    </Text>
                </ScrollView>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    contractForms: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingBottom: 25,
        paddingTop: 15,
        elevation: 3,
        marginBottom: 85,
        marginTop: 20,
    },
    headText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'gray',
        marginBottom: 15,
    },
    contractText: {
        fontSize: 11,
        color: 'rgb(153, 153, 153)',
        lineHeight: 17,
    },
    sellingContract: {
        fontSize: 11,
        color: 'rgb(153, 153, 153)',
        lineHeight: 17,
    },
    formWrap: {
        borderWidth: 1,
        overflow: 'scroll',
        height: 110,
        backgroundColor: 'rgb(246,246,246)',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderColor: 'rgba(200,200,200,0.5)'
    },

})

export default ContractForms