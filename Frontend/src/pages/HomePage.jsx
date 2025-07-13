import React from "react";
import Banner from "../components/Banner";
import Category from "../components/Category";
import ProductSlider from "../components/ProductSlider";
import Features from "../components/Features";

const HomePage = () => {
    return (
        <div>
            <Banner />
            <Category />
            <ProductSlider title="Latest Collection" type="latest" />
            <ProductSlider title="Featured Collection" type="featured" />
            <Features />
        </div>
    );
};

export default HomePage;
