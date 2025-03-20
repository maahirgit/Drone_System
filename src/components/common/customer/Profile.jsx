import { useState, useEffect } from "react";

const Profile = () => {
    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: ""
    });

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // Retrieve userId
    console.log(token);
    console.log(userId);
    
    useEffect(() => {
        if (!token || !userId) {
            alert("User not logged in! Redirecting...");
            window.location.href = "/login"; // Redirect if no token or userId
            return;
        }

        // Fetch user details using userId from headers
        fetch("http://localhost:3001/user/getUser", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "userId": userId // Send userId in headers
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                alert("Session expired. Please login again.");
                localStorage.clear();
                window.location.href = "/login";
            } else {
                setUser(data);
                // Update localStorage in case user data changes
                localStorage.setItem("fname", data.fname);
                localStorage.setItem("lname", data.lname);
                localStorage.setItem("email", data.email);
            }
        })
        .catch((err) => console.error("Error fetching user:", err));
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3001/user/updateUser", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                "userId": userId // Send userId in headers
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();
        if (response.ok) {
            alert("Profile updated successfully!");
            // Update localStorage after update
            localStorage.setItem("fname", user.fname);
            localStorage.setItem("lname", user.lname);
            localStorage.setItem("email", user.email);
        } else {
            alert("Error: " + data.message);
        }
    };

    return (
        <div>
            <h2>User Profile</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="fname" value={user.fname} onChange={handleChange} required placeholder="First Name" />
                <input type="text" name="lname" value={user.lname} onChange={handleChange} required placeholder="Last Name" />
                <input type="email" name="email" value={user.email} onChange={handleChange} required placeholder="Email" />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
