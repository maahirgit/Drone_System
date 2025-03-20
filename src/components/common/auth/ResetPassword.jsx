import React from "react";
import { useForm } from "react-hook-form";
import { Paper, Button, Typography, Box, TextField, Link } from "@mui/material";
import drone2 from "../../../assets/auth/drone page.jpg"; // Ensure the path is correct
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            console.log(data)
            const response = await axios.post("/user/resetPassword", data);

            if (response.status === 200) {
                toast.success("Password reset successfully!", {
                    className: "toast-success",
                    autoClose: 2000,
                    hideProgressBar: false,
                });

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        } catch (error) {
            toast.error("Failed to reset password. Try again later.", {
                className: "toast-error",
                autoClose: 2000,
                hideProgressBar: false,
            });
            console.error("Reset password failed", error);
        }
    };

    return (
        <Box
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100vw",
                backgroundImage: `url(${drone2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Paper
                elevation={6}
                style={{
                    padding: 20,
                    textAlign: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                }}
            >
                <Typography variant="h5" gutterBottom>
                    RESET PASSWORD
                </Typography>
                <Typography variant="body2" style={{ marginBottom: 20 }}>
                    Enter your email, OTP, and new password to reset your account.
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label="Email address"
                        margin="normal"
                        variant="outlined"
                        {...register("Email", { required: "Email is required" })}
                        error={!!errors.Email}
                        helperText={errors.Email?.message}
                        
                    />
                    <TextField
                        fullWidth
                        label="Otp"
                        margin="normal"
                        variant="outlined"
                        {...register("Otp", { required: "OTP is required" })}
                        error={!!errors.Otp}
                        helperText={errors.Otp?.message}
                    />
                    <TextField
                        fullWidth
                        label="New Password"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        {...register("Password", { required: "Password is required" })}
                        error={!!errors.Password}
                        helperText={errors.Password?.message}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 10 }}>
                        Submit
                    </Button>
                </form>
                <Box marginTop={2}>
                    <Link href="/login" variant="body2">
                        Back to Login
                    </Link>
                </Box>
            </Paper>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />
        </Box>
    );
};

export default ResetPassword;
