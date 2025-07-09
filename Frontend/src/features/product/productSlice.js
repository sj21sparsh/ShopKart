import { createSlice } from "@reduxjs/toolkit";
import {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    getLatestProducts,
    getRelatedProducts,
} from "./productThunk";

const initialState = {
    allProducts: [],
    featured: [],
    latest: [],
    related: [],
    productDetails: null,
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearProductError: (state) => {
            state.error = null;
        },
        clearProductDetails: (state) => {
            state.productDetails = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.allProducts = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.productDetails = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getFeaturedProducts.fulfilled, (state, action) => {
                state.featured = action.payload;
            })

            .addCase(getLatestProducts.fulfilled, (state, action) => {
                state.latest = action.payload;
            })

            .addCase(getProductsByCategory.fulfilled, (state, action) => {
                state.allProducts = action.payload;
            })

            .addCase(getRelatedProducts.fulfilled, (state, action) => {
                state.related = action.payload;
            });
    },
});

export const { clearProductError, clearProductDetails } = productSlice.actions;
export default productSlice.reducer;
