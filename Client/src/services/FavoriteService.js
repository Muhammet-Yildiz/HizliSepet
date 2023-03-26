import http from "./HttpConnection";

const getAllFavoriteItems = () => {
    return http.get(`/favorites/all`);
}

const addItemToFavoritelist = (id) => {
    return http.post(`/favorites/${id}/add`);
}

const removeItemFromFavoritelist = (id) => {
    return http.delete(`/favorites/${id}/remove`);
}

export default {
    getAllFavoriteItems,
    addItemToFavoritelist,
    removeItemFromFavoritelist
}