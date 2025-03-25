import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";

const Profile = () => {
    const [user, setUser] = useState({ fname: "", lname: "", email: "" });
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!token || !userId) {
            alert("User not logged in! Redirecting...");
            navigate("/login");
            return;
        }

        fetch("/user/getUser", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "userId": userId
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if (!data.fname || !data.lname || !data.email) {
                alert("Session expired. Please login again.");
                localStorage.clear();
                navigate("/login");
            } else {
                setUser(data);
                localStorage.setItem("fname", data.fname);
                localStorage.setItem("lname", data.lname);
                localStorage.setItem("email", data.email);
            }
        })
        .catch((err) => console.error("Error fetching user:", err));
    }, [token, userId]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/user/updateUser", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    "userId": userId
                },
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Profile update failed!");
            }

            alert("Profile updated successfully!");
            localStorage.setItem("fname", user.fname);
            localStorage.setItem("lname", user.lname);
            localStorage.setItem("email", user.email);
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: 20, marginTop: 50, textAlign: "center" }}>
                <Typography variant="h5">User Profile</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="First Name"
                        name="fname"
                        value={user.fname}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Last Name"
                        name="lname"
                        value={user.lname}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 20 }}>
                        Update Profile
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Profile;
