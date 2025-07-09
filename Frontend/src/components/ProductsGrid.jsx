import React from "react";
import ProductCard from "./ProductCard";

const ProductsGrid = ({ products }) => {
    if (!products || products.length === 0) return null;

    return (
        <div className="container mx-auto lg:px-4 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3  lg:gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product._id || product.itemId}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsGrid;
