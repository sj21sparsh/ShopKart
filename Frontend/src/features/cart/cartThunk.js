import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchCartAPI,
    addToCartAPI,
    updateCartItemAPI,
    removeCartItemAPI,
    clearCartAPI,
} from "../../api/cartApi";
import { getUserOrGuestId } from "../../utils/getUserOrGuestId";

export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
    try {
        const { userId, guestId } = getUserOrGuestId();
        const res = await fetchCartAPI({ userId, guestId });
        return res.data.cart;
    } catch (err) {
        return thunkAPI.rejectWithValue(
            err.response?.data?.message || err.message
        );
    }
});

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ data }, thunkAPI) => {
        try {
            const { userId, guestId } = getUserOrGuestId();
            const res = await addToCartAPI({ data, guestId, userId });
            return res.data.cart;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || err.message
            );
        }
    }
);

export const updateItem = createAsyncThunk(
    "cart/updateItem",
    async ({ data }, thunkAPI) => {
        try {
            const { userId, guestId } = getUserOrGuestId();
            const res = await updateCartItemAPI({ data, guestId, userId });
            return res.data.cart;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || err.message
            );
        }
    }
);

export const removeItem = createAsyncThunk(
    "cart/removeItem",
    async ({ data }, thunkAPI) => {
        try {
            const { userId, guestId } = getUserOrGuestId();
            const res = await removeCartItemAPI({ data, guestId, userId });
            return res.data.cart;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || err.message
            );
        }
    }
);

export const clearCart = createAsyncThunk(
    "cart/clearCart",
    async (_, thunkAPI) => {
        try {
            const { userId, guestId } = getUserOrGuestId();
            const res = await clearCartAPI({ userId, guestId });
            return res.data.cart;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || err.message
            );
        }
    }
);
