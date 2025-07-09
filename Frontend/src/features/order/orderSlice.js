import { createSlice } from "@reduxjs/toolkit";
import { placeOrder, fetchOrders } from "./orderThunk";

const initialState = {
    order: null,
    orders: [],
    loading: false,
    error: null,
    success: false,
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        clearOrderStatus: (state) => {
            state.order = null;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload.order;
                state.success = true;
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
