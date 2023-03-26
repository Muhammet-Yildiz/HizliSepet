import React, { useState } from 'react'
import { SafeAreaView, View, Text,  StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import {NGROK_URL} from '@env'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ImageSlider = ({images}) => {
  
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
              style={styles.wrap}
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
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT *0.64,
  },
  wrapDot: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dotActive: {
    margin: 3,
    color: "white",
    fontSize: 11
  },
  dot: {
    margin: 3,
    color: '#dedede',
    fontSize: 10
  }  
})

export default ImageSlider