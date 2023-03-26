import React, { useState, useContext, useEffect } from 'react'
import CategoryService from '../services/CategoryService';

export const CategoryContext = React.createContext();

const CategoryContextProvider = ({ children }) => {
    const [allCategories, setAllCategories] = useState([]);

    const getAllCategories = async () => {
        try {

            const { data } = await CategoryService.getAllCategories();

            setAllCategories(data.categories);
        }
        catch (err) {
            console.log("get all categories error :", err)
            setAllCategories([]);

        }
        
    }

    useEffect(() => {
        getAllCategories()
    }, [])


    return (
        <CategoryContext.Provider
            value={{ allCategories }}
        >
            {children}
        </CategoryContext.Provider>
    ) 

}


export const useCategories = () => {
    return useContext(CategoryContext)
}

export default CategoryContextProvider