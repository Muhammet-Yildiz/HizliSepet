import React, { useState } from 'react'
import { SafeAreaView, View, Text,  StyleSheet, Image, ScrollView } from 'react-native';
import {NGROK_URL} from '@env'

const CardImageSlider = ({images}) => {
  const [imgActive, setImgActive] = useState(0)

  const onChange =  (nativeEvent) => {
    if(nativeEvent){
      const slide = Math.floor(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
      if (slide !== imgActive) {
        setImgActive(slide)
      }

    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap} >
        <ScrollView
          onScroll={({ nativeEvent }) => onChange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}
        >
          { images?.map((image, index) => (
            <Image
              key={index}
              resizeMode="contain"
              source={{ uri: `${NGROK_URL}/uploads/${image}` }}
              style={[styles.wrap,{
                resizeMode: 'contain',
              }]}
            />
          ))}

        </ScrollView>
        <View style={styles.wrapDot} >
       {images?.map((e, index) => (
            <Text
              key={e}
              style={imgActive == index ? styles.dotActive : styles.dot}
            >
              ⬤
            </Text>

          ))} 
        </View>
 
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height :'100%',
    width: 155,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  wrap: {
    height: '100%',
    width: 150,
  },
  wrapDot: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 5,
    borderRadius: 10,
    position: 'absolute',
    bottom: 5,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'

  },
  dotActive: {
    margin: 2.5,
    color: "white",
    fontSize: 6
  },
  dot: {
    margin: 2.5,
    color: '#dedede',
    fontSize: 6
  }  
})


export default CardImageSlider