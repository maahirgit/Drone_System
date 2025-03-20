import { useState } from "react";
import { TextField, Button, Container, Typography, Box, Paper } from "@mui/material";

const Signup = () => {
    const [formData, setFormData] = useState({
        Fname: "",
        Lname: "",
        Email: "",
        Password: "",
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

        // Add default Role ID to the request
        const userData = {
            ...formData,
            RoleId: "67ac8f1fff5ddb48fc77a474", // Default Role ID
        };

        try {
            const response = await fetch("http://localhost:3001/user/createUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess(data.message);
                setFormData({ Fname: "", Lname: "", Email: "", Password: "" });
            } else {
                setError(data.message || "Signup failed!");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
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
                    <Typography variant="h4" align="center" fontWeight="bold" color="primary" gutterBottom>
                        Sign Up
                    </Typography>
                    <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 2 }}>
                        Create an account to get started!
                    </Typography>
                    {error && <Typography color="error" align="center">{error}</Typography>}
                    {success && <Typography color="green" align="center">{success}</Typography>}
                    <form onSubmit={handleSubmit}>
                        <TextField fullWidth label="First Name" name="Fname" variant="outlined" margin="dense" onChange={handleChange} value={formData.Fname} required />
                        <TextField fullWidth label="Last Name" name="Lname" variant="outlined" margin="dense" onChange={handleChange} value={formData.Lname} required />
                        <TextField fullWidth label="Email" name="Email" type="email" variant="outlined" margin="dense" onChange={handleChange} value={formData.Email} required />
                        <TextField fullWidth label="Password" name="Password" type="password" variant="outlined" margin="dense" onChange={handleChange} value={formData.Password} required />
                        <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2, py: 1.2, fontSize: "1rem", fontWeight: "bold" }} disabled={loading}>
                            {loading ? "Signing Up..." : "Sign Up"}
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default Signup;
