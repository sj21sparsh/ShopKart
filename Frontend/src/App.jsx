import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import PageLayout from "./components/PageLayout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ShopPage from "./pages/ShopPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/aboutPage";
import ContactPage from "./pages/contactPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCart } from "./features/cart/cartThunk";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<PageLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="product/:id" element={<ProductPage />} />
                    <Route path="shop" element={<ShopPage />} />
                    <Route path="checkout" element={<CheckoutPage />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
