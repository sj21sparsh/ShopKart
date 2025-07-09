import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchAllProducts,
    fetchProductById,
    fetchProductsByCategory,
    fetchFeaturedProducts,
    fetchLatestProducts,
    fetchRelatedProducts,
} from "../../api/productApi";

export const getAllProducts = createAsyncThunk(
    "products/getAllProducts",
    async (_, thunkAPI) => {
        try {
            const response = await fetchAllProducts();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export const getProductById = createAsyncThunk(
    "products/getProductById",
    async (id, thunkAPI) => {
        try {
            const response = await fetchProductById(id);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export const getProductsByCategory = createAsyncThunk(
    "products/getProductsByCategory",
    async (category, thunkAPI) => {
        try {
            const response = await fetchProductsByCategory(category);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export const getFeaturedProducts = createAsyncThunk(
    "products/getFeaturedProducts",
    async (_, thunkAPI) => {
        try {
            const response = await fetchFeaturedProducts();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export const getLatestProducts = createAsyncThunk(
    "products/getLatestProducts",
    async (_, thunkAPI) => {
        try {
            const response = await fetchLatestProducts();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export const getRelatedProducts = createAsyncThunk(
    "products/getRelatedProducts",
    async (productId, thunkAPI) => {
        try {
            const response = await fetchRelatedProducts(productId);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);
