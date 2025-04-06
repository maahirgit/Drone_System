import { useState } from "react";
import axios from "axios";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Paper,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";

const Signup = () => {
    const [formData, setFormData] = useState({
        Fname: "",
        Lname: "",
        Email: "",
        Password: "",
        Role_id: "", // Use Role_id to match backend
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        if (!formData.Role_id) {
            setError("Please select a role.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("/user/createUser", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200 || response.status === 201) {
                setSuccess(response.data.message || "User created successfully!");
                setFormData({
                    Fname: "",
                    Lname: "",
                    Email: "",
                    Password: "",
                    Role_id: "",
                });
            } else {
                setError("Signup failed!");
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#f5f5f5",
                    p: 3,
                }}
            >
                <Paper elevation={6} sx={{ p: 4, borderRadius: 3, width: "100%", maxWidth: 400 }}>
                    <Typography
                        variant="h4"
                        align="center"
                        fontWeight="bold"
                        color="primary"
                        gutterBottom
                    >
                        Sign Up
                    </Typography>
                    <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 2 }}>
                        Create an account to get started!
                    </Typography>
                    {error && <Typography color="error" align="center">{error}</Typography>}
                    {success && (
                        <Typography align="center" sx={{ color: "green" }}>
                            {success}
                        </Typography>
                    )}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="Fname"
                            variant="outlined"
                            margin="dense"
                            onChange={handleChange}
                            value={formData.Fname}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="Lname"
                            variant="outlined"
                            margin="dense"
                            onChange={handleChange}
                            value={formData.Lname}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="Email"
                            type="email"
                            variant="outlined"
                            margin="dense"
                            onChange={handleChange}
                            value={formData.Email}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            name="Password"
                            type="password"
                            variant="outlined"
                            margin="dense"
                            onChange={handleChange}
                            value={formData.Password}
                            required
                        />

                        <FormControl fullWidth margin="dense" required>
                            <InputLabel>Role</InputLabel>
                            <Select
                                name="Role_id"
                                value={formData.Role_id}
                                onChange={handleChange}
                                label="Role"
                            >
                                <MenuItem value="67f2c2dc3a243990cb063087">Customer</MenuItem>
                                <MenuItem value="67f2c3133a243990cb063089">Vendor</MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2, py: 1.2, fontSize: "1rem", fontWeight: "bold" }}
                            disabled={loading}
                        >
                            {loading ? "Signing Up..." : "Sign Up"}
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default Signup;
