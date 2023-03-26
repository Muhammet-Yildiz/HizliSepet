import http from "./HttpConnection";

const getAllCategories = () => {
    return http.get("/categories/all");
};

export default {
    getAllCategories
}