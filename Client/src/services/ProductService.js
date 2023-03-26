import http from "./HttpConnection";

const getAllProducts = () => {
    return http.get("/products/all");
};
const getDetailProduct = (id) => {
    return http.get(`/products/${id}/detail`);
};

const lastViewedProducts = () => {
    return http.get("/products/lastViewed/all");
};

const getProductsInSameSubCategory = (id) => {
    return http.get(`/products/${id}/inSameSubCategory`);
};

const getRecommendationsForItemsInBasket  = () => {
    return http.get("/products/recommendationsForItemsInBasket");
};

const getSuggestedSearchWords = () => {
    return http.get("/products/suggestedSearchWords/all");
};

const searchProduct = (queryObj) => {
    return http.post("/products/search",queryObj);
};
export default {
    getAllProducts,
    getDetailProduct,
    lastViewedProducts,
    getProductsInSameSubCategory,
    getRecommendationsForItemsInBasket,
    getSuggestedSearchWords,
    searchProduct
}