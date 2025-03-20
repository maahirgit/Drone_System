import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Paper, Button, Typography, Box, FormControlLabel, Checkbox, Link, TextField } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import drone2 from '../../../assets/auth/drone page.jpg'; // Ensure the path is correct
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/user/loginUser", data);

            if (response.status === 200) {
                const userData = response.data; // Assuming API returns { fname, lname, email, token }
                
                // Store user details in localStorage
                localStorage.setItem("token", userData.token);
                localStorage.setItem("fname", userData.fname);
                localStorage.setItem("lname", userData.lname);
                localStorage.setItem("email", userData.email);

                toast.success("Login successful!", {
                    className: "toast-success",
                    autoClose: 200,
                    hideProgressBar: false,
                });

                setTimeout(() => {
                    navigate('/');
                }, 200);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    toast.error("User not found. Please register first.", {
                        className: "toast-error",
                        autoClose: 1000,
                        hideProgressBar: false,
                    });
                } else if (error.response.status === 401) {
                    toast.error("Incorrect password. Please try again.", {
                        className: "toast-error",
                        autoClose: 1000,
                        hideProgressBar: false,
                    });
                } else {
                    toast.error("Login failed. Please try again later.", {
                        className: "toast-error",
                        autoClose: 1000,
                        hideProgressBar: false,
                    });
                }
            } else {
                toast.error("Network error. Please check your connection.", {
                    className: "toast-error",
                    autoClose: 3000,
                    hideProgressBar: false,
                });
            }
            console.error("Login failed", error);
        }
    };

    return (
        <Box
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
                backgroundImage: `url(${drone2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Paper
                elevation={6}
                style={{
                    padding: 20,
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                }}
            >
                <Typography variant="h5" gutterBottom>
                    LOG IN TO FLY SYNC
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Button variant="contained" startIcon={<AppleIcon />} style={{ backgroundColor: 'black', color: 'white' }}>
                        Continue with Apple
                    </Button>
                    <Button variant="contained" startIcon={<GoogleIcon />} style={{ backgroundColor: '#db4437', color: 'white' }}>
                        Continue with Google
                    </Button>
                    <Button variant="contained" startIcon={<FacebookIcon />} style={{ backgroundColor: '#3b5998', color: 'white' }}>
                        Continue with Facebook
                    </Button>
                </Box>
                <Typography variant="body2" style={{ margin: '20px 0' }}>
                    or
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label="Email address"
                        margin="normal"
                        variant="outlined"
                        {...register("Email", { required: "Email is required" })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        {...register("Password", { required: "Password is required" })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={1}>
                        <FormControlLabel
                            control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                            label="Remember me"
                        />
                        <Link href="/ForgetPassword" variant="body2">
                            Forgot password?
                        </Link>
                    </Box>
                    <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 10 }}>
                        Log In
                    </Button>
                </form>
                <Button
                    fullWidth
                    variant="contained"
                    style={{ marginTop: 10, backgroundColor: '#4caf50', color: 'white' }}
                >
                    Log In as Vendor
                </Button>
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

export default Login;
