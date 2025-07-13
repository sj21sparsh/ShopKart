import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../features/order/orderThunk";
import Orders from "./Orders";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";

const Profile = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
                Profile
            </h2>

            <div className="bg-white lg:p-6 mb-10 text-black">
                <p className="text-lg">
                    <span className="font-bold">User Type :</span> Guest
                </p>
                <p className="text-lg">
                    <span className="font-bold">Guest ID :</span>{" "}
                    {localStorage.getItem("guestId")}
                </p>
                {loading ? (
                    <>
                        <div className="text-center mt-10">
                            Loading orders...
                        </div>
                        <div className="flex justify-center items-center py-16">
                            <Loader size="40" className="text-blue-600" />
                        </div>
                    </>
                ) : error ? (
                    <ErrorMessage message={error} />
                ) : (
                    <Orders orders={orders} />
                )}
            </div>
        </div>
    );
};

export default Profile;
