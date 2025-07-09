import axiosInstance from "./axiosInstance";

export const placeOrderAPI = (orderData, guestId, userId) => {
    const params = userId ? { userId } : guestId ? { guestId } : {};
    return axiosInstance.post("/orders/placeOrder", orderData, { params });
};

export const fetchOrdersAPI = (userId, guestId) => {
    const params = userId ? { userId } : guestId ? { guestId } : {};
    return axiosInstance.get("/orders/getOrders", { params });
};
