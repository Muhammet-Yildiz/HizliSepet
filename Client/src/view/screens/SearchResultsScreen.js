import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchSection from '../components/general/SearchSection';
import COLORS from '../../consts/colors';
import { MaterialIndicator } from 'react-native-indicators'
import ProductService from '../../services/ProductService';
import ProductCard from '../components/general/ProductCard';
import { Ionicons } from 'react-native-vector-icons'

const SearchResultsScreen = ({ navigation, route }) => {

    const { queryObj } = route.params;
    const [loading, setLoading] = useState(true)
    const [searchResults, setSearchResults] = useState([])
    const [warnMsg, setWarnMsg] = useState('')

    const searchProduct = async () => {

        try {
            if (queryObj.type) {
                const { data } = await ProductService.searchProduct({ queryObj })
                setSearchResults(data.results)
                data.message ? setWarnMsg(data.message) : setWarnMsg('')
                setLoading(false)
            }
        }
        catch (error) {
            setSearchResults([])
            setLoading(false)
        }

    }

    useEffect(() => {
        setLoading(true)
        searchProduct()
    }, [queryObj])


    return (
        <SafeAreaView
            style={styles.container}
        >
            <SearchSection
                navigation={navigation}
                placeHolderText={queryObj.name + ' | ' + searchResults?.length + ' ürün'}
            />
            {loading ?
                <MaterialIndicator
                    color={COLORS.green}
                    size={42}
                />
                :
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {warnMsg &&
                        <View
                            style={styles.messageWrapper}
                        >
                            <Ionicons name="information-circle-outline" size={29} color={COLORS.green} />
                            <Text style={{fontSize:14,marginHorizontal: 10,
                                lineHeight: 20,
                            }}>{warnMsg}</Text> 
                        </View>
                    }
                    <View
                        style={{
                            paddingVertical: 20,
                            paddingHorizontal: 10,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                        }}
                    >
                        {
                            searchResults.map((item, index) => (
                                <ProductCard product={item} navigation={navigation}
                                    key={index}
                                />
                            ))
                        }
                    </View>

                </ScrollView>

            }
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
      
    },
    messageWrapper : {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginHorizontal: 10,
        marginTop: 10,
        paddingRight: 35,
        paddingVertical: 15,
        elevation: 5,
        backgroundColor: COLORS.white,
    }
})
export default SearchResultsScreen