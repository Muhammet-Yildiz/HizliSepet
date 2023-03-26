import React, { useState, useContext, useEffect } from 'react'
import FavoriteService from '../services/FavoriteService';
import { AuthState } from './AuthContext';

export const FavoriteContext = React.createContext();

const FavoriteContextProvider = ({ children }) => {
    const { userInfo } = AuthState()
    const [favoriteList, setFavoriteList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [favoriteListStatus, setFavoriteListStatus] = useState(false);

    const getAllFavoriteItems = async () => {
        const { data } = await FavoriteService.getAllFavoriteItems()
        setFavoriteList(data.favorites)
        setLoading(false)
    }

    const addItemToFavoriteList = async (id) => {
        setLoading(true)

        await FavoriteService.addItemToFavoritelist(id);

        setFavoriteListStatus(!favoriteListStatus)

    }

    const removeItemFromFavoriteList = async (id) => {

        setLoading(true)
        try {

            await FavoriteService.removeItemFromFavoritelist(id);
            setFavoriteListStatus(!favoriteListStatus)
        }
        catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllFavoriteItems()
    }, [favoriteListStatus, userInfo])



    return (
        <FavoriteContext.Provider
            value={{
                favoriteList,
                setFavoriteList,
                addItemToFavoriteList,
                getAllFavoriteItems,
                removeItemFromFavoriteList,
                loading,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    )

}


export const FavoriteState = () => {
    return useContext(FavoriteContext)
}

export default FavoriteContextProvider