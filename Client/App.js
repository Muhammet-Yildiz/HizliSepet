import React from 'react';
import AuthContextProvider from './src/Context/AuthContext';
import Navigation from './src/Navigation';
import ProductContextProvider from './src/Context/ProductContext';
import { MenuProvider } from 'react-native-popup-menu';
import StoreContextProvider from './src/Context/StoreContext';
import FavoriteContextProvider from './src/Context/FavoriteContext';
import CategoryContextProvider from './src/Context/CategoryContext';
import Toast from 'react-native-toast-message';
import ToastMessage from './src/view/components/general/ToastMessage';
import COLORS from './src/consts/colors';
const toastConfig = {
  success : ({ text1, props }) => (
    <ToastMessage text1={text1} bgColor ={COLORS.green} />
  ),
  customToast: ({ text1, props }) => (
    <ToastMessage text1={text1} bgColor ={'#2b2b2b'} />
  )
};
const App = () => {
  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <StoreContextProvider>
          <FavoriteContextProvider>
            <CategoryContextProvider>
              <MenuProvider>
                <Navigation />
                <Toast config={toastConfig} />
              </MenuProvider>
            </CategoryContextProvider>
          </FavoriteContextProvider>
        </StoreContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  );
}

export default App 
