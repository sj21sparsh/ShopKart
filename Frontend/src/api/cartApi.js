import axiosInstance from "./axiosInstance";

export const fetchCartAPI = ({ userId, guestId }) =>
    axiosInstance.get("/cart", {
        params: userId ? { userId } : guestId ? { guestId } : {},
    });

export const addToCartAPI = ({ data, userId, guestId }) =>
    axiosInstance.post("/cart/item", data, {
        params: userId ? { userId } : guestId ? { guestId } : {},
    });

export const updateCartItemAPI = ({ data, userId, guestId }) =>
    axiosInstance.put("/cart/item", data, {
        params: userId ? { userId } : guestId ? { guestId } : {},
    });

export const removeCartItemAPI = ({ data, userId, guestId }) =>
    axiosInstance.delete("/cart/item", {
        data,
        params: userId ? { userId } : guestId ? { guestId } : {},
    });

export const clearCartAPI = ({ userId, guestId }) =>
    axiosInstance.delete("/cart", {
        params: userId ? { userId } : guestId ? { guestId } : {},
    });
