import React, { useState } from 'react'
import ValidationModal from './ValidationModal'
import { StyleSheet, Text, TextInput, View, Image, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard,  Pressable } from 'react-native'
import COLORS from '../../../consts/colors'
import { Rating } from 'react-native-ratings'
import { NGROK_URL } from '@env'

const CommentPostForm = ({ onSubmit, item, process, disabled }) => {
    const [error, setError] = useState({
        content: '',
        status: false
    })
    const [rating, setRating] = useState(
        process === 'Edit' ? item.comment.rating : 0
    )
    const [content, setContent] = useState(
        process === 'Edit' ? item.comment.content : ''
    )
    const [nameVisible, setNameVisible] = useState(false)

    const validateForm = () => {
        if ((!content && !rating) || !rating) {
            setError({
                status: true,
                message: 'Ürün yorumu yapabilmek için ürün puanı ve yorum içerigi girmeniz gerekiyor'
            })
        }
        else if (content.trim().length < 10 && rating) {
            setError({
                status: true,
                message: 'Yorum içeriginiz  en az 10 karakter olmalıdır'
            })
        }
        else {
            onSubmit(content, rating, nameVisible)
        }
    }

    return (
        <>
            <ValidationModal
                message={error.message}
                visibility={error.status}
                close={() => setError({ status: false, message: '' })}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{
                    flex: 1,
                }}
            >
                  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                <View style={styles.container}>
                    <View style={styles.header}>
                        <View >
                            <Image
                                source={{ uri: `${NGROK_URL}/uploads/${item.product.images[0]}` }}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.contentWrapper}>
                            <Text style={styles.bannerName}>
                                {item.product.banner.name}
                            </Text>
                            <Text style={styles.title}>
                                {item.product.name}
                            </Text>
                            <Text style={styles.price}>
                                {item.product.price} TL
                            </Text>
                        </View>

                    </View>

                    <Text style={styles.explainText}  >
                        Ürünü aşagıdan puanlayabilir ve yorum yapabilirsiniz.
                    </Text>

                    <Rating
                        type='star'
                        ratingCount={5}
                        imageSize={41}
                        startingValue={rating}
                        starContainerStyle={{
                            borderWidth: 2,
                            borderColor: 'red',
                            marginRight: 50
                        }}
                        style={{
                            width: '100%',
                            marginTop: 10,
                        }}
                        ratingBackgroundColor='white'
                        ratingColor={'#ffc000'}
                        onFinishRating={(rating) => setRating(rating)}
                    />

                    <View
                        style={{ marginTop: 40, paddingHorizontal: 10 }}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: '#828282',
                                marginBottom: 15
                            }}
                        >
                            Yorum Yap
                        </Text>
                        <TextInput
                            style={{
                                height: 110,
                                backgroundColor: '#f2f2f2',
                                textAlignVertical: 'top',
                                padding: 12,
                                borderRadius: 5,
                                fontWeight: 'bold',
                                fontSize: 13,
                                color: '#828282',
                                lineHeight: 18,
                            }}
                            multiline={true}
                            numberOfLines={4}
                            placeholderTextColor='#828282'
                            onChangeText={text => setContent(text)}
                            value={content}
                            placeholder='Yorumunuzu buraya yazınız'
                        />
                    </View>

                    <View style={styles.sendBtnWrapper}>

                        <Pressable
                            style={{
                                paddingVertical: 12,
                                marginHorizontal: 15,
                                borderRadius: 5,
                                backgroundColor: disabled ? '#f1f1f1' : COLORS.green,
                            }}
                            onPress={validateForm}
                            disabled={disabled}
                        >
                            <Text
                                style={styles.sendBtnText}
                            >
                                Gönder
                            </Text>
                        </Pressable>

                    </View>
                </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f4f4f4',
        paddingBottom: 10,
    },
    image: {
        width: 75,
        height: 85,
        resizeMode: 'contain',
        marginRight: 10
    },
    contentWrapper: {
        width: Dimensions.get('window').width - 120,
        height: '100%',
        paddingVertical: 10,
    },
    bannerName: {
        fontSize: 14,
        color: '#2B2B2B',
        fontWeight: 'bold',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 12,
        color: '#bdbbbb',
        fontWeight: 'bold'
    },
    price: {
        color: COLORS.green,
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 7
    },
    explainText: {
        marginVertical: 20,
        paddingHorizontal: 20,
        textAlign: 'center',
        lineHeight: 22,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#949191'
    },
    sendBtnWrapper: {
        width: Dimensions.get('window').width,
        borderRadius: 5,
        position: 'absolute',
        bottom: 15,
    },
    sendBtnText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15
    }
})
export default CommentPostForm