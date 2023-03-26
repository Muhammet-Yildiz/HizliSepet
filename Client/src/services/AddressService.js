import http from "./HttpConnection";

const getAllAddresses = () => {
    return http.get("/address/all");
};

const addAddress = data => {
    return http.post("/address/add", data);
};
const editAddress = (data ,id ) => {
    return http.put(`/address/edit/${id}`, data);
};

const deleteAddress = id => {
    return http.delete(`/address/delete/${id}`);
};

export default {
    getAllAddresses,
    addAddress,
    editAddress,
    deleteAddress
}