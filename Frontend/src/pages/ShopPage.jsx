import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductsGrid from "../components/ProductsGrid";
import {
    getAllProducts,
    getProductsByCategory,
} from "../features/product/productThunk";
import { setLastFetchedCategory } from "../features/product/productSlice";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";

const ShopPage = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");
    const searchTerm = searchParams.get("search")?.trim().toLowerCase() || "";

    const { allProducts, categoryProducts, lastFetchedCategory } = useSelector(
        (state) => state.products
    );

    const [localLoading, setLocalLoading] = useState(false);
    const [localError, setLocalError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLocalLoading(true);
                setLocalError(null);

                if (category && lastFetchedCategory !== category) {
                    await dispatch(getProductsByCategory(category)).unwrap();
                    dispatch(setLastFetchedCategory(category));
                } else if (!category && allProducts.length === 0) {
                    await dispatch(getAllProducts()).unwrap();
                }
            } catch (err) {
                setLocalError(err);
            } finally {
                setLocalLoading(false);
            }
        };

        fetchProducts();
    }, [dispatch, category, lastFetchedCategory]);

    const filteredProducts = (category ? categoryProducts : allProducts).filter(
        (product) =>
            product.name?.toLowerCase().includes(searchTerm) ||
            product.description?.toLowerCase().includes(searchTerm) ||
            product.brand?.toLowerCase().includes(searchTerm) ||
            product.material?.toLowerCase().includes(searchTerm) ||
            product.color?.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="container mx-auto px-4 py-6">
            {category && (
                <div className="lg:hidden text-xl font-semibold text-center text-blue-600 mb-4">
                    {category.toUpperCase()} Section
                </div>
            )}

            {localLoading ? (
                <div className="flex justify-center items-center py-16">
                    <Loader size="40" className="text-blue-600" />
                </div>
            ) : localError ? (
                <ErrorMessage message={localError} />
            ) : filteredProducts.length === 0 ? (
                <p className="text-center text-gray-500 py-10 text-xl font-medium">
                    No products found.
                </p>
            ) : (
                <ProductsGrid products={filteredProducts} />
            )}
        </div>
    );
};

export default ShopPage;
