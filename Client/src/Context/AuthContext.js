import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useContext, useEffect } from 'react'

export const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [splashLoading, setSplashLoading] = useState(false);

    const logout = async () => {
        await AsyncStorage.removeItem('userInfo');
        await AsyncStorage.removeItem('accessToken');
        setUserInfo({});
    }

    const isLoggedIn = async () => {
        setSplashLoading(true);
        try {

            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            if (userInfo) {
                setUserInfo(userInfo);
            }

        }
        catch (err) {
            console.log("isLoggedIn error :", err)
        }
        setSplashLoading(false);
    }

    useEffect(() => {
        isLoggedIn();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                userInfo,
                setUserInfo,
                logout,
                splashLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}

export const AuthState = () => {
    return useContext(AuthContext)
}

export default AuthContextProvider