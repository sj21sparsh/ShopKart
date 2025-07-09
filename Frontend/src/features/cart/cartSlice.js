import { createSlice } from "@reduxjs/toolkit";
import {
    getCart,
    addToCart,
    updateItem,
    removeItem,
    clearCart,
} from "./cartThunk";

const initialState = {
    items: [],
    totalPrice: 0,
    loading: true,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCartError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items || [];
                state.totalPrice = action.payload.totalPrice || 0;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.totalPrice = action.payload.totalPrice;
            })

            .addCase(updateItem.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.totalPrice = action.payload.totalPrice;
            })

            .addCase(removeItem.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.totalPrice = action.payload.totalPrice;
            })

            .addCase(clearCart.fulfilled, (state) => {
                state.items = [];
                state.totalPrice = 0;
            });
    },
});

export const { clearCartError } = cartSlice.actions;
export default cartSlice.reducer;
