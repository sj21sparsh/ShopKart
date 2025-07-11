import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../features/order/orderThunk";
import Orders from "./Orders";

const Profile = () => {
    const dispatch = useDispatch();
    const { orders, loading } = useSelector((state) => state.order);

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
                    <div className="text-center mt-10">Loading orders...</div>
                ) : orders.length === 0 ? (
                    <div className="text-center mt-10 text-gray-500">
                        You have not placed any orders yet. Go Shopping...
                    </div>
                ) : (
                    <Orders orders={orders} />
                )}
            </div>
        </div>
    );
};

export default Profile;
