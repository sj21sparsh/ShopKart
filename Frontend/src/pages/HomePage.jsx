import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import Category from "../components/Category";
import ProductSlider from "../components/ProductSlider";
import Features from "../components/Features";
import {
    getLatestProducts,
    getFeaturedProducts,
} from "../features/product/productThunk";

const HomePage = () => {
    const dispatch = useDispatch();

    const { latest, featured } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getLatestProducts());
        dispatch(getFeaturedProducts());
    }, [dispatch]);

    return (
        <div>
            <Banner />
            <Category />
            <ProductSlider title="Latest Collection" products={latest} />
            <ProductSlider title="Featured Collection" products={featured} />
            <Features />
        </div>
    );
};

export default HomePage;
