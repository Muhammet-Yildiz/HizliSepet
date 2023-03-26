import React, { useState, useContext, useEffect } from 'react'
import ProductService from '../services/ProductService';
import { MONTHS } from '../consts/time';

export const ProductContext = React.createContext();

const ProductContextProvider = ({ children }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [suggestedList, setSuggestedList] = useState([]);

    const getAllProducts = async () => {
        try {
            const { data } = await ProductService.getAllProducts();
            setAllProducts(data.products);
        }
        catch (err) {
            setAllProducts([]);
        }
    }

    const getSuggestedSearchWords = async () => {

        try {
            const { data } = await ProductService.getSuggestedSearchWords();
            setSuggestedList(data.allOptions);
        }
        catch (err) {
            setSuggestedList([]);
        }
    }



    useEffect(() => {
        getAllProducts()
        getSuggestedSearchWords()
    }, [])

    const editTimestamp = (timestamp, addDay = 0, status = null) => {
        const date = new Date(timestamp);
        date.setTime(date.getTime() + (addDay * 24 * 60 * 60 * 1000))

        const localDate = new Date(date);
        const month = MONTHS[localDate.getMonth()][0].toUpperCase() + MONTHS[localDate.getMonth()].toLowerCase().substring(1);

        if (status === 'exactDate') {
            return `${localDate.getDate()} ${month} `
        }
        return `${localDate.getDate()} - ${localDate.getDate() + 1}  ${month} `
    }

    return (
        <ProductContext.Provider
            value={{
                getAllProducts,
                allProducts,
                editTimestamp,
                suggestedList
            }}
        >
            {children}
        </ProductContext.Provider>
    )

}


export const ProductsState = () => {
    return useContext(ProductContext)
}

export default ProductContextProvider