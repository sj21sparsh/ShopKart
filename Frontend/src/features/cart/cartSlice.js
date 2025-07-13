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
    loading: false,
    error: null,
    success: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCartStatus: (state) => {
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getCart.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.items = action.payload.items || [];
                state.totalPrice = action.payload.totalPrice || 0;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.items = action.payload.items;
                state.totalPrice = action.payload.totalPrice;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            .addCase(updateItem.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.items = action.payload.items;
                state.totalPrice = action.payload.totalPrice;
            })
            .addCase(updateItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            .addCase(removeItem.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(removeItem.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.items = action.payload.items;
                state.totalPrice = action.payload.totalPrice;
            })
            .addCase(removeItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            .addCase(clearCart.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.items = [];
                state.totalPrice = 0;
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { clearCartStatus } = cartSlice.actions;
export default cartSlice.reducer;
