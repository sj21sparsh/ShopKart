import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductsGrid from "../components/ProductsGrid";
import {
    getAllProducts,
    getProductsByCategory,
} from "../features/product/productThunk";

const ShopPage = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");
    const searchTerm = searchParams.get("search")?.trim().toLowerCase() || "";

    const { allProducts, loading } = useSelector((state) => state.products);

    useEffect(() => {
        if (category) {
            dispatch(getProductsByCategory(category));
        } else {
            dispatch(getAllProducts());
        }
    }, [dispatch, category]);

    const filteredProducts = allProducts.filter(
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

            {loading ? (
                <div className="text-center mt-10">Loading Products...</div>
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
