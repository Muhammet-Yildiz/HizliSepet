import http from "./HttpConnection";



const getAllEvaluatableItems = () => {
    return http.get(`/orders/getAllEvaluatableItems`);
}

const getAllApprovedEvaluatableItems = () => {
    return http.get(`/orders/getAllApprovedEvaluatableItems`);
}

const completeOrder = (data) => {
    return http.post(`/orders/completeOrder`,data);
}

const  getAllMyOrders = () => {
    return http.get(`/orders/getAllMyOrders`);
}

const getOrderDetail = (id) => {
    return http.get(`/orders/detail/${id}`);
}

export default {
    getAllEvaluatableItems,
    getAllApprovedEvaluatableItems,
    completeOrder,
    getAllMyOrders,
    getOrderDetail
}