import React  from 'react'
import Modal from "react-native-modal";
import {  ActivityIndicator, Text, View } from 'react-native'
import { AuthState } from '../../../Context/AuthContext';
import COLORS from '../../../consts/colors';

const ModalMessage = ({message}) => {
  const { isModalVisible, setModalVisible, isLoading } = AuthState();

  return (
    <View>
      <Modal isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="bounceIn"
        animationOut="bounceOut"
        backdropOpacity={0.5}
        animationInTiming={650}
        animationOutTiming={350}
      >
        <View style={{
          flex: 0.17, backgroundColor: 'white', borderRadius: 2,
          width: '90%',
          marginHorizontal: '4%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
        }}>
          {!isLoading ?
            <View
              style={{
                paddingHorizontal: 15,
                paddingLeft: 25,
              }}
            >
              <Text
                style={{
                  lineHeight: 25,
                  fontSize: 15,
                }}
              >
                {message}
              </Text>
              <Text style={{ alignSelf: 'flex-end', color: COLORS.green, fontWeight: 'bold' ,marginTop:12}}
                onPress={() => setModalVisible(false)}
              >
                OKEY
              </Text>
            </View>
            :
            <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <ActivityIndicator size="large"
                  color={COLORS.green}
                />
                <Text style={{ marginLeft: 30 }} >
                  Yükleniyor
                </Text>
           </View>
          }

        </View>
      </Modal>
    </View>
  )
}

export default ModalMessage