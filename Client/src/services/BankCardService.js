import http from "./HttpConnection";

const getAllBankCards = () => {
    return http.get("/bankCards/all");
};
const addBankCard = data => {
    return http.post("/bankCards/add", data);
};

const editBankCard = (id ,data ) => {
    return http.put(`/bankCards/edit/${id}`, data);
};

const deleteBankCard = id => {
    return http.delete(`/bankCards/delete/${id}`);
};

export default {
    getAllBankCards,
    editBankCard,
    deleteBankCard,
    addBankCard
}