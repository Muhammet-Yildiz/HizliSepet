import http from "./HttpConnection";

const addToBasket = (data) => {
    return http.post(`/store/addToBasket`,data);
}

const getAllBasketItems = () => {
    return http.get(`/store/getAllBasketItems`);
}

const increaseQuanity = (data) => {
    return http.post(`/store/increaseQuantity`,data)

}
const decreaseQuanity = (data) => {
    return http.post(`/store/decreaseQuantity`,data)
}

const deleteBasketItem = (id) => {
    return http.delete(`/store/deleteBasketItem/${id}`);
}

const deleteAllBasketItems = () => {
    return http.delete(`/store/deleteAllBasketItems`);
}

const getAllDeliveryItems = () => {
    return http.get(`/store/getAllDeliveryItems`);
}

export default {
    addToBasket,
    getAllBasketItems,
    increaseQuanity,
    decreaseQuanity,
    deleteBasketItem,
    deleteAllBasketItems,
    getAllDeliveryItems,
}