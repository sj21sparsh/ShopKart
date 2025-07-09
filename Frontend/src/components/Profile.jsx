import React from "react";
import Orders from "./Orders";

const Profile = () => {
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
                <Orders />
            </div>
        </div>
    );
};

export default Profile;
