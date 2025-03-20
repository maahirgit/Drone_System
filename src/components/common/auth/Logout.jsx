import React from "react";
import axios from "axios";

const Logout = () => {
    const handleLogout = async () => {
        const token = sessionStorage.getItem("token");

        try {
            await axios.post("http://localhost:3001/user/logoutUser", {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            sessionStorage.removeItem("token");
            alert("Logged out successfully!");
        } catch (error) {
            alert("Logout Failed: " + error.response?.data?.message || "Unknown error");
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
