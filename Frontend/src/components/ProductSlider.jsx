import React, { useRef } from "react";
import ProductCard from "./ProductCard";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const ProductSlider = ({ title = "Collection", products = [] }) => {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300 });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300 });
    };

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
