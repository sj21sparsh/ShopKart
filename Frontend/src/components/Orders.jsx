import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../features/order/orderThunk";
import OrderItems from "../components/OrderItems";

const Orders = () => {
    const dispatch = useDispatch();
    const { orders, loading } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    if (loading)
        return <div className="text-center mt-10">Loading orders...</div>;

    if (orders.length === 0)
        return (
            <div className="text-center mt-10 text-gray-500">
                You have not placed any orders yet. Go Shopping...
            </div>
        );

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
                My Orders
            </h2>

            <div className="space-y-10">
                {orders.map((order, index) => (
                    <div
                        key={order._id || index}
                        className="border-1 border-gray-300 rounded-md shadow-sm bg-white p-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="text-gray-800 text-md space-y-2">
                                <p>
                                    <span className="font-bold">
                                        Order ID :
                                    </span>{" "}
                                    {order._id}
                                </p>
                                <p>
                                    <span className="font-bold">Date :</span>{" "}
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </p>
                                <p>
                                    <span className="font-bold">Time :</span>{" "}
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleTimeString()}
                                </p>
                                <p>
                                    <span className="font-bold">
                                        Payment Mode :
                                    </span>{" "}
                                    {order.paymentMethod}
                                </p>
                                <p>
                                    <span className="font-bold">
                                        Total Price :
                                    </span>{" "}
                                    ₹{order.totalPrice}
                                </p>
                                <div className="mt-4">
                                    <h4 className="font-bold text-gray-900 mb-1">
                                        Shipping Information
                                    </h4>
                                    <p>{order.shippingInfo.fullName}</p>
                                    <p>{order.shippingInfo.email}</p>
                                    <p>{order.shippingInfo.phone}</p>
                                    <p>
                                        {order.shippingInfo.address},{" "}
                                        {order.shippingInfo.city},{" "}
                                        {order.shippingInfo.state} -{" "}
                                        {order.shippingInfo.pinCode}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <OrderItems items={order.items} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
