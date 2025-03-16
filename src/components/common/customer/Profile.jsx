import { useState, useEffect } from "react";

const Profile = () => {
    const [user, setUser] = useState({ name: "", email: "" });
    const token = localStorage.getItem("token"); // Retrieve JWT token

    useEffect(() => {
        if (!token) {
            alert("User not logged in! Redirecting...");
            window.location.href = "/login"; // Redirect if no token
            return;
        }

        fetch("http://localhost:5000/api/users/me", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                alert("Session expired. Please login again.");
                localStorage.removeItem("token");
                window.location.href = "/login";
            } else {
                setUser(data);
            }
        })
        .catch((err) => console.error("Error fetching user:", err));
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/users/update-profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();
        if (response.ok) {
            alert("Profile updated successfully!");
        } else {
            alert("Error: " + data.message);
        }
    };

    return (
        <div>
            <h2>User Profile</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={user.name} onChange={handleChange} required />
                <input type="email" name="email" value={user.email} onChange={handleChange} required />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
