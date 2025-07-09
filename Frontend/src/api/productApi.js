import axiosInstance from "./axiosInstance";

export const fetchAllProducts = () => axiosInstance.get("/products");

export const fetchProductById = (id) => axiosInstance.get(`/products/${id}`);

export const fetchProductsByCategory = (category) =>
    axiosInstance.get(`/products/category/${category}`);

export const fetchFeaturedProducts = () =>
    axiosInstance.get("/products/featured");

export const fetchLatestProducts = () => axiosInstance.get("/products/latest");

export const fetchRelatedProducts = (id) =>
    axiosInstance.get(`/products/related/${id}`);
