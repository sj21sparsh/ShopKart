import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster, toast } from "sonner";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
    useEffect(() => {
        const handleClick = (e) => {
            const toastEl = document.querySelector("[data-sonner-toast]");
            if (toastEl && toastEl.contains(e.target)) return;

            toast.dismiss();
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="relative z-[9999]">
                <Toaster
                    richColors
                    position="top-right"
                    toastOptions={{
                        className: "!mt-[4.5rem] sm:!mt-[3rem]",
                        closeButton: true,
                    }}
                />
            </div>
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default PageLayout;
