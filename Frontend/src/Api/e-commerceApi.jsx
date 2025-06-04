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
export const addCategoryAPI  = (data, token) =>
Api.post('/categories', data, {
    headers: { Authorization: `Bearer ${token}` },

});
export const getAllCategoryAPI  = (token) =>
Api.get('/categories', {
    headers: { Authorization: `Bearer ${token}` },

});

export const addProductAPI  = (data, token) =>
Api.post('/products', data, {
    headers: { Authorization: `Bearer ${token}` },

});
export const getAllProductAPI  = (token) =>
Api.get('/products', {
    headers: { Authorization: `Bearer ${token}` },

});

export const addTagAPI  = (data, token) =>
Api.post('/tags', data, {
    headers: { Authorization: `Bearer ${token}` },

});
export const getAllTagAPI  = (token) =>
Api.get('/tags', {
    headers: { Authorization: `Bearer ${token}` },

});
