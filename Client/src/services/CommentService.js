import http from "./HttpConnection";

const addComment = data => {
    return http.post("/comments/add", data);
};

const editComment = data => {
    return http.put("/comments/edit", data);
};

const deleteComment = data => {
    return http.post("/comments/delete", data);
};


export default {
    addComment,
    editComment,
    deleteComment
}