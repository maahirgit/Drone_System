import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState({ fname: "", lname: "", email: "" });
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    useEffect(() => {
        const fetchUser = async () => {
            if (!token || !userId) {
                alert("User not logged in! Redirecting...");
                navigate("/login");
                return;
            }
    
            try {
                const response = await axios.get(`/user/getUser/${userId}`);
    
                const data = response.data.data;
                console.log("profile", data);

                setUser({
                    fname: data.Fname || "",
                    lname: data.Lname || "",
                    email: data.Email || ""
                });
    
    
             
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
    
        fetchUser();
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
