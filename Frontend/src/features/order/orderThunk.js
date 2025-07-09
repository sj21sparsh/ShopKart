import { createAsyncThunk } from "@reduxjs/toolkit";
import { placeOrderAPI, fetchOrdersAPI } from "../../api/orderApi";
import { getUserOrGuestId } from "../../utils/getUserOrGuestId";

export const placeOrder = createAsyncThunk(
    "orders/placeOrder",
    async (orderData, thunkAPI) => {
        try {
            const { userId, guestId } = getUserOrGuestId();

            const res = await placeOrderAPI(orderData, guestId, userId);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || err.message
            );
        }
    }
);

export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async (_, thunkAPI) => {
        try {
            const { userId, guestId } = getUserOrGuestId();

            const res = await fetchOrdersAPI(userId, guestId);
            return res.data.orders;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || err.message
            );
        }
    }
);
