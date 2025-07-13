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
    categoryProducts: [],
    featured: [],
    latest: [],
    related: [],
    productDetails: null,
    lastFetchedCategory: null,
    lastFetchedRelatedId: null,
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
        setLastFetchedCategory: (state, action) => {
            state.lastFetchedCategory = action.payload;
        },
        setLastFetchedRelatedId: (state, action) => {
            state.lastFetchedRelatedId = action.payload;
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
                state.error = null;
                state.allProducts = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.productDetails = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.productDetails = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getProductsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.categoryProducts = action.payload;
            })
            .addCase(getProductsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getFeaturedProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFeaturedProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.featured = action.payload;
            })
            .addCase(getFeaturedProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getLatestProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLatestProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.latest = action.payload;
            })
            .addCase(getLatestProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getRelatedProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRelatedProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.related = action.payload;
            })
            .addCase(getRelatedProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    clearProductError,
    clearProductDetails,
    setLastFetchedCategory,
    setLastFetchedRelatedId,
} = productSlice.actions;
export default productSlice.reducer;
