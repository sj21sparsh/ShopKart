import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { getProductById } from "../features/product/productThunk";
import { addToCart, updateItem, removeItem } from "../features/cart/cartThunk";
import ProductSlider from "./ProductSlider";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";

const ProductDetails = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const sizeFromQuery = searchParams.get("size");
    const [productLoading, setProductLoading] = useState(false);
    const [productError, setProductError] = useState(null);

    const dispatch = useDispatch();

    const { productDetails: product } = useSelector((state) => state.products);

    const { items: cartItems } = useSelector((state) => state.cart);

    const [selectedSize, setSelectedSize] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [btnLoading, setBtnLoading] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (!product || product._id !== id) {
                    setProductLoading(true);
                    setProductError(null);
                    await dispatch(getProductById(id)).unwrap();
                }
            } catch (err) {
                setProductError(err);
            } finally {
                setProductLoading(false);
            }
        };

        fetchProduct();
    }, [dispatch, id, product]);

    useEffect(() => {
        if (product && product.size?.includes(sizeFromQuery)) {
            setSelectedSize(sizeFromQuery);
        } else {
            setSelectedSize("");
        }
    }, [sizeFromQuery, product]);

    useEffect(() => {
        setShowMessage(false);
    }, [id]);

    const existingCartItem = cartItems.find(
        (item) =>
            (item.productId === id ||
                item.productId?._id === id ||
                item.productId === product?._id ||
                item.productId?._id === product?._id) &&
            item.size === selectedSize
    );

    const handleAddToCart = async () => {
        if (!selectedSize) {
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 2000);
            return;
        }

        try {
            setBtnLoading("add");
            await dispatch(
                addToCart({
                    data: {
                        productId: id,
                        size: selectedSize,
                        quantity: 1,
                    },
                })
            ).unwrap();
            toast.success("Item added to cart!");
        } catch (err) {
            toast.error(err);
        } finally {
            setBtnLoading(null);
        }
    };

    const onQuantityChange = async (action) => {
        if (!existingCartItem) return;

        const newQuantity =
            action === "increase"
                ? existingCartItem.quantity + 1
                : existingCartItem.quantity - 1;

        if (newQuantity < 1) return;

        try {
            setBtnLoading(action);
            await dispatch(
                updateItem({
                    data: {
                        productId: product._id,
                        size: selectedSize,
                        quantity: newQuantity,
                    },
                })
            ).unwrap();
        } catch (err) {
            toast.error(err);
        } finally {
            setBtnLoading(null);
        }
    };

    const onDelete = async () => {
        try {
            setBtnLoading("remove");
            await dispatch(
                removeItem({
                    data: {
                        productId: product._id,
                        size: selectedSize,
                    },
                })
            ).unwrap();
            toast("Item removed", {
                style: { background: "#fef3c7" },
            });
        } catch (err) {
            toast.error(err);
        } finally {
            setBtnLoading(null);
        }
    };

    if (productLoading) {
        return (
            <div className="flex justify-center items-center py-16">
                <Loader size="40" className="text-blue-600" />
            </div>
        );
    }

    if (productError) {
        return <ErrorMessage message={productError} />;
    }

    if (!product) return null;

    return (
        <div>
            <div className="max-w-[60rem] mx-auto mb-10 px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full max-w-sm max-h-[55vh] lg:max-h-[80vh] rounded shadow-lg object-cover"
                    />
                </div>

                <div className="flex flex-col justify-center space-y-4">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {product.name}
                    </h1>
                    <p className="text-gray-700">{product.description}</p>

                    <div className="text-gray-700 space-y-1">
                        <p>
                            <span className="font-medium">Brand:</span>{" "}
                            {product.brand}
                        </p>
                        <p>
                            <span className="font-medium">Material:</span>{" "}
                            {product.material}
                        </p>
                        <p>
                            <span className="font-medium">Color:</span>{" "}
                            {product.color}
                        </p>
                    </div>
                    <div className="text-gray-700">
                        <p>
                            <span className="font-medium">Category :</span>{" "}
                            {product.category}
                        </p>
                    </div>

                    <div className="text-gray-700">
                        <p className="font-medium">Sizes:</p>
                        <div className="flex space-x-2 mt-1">
                            {product.size.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => {
                                        setSelectedSize(s);
                                        setShowMessage(false);
                                    }}
                                    className={`px-3 py-1 cursor-pointer rounded text-sm ${
                                        selectedSize === s
                                            ? "text-white bg-blue-600"
                                            : "bg-gray-100"
                                    }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <p className="text-2xl font-semibold text-blue-600">
                        ₹{product.price}
                    </p>

                    {showMessage && (
                        <p className="text-red-500 text-md mb-3">
                            Please, select a Size
                        </p>
                    )}

                    {existingCartItem ? (
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center border rounded">
                                <button
                                    onClick={() => onQuantityChange("decrease")}
                                    disabled={btnLoading}
                                    className="px-3 py-1 text-xl font-semibold cursor-pointer"
                                >
                                    {btnLoading === "decrease" ? (
                                        <Loader
                                            size="20"
                                            className="text-blue-500"
                                        />
                                    ) : (
                                        "-"
                                    )}
                                </button>
                                <span className="px-4">
                                    {existingCartItem.quantity}
                                </span>
                                <button
                                    onClick={() => onQuantityChange("increase")}
                                    disabled={btnLoading}
                                    className="px-3 py-1 text-xl font-semibold cursor-pointer"
                                >
                                    {btnLoading === "increase" ? (
                                        <Loader
                                            size="20"
                                            className="text-blue-500"
                                        />
                                    ) : (
                                        "+"
                                    )}
                                </button>
                            </div>
                            <button
                                onClick={onDelete}
                                disabled={btnLoading}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
                            >
                                {btnLoading === "remove" ? (
                                    <Loader size="20" className="text-white" />
                                ) : (
                                    "Remove"
                                )}
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className={`px-6 py-3 rounded-md font-semibold w-full flex justify-center items-center cursor-pointer ${
                                selectedSize
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "bg-gray-300 text-white"
                            }`}
                        >
                            {btnLoading === "add" ? (
                                <Loader size="20" className="text-white" />
                            ) : (
                                "Add to Cart"
                            )}
                        </button>
                    )}
                </div>
            </div>

            <div>
                <ProductSlider
                    title="Related Products"
                    type="related"
                    productId={product?._id}
                />
            </div>
        </div>
    );
};

export default ProductDetails;
