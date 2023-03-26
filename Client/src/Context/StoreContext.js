import React, { useState, useContext, useEffect } from 'react'
import StoreService from '../services/StoreService';
import { AuthState } from './AuthContext';
import  Toast  from 'react-native-toast-message';

export const StoreContext = React.createContext();

const StoreContextProvider = ({ children }) => {
    const { userInfo } = AuthState()
    const [basketItemsLength, setBasketItemsLength] = useState(0);
    const [basketItems, setBasketItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const [loading, setLoading] = useState(false);
    const [basketItemStatus, setBasketItemStatus] = useState(false);

    const getAllBasketItems = async () => {
        const { data } = await StoreService.getAllBasketItems();
        setBasketItems(data.orderItems)
        setBasketItemsLength(data.orderItems.length)
        setTotalPrice(data.totalPrice)
        setLoading(false)

    }
    const addToBasket = async ({ productId, selectedSize }) => {
        setLoading(true)

        try {
            await StoreService.addToBasket({ productId, selectedSize });

        }
        catch (err) {
            Toast.show({
                type: 'customToast',
                position: 'bottom',
                text1: 'İstek iletilirken bir sorun oluştu.Tekrar deneyiniz.',
                visibilityTime: 2000,
                autoHide: true,
                bottomOffset: 0,
            });
        }
      
        setBasketItemStatus(!basketItemStatus)

    }

    const increaseQuantity = async (id) => {
        await StoreService.increaseQuanity({ itemId: id });

    }
    const decreaseQuantity = async (id) => {
        await StoreService.decreaseQuanity({ itemId: id });
    }

    const deleteBasketItem = async (id) => {
        setLoading(true)
        await StoreService.deleteBasketItem(id);
        setBasketItemStatus(!basketItemStatus)
    }

    const deleteAllBasketItems = async () => {
        setLoading(true)
        await StoreService.deleteAllBasketItems();
        setBasketItems([])
        setBasketItemsLength(0)
        setTotalPrice(0)
        setLoading(false)
    }


    useEffect(() => {
        getAllBasketItems()
    }, [basketItemStatus, userInfo])

    return (
        <StoreContext.Provider
            value={{
                basketItems,
                setBasketItems,
                basketItemsLength,
                setBasketItemsLength,
                deleteBasketItem,
                deleteAllBasketItems,
                totalPrice,
                setTotalPrice,
                addToBasket,
                loading,
                increaseQuantity,
                decreaseQuantity,
            }}
        >
            {children}
        </StoreContext.Provider>
    )

}


export const StoreState = () => {
    return useContext(StoreContext)
}

export default StoreContextProvider