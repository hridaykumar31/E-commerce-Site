import axios from "axios";

const Api = axios.create({baseURL: "http://localhost:8000/api"});

//Auth routes
export const registerAPI = (data) => Api.post("/register", data);
export const loginAPI = (data) => Api.post("/login", data);
export const logoutAPI = () => Api.post("/logout");
export const getUserAPI  = (token) =>
    Api.get('/user', {
        headers: { Authorization: `Bearer ${token}` },
    });
export const getAdminAPI  = (token) =>
Api.get('/admin', {
    headers: { Authorization: `Bearer ${token}` },
});
