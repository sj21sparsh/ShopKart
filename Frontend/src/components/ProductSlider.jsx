import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getLatestProducts,
    getFeaturedProducts,
    getRelatedProducts,
} from "../features/product/productThunk";
import { setLastFetchedRelatedId } from "../features/product/productSlice";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import ProductCard from "./ProductCard";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const ProductSlider = ({
    title = "Collection",
    type = "latest",
    productId = null,
}) => {
    const scrollRef = useRef(null);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { latest, featured, related, lastFetchedRelatedId } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                if (type === "latest" && latest.length === 0) {
                    await dispatch(getLatestProducts()).unwrap();
                } else if (type === "featured" && featured.length === 0) {
                    await dispatch(getFeaturedProducts()).unwrap();
                } else if (
                    type === "related" &&
                    productId &&
                    lastFetchedRelatedId !== productId
                ) {
                    await dispatch(getRelatedProducts(productId)).unwrap();
                    dispatch(setLastFetchedRelatedId(productId));
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [dispatch, type, productId, lastFetchedRelatedId]);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300 });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300 });
    };

    let products = [];
    if (type === "latest") products = latest;
    else if (type === "featured") products = featured;
    else if (type === "related") products = related;

    if (loading) {
        return (
            <div className="flex justify-center items-center py-16">
                <Loader size="40" className="text-blue-600" />
            </div>
        );
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        products.length > 0 && (
            <div className="px-2 lg:px-8 py-6 relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-blue-800 text-2xl font-bold">
                        {title}
                    </h2>
                    <div className="space-x-2">
                        <button
                            onClick={scrollLeft}
                            className="p-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
                        >
                            <HiChevronLeft size={20} />
                        </button>
                        <button
                            onClick={scrollRight}
                            className="p-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
                        >
                            <HiChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-2 lg:gap-6 overflow-x-auto scroll-smooth no-scrollbar"
                >
                    {products.map((product) => (
                        <ProductCard
                            key={product._id || product.itemId}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        )
    );
};

export default ProductSlider;
