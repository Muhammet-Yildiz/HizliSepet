import http from "./HttpConnection";

const changeEmail = (data) => {
    return http.post("/user/changeEmail",data);
};

const changePassword = (data) => {
    return http.post("/user/changePassword",data);
};

export default {
   changeEmail,
   changePassword
}